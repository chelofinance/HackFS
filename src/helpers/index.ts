import detectEthereumProvider from "@metamask/detect-provider";
import {ethers} from "ethers";
import {JsonRpcProvider, Web3Provider} from "@ethersproject/providers";

export const getProvider = (provider?: string): JsonRpcProvider | Web3Provider => {
  return provider
    ? new ethers.providers.JsonRpcProvider(provider)
    : new ethers.providers.Web3Provider((window as any).ethereum);
};

export const connectMetamask = async () => {
  await (window.ethereum as any).request({method: "eth_requestAccounts"});
};

export const isWeb3Enabled = async () => {
  const provider = await detectEthereumProvider();
  if (provider) return provider;
  return null;
};

export const switchNetwork = async (chainId: number) => {
  if ((window.ethereum as any).networkVersion !== chainId)
    await (window.ethereum as any).request({
      method: "wallet_switchEthereumChain",
      params: [{chainId: `0x${chainId.toString(16)}`}],
    });
};

export const addNetwork = async ({
  chainId,
  name,
  currency,
  rpcUrl,
}: {
  chainId: number;
  name: string;
  currency: {name: string; decimals: number; symbol: string};
  rpcUrl: string;
}) => {
  await (window.ethereum as any).request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainName: name,
        chainId: `0x${chainId.toString(16)}`,
        nativeCurrency: currency,
        rpcUrls: [rpcUrl],
      },
    ],
  });
};
