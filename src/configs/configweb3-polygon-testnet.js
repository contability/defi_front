const Web3 = require("web3");

// const infuraurlmain = "https://polygon-mumbai.g.alchemy.com/v2/elWZjOPfS0H03lYqe4-fSCu7LM4i7HUD";
// const infuraurlpolygon = "https://polygon-mumbai.g.alchemy.com/v2/elWZjOPfS0H03lYqe4-fSCu7LM4i7HUD";

const infuraurlmain = "https://polygon-mumbai.g.alchemy.com/v2/W8ZOcZLfGi6-weeT4SPZcMo2OI2OYrV2";
const infuraurlpolygon = "https://polygon-mumbai.g.alchemy.com/v2/W8ZOcZLfGi6-weeT4SPZcMo2OI2OYrV2";

const NETCLASS = "testnet";
const networkVersion = "80001";

const jnetkind = {mainnet: "mainnet", testnet: "testnet"};
const jnettype = {mainnet: "mainnet", testnet: "testnet"};

const jinfuraurl = {mainnet: infuraurlmain, testnet: infuraurlpolygon};

const infuraurl = jinfuraurl[NETCLASS];
let web3 = new Web3(new Web3.providers.HttpProvider(infuraurl));
const netkind = jnetkind[NETCLASS];
const nettype = jnettype[NETCLASS];

module.exports = {web3, netkind, nettype, networkVersion};
