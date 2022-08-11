import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components-2rem";
import { setAddress, setWallet, setWalletIcon } from "../../reducers/common";
import ConnectWalletPopup from "../popup/ConnectWalletPopup";
import PopupBg from "../common/PopupBg";
import main_logo from "../../assets/main_logo.png";
import planet from "../../assets/planet.png";
import connectWallet from "../../assets/connect_wallet.png";
import I_metamask from "../../assets/metaMask.png";
import SignOutPopup from "../popup/SignOutPopup";
import { getInstallYn, getLocalStorage, getmyaddress, networkYn } from "../../util/common";
import { getethrep, query_noarg } from "../../util/contract-calls";
import { addresses } from "../../configs/addresses";
import MessageAlert from "../common/MessageAlert";

export default function DefaultHeader({ opt, con }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.common.isMobile);
  // const address = useSelector((state) => state.common.address);
  const address = getLocalStorage("address")?.value;
  // const [address, setAddress] = useState("");
  const walletIcon = useSelector((state) => state.common.walletIcon);

  const [tvl, setTvl] = useState((+0).toFixed(4));
  const [connectWalletPopup, setConnectWalletPopup] = useState(false);
  const [signOutPopup, setSignoutPopup] = useState(false);
  const [walletStatus, setWalletStatus] = useState("");
  const wallet = useSelector((state) => state.common.wallet);
  const [msgPopup, setMsgPopup] = useState(false);
  const [msg, setMsg] = useState("");

  // useEffect(() => {
  //   setAddress(getLocalStorage("address")?.value);
  // }, [address]);

  useEffect(() => {
    const isInstall = getInstallYn();
    if (!isInstall) return;

    getTvl();
    setUserInfo();
  },[]);

  useEffect(() => {
    if (window.ethereum) {
      console.log("eth : ", window.ethereum);
      console.log("networkversion : ", window.ethereum.networkVersion);
    }
  }, [wallet]);

  const awaitWallet = () => {
    let myaddress = getmyaddress();
    setTimeout(() => {
      if (myaddress) {
        return;
      } else {
        setWalletStatus("Connect Wallet");
      }
    }, 1600);
    setWalletStatus("Connecting...");
  };

  // const switchNetwork = async () => {
  //   let { ethereum, klaytn } = window;
  //   if (ethereum && wallet == "metamask") {
  //     await window.ethereum
  //       .request({
  //         id: 1,
  //         jsonrpc: "2.0",
  //         method: "wallet_switchEthereumChain",
  //         params: [
  //           {
  //             chainId: Web3.utils.toHex(8217),
  //           },
  //         ],
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         setmainnet(true);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else if (klaytn && wallet == "klaytn") {
  //     await window.klaytn.sendAsync({
  //       // id: 1,
  //       jsonrpc: "2.0",
  //       method: "wallet_switchKlaytnChain",
  //       params: [
  //         {
  //           chainId: Web3.utils.toHex(8217),
  //         },
  //       ],
  //     });
  //     // .then((res) => {
  //     //   console.log(res);
  //     //   setmainnet(true);
  //     // })
  //     // .catch((err) => {
  //     //   console.log(err);
  //     // });
  //   }
  // };

  // const spinnerRef = useRef();
  // useEffect(() => {
  //   if (!spinner) return;
  //   spinnerRef.current.animate(
  //     [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
  //     {
  //       duration: 1400,
  //       iterations: Infinity,
  //     }
  //   );
  // }, [spinner]);

  // if (isMobile)
  //   return (
  //     <>
  //       <MdefaultHeader>
  //         <button className="logoBtn" onClick={() => navigate("/")}>
  //           <img src={L_ak} alt="" />
  //           {spinner && <img src={I_spinnerPurple} alt="" ref={spinnerRef} />}
  //         </button>

  //         <button className="moreBtn" onClick={() => setMmorePopup(true)}>
  //           <img src={I_hamburger} alt="" />
  //         </button>
  //       </MdefaultHeader>

  //       {mMorePopup && <MmorePopup off={setMmorePopup} />}
  //     </>
  //   );
  // else

  function getTvl() {
    query_noarg({
      contractaddress: addresses.STAKER_SERVER_RELIANT,
      abikind: "STAKER_SERVER_RELIANT",
      methodname: "_tvl",
    }).then((res) => {
      let temp = getethrep("" + res);
      setTvl((+temp).toFixed(4));
    });
  }

  function setUserInfo() {
    const address = getLocalStorage("address")?.value;

    if (address) {
      dispatch(setWalletIcon(0));
      dispatch(setWallet("metamask"));
      dispatch(setAddress({ provider: "metaMask", address }));
    }
  }

  return (
    <>
      <PdefaultHeader>
        <article className="logoBox">
          <div className="divLogo">
            <button className="logoBtn" onClick={() => navigate("/")}>
              <img src={main_logo} alt="mainLogo" />
            </button>
            <p className="nftnBox">
              <span className="s_nftn">NFTN</span>
              <span className="l_nftn">BICOSWAP</span>
            </p>
          </div>
          {/* {spinner && <img src={I_spinnerPurple} alt="" ref={spinnerRef} />} */}
          {/* {spinner && <img src={I_spinnerPurple} alt="" />} */}
        </article>
        <nav>
          <ul>
            <li>
              <img className="planet" src={planet} alt="" />
            </li>
            {/* <li>
                $0.56

                aaaaaaaaaaaaaa
              </li>
              <li>
                <img src={line_1} alt="" />
              </li> */}
            <li>TVL</li>
            <li>{tvl}</li>
            <li>
              {/* {opt ? 
                (<button onClick={()=>setConnectWalletPopup(true)}>
                  <img className="connWallet" src={wrongNetwork} alt="" />
                </button>
                )
                :
                (<button onClick={()=>setConnectWalletPopup(true)}>
                  <img className="connWallet" src={connectWallet} alt="" />
                </button>
                )} */}
              {address ? (
                <button
                  className="metamaskInfo"
                  onClick={() => setSignoutPopup(true)}
                >
                  {walletIcon === 0 && (
                    <img className="metamaskIcon" src={I_metamask} alt="" />
                  )}
                  <span>
                    {address.substr(0, 10)}...
                  </span>
                </button>
              ) : (
                <button onClick={() => setConnectWalletPopup(true)}>
                  <img className="connWallet" src={connectWallet} alt="" />
                </button>
              )}
            </li>
          </ul>

          {/* {D_navList.map((cont, index) => (
              <li
                key={index}
              >
                <p className="cover">{cont.cover}</p>

                <ul className="navPopup">
                  {cont.detail.map((detCont, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        localStorage.setItem("page", detCont.url);
                        navigate(detCont.url);
                      }}
                    >
                      {detCont.text}
                    </li>
                  ))}
                </ul>
              </li>
            ))} */}
          {/* <li
              className="direct"
              onClick={() => {
                localStorage.setItem("page", "/assets");
                navigate("/assets");
              }}
            >
              <p className="cover">My assets</p>
            </li> */}
        </nav>

        {/* <article className="walletBox">
            <ul className="tokenList">
              <li className="akd">
                <p className="key">AKD</p>
                <p className="value">$1.0</p>
              </li>
              <li className="akg">
                <p className="key">AKG</p>
                <p className="value">$1.4</p>
              </li>
            </ul>

            {!mainnet && (
              <button className="networkBtn" onClick={switchNetwork}>
                Set network
              </button>
            )}

            {address ? (
              <div className="addressBtn_wrap">
                <button className="addressBtn" onClick={onClickAddressBtn}>
                  <p>{strDot(address, 4, 4)}</p>
                </button>
                {icon == 0 && (
                  <img height="38px" width="38px" src={Metamask_icon} alt="" />
                )}
                {icon == 1 && (
                  <img height="38px" width="38px" src={Klaytn_icon} alt="" />
                )}
              </div>
            ) : (
              <button
                className="connectBtn"
                onClick={() => setConnectWalletPopup(true)}
              >
                <p>Connect Wallet</p>
              </button>
            )}
          </article> */}
      </PdefaultHeader>

      {connectWalletPopup && (
        <>
          <ConnectWalletPopup off={setConnectWalletPopup} />
          <PopupBg blur={true} off={setConnectWalletPopup} />
        </>
      )}

      {signOutPopup && (
        <>
          <SignOutPopup off={setSignoutPopup} set={opt} con={con} />
          <PopupBg blur={true} off={setSignoutPopup} />
        </>
      )}

      {msgPopup && (
        <>
          <MessageAlert off={setMsgPopup} msg={msg} />
          <PopupBg blur={true} off={setMsgPopup} />
        </>
      )}
    </>
  );
}

const PdefaultHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 11.32%;
  // padding: 0 30px;
  padding: 2% 0 2% 2%;
  color: #fff;
  top: 0;
  right: 0;
  left: 0;
  // position: fixed;
  z-index: 3;

  & > * {
    flex: 1;
  }

  .divLogo {
    display: flex;
    gap: 11px;
  }

  .nftnBox {
    display: flex;
    flex-direction: column;
    padding-top: 5px;
  }

  .logoBtn {
    .logo {
      width: 50px;
      height: 50px;
      margin: 0 10px 70px 30px;
      border-radius: 6px;
      background-color: #fff;
    }
  }

  .s_nftn {
    width: 35px;
    height: 16px;
    font-size: 12px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1.2px;
    text-align: left;
    color: #fff;
  }

  .l_nftn {
    width: 74px;
    height: 30px;
    font-size: 22px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 4.4px;
    text-align: center;
    color: #fff;
  }

  ul {
    display: flex;
    // justify-content: center;
    justify-content: flex-end;
    padding-left: 14%;
    align-items: center;
    gap: 8px;

    & > li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 42px;
      position: relative;
      font-family: Poppins;
      font-size: 16px;
      color: #fff;

      .planet {
        width: 32px;
        height: 32px;
        margin: 0 8px 0 0;
        border-radius: 300px;
      }

      .connWallet {
        width: 162px;
        height: 40px;
        object-fit: contain;
        border-radius: 30px;
        -webkit-backdrop-filter: blur(40px);
        backdrop-filter: blur(40px);
        background-color: rgba(255, 255, 255, 0.1);
      }

      .wrongNetwork {
        width: 162px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border: 1.2px solid #ff6b65;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(40px);
        border-radius: 30px;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        letter-spacing: -0.04em;
        color: #ff6b65;
      }

      &:hover {
        .cover {
          text-shadow: 0px 0px 10px rgba(255, 255, 255, 0.67);
        }

        .navPopup {
          display: flex;
        }
      }

      .metamaskInfo {
        width: 152px;
        height: 40px;
        background: rgba(0, 0, 0, 0.14);
        backdrop-filter: blur(20px);
        border-radius: 30px;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-align: center;
        letter-spacing: -0.04em;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;

        .metamaskIcon {
          width: 24px;
          height: 24px;
        }
      }

      &.direct {
        cursor: pointer;
      }

      .cover {
        font-size: 18px;
        line-height: 22px;
        font-weight: 500;
      }

      .navPopup {
        display: none;
        flex-direction: column;
        gap: 12px;
        padding: 16px 26px;
        background: #2d2829;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        border-radius: 8px;
        top: 42px;
        position: absolute;

        li {
          font-size: 18px;
          font-weight: 500;
          color: #f5c3dc;
          text-align: center;
          white-space: nowrap;
          cursor: pointer;
        }
      }
    }

    // & > li:nth-child(4){
    //   color: rgba(255, 255, 255, 0.6);
    // }

    // & > li:nth-child(6){
    //   padding-left: 20px;
    // }

    & > li:nth-child(2) {
      color: rgba(255, 255, 255, 0.6);
    }

    & > li:nth-child(4) {
      padding-left: 20px;
    }
  }

  .walletBox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 30px;

    .tokenList {
      display: flex;
      align-items: center;
      gap: 18px;

      li {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 18px;
        font-weight: 500;
      }
    }

    .addressBtn_wrap {
      display: flex;
      height: 100%;
      width: 100%;
      align-items: center;
      justify-content: space-between;
    }

    .addressBtn {
      width: 154px;
      height: 44px;
      font-size: 18px;
      font-weight: 500;
      color: #f5c3dc;
      background: #2c1019;
      border-radius: 30px;
    }

    .networkBtn {
      width: 290px;
      height: 44px;
      font-size: 18px;
      font-weight: 500;
      color: #f5c3dc;
      background: #2c1019;
      border-radius: 30px;
    }

    .connectBtn {
      width: 170px;
      height: 44px;
      font-size: 18px;
      font-weight: 500;
      background: rgba(0, 0, 0, 0.1);
      border: 1.4px solid #f5c3dc;
      border-radius: 30px;

      p {
        background: linear-gradient(
          to right,
          rgba(245, 195, 220, 100),
          rgba(245, 195, 220, 80) 40%,
          rgba(245, 195, 220, 0)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
`;
