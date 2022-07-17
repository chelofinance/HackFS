import {createReducer} from "@reduxjs/toolkit";
import * as actions from "../actions";

interface InitialState {
    user: {
        address: string;
    };
    dao: any;
    invoices: {
        loaded: boolean;
        data: Invoice[];
    };
}

const INITIAL_STATE: InitialState = {
    user: {
        address: "unregistered",
    },
    dao: {
        id: "",
        name: "",
        mini_daos: [],
    },
    invoices: {
        loaded: false,
        data: [],
    },
};

export const daoReducer = createReducer(INITIAL_STATE, (builder) => {
    builder.addCase(actions.onConnectWallet.fulfilled, (state: InitialState, action) => {
        state.user.address = action.payload;
    });
    builder.addCase(actions.onConnectDao.fulfilled, (state: InitialState, action) => {
        state.dao = action.payload;
    });
    builder.addCase(actions.onGetInvoices.fulfilled, (state: InitialState, action) => {
        state.invoices.loaded = true;
        state.invoices.data = action.payload;
    });
});
