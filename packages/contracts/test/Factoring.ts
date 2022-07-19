import {expect} from "chai";
import {waffle, ethers} from "hardhat";
import {invoiceFactoryFixture, invoiceFactoryWithInvoiceFixture} from "./fixtures";
import {mint, approve} from "@utils/erc20";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {Factoring, Invoice, MockERC20} from "@sctypes/index";

const {loadFixture} = waffle;

describe("Factoring", () => {
  describe("Initialize", () => {
    it("should initialize variables", async () => {
      const {factoring, invoice} = await loadFixture(invoiceFactoryFixture);

      expect(await factoring.invoice()).to.be.equal(invoice.address);
    });
  });

  describe("Invoice", () => {
    const buyFractions = async ({
      erc20,
      buyer,
      factoring,
      invoiceID,
      fractions,
      invoice,
      signer,
    }: {
      erc20: MockERC20;
      signer: SignerWithAddress;
      buyer: SignerWithAddress;
      factoring: Factoring;
      invoice: Invoice;
      invoiceID: string;
      fractions: string;
    }) => {
      const invoiceElement = await factoring.invoices(invoiceID);
      const issuer = invoiceElement.issuer;
      const fractionalPrice = invoiceElement.fractionalPrice;
      const price = ethers.BigNumber.from(fractions).mul(fractionalPrice);

      await mint(erc20, signer, buyer.address, price);
      await approve(erc20, buyer, factoring.address, price);
      await expect(factoring.connect(buyer).buyInvoice(invoiceID, fractions))
        .to.emit(factoring, "BuyInvoice")
        .withArgs(invoiceID, fractions, buyer.address)
        .to.emit(invoice, "TransferSingle")
        .withArgs(factoring.address, issuer, buyer.address, invoiceID, fractions);
    };

    it("Should set invoice given roles", async () => {
      const {factoring, erc20, accounts} = await loadFixture(invoiceFactoryFixture);
      const args = {
        id: "2",
        fractionalPrice: "10000",
        issuer: accounts[2].address,
        receiver: accounts[3].address,
        token: erc20.address,
        repaymentAmount: "50000000",
      };

      await factoring.grantRole(await factoring.INVOICE_FACTORY(), accounts[0].address);
      await factoring.setInvoice(
        args.id,
        args.repaymentAmount,
        args.fractionalPrice,
        args.issuer,
        args.receiver,
        args.token,
      );

      await expect(
        factoring
          .connect(accounts[1])
          .setInvoice(args.id, args.repaymentAmount, args.fractionalPrice, args.issuer, args.receiver, args.token),
      ).to.be.revertedWith("");

      const invoiceData = await factoring.invoices(args.id);

      expect(invoiceData.status).to.be.equal(0);
      expect(invoiceData.amountRepaid).to.be.equal(0);
      expect(invoiceData.repaymentAmount).to.be.equal(args.repaymentAmount);
      expect(invoiceData.fractionalPrice).to.be.equal(args.fractionalPrice);
      expect(invoiceData.issuer).to.be.equal(args.issuer);
      expect(invoiceData.receiver).to.be.equal(args.receiver);
      expect(invoiceData.token).to.be.equal(args.token);
    });

    it("Should approve invoice", async () => {
      const {factoring, args, receiver} = await loadFixture(invoiceFactoryWithInvoiceFixture);

      await factoring.connect(receiver).approveInvoice(args.id);
      const invoiceData = await factoring.invoices(args.id);

      expect(invoiceData.status).to.be.equal(1);
    });

    it("Should buy invoice fractions", async () => {
      const {factoring, invoice, erc20, args, accounts} = await loadFixture(invoiceFactoryWithInvoiceFixture);
      const fractions = "10";

      await buyFractions({
        erc20,
        invoice,
        factoring,
        fractions,
        invoiceID: args.id,
        signer: accounts[0],
        buyer: accounts[5],
      });
    });

    it("Should repay invoices", async () => {
      const {factoring, erc20, args, accounts} = await loadFixture(invoiceFactoryWithInvoiceFixture);
      const repayAmount = ethers.BigNumber.from(args.repaymentAmount).div(2);
      const payer = accounts[5];

      await mint(erc20, accounts[0], payer.address, repayAmount);
      await approve(erc20, payer, factoring.address, repayAmount);

      await expect(factoring.connect(payer).repayInvoice(args.id, repayAmount))
        .emit(factoring, "RepayInvoice")
        .withArgs(args.id, repayAmount, payer.address)
        .emit(erc20, "Transfer")
        .withArgs(payer.address, factoring.address, repayAmount);

      const invoice = await factoring.invoices(args.id);
      expect(invoice.amountRepaid).to.be.equal(repayAmount);
    });

    it("Should withdraw rewards", async () => {
      const {factoring, invoice, erc20, args, accounts} = await loadFixture(invoiceFactoryWithInvoiceFixture);
      const repayAmount = ethers.BigNumber.from(args.repaymentAmount);
      const fractions = "10";
      const payer = accounts[5];

      await buyFractions({
        erc20,
        invoice,
        factoring,
        fractions,
        invoiceID: args.id,
        signer: accounts[0],
        buyer: accounts[5],
      });

      await mint(erc20, accounts[0], payer.address, repayAmount);
      await approve(erc20, payer, factoring.address, repayAmount);
      await expect(factoring.connect(payer).repayInvoice(args.id, repayAmount))
        .emit(factoring, "RepayInvoice")
        .withArgs(args.id, repayAmount, payer.address)
        .emit(erc20, "Transfer")
        .withArgs(payer.address, factoring.address, repayAmount);

      const balance = await invoice.balanceOf(accounts[5].address, args.id);
      const totalSupply = await invoice.totalSupply(args.id);
      const repayment = (await factoring.invoices(args.id)).repaymentAmount;

      await expect(factoring.connect(accounts[5]).withdraw(args.id))
        .to.emit(factoring, "RewardsWithdrawed")
        .withArgs(args.id, accounts[5].address, balance, repayment.div(totalSupply).mul(balance));
    });
  });
});
