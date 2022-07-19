import {HardhatRuntimeEnvironment} from "hardhat/types";

import {Factoring, Invoice, InvoiceFactory, MockERC20} from "@sctypes/index";
import {deploy} from "@utils/contracts";

export const deployProtocol = async (hre: HardhatRuntimeEnvironment, log?: boolean) => {
  const accounts = await hre.ethers.getSigners();
  const baseURI = "https://ipfs.io/ipfs/";

  const erc20: MockERC20 = await deploy(hre, "MockERC20", accounts[0], []);
  log && console.log("erc20", erc20.address);

  const invoice: Invoice = await deploy(hre, "Invoice", accounts[0], [baseURI]);
  log && console.log("invoice", invoice.address);

  const factoring: Factoring = await deploy(hre, "Factoring", accounts[0], [invoice.address]);
  log && console.log("factoring", factoring.address);

  const invoiceFactory: InvoiceFactory = await deploy(hre, "InvoiceFactory", accounts[0], [
    factoring.address,
    invoice.address,
  ]);
  log && console.log("invoiceFactory", invoiceFactory.address);

  await invoice.grantRole(await invoice.MINTER_ROLE(), invoiceFactory.address);
  await factoring.grantRole(await factoring.INVOICE_FACTORY(), invoiceFactory.address);
  await invoice.grantRole(await invoice.FACTORING_ROLE(), factoring.address);

  return {erc20, invoice, factoring, invoiceFactory, accounts, baseURI};
};
