// import NodeWalletConnect from "@walletconnect/node";
// import mnemonicwords from "mnemonic-words";
import moment from "moment";
import { networkVersion } from "../configs/configweb3-polygon-testnet";
import { messages } from "../configs/messages";
import { getweirep } from "./contract-calls";
// import momentrandom from "moment-random";
const LOGGER = console.log;
const KEYS = Object.keys;
const ISFINITE = Number.isFinite;
const STRINGER = JSON.stringify;
const PARSER = JSON.parse;

const conv_jdata_arrkeyvalue = (jdata) => {
  if (jdata) {
  } else {
    return [];
  }
  if (KEYS(jdata).length) {
  } else {
    return [];
  }
  return KEYS(jdata).map((elem) => {
    return { key: elem, value: jdata[elem] };
  });
};
const getobjtype = (object) => {
  var stringConstructor = "test".constructor;
  var arrayConstructor = [].constructor;
  var objectConstructor = {}.constructor;
  if (object === null) {
    return "null";
  }
  if (object === undefined) {
    return "undefined";
  }
  if (object.constructor === stringConstructor) {
    return "String";
  }
  if (object.constructor === arrayConstructor) {
    return "Array";
  }
  if (object.constructor === objectConstructor) {
    return "Object";
  }
  return null;
};
const getqueriesspeckey = (key) => {
  let location = window.location.href;
  let atkns = location.split(/\?/);
  if (atkns && atkns[1]) {
    return _getqueriesspeckey_str(atkns[1], key);
  } else {
    return null;
  }
};
const _getqueriesspeckey_str = (str, key) => {
  str = str.replace(/\?/g, "");
  const aargs = str.split("&"); // ;let jdata={} //	aargs.some(e=>{	const atkns=e.split('=');		// jdata[atkns[0]]=atkns[1]
  for (let i in aargs) {
    const atkns = aargs[i].split("=");
    if (atkns[0] == key) {
      return atkns[1];
    }
  }
  return null;
};
const isemailvalid = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
// const getrandomexpiry = (_) => {
//   let timenow = moment().clone();
//   let expiry = momentrandom(moment().add(2, "months"), moment().add(1, "days"));
//   return {
//     calendar: expiry.format("YYYY-MM-DDTHH:mm:ss"),
//     unix: expiry.unix(),
//   };
// };
const conv_arrofpairs_json = (arr) => {
  let jdata = {};
  arr.forEach((elem) => {
    jdata[elem[0]] = elem[1];
  });
  return jdata;
};
const generaterandomstr_charset = (length, charsetcode) => {
  let characters;
  if (charsetcode == "base58") {
    characters = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
  } else if (charsetcode == "numbers") {
    characters = "0123456789";
  } else if (charsetcode == "lower") {
    characters = "abcdefghijklmnopqrstuvwxyz";
  } else if (charsetcode == "hex") {
    characters = "abcdef0123456789";
  } else if (charsetcode == "notconfusing") {
    characters = "2345679BCDEGHKLQSUZadehiopqstu";
  } else {
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  }
  var charactersLength = characters.length;
  let result = "";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  if (charsetcode == "hex") {
    result = "0x" + result;
  } else {
  }
  return result;
};
const getrandomint = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
const generaterandomint = getrandomint;
const getRandomElementsFromArray = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) {
    throw new RangeError("getRandom: more elements taken than available");
  }
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};
// const getrandomwords = (N) => {
//   return getRandomElementsFromArray(mnemonicwords, N);
// };
/**  const getuseraddress_walletconnect = (_) => {
  const walletConnector = new NodeWalletConnect(
    {
      bridge: "https://bridge.walletconnect.org", // Required
    },
    {
      clientMeta: {
        description: "WalletConnect NodeJS Client",
        url: "https://nodejs.org/en/",
        icons: ["https://nodejs.org/static/images/logo.svg"],
        name: "WalletConnect",
      },
    }
  );

  if (walletConnector.connected) {
    return walletConnector._accounts[0];
  } else {
    window.ethereum &&
      window.ethereum.selectedAddress &&
      LOGGER(window.ethereum.selectedAddress);
    return window.ethereum ? window.ethereum.selectedAddress : null;
  }
}; */
const getmyaddress = (_) => {
  /**  const walletConnector = new NodeWalletConnect(
    {
      bridge: "https://bridge.walletconnect.org", // Required
    },
    {
      clientMeta: {
        description: "WalletConnect NodeJS Client",
        url: "https://nodejs.org/en/",
        icons: ["https://nodejs.org/static/images/logo.svg"],
        name: "WalletConnect",
      },
    }
  );

  if (walletConnector.connected) {
    return walletConnector._accounts[0];
  } else { */
  window.ethereum && window.ethereum.selectedAddress && LOGGER(window.ethereum.selectedAddress);
  return window.ethereum ? window.ethereum.selectedAddress : null;
  //  }
};
const MAP_TIME_FORMAT = {
  0: "YYYY-MM-DDTHH:mm:ss",
  1: "YYYY-MM-DD HH:mm:ss",
};
const gettimestr = (val, formatcode) => {
  if (ISFINITE(+formatcode) && MAP_TIME_FORMAT[formatcode]) {
  } else {
    formatcode = 1;
  }
  if (val) {
    return moment(val).format(MAP_TIME_FORMAT[formatcode]);
  } else {
    return moment().format(MAP_TIME_FORMAT[formatcode]);
  }
};
const getdiffindays = (time1, time0) => {
  let diffindays = time1.diff(time0, "days");
  if (diffindays > 0) {
    return diffindays == 1 ? `${diffindays} day ago` : `${diffindays} days ago`;
  } else {
    let diffinhours = time1.diff(time0, "hours");
    return diffinhours == 1 ? `${diffinhours} hour ago` : `${diffinhours} hours ago`;
  }
};
const get_lasttoken_url = (_) => {
  let { href } = window.location;
  return href.substring(href.lastIndexOf("/") + 1);
};
const show_in_exp_form = (number) => {
  if (ISFINITE(+number)) {
  } else {
    return null;
  }
  return (+number).toExponential();
};
const POST_ON_CONFIRM_OR_RECEIPT = 1;
function onclickcopy(copyText) {
  const textArea = document.createElement("textarea");
  document.body.appendChild(textArea);
  //	const copyText = `${url}/${document.location.hash}`;
  textArea.value = copyText;
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  //	SetErrorBar("Link Copied!");
}
function copy_to_clipboard() {
  var copyText = document.getElementById("myInput");
  copyText.select();
  document.execCommand("Copy");
  console.log("Copied!");
};
const setLocalStorage = (key, value) => {
  const date = new Date();

  const item = {
      value: value,
      expiry: date.getTime() + (1 * 24 * 60 * 60 * 1000)
  };
  localStorage.setItem(key, JSON.stringify(item));
};
const getLocalStorage = (key) => {
  const itemStr = localStorage.getItem(key);

  if(!itemStr){
      return;
  }else{
    try{
      return JSON.parse(itemStr);
    }catch{
      return;
    }
  }
};
const getInstallYn = (popupYn, set) => {
  if(!window.ethereum){
    if(set && popupYn){
      set(messages.MSG_ACCESS_AFTER_INSTALL);
      popupYn(true);
    }
    return false;
  }else{
    return true;
  }
};

const getChainId = async () => {
  return await window.ethereum.networkVersion;
} 

const networkYn = async (popupYn, set) => {
  await getChainId()
  .then((res) => {
    console.log(res);
    if(res !== networkVersion){
      if(set && popupYn){
        set("network 안맞음");
        popupYn(true);
      }
      return false;
    }else{
      return true;
    }
  })
  .catch(err => console.log(err));

  // if(window.ethereum.networkVersion !== networkVersion){
  //   console.log(window.ethereum.networkVersion);
  //   console.log(networkVersion);
  //   if(set && popupYn){
  //     set("network 안맞음");
  //     popupYn(true);
  //   }
  //   return false;
  // }else{
  //   return true;
  // }
};

const estimateGasFee = () => {
  let gasFee = 0;
  fetch('https://gasstation-mumbai.matic.today/v2')
  .then(response => response.json())
  .then(json =>{
    console.log("gas fee: ", json);
    gasFee = getweirep("" + json.standard.maxPriorityFee);
    console.log(gasFee);
    return gasFee;
  })
  .catch(err => console.error(err));
};

const floorAmount = (amount) => {
  amount = Number(amount);
  if(amount > 0){
    let temp = amount * 1000;
    let floatTemp = Math.floor(temp);
    return (+(floatTemp /1000)).toFixed(4);
  }else{
    return "0.0000";
  }
};

export {
  floorAmount,
  networkYn,
  getInstallYn,
  setLocalStorage,
  getLocalStorage,
  conv_jdata_arrkeyvalue,
  getobjtype,
  LOGGER,
  ISFINITE,
  STRINGER,
  PARSER,
  isemailvalid,
  // getrandomexpiry,
  KEYS,
  conv_arrofpairs_json,
  generaterandomstr_charset,
  getrandomint,
  generaterandomint,
  getRandomElementsFromArray,
  // getrandomwords,
  getmyaddress, // getuseraddress,
  gettimestr,
  getdiffindays,
  getqueriesspeckey,
  get_lasttoken_url,
  show_in_exp_form,
  POST_ON_CONFIRM_OR_RECEIPT,
  onclickcopy,
  copy_to_clipboard,
  estimateGasFee
};
