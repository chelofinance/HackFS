import hre, {ethers} from "hardhat";
import {deploy} from "@utils/contracts";
import {Factoring, Invoice, InvoiceFactory, MockERC20} from "@sctypes/index";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

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
  await invoice.grantRole(await invoice.TRANSFER_ROLE(), factoring.address);

  return {
    factoring,
    invoice,
    invoiceFactory,
    erc20,
    accounts,
    baseURI,
  };
};
