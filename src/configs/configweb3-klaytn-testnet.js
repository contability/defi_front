const Web3 = require("web3");
const infuraurlmain			= "https://api.baobab.klaytn.net:8651" // https://public-node-api.klaytnapi.com/v1/cypress";
const infuraurlropsten	= "https://api.baobab.klaytn.net:8651";
const NETCLASS = "testnet";
const jnetkind = { mainnet: "mainnet", testnet: "testnet" };
const jnettype = { mainnet: "mainnet", testnet: "testnet" };
const jinfuraurl = { mainnet: infuraurlmain, testnet: infuraurlropsten };
const infuraurl = jinfuraurl[NETCLASS];
const netkind = jnetkind[NETCLASS],
  nettype = jnettype[NETCLASS];
let web3 = new Web3(new Web3.providers.HttpProvider(infuraurl));

module.exports = { web3, netkind, nettype };
