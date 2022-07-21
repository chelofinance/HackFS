import {ThunkMiddleware} from ".pnpm/redux-thunk@2.4.1_redux@4.2.0/node_modules/redux-thunk";
import {AnyAction, configureStore, EnhancedStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {daoReducer, InitialState} from "../reducers";

export const store: EnhancedStore<
  InitialState,
  AnyAction,
  [ThunkMiddleware<InitialState, AnyAction, undefined>]
> = configureStore({
  reducer: daoReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
