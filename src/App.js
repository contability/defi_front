import { useState } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
// import EventListener from "./components/common/EventListener";
import GlobalStyle from "./components/common/globalStyle";
// import Akd from "./routers/finance/Akd";
// import Akg from "./routers/finance/Akg";
// import Swap from "./routers/finance/Swap";
// import GetNfts from "./routers/finance/GetNfts";
// import StakingDetail from "./routers/mine/StakingDetail";
// import Staking from "./routers/mine/Staking";
// import Index from "./routers/Index";
// import Parking from "./routers/mine/Parking";
// import Minting from "./routers/market/Minting";
// import MintingDetail from "./routers/market/MintingDetail";
// import MarketDetailSell from "./routers/market/MarketDetailSell";
// import MarketDetailBuy from "./routers/market/MarketDetailBuy";
// import UnderConst from "./routers/redirects/UnderConst";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setWalletIcon, setWallet } from "./reducers/common";
// import SetErrorBar from "./util/SetErrorBar";
// import { messages } from "./configs/messages";
// import axios from "axios";
// import { net } from "./configs/net";
import FixedRapt from "./routers/FixedRapt";
import VariableRapt from "./routers/VariableRapt";
import Exchanger from "./routers/Exchanger";
import { getLocalStorage, getmyaddress, setLocalStorage } from "./util/common";
import { networkVersion } from "./configs/configweb3-polygon-testnet";
import MessageAlert from "./components/common/MessageAlert";
export default function App() {
  const dispatch = useDispatch();
  const [msgPopup, setMsgPopup] = useState(false);
  const [msg, setMsg] = useState("");
  // const wallet = localStorage.getItem("wallet");
  // const [IS_SERVICE_ON, set_IS_SERVICE_ON] = useState(1);

  // const query_service_available = (_) => {
  //   axios
  //     .get(`https://akfriends.io:31373/queries/singlerow/settings/key_/IS_SERVICE_ON?subvalue_=${net}`)
  //     .then((res) => {
  //       console.log(res);
  //       let { respdata } = res.data;
  //       if (respdata && respdata.value_) {
  //       } else return;
  //       // set_IS_SERVICE_ON(parseInt(respdata.value_));
  //       console.log("IS_SERVICE_ON", res.data.respdata.value_);
  //     });
  // };
  // useEffect(() => {
  //   query_service_available();
  // }, []);

  // useEffect(() => {
  //   dispatch(setWallet(wallet));
  //   console.log("WALLET", wallet);

  //   setTimeout((_) => {
  //     let { ethereum, klaytn } = window;
  //     if (wallet == "metamask" && ethereum && ethereum.selectedAddress) {
  //       let { selectedAddress: address } = ethereum;
  //       dispatch(setAddress({ provider: "", address: address }));
  //       dispatch(setWalletIcon(0));
  //       dispatch(setWallet("metamask"));
  //     } else if (wallet == "klaytn" && klaytn && klaytn.selectedAddress) {
  //       let { selectedAddress: address } = klaytn;
  //       dispatch(setAddress({ provider: "", address: address }));
  //       dispatch(setWalletIcon(1));
  //       dispatch(setWallet("klaytn"));
  //     }
  //   }, 1500);
  // }, []);

  // useEffect(() => {
  //   let {ethereum} = window;
  //   if(!ethereum) return;
  //   ethereum.on("accountsChanged", (accounts) => {
  //     if (accounts.length > 0) {
  //       let PROVIDER = "METAMASK";
  //       console.log("METAMASK CHANGED");
  //       const address = accounts[0];
  //       localStorage.setItem("metamask-address", address);
  //       localStorage.setItem("activeaddress", address);
  //       localStorage.setItem("wallettype", PROVIDER);
  //       dispatch(setAddress({ provider: PROVIDER, address }));
  //       SetErrorBar(messages.MSG_ACCOUNT_CHANGED);
  //       dispatch(setWalletIcon(0));
  //     } else {
  //       localStorage.removeItem("metamask-address");
  //       localStorage.removeItem("activeaddress");
  //       localStorage.removeItem("wallettype");
  //       dispatch(setAddress({ provider: null, address: null }));
  //       SetErrorBar(messages.MSG_WALLET_DISCONNECTED);
  //       dispatch(setWalletIcon(null));
  //     }
  //   });
  // }, [window.ethereum]);

  
  useEffect(()=>{
    let {ethereum} = window;
    if(!ethereum) return;
    
    ethereum.on("accountsChanged", (accounts) => {
      if(accounts.length > 0){
        const address = accounts[0];
        localStorage.setItem("metamask-address", address);
        localStorage.setItem("activeaddress", address);
        dispatch(setWalletIcon(0));
        dispatch(setWallet("metamask"));
        dispatch(setAddress({provider: "metaMask", address}));
        setLocalStorage("wallet", "metamask");
        setLocalStorage("address", address);
      }else{
        localStorage.removeItem("metamask-address");
        localStorage.removeItem("activeaddress");
        localStorage.removeItem("wallet");
        localStorage.removeItem("address");
        dispatch(setAddress({provider: null, address: null}));
        dispatch(setWalletIcon(null));
        dispatch(setWallet(null));
      }
    });
  },[window.ethereum]);

  const expireLocalStorage = () => {
    const expireTime = getLocalStorage("address")?.expiry;
    const now = new Date().getTime();

    if(now > expireTime){
      localStorage.removeItem("wallet");
      localStorage.removeItem("address");
    }else{
      let {ethereum} = window;
      if(!ethereum){
        return;
      }else{
        const address = getLocalStorage("address")?.value;
        const wallet = getLocalStorage("wallet")?.value;
        setLocalStorage("wallet", wallet);
        setLocalStorage("address", address);
      }
    }
  };

  useEffect(() => {
    expireLocalStorage();
  });

  // useEffect(() => {
  //   let { klaytn } = window;
  //   if (klaytn) {
  //   } else {
  //     return; 
  //   }
  //   console.log("KLAYTN CHANGED");
  //   klaytn.on("accountsChanged", (accounts) => {
  //     if (accounts.length > 0) {
  //       let PROVIDER = "KAIKAS";
  //       const address = accounts[0];
  //       localStorage.setItem("kaikas-address", address);
  //       localStorage.setItem("activeaddress", address);
  //       localStorage.setItem("wallettype", PROVIDER);
  //       dispatch(setAddress({ provider: PROVIDER, address }));
  //       SetErrorBar(messages.MSG_ACCOUNT_CHANGED);
  //       dispatch(setWalletIcon(1));
  //     } else {
  //       localStorage.removeItem("kaikas-address");
  //       localStorage.removeItem("activeaddress");
  //       localStorage.removeItem("wallettype");
  //       dispatch(setAddress({ provider: null, address: null }));
  //       SetErrorBar(messages.MSG_WALLET_DISCONNECTED);
  //       dispatch(setWalletIcon(null));
  //     }
  //   });
  // }, [window.klaytn]);

  return (
    <AppBox className="appBox">
      <HashRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<FixedRapt/>}/>
          <Route path="/variableRapt" element={<VariableRapt/>}/>
          <Route path="/exchanger" element={<Exchanger/>}/>
        </Routes>
      </HashRouter>
    </AppBox>
  );
}

const AppBox = styled.div``;
