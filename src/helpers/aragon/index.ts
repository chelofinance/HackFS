import {evmcl} from "@1hive/evmcrispr";
import Web3 from "web3";

import {getNetworkConfig} from "@helpers/network";
import {getProvider} from "@helpers/index";

const {ensResolve} = require("@aragon/wrapper");

export const execByDao = async (args: {
  dao: string;
  transactions: {
    to: string;
    signature: string;
    args: unknown[];
  }[];
}) => {
  const {dao, transactions} = args;
  const signer = getProvider().getSigner();
  const txString = transactions
    .map(
      (tx) =>
        `act agent ${tx.to} ${tx.signature} ${tx.args
          .map((arg) => (Array.isArray(arg) ? `[${arg.join(",")}]` : `${arg}`))
          .join(" ")}`
    )
    .join("\n");
  console.log({transactions, dao});
  const evm = evmcl`
   connect ${dao} token-manager voting
   ${txString}
  `;
  await evm.forward(signer);
};

export type Organization = {
  id: string;
  address: string;
  createdAt: number;
  apps: {appId: string; address: string; repoName: string}[];
};

const getOrgQuery = `query Organizations($id: ID!) {
    organizations(where: {id: $id},  orderBy: createdAt, orderDirection: desc){ 
      id
      address
      createdAt
      apps{
        appId 
        address
        repoName
      }
    }
  }`;

export const getAragonDAO = async (orgAddress: string): Promise<Organization | null> => {
  const {connectGraphEndpoint} = getNetworkConfig("rinkeby");
  const data = await fetch(connectGraphEndpoint || "", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: getOrgQuery,
      variables: {id: orgAddress.toLowerCase()},
    }),
  });

  if (data.ok) {
    const json = await data.json();
    return json.data.organizations[0];
  }
  return null;
};

export const getDaoAddress = async (daoName: string): Promise<string> => {
  const {addresses} = getNetworkConfig("rinkeby");
  return await resolveEnsDomain(`${daoName}.aragonid.eth`, {
    provider: new Web3(process.env.NEXT_PUBLIC_RINKEBY_PROVIDER || "").currentProvider,
    registryAddress: addresses.ensRegistry,
  });
};

export async function resolveEnsDomain(domain: string, opts: any) {
  try {
    return await ensResolve(domain, opts);
  } catch (err) {
    return "";
  }
}
