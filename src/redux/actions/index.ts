import {createAsyncThunk} from "@reduxjs/toolkit";

import * as actionTypes from "@redux/constants";
import {connectMetamask, isWeb3Enabled} from "@helpers/index";
import {getDaoAddress, getAragonDAO} from "@helpers/aragon";

import {MOCK_INVOICES, timeout} from "@helpers/mocks";

export const onConnectWallet = createAsyncThunk(actionTypes.CONNECT_WALLET, async () => {
  if (!(await isWeb3Enabled())) return "";
  await connectMetamask();
  return (window.ethereum as any).selectedAddress as string;
});

export const onConnectDao = createAsyncThunk(
  actionTypes.CONNECT_ARAGON,
  async (
    {
      daoName,
      gnosis,
    }: {
      daoName: string;
      gnosis?: string;
    },
    {rejectWithValue}
  ): Promise<unknown> => {
    try {
      const daoAddress = await getDaoAddress(daoName);
      if (daoAddress.length > 0) {
        const dao = await getAragonDAO(daoAddress);
        const agent = dao?.apps.find(({repoName}) => repoName === "agent")?.address;

        return {
          ...dao,
          type: "aragon",
        };
      } else {
        //const dao = await getSpace(daoName);
        //return {
        //id: dao.id,
        //name: dao.name,
        //type: "snapshot",
        //strategies: dao.strategies,
        //};
      }
    } catch (err: any) {
      console.log("SOMERROR", {err});
      rejectWithValue(err.response.data);
    }
  }
);

export const onGetInvoices = createAsyncThunk(
  actionTypes.GET_INVOICES,
  async (): Promise<Invoice[]> => {
    await timeout(3000);
    return MOCK_INVOICES;
  }
);
