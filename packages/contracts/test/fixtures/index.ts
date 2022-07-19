import hre, {ethers} from "hardhat";
import {deploy} from "@utils/contracts";
import {Factoring, Invoice, InvoiceFactory, MockERC20} from "@sctypes/index";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";
import {InvoiceFactoryInterface} from "@sctypes/contracts/InvoiceFactory";

interface InvoiceFactoryFixture {
  factoring: Factoring;
  invoice: Invoice;
  invoiceFactory: InvoiceFactory;
  erc20: MockERC20;
  accounts: SignerWithAddress[];
  baseURI: string;
}

export const invoiceFactoryFixture = async (): Promise<InvoiceFactoryFixture> => {
  const accounts = await ethers.getSigners();
  const baseURI = "https://localhost:3000/";

  const erc20: MockERC20 = await deploy(hre, "MockERC20", accounts[0], []);
  const invoice: Invoice = await deploy(hre, "Invoice", accounts[0], [baseURI]);
  const factoring: Factoring = await deploy(hre, "Factoring", accounts[0], [invoice.address]);
  const invoiceFactory: InvoiceFactory = await deploy(hre, "InvoiceFactory", accounts[0], [
    factoring.address,
    invoice.address,
  ]);

  await invoice.grantRole(await invoice.MINTER_ROLE(), invoiceFactory.address);
  await factoring.grantRole(await factoring.INVOICE_FACTORY(), invoiceFactory.address);
  await invoice.grantRole(await invoice.FACTORING_ROLE(), factoring.address);

  return {
    factoring,
    invoice,
    invoiceFactory,
    erc20,
    accounts,
    baseURI,
  };
};

interface InvoiceFactoryWithInvoiceFixture extends InvoiceFactoryFixture {
  args: {
    id: string;
    fractionalPrice: string;
    issuer: string;
    receiver: string;
    token: string;
    repaymentAmount: string;
  };
  issuer: SignerWithAddress;
  receiver: SignerWithAddress;
}

export const invoiceFactoryWithInvoiceFixture = async (): Promise<InvoiceFactoryWithInvoiceFixture> => {
  const {invoiceFactory, factoring, erc20, accounts, ...rest} = await invoiceFactoryFixture();
  const args = {
    id: (await invoiceFactory.idCount()).toString(),
    fractionalPrice: "10000",
    fractions: "1000000",
    issuer: accounts[0].address,
    receiver: accounts[1].address,
    token: erc20.address,
    uri: "my_nft_uri",
    repaymentAmount: "50000000000",
  };

  await invoiceFactory.createInvoice(
    args.receiver,
    args.fractions,
    args.fractionalPrice,
    args.repaymentAmount,
    args.uri,
    args.token,
  );
  await factoring.connect(accounts[1]).approveInvoice(args.id);

  return {
    issuer: accounts[0],
    receiver: accounts[1],
    args,
    invoiceFactory,
    factoring,
    accounts,
    erc20,
    ...rest,
  };
};
