import {expect} from "chai";
import {waffle, ethers} from "hardhat";
import {invoiceFactoryFixture} from "./fixtures";

const {loadFixture} = waffle;

describe("InvoiceFactory", () => {
  /**
   * Initialize a new bundle, returning the bundleId
   */
  describe("Initialize factory", () => {
    it("should initialize variables", async () => {
      const {invoiceFactory, factoring, invoice} = await loadFixture(invoiceFactoryFixture);

      expect(await invoiceFactory.factoring()).to.be.equal(factoring.address);
      expect(await invoiceFactory.invoice()).to.be.equal(invoice.address);
      expect(await invoiceFactory.idCount()).to.be.equal(0);
    });
  });

  describe("Create invoice", () => {
    it("Should mint invoice erc1155", async () => {
      const {invoiceFactory, invoice, erc20, accounts} = await loadFixture(invoiceFactoryFixture);
      const invoiceId = await invoiceFactory.idCount();
      const args = {
        client: accounts[1].address,
        fractions: "1000",
        fractionalPrice: "10",
        repaymentAmount: "50000000",
        invoiceURI: "MY_INVOICE_URI",
        token: erc20.address,
      };

      await expect(
        invoiceFactory.createInvoice(
          args.client,
          args.fractions,
          args.fractionalPrice,
          args.repaymentAmount,
          args.invoiceURI,
          args.token,
        ),
      )
        .to.emit(invoice, "TransferSingle")
        .withArgs(invoiceFactory.address, ethers.constants.AddressZero, invoiceId, args.fractions)
        .to.emit(invoiceFactory, "InvoiceCreated")
        .withArgs(invoiceId);

      expect(await invoice.balanceOf(accounts[0].address, invoiceId)).to.be.equal(args.fractions);
    });

    it("Should set invoice on factoring", async () => {
      const {invoiceFactory, factoring, erc20, accounts} = await loadFixture(invoiceFactoryFixture);
      const invoiceId = await invoiceFactory.idCount();
      const args = {
        client: accounts[1].address,
        fractions: "1000",
        fractionalPrice: "10",
        invoiceURI: "MY_INVOICE_URI",
        token: erc20.address,
        repaymentAmount: "50000000",
      };

      await invoiceFactory.createInvoice(
        args.client,
        args.fractions,
        args.fractionalPrice,
        args.repaymentAmount,
        args.invoiceURI,
        args.token,
      );
      const invoiceData = await factoring.invoices(invoiceId);

      expect(invoiceData.status).to.be.equal(0);
      expect(invoiceData.amountRepaid).to.be.equal(0);
      expect(invoiceData.fractionalPrice).to.be.equal(args.fractionalPrice);
      expect(invoiceData.repaymentAmount).to.be.equal(args.repaymentAmount);
      expect(invoiceData.issuer).to.be.equal(accounts[0].address);
      expect(invoiceData.receiver).to.be.equal(args.client);
      expect(invoiceData.token).to.be.equal(args.token);
    });
  });
});
