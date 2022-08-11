import Caver from "caver-js";
import Web3 from "web3";
import SetErrorBar from "../util/SetErrorBar";
import { MAX_GAS_LIMIT } from "../configs/configs"; // 12000000'

let { ethereum, klaytn } = window;
const requestTransaction = async (jreqdata, wallet) => {
  /// ethereum
  if (wallet == "metamask" && ethereum && ethereum.selectedAddress) {
    console.log("wallet", wallet);
    let { from, to, data, value, gas } = jreqdata;
    let txparams;
    txparams = {
      from: from,
      to: to,
      data: data,
      value: value, // '0x00'
      gas: gas || MAX_GAS_LIMIT, // '1000000' // "250000", // 25000
    };
    let resp;
    try {
      resp = await ethereum.request({
        method: "eth_sendTransaction",
        params: [txparams],
      }); //    DebugMode && LOGGER("1F9jVI8LrL", resp);
      return resp;
    } catch (err) {
      //  DebugMode && LOGGER("kkm1TWXecH", err);
      // return null;
      return err;
    }
    //// klaytn
  } else if (wallet == "klaytn" && klaytn && klaytn.selectedAddress) {
    console.log("wallet", wallet);
    let caver;
    if (window.klaytn) {
      caver = new Caver(window.klaytn);
    } else {
      caver = null;
    }
    if (caver) {
    } else {
      SetErrorBar("Please connect wallet");
      console.log(`caver not found`);
      return null;
    }
    let { from, to, data, value, gas } = jreqdata;
    let resp = await caver.klay.sendTransaction({
      from, // : myaddress
      to, // : ADDRESSES.erc20 // ''
      data, // : abistr
      value, // : '0x00'
      gas: gas || MAX_GAS_LIMIT, // '1000000' // "250000", // 25000
    });

    return resp;
  }
};

export { requestTransaction };
