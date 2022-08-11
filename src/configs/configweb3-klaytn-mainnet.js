const Web3 = require("web3");
const infuraurlmain = "https://klaytn04.fandom.finance/";
const infuraurlropsten = "https://klaytn04.fandom.finance/";
const NETCLASS = "mainnet";
const jnetkind = { mainnet: "mainnet", testnet: "ropsten" };
const jnettype = { mainnet: "mainnet", testnet: "testnet" };
const jinfuraurl = { mainnet: infuraurlmain, testnet: infuraurlropsten };
const infuraurl = jinfuraurl[NETCLASS];
const netkind = jnetkind[NETCLASS],
  nettype = jnettype[NETCLASS];
let web3 = new Web3(new Web3.providers.HttpProvider(infuraurl));

const arpcurl = [
  "https://klaytn05.fandom.finance/",
  "https://klaytn04.fandom.finance/",
  "https://klaytn03.fandom.finance/",
  "https://klaytn02.fandom.finance/",
  "https://klaytn01.fandom.finance/",
];
let aweb3 = [];
arpcurl.forEach((elem) => {
  aweb3[aweb3.length] = new Web3(new Web3.providers.HttpProvider(elem));
});
let idxofcontractcalls = 0;
const selectweb3 = (_) => {
  idxofcontractcalls++;
  return aweb3[idxofcontractcalls % aweb3.length];
};
module.exports = { web3, netkind, nettype, aweb3, selectweb3 };
