import { combineReducers, configureStore } from "@reduxjs/toolkit";
import common from "./common";

const reducer = combineReducers({ common });

export default function createStore() {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== "production",
  });
}
