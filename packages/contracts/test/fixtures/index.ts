import hre from "hardhat";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

import {Factoring, Invoice, InvoiceFactory, MockERC20} from "../../sctypes/index";
import {deployProtocol} from "../../utils/protocol";

interface InvoiceFactoryFixture {
  factoring: Factoring;
  invoice: Invoice;
  invoiceFactory: InvoiceFactory;
  erc20: MockERC20;
  accounts: SignerWithAddress[];
  baseURI: string;
}

export const invoiceFactoryFixture = async (): Promise<InvoiceFactoryFixture> => {
  return await deployProtocol(hre);
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
