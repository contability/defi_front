import DefaultHeader from "../components/header/DefaultHeader";
import styled, { keyframes } from "styled-components-2rem";
// import styled, {keyframes} from 'styled-px2rem';
import LeftBar from "../components/common/LeftBar";
import main_background from "../assets/main_background.png";
import { useEffect, useState } from "react";
import PopupBg from "../components/common/PopupBg";
import { getInstallYn, getLocalStorage, getmyaddress } from "../util/common";
import { useSelector } from "react-redux";
import {
  getabistr_forfunction,
  getethrep,
  query_with_arg,
  getweirep,
  query_noarg,
} from "../util/contract-calls";
import axios from "axios";
import { API } from "../configs/api";
import { net } from "../configs/net";
import ExchangePopup from "../components/popup/ExchangePopup";
import MessageAlert from "../components/common/MessageAlert";
import { messages } from "../configs/messages";
import Footer from "../components/footer/Footer";

export default function Exchanger() {
  const wallet = useSelector((state) => state.common.wallet);
  const address = useSelector((state) => state?.common?.address);

  const [xchgRateList, setXchgRateList] = useState([]);
  const [xchgRatePopup, setXchgRatePopup] = useState(false);
  const [selectItem, setSelectItem] = useState({});

  const [msgAlert, setMsgAlert] = useState(false);
  const [msg, setMsg] = useState("");

  const chkLogin = (msg) => {
    const isWallet = getLocalStorage("wallet")?.value;
    const isAddress = getLocalStorage("address")?.value;
    if (!isWallet || !isAddress) {
      if (msg) {
        setMsgAlert(true);
        setMsg(msg);
      }
      return false;
    } else {
      return true;
    }
  };

  function xchgrates() {
    axios.get(API.API_EXCHANGE_RATE+`?nettype=${net}`).then(({ data }) => {
      
      setXchgRateList([...data.list]);
    });
  }

  function fetchXchgPopup(item) {
    let myAddress = getmyaddress(wallet);

    const isChked = chkLogin(messages.MSG_PLEASELOGIN);
    if (!isChked) return;

    setSelectItem(item);
    setXchgRatePopup(true);
  }

  useEffect(() => {
    xchgrates();

    const isInstall = getInstallYn(setMsgAlert, setMsg);
    if(!isInstall) return;
  }, []);

  return (
    <Pexchanger>
      <img className="backgroundImg" src={main_background} alt="" />
      <main>
        <DefaultHeader />
        <div className="mainArea">
          <LeftBar />
          <article className="content">
            <strong className="contentTitle">Exchanger</strong>
            <span className="subtitle">
                Earn fees and rewards by depositing and staking your tokens to the platform.
            </span>
            <div className="boxes">
              <section>
                <div className="sectionHeader tableItem">
                  symbol exchange_rate
                </div>
                <div className="sectionBody">
                  <p className="tableHeader">
                    <span className="tableItem">Symbol</span>
                    <span className="tableItem">Rate</span>
                  </p>
                  <p className="tableBody">
                    {xchgRateList.map((item, i) => (
                      <div className="tableData" key={item.id}>
                        <span className="tokenTitle tableItem">
                          {item.tokensymbol0}
                        </span>
                        <span className="exchangeRate tableItem">
                          {item.amount0}&nbsp;:&nbsp;{item.amount1}
                        </span>
                        <span className="tableItem">
                          <button
                            className="exchangeBtn"
                            onClick={() => fetchXchgPopup(item)}
                          >
                            EXCHANGE
                          </button>
                        </span>
                      </div>
                    ))}
                  </p>
                </div>
              </section>
            </div>
            <Footer/>
          </article>
        </div>
      </main>

      {xchgRatePopup && (
        <>
          <ExchangePopup off={setXchgRatePopup} props={selectItem} />
          <PopupBg blur={true} off={setXchgRatePopup} />
        </>
      )}

      {msgAlert && (
        <>
          <MessageAlert off={setMsgAlert} msg={msg} />
          <PopupBg blur={true} off={setMsgAlert} />
        </>
      )}
    </Pexchanger>
  );
}

const Pexchanger = styled.div`
  width: 100%;
  height: 100%;
  // position: fixed;
  background-color: #000000;
  font-size: 10px;

  .backgroundImg {
    width: 100%;
    height: 100%;
    background-size: cover;
    position: fixed;
  }

  main {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    padding-right: 17%;

    .mainArea {
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      // padding-right: 20.5%
    }
  }

  .content {
    display: flex;
    // position: fixed;
    top: 100px;
    left: 8%;
    width: 100%;
    height: 100%;
    flex-direction: column;
    gap: 10px;
    padding: 2% 0 2% 13%;

    .subtitle {
      font-family: Poppins;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -0.28px;
      text-align: left;
      color: rgba(255, 255, 255, 0.7);
    }

    .boxes {
      height: 100%;
      min-height: 417.188px;
      min-height: 413.102px;
      display: flex;
      flex-wrap: nowrap;
      gap: 24px;
      padding-top: 25px;
    }
  }

  .contentTitle {
    font-family: Poppins;
    font-size: 30px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.6px;
    color: #fff;
  }

  section {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 0px 14px rgba(0, 0, 0, 0.14);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10%;
    width: 100%;
    height: 100%;
    padding: 1.5% 3%;

    .sectionHeader {
      font-family: Poppins;
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -0.36px;
      color: #fff;
      // height: 30%;
    }

    // .sectionBody{
    //   height: 70%;
    //   display: flex;
    //   flex-direction: column;
    //   gap: 8%;

    //   .exchangePanel{
    //     display: flex;
    //     justify-content: space-evenly;
    //     align-items: center;
    //     padding: 0px 10%;
    //     gap: 10%;

    //     .tokenTitle{
    //       font-family: Poppins;
    //       font-size: 16px;
    //       font-weight: 500;
    //       font-stretch: normal;
    //       font-style: normal;
    //       line-height: normal;
    //       letter-spacing: -0.32px;
    //       color: #fff;
    //       width: 33.3%;
    //       text-align: center;

    //     }
    //     .exchangeRate{
    //       width: 100%;
    //       height: 34px;
    //       object-fit: contain;
    //       border-radius: 30px;
    //       border: solid 1px #fff;

    //       font-family: Poppins;
    //       font-size: 16px;
    //       font-weight: 500;
    //       font-stretch: normal;
    //       font-style: normal;
    //       line-height: 2;
    //       letter-spacing: -0.32px;
    //       color: #fff;
    //       width: 33.3%;
    //       text-align: center;

    //     }
    //     .exchangeBtn{
    //       width: 100%;
    //       height: 34px;
    //       object-fit: contain;
    //       border-radius: 30px;
    //       border: solid 1px #fff;

    //       font-family: Poppins;
    //       font-size: 16px;
    //       font-weight: 500;
    //       font-stretch: normal;
    //       font-style: normal;
    //       line-height: normal;
    //       letter-spacing: -0.32px;
    //       color: #fff;
    //       width: 33.3%;
    //     }
    //   }

    .sectionBody {
      height: 70%;
      display: flex;
      flex-direction: column;

      .tableHeader {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: -0.02em;
        color: rgba(255, 255, 255, 0.5);
        border-bottom: 1px solid #ffffff;
        display: flex;
        height: 8%;
      }

      .tableItem {
        width: 33.3%;
        text-align: center;
      }

      .tableBody {
        display: flex;
        flex-direction: column;

        .tableData {
          font-family: "Poppins";
          font-style: normal;
          font-weight: 400;
          font-size: 17px;
          line-height: 21px;
          /* identical to box height */
          display: flex;
          align-items: center;
          letter-spacing: -0.02em;
          color: #ffffff;
          border-bottom: 1px solid #83999f;
          padding: 1% 0;

          // .tokenTitle{
          //   width: 33.3%;
          //   text-align: center;
          // }

          // .exchangeRate{
          //   width: 33.3%;
          //   text-align: center;
          // }

          .exchangeBtn {
            width: 100%;
            height: 34px;
            object-fit: contain;
            border-radius: 30px;
            border: solid 1px #fff;

            font-family: Poppins;
            font-size: 16px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: -0.32px;
            color: #fff;
            width: 42.3%;
          }
        }
      }
    }
  }

  .assetsHeader {
    border-bottom: 1px solid #fff;
    padding: 0 8px 10px 8px;
  }

  .assetsData {
    border-bottom: 1px solid #83999f;
    padding: 14px 8px 10px 8px;
  }

  .assetsData:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .circle {
    width: 28px;
    height: 28px;
  }
`;
