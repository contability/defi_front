import awaitTransactionMined from "await-transaction-mined";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled, { keyframes } from "styled-components-2rem";
import closeBtn from "../../assets/closeBtn.png";
import loading from "../../assets/loading.png";
import { addresses } from "../../configs/addresses";
import { API } from "../../configs/api";
import {
  ITEM_PRICE_DEF,
  MAX_GAS_LIMIT,
  TX_POLL_OPTIONS,
} from "../../configs/configs";
import { web3 } from "../../configs/configweb3";
import { net } from "../../configs/net";
import { requestTransaction } from "../../services/metamask";

import { getmyaddress } from "../../util/common";
import {
  getabistr_forfunction,
  getethrep,
  query_with_arg,
} from "../../util/contract-calls";
import arrowRight from "../../assets/ArrowRight.png";
import token from "../../assets/token.png";
import { messages } from "../../configs/messages";
import MessageAlert from "../common/MessageAlert";
import PopupBg from "../common/PopupBg";

export default function ExchangePopup({ off, props }) {
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);
  const [fromTokenRate, setFromTokenRate] = useState(props.amount0);
  const [toTokenRate, setToTokenRate] = useState(props.amount1);
  const [fromTokenAddress, setFromTokenAddress] = useState(props.tokenaddress0);
  const [toTokenAddress, setToTokenAddress] = useState(props.tokenaddress1);
  const [fromTokenSymbol, setFromTokenSymbol] = useState(props.tokensymbol0);
  const [toTokenSymbol, setToTokenSymbol] = useState(props.tokensymbol1);
  const [urFromBalance, setUrFromBalance] = useState(0);
  const [adminAddress, setAdminAddress] = useState("");
  const [adminFeeRate, setAdminFeeRate] = useState(0);

  const [spinner, setSpinner] = useState(false);
  const [allowanceAmount, setAllowanceAmount] = useState(0);

  const [msg, setMsg] = useState("");
  const [msgAlert, setMsgAlert] = useState(false);

  const wallet = useSelector((state) => state.common.wallet);
  let myAddress = getmyaddress(wallet);

  function setApprove() {
    setSpinner(true);
    if (!myAddress) return;

    let abiString = getabistr_forfunction({
      contractaddress: fromTokenAddress,
      abikind: "ERC20",
      methodname: "approve",
      aargs: [
        addresses.EXCHANGER,
        String(Number(10 ** 12 * 10 ** 18).toLocaleString("fullwide", {useGrouping: false})),
      ],
    });

    requestTransaction(
      {
        from: myAddress,
        to: fromTokenAddress,
        data: abiString,
        value: "0x00",
        gas: MAX_GAS_LIMIT,
      },
      wallet
    ).then((res) => {
      console.log("xchg approve result : ", res);
      if (res && !res.code) {
        awaitTransactionMined
          .awaitTx(web3, res, TX_POLL_OPTIONS)
          .then(async (minedTxReceipt) => {
            getAllowance();
            setSpinner(false);
          });
      } else {
        if(res.code !== 4001){
          setMsg(messages.MSG_CHAIN_ERR);
          setMsgAlert(true);
        }
        console.error(res);
        setSpinner(false);
      }
    });
  }

  function getAllowance() {
    if (!myAddress) return;

    query_with_arg({
      contractaddress: fromTokenAddress,
      abikind: "ERC20",
      methodname: "allowance",
      aargs: [myAddress, addresses.EXCHANGER],
    }).then((res) => {
      if (res) {
        console.log("allowance is : ", res);
        let temp = getethrep("" + res);
        setAllowanceAmount((+temp).toFixed(4));
      }
    });
  }

  function exchange() {
    setSpinner(true);
    if (!myAddress) return;

    let abiString = getabistr_forfunction({
      contractaddress: addresses.EXCHANGER,
      abikind: "EXCHANGER",
      methodname: "exchange",
      aargs: [
        fromTokenAddress,
        toTokenAddress,
        fromTokenRate,
        String(
          Number(fromAmount * 10 ** 18).toLocaleString("fullwide", {
            useGrouping: false,
          })
        ),
        String(
          Number(toAmount * 10 ** 18).toLocaleString("fullwide", {
            useGrouping: false,
          })
        ),
        myAddress,
        adminAddress,
        adminFeeRate,
      ],
    });

    requestTransaction(
      {
        from: myAddress,
        to: addresses.EXCHANGER,
        data: abiString,
        value: "0x00",
        gas: MAX_GAS_LIMIT,
      },
      wallet
    )
      .then((res) => {
        if (res && !res.code) {
          let txhash;
          if (wallet == "metamask") {
            txhash = res;
          }

          awaitTransactionMined
            .awaitTx(web3, txhash, TX_POLL_OPTIONS)
            .then(async (minedTxReceipt) => {
              console.log(minedTxReceipt);
              if(!minedTxReceipt.status){
                console.log(res?.message);
                setMsg(messages.MSG_CHAIN_ERR);
                setMsgAlert(true);
              }else{
                console.log("exchange report : ", minedTxReceipt);
                off();
              }
              setSpinner(false);
              getBalance();
              // off();
            });
        } else {
          if(res.code !== 4001){
            setMsg(messages.MSG_CHAIN_ERR);
            setMsgAlert(true);
          }
          console.error(res);
          setSpinner(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setSpinner(false);
      });
  }

  function getBalance() {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) return;

    query_with_arg({
      contractaddress: fromTokenAddress,
      abikind: "ERC20",
      methodname: "balanceOf",
      aargs: [myAddress],
    }).then((res) => {
      let temp = getethrep("" + res);
      setUrFromBalance((+temp).toFixed(4));
    });
  }

  const getAdminFeeRate = () => {
    axios
      .get(API.API_GET_SETUP + `?filterkey=nettype&filterval=${net}&nettype=${net}`)
      .then((res) => {
        if (res) {
          let list = res.data.list;
          list.map((item, i) => {
            switch(item.key_){
              case "FEE_EXCHANGE":
                setAdminFeeRate(item.value_);
                break;
              case "SALES_ACCOUNT_ADDRESS":
                setAdminAddress(item.value_);
                break;
              default :
                break;
            }
          });
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getBalance();
    getAllowance();
    getAdminFeeRate();
  }, []);

  useEffect(() => {
    setToAmount(fromAmount * toTokenRate);
  }, [fromAmount]);

  return (
    <PexchangePopup>
      <header>
        <span className="titleTab">
          <span className="titleOn">Exchange</span>
        </span>
        <span className="clsBtnWrap" onClick={() => off()}>
          <img className="clsBtn" src={closeBtn} alt="" />
        </span>
      </header>
      <span className="fromTo">
        <img src={props.tokenimageurl0 || token} alt="" />
        {/* <span style={{color:"white"}}>{"->"}</span> */}
        <img style={{ height: "50%", width: "20%" }} src={arrowRight} alt="" />
        <img src={"http://stakenftn.net/assets/NFTN.png"} alt="" />
      </span>
      <article className="contentArea">
        <p className="amount">
          <span>FROM AMOUNT</span>
          <span className="amountValue">
            <input
              className={parseFloat(fromAmount) > 0 ? "validValue" : ""}
              type="number"
              placeholder={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              max="999999"
              step="0.01"
            />
            {/* <button className="maxBtn" onClick={() => setAmount(1)}>
                            MAX
                        </button> */}
          </span>
        </p>
        <span className="nftn">
          {`${fromTokenRate} ${fromTokenSymbol} : ${toTokenRate}`}
        </span>
        <p className="amount">
          <span>TO AMOUNT</span>
          <span className="amountValue">
            <input
              className={parseFloat(toAmount) > 0 ? "validValue" : ""}
              type="number"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              max="999999"
              step="0.01"
              readOnly="readonly"
            />
            {/* <button className="maxBtn" onClick={() => setAmount(1)}>
                            MAX
                        </button> */}
          </span>
        </p>
        <p className="amount">
          <span>YOUR FROM BALANCE</span>
          <span className="amountValue">
            <input
              className={parseFloat(urFromBalance) > 0 ? "validValue" : ""}
              type="number"
              value={urFromBalance}
              onChange={(e) => setUrFromBalance(e.target.value)}
              max="999999"
              step="0.01"
              readOnly="readonly"
            />
            {/* <button className="maxBtn" onClick={() => setAmount(1)}>
                            MAX
                        </button> */}
          </span>
        </p>
      </article>
      <footer>
        {parseFloat(allowanceAmount) < 10000 ? (
          spinner ? (
            <button className="cnfrmBtn" disabled>
              <img src={loading} alt="" className="spinner" />
            </button>
          ) : (
            <button className="cnfrmBtn" onClick={setApprove}>
              Approve
            </button>
          )
        ) : parseFloat(fromAmount) < parseFloat(urFromBalance) ? (
          spinner ? (
            <button className={"cnfrmBtn"} disabled>
              <img src={loading} alt="" className="spinner" />
            </button>
          ) : (
            <button className={"cnfrmBtn"} onClick={exchange}>
              Exchange
            </button>
          )
        ) : (parseFloat(allowanceAmount) < parseFloat(fromAmount) ? (
            <button className="cntCnfrmBtn" disabled>
            exceeds allowance
          </button>
        ) : (
            <button className="cntCnfrmBtn" disabled>
            balance not enough
          </button>
        )
        ) 
        }
      </footer>
      {msgAlert && (
        <>
          <MessageAlert off={setMsgAlert} msg={msg} />
          <PopupBg blur={true} off={setMsgAlert} />
        </>
      )}
    </PexchangePopup>
  );
}

const PexchangePopup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  height: 470px;
  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 6;
  background: #252422;
  border-radius: 20px;
  gap: 31px;
  padding-bottom: 27px;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 27px 34.75px 0 34.75px;

    .titleTab {
      display: flex;
      width: 99px;
      justify-content: space-between;
      gap: 20px;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      align-items: center;
      letter-spacing: -0.02em;
      color: rgba(255, 255, 255, 0.4);

      .titleOn {
        font: Poppins;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #ffffff;
      }
    }
  }

  .fromTo {
    height: 7%;
    display: flex;
    justify-content: space-between;
    width: 37%;
    align-items: center;

    img {
      height: 100%;
    }
  }

  .clsBtnWrap {
    cursor: pointer;
  }

  .clsBtn {
    width: 16.5px;
    height: 16.5px;
  }

  .contentArea {
    width: 84%;
    height: 52%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    align-items: center;

    & > p:hover {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #ffffff;
    }

    .amount {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      height: 26%;
      background: #171717;
      border: 1px solid #171717;
      border-radius: 12px;
      padding: 0 5%;
      align-items: center;

      & > span:first-child {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 36px;
        // text-align: center;
        color: #ffffff;
      }

      .amountValue {
        // display: flex;
        // flex-direction: row;
        // align-items: center;
        // gap: 14px;
        font-family: "Kanit";
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 36px;
        text-align: center;
        color: rgba(255, 255, 255, 0.4);
        width: 53% // padding-right: 25px;

          & > input {
          text-align: right;
          width: 72%;
        }
      }

      .validValue {
        font-family: "Kanit";
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 36px;
        text-align: right;
        color: #ffffff;
      }

      .maxBtn {
        box-sizing: border-box;
        width: 60px;
        height: 34px;
        border: 1px solid #ffffff;
        backdrop-filter: blur(40px);
        border-radius: 30px;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 21px;
        text-align: center;
        letter-spacing: -0.02em;
        color: #ffffff;
      }

      .maxBtn:hover {
        box-shadow: 0px 0px 14px;
      }
    }

    .nftn {
      width: 372px;
      height: 21px;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      align-items: center;
      text-align: center;
      letter-spacing: -0.02em;
      color: #ffffff;
      text-align: right;
      padding-bottom: 30px;
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 11%;
    width: 84%;

    .cnfrmBtn {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      background-color: #fff;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      align-items: center;
      text-align: center;
      color: #000000;
    }

    .cntCnfrmBtn {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      background-color: #fff;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      align-items: center;
      text-align: center;
      color: rgba(0, 0, 0, 0.2);
    }

    .cntCnfrmBtn:hover {
      cursor: not-allowed;
    }

    @keyframes rotate_img {
      100% {
        transform: rotate(360deg);
      }
    }

    .spinner {
      animation: rotate_img 1s ease-in-out infinite;
      transform-origin: 50% 50%;
    }
  }
`;
