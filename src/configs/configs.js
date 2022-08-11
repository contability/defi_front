import { net } from "./net";

// const MIN_STAKE_AMOUNT = 33 // 100
const MIN_STAKE_AMOUNT = 100;

/********* await-tx-mined */
const TXREQSTATUS_POLL_INTERVAL = 3000;
const TXREQSTATUS_BLOCKCOUNT = 1; // 2 // 4 // 6
let TX_POLL_OPTIONS = {
  interval: TXREQSTATUS_POLL_INTERVAL,
  blocksToWait: TXREQSTATUS_BLOCKCOUNT,
};
// const URL_BASE=`http://3.35.1 17.87`
const URL_BASE = `https://nftinfinity.world`;
// const URL_METADATA_BASE=`http://3.35.11 7.87/assets/json` // /2.json
//const URL_METADATA_BASE = `https://nftinfinity.world/assets/json`; // /2.json
const TIME_PAGE_TRANSITION_DEF = 3000;
const TIME_FETCH_MYADDRESS_DEF = 1500; // 3500
const DECIMALS_DISP_DEF = 4;
const ITEM_PRICE_DEF = 372;
// let MAX_GAS_LIMIT = "400000";
let MAX_GAS_LIMIT = net.indexOf("TESTNET") > -1 ? "21000" : "3000000";
// let MAX_GAS_LIMIT = net.indexOf("TESTNET") > -1 ? "1000000" : "3000000";
// let MAX_GAS_LIMIT = "1000000";

let appver = "20220411-2259v0.1.0";

export {
  MIN_STAKE_AMOUNT,
  TX_POLL_OPTIONS,
  URL_BASE,
  // URL_METADATA_BASE,
  TIME_PAGE_TRANSITION_DEF,
  TIME_FETCH_MYADDRESS_DEF,
  DECIMALS_DISP_DEF,
  ITEM_PRICE_DEF,
  MAX_GAS_LIMIT,
  appver,
};
