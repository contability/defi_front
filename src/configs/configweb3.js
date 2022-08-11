import { web3 as web3_ropsten } from "./configweb3-ropsten";
import { web3 as web3_klaytn_mainnet
	, selectweb3
} from "./configweb3-klaytn-mainnet"
import { web3 as web3_klaytn_testnet } from './configweb3-klaytn-testnet'
import { web3 as web3_polygon_testnet } from "./configweb3-polygon-testnet";
import { NET } from "./net";
// const web3 = NET == "ETH_TESTNET" ? web3_ropsten : web 3_klaytn;
// const web 3_klaytn = web3_ klaytn_net;
let web3;

switch (NET) {
  case "KLAY_MAINNET":
    web3 = web3_klaytn_mainnet;
    break;
  case "KLAY_TESTNET":
    web3 = web3_klaytn_testnet
    break;
  case "ETH_TESTNET":
    web3 = web3_ropsten;
    break;
  case "POLYGON_TESTNET":
    // TODO: CHANGE config file
    // web3 = web3_polygon_testnet;
    web3 = web3_ropsten;
    break;
  default:
    web3 = web3_klaytn_mainnet;
}
export { web3 , selectweb3 , NET }; // , web3_k laytn

/** if (NET=='ETH_TESTNET'){
	export {
		web3_ropsten as web3
	}
}
else if (NET == 'KLAY_TESTNET'){
	export {
		web 3_klaytn as web3
	}
}*/
/**  const Web3 = require("web3");
const infuraurlmain =
  "https://ropsten.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0";
const infuraurlropsten =
  "https://ropsten.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0";
// const infuraurlropsten= XXX 'https://data-seed-prebsc-2-s2.binance.org:8545/' // 'https://ropsten.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0'
// const infuraurlropsten = "https://data-seed-prebsc-1-s3.binance.org:8545/";
const NETCLASS = "testnet"; // require('fs').readFileSync('NETTYPE.cfg').toString().replace(/ /g,'');console.log(NETCLASS)
const jnetkind = { mainnet: "mainnet", testnet: "ropsten" };
const jnettype = { mainnet: "mainnet", testnet: "testnet" };
const jinfuraurl = { mainnet: infuraurlmain, testnet: infuraurlropsten };
const infuraurl = jinfuraurl[NETCLASS]; //
const netkind = jnetkind[NETCLASS],
  nettype = jnettype[NETCLASS]; // 'testnet' //  'ropsten'
// const infuraurl=infuraurlmain // infuraurlropsten //
let web3 = new Web3(new Web3.providers.HttpProvider(infuraurl));
module.exports = { web3, netkind, nettype }; // ,createaccount,aapikeys,getapikey
*/
