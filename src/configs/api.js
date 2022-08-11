const URL = "http://stakenftn.net:32567";

const API = {
  API_STATS: URL + "",
  API_USERNAME: URL + "",
  API_TXS: URL + "/transactions",   // /:txhash
  API_EXCHANGE_RATE: URL + "/queries/rows/exchangerates/active/1/0/100/id/DESC",
  API_GET_SETUP: URL + "/queries/rows/settings/group_/fee/0/100/id/DESC",
  API_GET_SETUP_RATES: URL + "/queries/rows/settings/group_/rates/0/100/id/DESC",
  API_STAKE_STATUS: URL + "/queries/singlerow/stakes/username"
};

export { API };
