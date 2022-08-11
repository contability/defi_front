import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../configs/api";
import { addresses } from "../configs/addresses";

const initialState = {
  isMobile: false,
  provider: "",
  address: null,
  nickname: "",
  spinner: false,
  walletIcon: null,
  wallet: "",
  sellData: {},
  profile: {},
  userinfo: {},
  filterInfo: {},
  filterInfoAll: {},
  filterInfoBuy: {},
  symbolText: "",
  contractType: "",
};

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSymbolText: (state, action) => {
      state.symbolText = action.payload;
    },
    setContractType: (state, action) => {
      console.log("$reducer_contract_type_set", action.payload);
      state.contractType = action.payload;
    },
    setFilterInfo: (state, action) => {
      state.filterInfo = action.payload;
    },
    setFilterInfoAll: (state, action) => {
      state.filterInfoAll = action.payload;
    },
    setFilterInfoBuy: (state, action) => {
      state.filterInfoBuy = action.payload;
    },
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setAddress: (state, action) => {
      state.provider = action.payload.provider;
      state.address = action.payload.address;
    },
    setNick: (state, action) => {
      let myaddress = action.payload.address;
      let nickname = action.payload.nickname;
      state.nickname = nickname;
      localStorage.setItem("nickname", nickname);
      console.log("state.nickname", nickname);
      console.log("state.address", myaddress);
    },
    setSpinner: (state, action) => {
      state.spinner = action.payload;
    },
    setWalletIcon: (state, action) => {
      state.walletIcon = action.payload;
      // 0 : METAMASK
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    setSellData: (state, action) => {
      state.sellData = action.payload;
    },
  },
});

export const {
  setSymbolText,
  setContractType,
  setFilterInfo,
  setMobile,
  setAddress,
  setNick,
  setSpinner,
  setWalletIcon,
  setWallet,
  setSellData,
  setFilterInfoAll,
  setFilterInfoBuy,
} = common.actions;

export default common.reducer;
