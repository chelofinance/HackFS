import axios from "axios";
import {ethers} from "ethers";

import {attach} from "@helpers/contracts";

type ERC20 = any;

export const approveERC1155 = async (args: {
  contract: string;
  amount: string;
  target: string;
}) => {
  const contract = attach("ERC1155", args.contract);

  return await contract.setApprovalForAll(args.target, true);
};

export const approveERC20 = async (args: {amount: string; target: string; contract: string}) => {
  const token = attach("ERC20", args.contract);

  return await token.approve(args.target, args.amount);
};

export const addDecimals = async (token: string, value: string) => {
  const tokenContract = attach("ERC20", token);
  const decimals = await tokenContract.decimals();
  return value + (10 ** decimals).toString().replace("1", "");
};

export const formatValue = async ({
  token,
  value,
  maxDecimals,
}: {
  token: string;
  value: string;
  maxDecimals?: number;
}) => {
  const tokenContract = attach("ERC20", token);
  const decimals = await tokenContract.decimals();

  return formatValueWithDecimals({value, decimals, maxDecimals});
};

export const formatValueWithDecimals = ({
  value,
  decimals,
  maxDecimals,
}: {
  value: string;
  decimals: number;
  maxDecimals?: number;
}) => {
  const bg = ethers.BigNumber.from(value);
  const pow = ethers.BigNumber.from(10).pow(decimals);
  const last = bg.mod(pow).toString();
  return `${bg.div(pow).toString()}.${maxDecimals ? last.slice(0, maxDecimals) : last}`;
};

const ARBITRUM_LIST = "https://bridge.arbitrum.io/token-list-42161.json";

export const getTokensList = async () => {
  const {
    data: {tokens},
  } = await axios.get(ARBITRUM_LIST);
  return tokens.filter((tkn: any) => tkn.chainId === 1);
};

export const loadERC20 = async (token: string) => {
  const url = process.env.NEXT_PUBLIC_POLYGON_PROVIDER;
  const tokenContract = <ERC20>attach("ERC20", token, url);
  const [symbol, name, totalSupply, decimals] = await Promise.all([
    tokenContract.symbol(),
    tokenContract.name(),
    tokenContract.totalSupply(),
    tokenContract.decimals(),
  ]);

  return {address: token, symbol, name, totalSupply: totalSupply.toString(), decimals};
};
