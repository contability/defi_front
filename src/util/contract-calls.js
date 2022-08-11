import Web3 from "web3";
import { web3, selectweb3, NET } from "../configs/configweb3";

// Finance
import { abi as abistableswap } from "../contracts/abi/stable-swap";
// Employ
import { abi as abistake } from "../contracts/abi/stake-employ";
import { abi as abinftquery } from "../contracts/abi/nft";
import { abi as abinft } from "../contracts/abi/kip17-erc721.js";
// Buy&Sell
import { abi as abibuysell } from "../contracts/abi/buy&sell.js";
// Trash
import { abi as abifactory } from "../contracts/abi/factory";
import { abi as abirouter } from "../contracts/abi/router";
import { abi as abipair } from "../contracts/abi/pair";
import { abi as abisingle_stake } from "../contracts/abi/single_staking";
//
// ETC
import { abi as abiadmin } from "../contracts/abi/admin";
import { abi as abibid } from "../contracts/abi/bid";
import { addresses } from "../configs/addresses";
/** import { abiStake } from "../contracts/abi/abiStake";
import { abiadmin } from "../contracts/abi/abiAdmin";
import { abiSwapRouter } from "../contracts/abi/abiSwapRouter";
import { abiFactory } from "../contracts/abi/abiFactory";
import { abiPair } from "../contracts/abi/abiPair";
import { abi as abifund } from '../contracts/abi/abi-fund'
*/
import sha256 from "js-sha256";




import { abi as abierc20 } from "../contracts/abi/erc20";
import {abi as abistakeandreward} from "../contracts/abi/stake_and_reward";
import {abi as abistakeserverreliant} from "../contracts/abi/stake_server_reliant" 
import {abi as abiexchanger} from "../contracts/abi/exchanger" 

// let idxofcontractcalls= 0
const jcontracts = {};
const MAP_STR_ABI = {
  // **
  // Finance
  // Employee
  ERC721: abinft,
  STAKING: abistake,
  NFT: abinft,
  ERC20: abierc20,
  ADMIN: abiadmin,
  STABLE_SWAP: abistableswap,
  FACTORY: abifactory,
  ROUTER: abirouter,
  PAIR: abipair,
  SWAP: abistableswap,
  // Buy&Sell
  BUYSELL: abibuysell,
  // BID
  BID: abibid,
  /*	STAKER: abiStake,
	STAKE : abiStake,
	FUND : abifund ,
  */
  // Single Staker
  SINGLE_STAKE: abisingle_stake,
// ////////////////////////////////////////
  STAKE_AND_REWARD : abistakeandreward,
  STAKER_SERVER_RELIANT: abistakeserverreliant,
  EXCHANGER: abiexchanger
};
// jdecimals={
// 'KLAY_MAINNET' : { 'USDT' : 6 , ... }
// , ...diasodijasodiajsd
// }
export const getweirep = (val) => Web3.utils.toWei(val);
export const getethrep = (val) => Web3.utils.fromWei(val); //eth -> gas
export const getethrep_ext = (val, nettype, tokenkind) => {
  if (nettype === "KLAY_MAINNET" || nettype === "KLAY_TESTNET" || nettype === "POLYGON_TESTNET") {
    if (
      tokenkind.toLowerCase() === addresses.USDT.toLowerCase() ||
      tokenkind.toLowerCase() === addresses.USDC.toLowerCase()
    ) {
      return Web3.utils.fromWei(val, "Mwei");
    } else {
      return Web3.utils.fromWei(val, "ether");
    }
  } else {
    return Web3.utils.fromWei(val);
  }
};
export const getweirep_ext = (val, nettype, tokenkind) => {
  if (nettype === "KLAY_MAINNET" || nettype === "KLAY_TESTNET") {
    if (
      tokenkind.toLowerCase() === addresses.USDT.toLowerCase() ||
      tokenkind.toLowerCase() === addresses.USDC.toLowerCase()
    ) {
      return Web3.utils.toWei(val, "mwei");
    } else {
      return Web3.utils.toWei(val);
    }
  } else {
    return Web3.utils.toWei(val);
  }
};

/**  export const contractAddress = {
  USDT: "0x86ee58655176ca34df528e8f23c9d8fc18300cd0",
  QTBK: "0xd27647552ca435b98be6eaf99a356efb3ce79371",
  QTBG: "0x978271524a6f75b61e0efb6a9ddb1d39349b919c",
  QTBD: "0x429e076a3ebbafa80e0744baf36c892687d1b286",
  STAKE: "0xc0643eb0113fe0dafe466c34c94e0bad8f18bb70", //0x35fe0fa56810a41eea2fb156cc15cbd97bcbb410,
  ADMIN: "0x0896f727d0ace6964363640c1239de7d7ac0d0eb",
  ROUTER: "0xbcb501badd7a7c2ccfbe8f0a4c1b534fad690f04",
  FACTORY: "0x479edb1d65058cb02ae49c6d58958783e243e273",
  QTBK_USDT: "0x540ABb76Fe7957b3b7087aB5176bA0bcf1d3147B",
  QTBK_QTBG: "0x8064E909c7CBBDe398837C2836DfBA50F6147b47",
  QTBG_QTBD: "0x75ee21FB7C39F87a66d90c40c921Bdc522CFe31d",
}; */
// export const myAddress = "0x4Dd9e39F8b0876f3c6F54B4B8E7cB42D0577dd09";
// export const yourAddress = "0x7A35e23093537baf8fBA4dAd57AD0b5e728258b3";
// export const privateAddress = myAddress;

const getabistr_forfunction = (jargs) => {
  let { contractaddress, abikind, methodname, aargs } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  let sig = sha256(contractaddress + methodname);
  // if (jcontracts[sig]) {
  //   contract = jcontracts[contractaddress];
  // } else {
  console.log("jcontracts[sig]", jcontracts[sig]);
  contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
  jcontracts[sig] = contract;
  // }
  console.log("contract", contract);
  console.log(
    "contract.methods",
    contract?.methods[methodname](...aargs).encodeABI()
  );
  return contract.methods[methodname](...aargs).encodeABI();
};
const query_noarg = (jargs) => {
  let { contractaddress, abikind, methodname } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  let sig = sha256(contractaddress + methodname);
  if (jcontracts[sig]) {
    contract = jcontracts[sig];
  } else {
    if (NET == "KLAY_MAINNET") {
      let web3 = selectweb3();
      contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
    } else {
      contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
    }
    jcontracts[sig] = contract;
  }
  return new Promise((resolve, reject) => {
    contract.methods[methodname]()
      .call((err, resp) => {
        if (err) {
          resolve(null);
          console.log(err);
          return;
        }
        resolve(resp);
      })
      .catch((err) => {
        resolve(null);
      });
  });
};
const query_with_arg = (jargs) => {
  let { contractaddress, abikind, methodname, aargs } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  let sig = sha256(contractaddress + methodname);
  if (jcontracts[sig]) {
    contract = jcontracts[sig];
  } else {
    if (NET == "KLAY_MAINNET") {
      let web3 = selectweb3();
      contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
    } else {
      contract = new web3.eth.Contract(MAP_STR_ABI[abikind], contractaddress);
    }
    jcontracts[sig] = contract;
  }
  return new Promise((resolve, reject) => {
    contract.methods[methodname](...aargs)
      .call((err, resp) => {
        if (err) {
          resolve(null);
          console.log(err);
          return;
        }
        resolve(resp);
      })
      .catch((err) => {
        resolve(null);
      });
  });
};

/**  const query_admin_fee = (jargs) => {
  let { contractaddress, actiontype } = jargs;
  let contract;
  contractaddress = contractaddress.toLowerCase();
  if (jcontracts[contractaddress]) {
    contract = jcontracts[contractaddress];
  } else {
    contract = new web3.eth.Contract(abiadmin, contractaddress);
    jcontracts[contractaddress] = contract;
  }
  return new Promise((resolve, reject) => {
    contract.methods
      .query_admin_fee(actiontype)
      .call((err, resp) => {
        if (err) {
          console.log(err);
          resolve(null);
          return;
        }
        resolve(resp);
      })
      .catch((err) => {
        resolve(null);
      });
  });
};*/
const query_eth_balance = (useraddress) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getBalance(useraddress)
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        console.log(err);
        resolve(null);
      });
  });
};
const iszeroaddress = (str) =>
  str == "0x0000000000000000000000000000000000000000";
export {
  getabistr_forfunction,
  query_noarg,
  query_with_arg,
  //  query_admin_fee,
  query_eth_balance,
  iszeroaddress,
};
