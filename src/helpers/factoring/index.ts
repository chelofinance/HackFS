import axios from "axios";
import {ethers} from "ethers";
import {BigNumberish} from "@ethersproject/bignumber";

import {execByDao} from "@helpers/aragon";
import {attach} from "@helpers/contracts";
import {getProvider} from "@helpers/index";
import addresses from "@factoring/contracts/addresses";
import {loadERC20} from "@helpers/erc";
import {
  Factoring,
  InvoiceFactory,
  Invoice as InvoiceContract,
  MockERC20,
} from "@factoring/sctypes";

const toBN = ethers.BigNumber.from;

type InvoicesQuery = {
  id: string;
  status: number;
  repaymentAmount: string;
  fractionalPrice: string;
  amountRepaid: string;
  blockNumber: string;
  issuer: string;
  receiver: string;
  token: string;
  purchases: {
    id: string;
    amount: string;
    buyer: string;
    timestamp: string;
  }[];
};

const GET_INVOICES_QUERY = `{
  invoices{
    id 
    status
    repaymentAmount 
    fractionalPrice 
    amountRepaid 
    blockNumber 
    issuer 
    receiver 
    token 
    purchases {
      id 
      amount 
      buyer  
      timestamp
    }
  }
}`;

export const getInvoices = async (): Promise<Invoice[]> => {
  const url = process.env.NEXT_PUBLIC_SUBGRAPH_URL;
  const jsonRpc = process.env.NEXT_PUBLIC_POLYGON_PROVIDER;
  const provider = getProvider(jsonRpc);
  const data = await fetch(url || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: GET_INVOICES_QUERY,
    }),
  });

  if (data.ok) {
    const json = await data.json();
    const invoices: InvoicesQuery[] = json.data.invoices;
    const invoice = <InvoiceContract>attach("Invoice", addresses.polygon.invoice, jsonRpc);
    const factoring = <Factoring>attach("Factoring", addresses.polygon.factoring, jsonRpc);

    const tokens = await Promise.all(invoices.map(({token}) => loadERC20(token)));
    const totalSupplies = await Promise.all(invoices.map((a, id) => invoice.totalSupply(id)));
    const blocks = await Promise.all(
      invoices.map(({blockNumber}) => provider.getBlock(Number(blockNumber)))
    );
    const invoiceURIs = await Promise.all(invoices.map((a, id) => invoice.uri(id)));
    const allStatus = await Promise.all(invoices.map((inv, i) => factoring.invoices(i)));

    return invoices.map((data, i) => ({
      id: i.toString(),
      uri: invoiceURIs[i],
      totalSupply: totalSupplies[i].toString(),
      issuer: data.issuer,
      receiver: data.receiver,
      status: allStatus[i].status as Invoice["status"],
      date: blocks[i].timestamp * 10000,
      blockNumber: blocks[i].number,
      fractionalPrice: data.fractionalPrice.toString(),
      amountRepaid: data.amountRepaid.toString(),
      repaymentAmount: data.repaymentAmount.toString(),
      discount: String(
        100 -
        toBN(data.repaymentAmount)
          .mul(100)
          .div(toBN(data.fractionalPrice).mul(totalSupplies[i]))
          .toNumber()
      ),
      token: tokens[i],
      purchases: data.purchases,
    }));
  }
  return [];
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
  return await invoiceFactory.createInvoice(
    client,
    fractions,
    fractionalPrice,
    repaymentAmount,
    invoiceURI,
    addresses.polygon.token //our mock token
  );
};

export const buyInvoices = async ({
  invoiceId,
  fractions,
  price,
}: {
  invoiceId: string;
  fractions: string;
  price: string;
}) => {
  const token = <MockERC20>attach("ERC20", addresses.polygon.token);
  const factoring = <Factoring>attach("Factoring", addresses.polygon.factoring);

  await token.approve(factoring.address, price);
  return await factoring.buyInvoice(invoiceId, fractions);
};

export const approveInvoice = async ({invoiceId}: {invoiceId: string}) => {
  const factoring = <Factoring>attach("Factoring", addresses.polygon.factoring);

  return await factoring.approveInvoice(invoiceId);
};
