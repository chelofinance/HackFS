import {BigNumberish} from "@ethersproject/bignumber";
import {ethers} from "ethers";

import {execByDao} from "@helpers/aragon";
import {attach} from "@helpers/contracts";
import {getProvider} from "@helpers/index";
import addresses from "@factoring/contracts/addresses";
import {loadERC20} from "@helpers/erc";
import {Factoring, InvoiceFactory, Invoice as InvoiceContract} from "@factoring/sctypes";

export const getInvoices = async (): Promise<Invoice[]> => {
  const invoiceFactory = <InvoiceFactory>attach("InvoiceFactory", addresses.polygon.invoiceFactory);
  const factoring = <Factoring>attach("Factoring", addresses.polygon.factoring);
  const invoice = <InvoiceContract>attach("Invoice", addresses.polygon.invoice);
  const provider = getProvider();

  const idCount = await invoiceFactory.idCount();
  const invoiceData = await Promise.all(
    new Array(idCount).fill(0 as any).map((id) => factoring.invoices(id))
  );
  const invoiceURIs = await Promise.all(invoiceData.map((a, id) => invoice.uri(id)));
  const totalSupplies = await Promise.all(invoiceData.map((a, id) => invoice.totalSupply(id)));
  const blocks = await Promise.all(
    invoiceData.map(({blockNumber}) => provider.getBlock(blockNumber.toNumber()))
  );
  const tokens = await Promise.all(invoiceData.map(({token}) => loadERC20(token)));

  return invoiceData.map((data, i) => ({
    id: i.toString(),
    uri: invoiceURIs[i],
    totalSupply: totalSupplies[i].toString(),
    issuer: data.issuer,
    receiver: data.receiver,
    status: data.status as 0 | 1 | 2,
    date: blocks[i].timestamp * 10000,
    fractionalPrice: data.fractionalPrice.toString(),
    amountRepaid: data.amountRepaid.toString(),
    repaymentAmount: data.repaymentAmount.toString(),
    discount: String(
      100 - data.repaymentAmount.mul(100).div(data.fractionalPrice.mul(totalSupplies[i])).toNumber()
    ),
    token: tokens[i],
  }));
};

export const createInvoice = async (args: {
  dao?: string;
  client: string;
  fractions: BigNumberish;
  fractionalPrice: BigNumberish;
  repaymentAmount: BigNumberish;
  invoiceURI: string;
  token: string;
}) => {
  const {dao, client, fractions, fractionalPrice, repaymentAmount, invoiceURI, token} = args;
  if (dao)
    return await execByDao({
      dao,
      transactions: [
        {
          to: addresses.polygon.invoiceFactory,
          signature: "createInvoice(address,uint256,uint256,uint256,string,address)",
          args: [client, fractions, fractionalPrice, repaymentAmount, invoiceURI, token],
        },
      ],
    });

  const invoiceFactory = <InvoiceFactory>attach("InvoiceFactory", addresses.polygon.invoiceFactory);
  console.log(args, invoiceFactory.address);
  return await invoiceFactory.createInvoice(
    client,
    fractions,
    fractionalPrice,
    repaymentAmount,
    invoiceURI,
    addresses.polygon.token //our mock token
  );
};
