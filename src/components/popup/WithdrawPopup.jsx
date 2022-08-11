import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components-2rem";
import closeBtn from "../../assets/closeBtn.png";
import planet from "../../assets/planet.png";
import loading from "../../assets/loading.png";
import { getmyaddress } from "../../util/common";
import {
  getabistr_forfunction,
  getethrep,
  query_with_arg,
} from "../../util/contract-calls";
import { addresses } from "../../configs/addresses";
import { requestTransaction } from "../../services/metamask";
import { useSelector } from "react-redux";
import { web3 } from "../../configs/configweb3";
import { appver, MAX_GAS_LIMIT, TX_POLL_OPTIONS } from "../../configs/configs";
import awaitTransactionMined from "await-transaction-mined";
import axios from "axios";
import { net } from "../../configs/net";
import { API } from "../../configs/api";
import MessageAlert from "../common/MessageAlert";
import PopupBg from "../common/PopupBg";
import { messages } from "../../configs/messages";

export default function WithdrawPopup({ off, con, maxVal, isFixed }) {
  const wallet = useSelector((state) => state.common.wallet);
  const address = useSelector((state) => state.common.address);
  const [amount, setAmount] = useState(0);
  const [isMint, setIsMint] = useState(true);

  const [isInput, setIsInput] = useState(true);
  const [isCntInput, setIsCntInput] = useState(false);
  const [isBalance, setIsBalance] = useState(false);
  const [isApprove, setIsApprove] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allowanceValue, setAllowanceValue] = useState(0);

  const [msgAlert, setMsgAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [statusMsg, setStatusMsg] = useState(""); 

  const withdraw = async () => {
    let myAddress = getmyaddress(wallet);

    setIsLoading(true);

    const planType = isFixed ? "FIXED" : "VARIABLE";

    if (isFixed) {
      const abiString = getabistr_forfunction({
        contractaddress: addresses.STAKE_AND_REWARD,
        abikind: "STAKE_AND_REWARD",
        methodname: "withdraw",
        aargs: [
          addresses.DEPOSIT00,
          String(Number(amount * 10 ** 18).toLocaleString("fullwide", {useGrouping: false})),
          // String(Number(4 * 10 ** 18).toLocaleString("fullwide", {useGrouping: false})),
          myAddress,
        ],
      });

      requestTransaction(
        {
          from: myAddress,
          to: addresses.STAKE_AND_REWARD,
          data: abiString,
          value: "0x00",
          gas: MAX_GAS_LIMIT,
        },
        wallet
      ).then((res) => {
        console.log(res);
        // if (res && res.code !== 4001 && !res.message) {
        if (res && !res.code) {

          let txhash;
          if (wallet == "metamask") {
            txhash = res;
          }

          awaitTransactionMined
            .awaitTx(web3, txhash, TX_POLL_OPTIONS)
            .then(async (minedTxReceipt) => {
              console.log("minedTxReceipt : ", minedTxReceipt);
              con(true);
              setIsLoading(false);
              off();
            })
            .catch(err => console.error(err));

          axios
            .post(API.API_TXS + `/${txhash}?nettype=${net}&plantype=${planType}`, {
              txhash: txhash,
              username: myAddress,
              typestr: "WITHDRAW",
              nettype: net,
              amount: String(Number(amount * 10 ** 18).toLocaleString("fullwide", {useGrouping: false})),
              auxdata: {
                user_action: "WITHDRAW",
                contract_type: "STAKE_AND_REWARD",
                contract_address: addresses.STAKE_AND_REWARD,
                to_token_contract: addresses.REWARD00,
                my_address: myAddress,
                gas: MAX_GAS_LIMIT,
                appver,
                nettype: net,
              },
            })
            .then((res) => {
              if(res && res.data.code === 1){
                console.log("Withdraw Report : ", res);
                off();
              }else{
                setIsLoading(false);
                setMsg(messages.MSG_CHAIN_ERR);
                setMsgAlert(true);
                // console.error(res?.message);
              }
              con(true);
            });
        } else {
          if(res.code !== 4001){
            setMsg(messages.MSG_CHAIN_ERR);
            setMsgAlert(true);
          }
          console.error(res);
          setIsLoading(false);
        }
      })
      .catch(err => console.log(err));
    } else {
      const abiString = getabistr_forfunction({
        contractaddress: addresses.STAKER_SERVER_RELIANT,
        abikind: "STAKER_SERVER_RELIANT",
        methodname: "withdraw",
        aargs: [
          String(Number(amount * 10 ** 18).toLocaleString("fullwide", {useGrouping: false})),
          myAddress,
        ],
      });

      requestTransaction(
        {
          from: myAddress,
          to: addresses.STAKER_SERVER_RELIANT,
          data: abiString,
          value: "0x00",
          gas: MAX_GAS_LIMIT,
        },
        wallet
      ).then((res) => {
        if (res && !res.code) {
          let txhash;
          if (wallet == "metamask") {
            txhash = res;
          }

          if (txhash) {
            awaitTransactionMined
              .awaitTx(web3, txhash, TX_POLL_OPTIONS)
              .then(async (minedTxReceipt) => {
                con(true);
                setIsLoading(false);
                // off();
              })
              .catch(error => console.error(error));

            axios
              .post(API.API_TXS + `/${txhash}?nettype=${net}&plantype=${planType}`, {
                txhash: txhash,
                username: myAddress,
                typestr: "WITHDRAW",
                nettype: net,
                amount: String(Number(amount * 10 ** 18).toLocaleString("fullwide", {useGrouping: false})),
                auxdata: {
                  user_action: "WITHDRAW",
                  contract_type: "STAKER_SERVER_RELIANT",
                  contract_address: addresses.STAKER_SERVER_RELIANT,
                  to_token_contract: addresses.REWARD00,
                  my_address: myAddress,
                  gas: MAX_GAS_LIMIT,
                  appver,
                  nettype: net,
                },
              })
              .then((res) => {
                if(res && res.data.code === 1){
                  console.log("Withdraw Report : ", res);
                  off();
                }else{
                  setIsLoading(false);
                  setMsg(messages.MSG_CHAIN_ERR);
                  setMsgAlert(true);
                }
                con(true);
              });
          } else {
            setIsLoading(false);
            // off();
          }
        }else{
          if(res.code !== 4001){
            setMsg(messages.MSG_CHAIN_ERR);
            setMsgAlert(true);
          }
          console.error(res);
          setIsLoading(false);
        }
      })
      .catch(err => console.log(err));
    }
  };

  const setBtnTxt = () => {
      if(parseFloat(amount) > parseFloat(maxVal)){
        setStatusMsg("balance not enough");
      }else{
        setStatusMsg("Enter an amount");
      }
  };

  useEffect(() => {
    setBtnTxt();
  }, [amount]);

  return (
    <PwithdrawPopup>
      <header>
        <span className="titleTab">
          <span className="titleOn">Withdraw</span>
        </span>
        <span className="clsBtnWrap" onClick={() => off()}>
          <img className="clsBtn" src={closeBtn} alt="" />
        </span>
      </header>
      <article className="contentArea">
        <p className={isBalance ? "notAmount" : "amount"}>
          <span>DEPOSIT00</span>
          <span className="amountValue">
            <input
              className={amount > 0 ? "validValue" : ""}
              type="number"
              placeholder={0}
              value={amount ? amount : ""}
              onChange={(e) => setAmount(e.target.value)}
              max="999999"
              step="0.01"
            />
            <button className="maxBtn" onClick={() => setAmount(maxVal)}>
              MAX
            </button>
          </span>
        </p>
      </article>
      <footer>
        {isLoading ? (
          <button className="cnfrmBtn" disabled>
            <img src={loading} alt="" />
          </button>
        ) : parseFloat(amount) > parseFloat(maxVal) ? (
          <button className="cntCnfrmBtn" disabled>
            {statusMsg}
          </button>
        ) : (
          <button className="cnfrmBtn" onClick={withdraw}>
            Enter an amount
          </button>
        )}
      </footer>

      {msgAlert && (
        <>
          <MessageAlert off={setMsgAlert} msg={msg} />
          <PopupBg blur={true} off={setMsgAlert} />
        </>
      )}
    </PwithdrawPopup>
  );
}

const PwithdrawPopup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 480px;
  height: 368px;
  top: 50%;
  left: 50%;
  position: fixed;
  transform: translate(-50%, -50%);
  z-index: 6;
  background: #252422;
  border-radius: 20px;
  gap: 31px;

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

  .clsBtnWrap {
    cursor: pointer;
  }

  .clsBtn {
    width: 16.5px;
    height: 16.5px;
  }

  .contentArea {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
    align-items: center;

    & > p:first-child:hover {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid #ffffff;
    }

    .amount {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      background: #171717;
      border-radius: 12px;
      // padding: 0 67px 0 40px;
      padding: 5%;
      width: 400px;
      height: 80px;
      align-items: center;
      border: 1px solid #171717;

      & > span:first-child {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 36px;
        align-items: center;
        text-align: center;
        color: #ffffff;
      }

      .amountValue {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 14px;
        font-family: "Kanit";
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 36px;
        text-align: center;
        color: rgba(255, 255, 255, 0.4);
        width: 100%;
        // padding-right: 25px;

        & > input {
          text-align: right;
          width: 72%;
        }
      }

      .validValue {
        font-family: "Kanit";
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
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

    .notAmount {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      background: #171717;
      border-radius: 12px;
      padding: 0 67px 0 40px;
      width: 400px;
      height: 80px;
      align-items: center;
      border: 1px solid #ff6b65;

      & > span:first-child {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 36px;
        align-items: center;
        text-align: center;
        color: #ffffff;
      }

      .amountValue {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 14px;
        font-family: "Kanit";
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 36px;
        text-align: center;
        color: rgba(255, 255, 255, 0.4);
        width: 100%;
        padding-right: 25px;

        & > input {
          text-align: right;
        }

        .validValue {
          font-family: "Kanit";
          font-style: normal;
          font-weight: 400;
          font-size: 24px;
          line-height: 36px;
          text-align: right;
          color: #ffffff;
        }
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

    .balance {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 372px;

      .balTxt {
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        align-items: center;
        text-align: center;
        letter-spacing: -0.02em;
        color: rgba(255, 255, 255, 0.4);
      }

      .balVal {
        width: 46px;
        height: 21px;
        font-family: "Poppins";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.02em;
        color: #ffffff;
      }
    }
  }

  .description {
    font-family: Poppins;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);

    &:first-child {
      padding-bottom: 5px;
    }
  }

  footer {
    padding-top: 9px;

    .cnfrmBtn {
      width: 400px;
      height: 56px;
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
      width: 400px;
      height: 56px;
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

    .lackBalance {
      width: 400px;
      height: 56px;
      border-radius: 12px;
      background-color: #fff;
      font-family: "Poppins";
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      align-items: center;
      text-align: center;
      color: #ff6b65;
    }

    @keyframes rotate_img {
      100% {
        transform: rotate(360deg);
      }
    }

    img {
      animation: rotate_img 1s ease-in-out infinite;
      transform-origin: 50% 50%;
    }
  }
`;
