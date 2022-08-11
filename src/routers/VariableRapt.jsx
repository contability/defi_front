import DefaultHeader from "../components/header/DefaultHeader";
import styled, { keyframes } from "styled-components-2rem";
// import styled, {keyframes} from 'styled-px2rem';
import LeftBar from "../components/common/LeftBar";
import main_background from "../assets/main_background.png";
import { useEffect, useState } from "react";
import PopupBg from "../components/common/PopupBg";
import { floorAmount, getInstallYn, getLocalStorage, getmyaddress, networkYn } from "../util/common";
import { useSelector } from "react-redux";
import {
  getabistr_forfunction,
  getethrep,
  query_with_arg,
  getweirep,
  query_noarg,
} from "../util/contract-calls";
import { addresses } from "../configs/addresses";
import { MAX_GAS_LIMIT } from "../configs/configs";
import { requestTransaction } from "../services/metamask";
import DepositPopup from "../components/popup/DepositPopup";
import WithdrawPopup from "../components/popup/WithdrawPopup";
import { web3 } from "../configs/configweb3";
import { appver, TX_POLL_OPTIONS } from "../configs/configs";
import awaitTransactionMined from "await-transaction-mined";
import loading from "../assets/loading.png";
import axios from "axios";
import { API } from "../configs/api";
import { net } from "../configs/net";
import moment from "moment";
import { messages } from "../configs/messages";
import MessageAlert from "../components/common/MessageAlert";
import Footer from "../components/footer/Footer";

export default function VariableRapt() {
  const wallet = useSelector((state) => state.common.wallet);
  const address = useSelector((state) => state?.common?.address);

  const [depositPopup, setDepositPopup] = useState(false);
  const [withdrawPopup, setWithdrawPopup] = useState(false);
  const [active, setActive] = useState(false);
  const [claimAbleAmount, setClaimAbleAmount] = useState(0);
  const [depositBal, setDepositBal] = useState(0);
  const [rewardBal, setRewardBal] = useState(0);
  const [allowanceValue, setAllowanceValue] = useState(0);
  const [lastStakeTime, setLastStakeTime] = useState(0);
  const [lastWithdrawTime, setLastWithdrawTime] = useState(0);
  const [minStakeAmount, setMinStakeAmount] = useState(0);
  const [lastClaimTime, setLastClaimTime] = useState(0);
  const [minBalanceToClaim, setMinBalanceToClaim] = useState(0);
  const [rewardRate, setRewardRate] = useState(0);
  const [rewardReserve, setRewardReserve] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [balance, setBalance] = useState(0);
  const [claimableAmount, setClaimableAmount] = useState(0);
  const [ratesStart, setRatesStart] = useState("");
  const [ratesEnd, setRatesEnd] = useState("");
  const [isClaiming, setIsClaimg] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [msgAlert, setMsgAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const PLANTYPE = "VARIABLE";

  const chkLogin = (msg) => {
    const isWallet = getLocalStorage("wallet")?.value;
    const isAddress = getLocalStorage("address")?.value;
    if (!isWallet || !isAddress) {
      if (msg) {
        setMsgAlert(true);
        setMsg(msg);
      }

      setAllowanceValue(0);
      setClaimAbleAmount(0);
      setDepositBal(0);
      setLastStakeTime(0);
      setLastWithdrawTime(0);
      setMinStakeAmount(0);
      setLastClaimTime(0);
      setRewardBal(0);
      setMinBalanceToClaim(0);
      setRewardReserve(0);
      setRewards(0);
      setBalance(0);
      setClaimableAmount(0);

      return false;
    } else {
      return true;
    }
  };

  const onClickClaim = async (claimAmount) => {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    const isChked = chkLogin(messages.MSG_PLEASELOGIN);
    if (!isChked) return;

    if(claimAmount < minBalanceToClaim){
      setMsg("amount does not meet min amount");
      setMsgAlert(true);
      return;
    }
    setIsClaimg(true);

    const abiString = getabistr_forfunction({
      contractaddress: addresses.STAKER_SERVER_RELIANT,
      abikind: "STAKER_SERVER_RELIANT",
      methodname: "claim",
      aargs: [
        String(
              Number(claimAmount * 10 ** 18).toLocaleString("fullwide", {
                useGrouping: false,
              })
            ),
        myAddress,
      ],
      gas: MAX_GAS_LIMIT,
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
        awaitTransactionMined
          .awaitTx(web3, res, TX_POLL_OPTIONS)
          .then(async (minedTxReceipt) => {
            setIsClaimg(false);
            setActive(true);
          });

        let txhash;
        if (wallet == "metamask") {
          txhash = res;
        }

        axios
          .post(API.API_TXS + `/${txhash}?nettype=${net}&plantype=${PLANTYPE}`, {
            txhash: txhash,
            username: myAddress,
            typestr: "CLAIM",
            nettype: net,
            amount: 
            String(
              Number(claimAmount * 10 ** 18).toLocaleString("fullwide", {
                useGrouping: false,
              })
            ),
            auxdata: {
              user_action: "CLAIM",
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
              console.log("Claim Report : ", res);
            }else{
              setIsClaimg(false);
              setMsg(messages.MSG_CHAIN_ERR);
              setMsgAlert(true);
            }
          });
      }else {
        if(res.code !== 4001){
          setMsg(messages.MSG_CHAIN_ERR);
          setMsgAlert(true);
        }
        console.log(res);
        setIsClaimg(false);
      }
    });
  };

  function getBalances() {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    query_with_arg({
      contractaddress: addresses.STAKER_SERVER_RELIANT,
      abikind: "STAKER_SERVER_RELIANT",
      methodname: "_balances",
      aargs: [myAddress],
    }).then((res) => {
      console.log("balances is : ", res);
      let temp = getethrep("" + res);
      console.log(temp);
      setBalance(floorAmount(temp));
      getStakeStatus(false);
    });
  }

  const approve = async () => {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    const isChked = chkLogin(messages.MSG_PLEASELOGIN);
    if (!isChked) return;

    setIsApproving(true);
    const abiString = getabistr_forfunction({
      contractaddress: addresses.DEPOSIT00,
      abikind: "ERC20",
      methodname: "approve",
      aargs: [
        addresses.STAKER_SERVER_RELIANT,
        String(
          Number(10 ** 12 * 10 ** 18).toLocaleString("fullwide", {
            useGrouping: false,
          })
        ),
      ],
    });

    requestTransaction(
      {
        from: myAddress,
        to: addresses.DEPOSIT00,
        data: abiString,
        value: "0x00",
        gas: MAX_GAS_LIMIT,
      },
      wallet
    ).then((res) => {
      if (res && !res.code) {
        awaitTransactionMined
          .awaitTx(web3, res, TX_POLL_OPTIONS)
          .then(async (minedTxReceipt) => {
            setIsApproving(false);
            setActive(true);
          })
          .catch(err => {
            setIsApproving(false);
            console.error(err);
            setMsg(messages.MSG_CHAIN_ERR);
            setMsgAlert(true); 
          });
      }else {
        if(res.code !== 4001){
          setMsg(messages.MSG_CHAIN_ERR);
          setMsgAlert(true);
        }
        console.error(res);
        setIsApproving(false);
        return;
      }
    });
  };

  function allowance() {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    query_with_arg({
      contractaddress: addresses.DEPOSIT00,
      abikind: "ERC20",
      methodname: "allowance",
      aargs: [myAddress, addresses.STAKER_SERVER_RELIANT],
    }).then((res) => {
      console.log("allowance res : ", res);
      let temp = getethrep("" + res || 0);
      setAllowanceValue((+temp).toFixed(4));
    });
  }

  function getLastStakeTime() {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    query_with_arg({
      contractaddress: addresses.STAKER_SERVER_RELIANT,
      abikind: "STAKER_SERVER_RELIANT",
      methodname: "_last_stake_time",
      aargs: [myAddress],
    }).then((res) => {
      if(res != "0"){
        setLastStakeTime(moment.unix(res).format("YYYY.MM.DD H:mm:ss A"));
      }else{
        setLastStakeTime(res);
      }
    });
  }

  function getLastWithdrawTime() {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    query_with_arg({
      contractaddress: addresses.STAKER_SERVER_RELIANT,
      abikind: "STAKER_SERVER_RELIANT",
      methodname: "_last_withdraw_time",
      aargs: [myAddress],
    }).then((res) => {
      if(res != "0"){
        setLastWithdrawTime(moment.unix(res).format("YYYY.MM.DD H:mm:ss A"));
      }else{
        setLastWithdrawTime(res);
      }
    });
  }

  function getMinStakeAmount() {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    query_noarg({
      contractaddress: addresses.STAKER_SERVER_RELIANT,
      abikind: "STAKER_SERVER_RELIANT",
      methodname: "_min_stake_amount",
    }).then((res) => {
      console.log("MIN STAKE AMOUNT : ", res);
      let temp = getethrep("" + res);
      setMinStakeAmount((+temp).toFixed(4));
    });
  }

  function getLastClaimTime() {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    query_with_arg({
      contractaddress: addresses.STAKER_SERVER_RELIANT,
      abikind: "STAKER_SERVER_RELIANT",
      methodname: "_last_claim_time",
      aargs: [myAddress],
    }).then((res) => {
      if(res != "0"){
        setLastClaimTime(moment.unix(res).format("YYYY.MM.DD H:mm:ss A"));
      }else{
        setLastClaimTime(res);
      }
    });
  }

  function getMinBlanceToClaim() {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    query_noarg({
      contractaddress: addresses.STAKER_SERVER_RELIANT,
      abikind: "STAKER_SERVER_RELIANT",
      methodname: "_min_balance_to_qualify_for_claim",
    }).then((res) => {
      console.log("MIN BALANCE TO QUALIFY FOR CLAIM : ", res);
      let temp = getethrep("" + res);
      setMinBalanceToClaim((+temp).toFixed(4));
    });
  }

  function getRewardRate() {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    query_noarg({
      contractaddress: addresses.STAKER_SERVER_RELIANT,
      abikind: "STAKER_SERVER_RELIANT",
      methodname: "_reward_rate",
    }).then((res) => {
      console.log("REWARD RATE : ", res);
      console.log((+getethrep("" + res)));
      setRewardRate((+getethrep("" + res)).toFixed(4));

    });
  }

  function getRewards() {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    query_with_arg({
      contractaddress: addresses.STAKER_SERVER_RELIANT,
      abikind: "STAKER_SERVER_RELIANT",
      methodname: "_rewards",
      aargs: [myAddress],
    }).then((res) => {
      console.log("REWARDS : ", res);
      setRewardReserve(res);
    });
  }

  function myBalance(tokenAddress, set) {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    query_with_arg({
      contractaddress: tokenAddress,
      abikind: "ERC20",
      methodname: "balanceOf",
      aargs: [myAddress],
    }).then((res) => {
      if (res) {
        console.log(res);
        let temp = getethrep("" + res || 0);
        set((+temp).toFixed(4) || "0.0000");
      }
    });
  }

  const getStakeStatus = async (isClaim) => {
    let myAddress = getmyaddress(wallet);
    if (!myAddress) myAddress = getLocalStorage("address")?.value;

    await axios
      .get(API.API_STAKE_STATUS + `/${myAddress}?nettype=${net}`)
      .then((res) => {
        if (res) {
          let data = res.data.respdata;
          setClaimAbleAmount(data.claimableamountfloat);
          if(isClaim){
            onClickClaim(data.claimableamountfloat);
          }
        }
      })
      .catch((err) => console.error(err));
  };

  const ratesDate = () => {
    axios.get(API.API_GET_SETUP_RATES + `?nettype=${net}`)
    .then((res) => {
      console.log(res);
      
      if(res?.data?.list){
        let list = res.data.list;
        list.map((v, i) => {
          switch (v.key_){
            case "VARIABLE_RATES_END":
              setRatesEnd(v.value_);
              break;
            case "VARIABLE_RATES_START":
              setRatesStart(v.value_);
              break;
            default :
              break; 
          }
          
        })
      }
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    setActive(false);

    const isInstall = getInstallYn(setMsgAlert, setMsg);
    if (!isInstall) return;

    getRewardRate();
    ratesDate();
    getMinStakeAmount();
    getMinBlanceToClaim();

    const isChked = chkLogin();
    if (!isChked) return;

    allowance();
    myBalance(addresses.DEPOSIT00, setDepositBal);
    myBalance(addresses.REWARD00, setRewardBal);
    getBalances();
    getLastStakeTime();
    getLastClaimTime();
    getRewards();
    getLastWithdrawTime();
  }, [wallet, address, active]);

  return (
    <PvariableRapt>
      <img className="backgroundImg" src={main_background} alt="" />
      <main>
        <DefaultHeader opt={setAllowanceValue} con={setActive} />
        <div className="mainArea">
          <LeftBar />
          <article className="content">
            <strong className="contentTitle">Variable Plan</strong>
            <span>
                Earn fees and rewards by depositing and staking your tokens to the platform.
            </span>
            <div className="boxes">
              <aside className="leftBox">
                <p className="flexSection">
                  <section className="stats contentSct">
                    <strong className="sectionHeader">My Stats</strong>
                    <div>
                      <p className="panelHeader">Deposit Balance</p>
                      <p>{depositBal || "0.0000"}</p>
                    </div>
                    <div>
                      <p className="panelHeader">Reserve Balance</p>
                      <p>{rewardBal || "0.0000"}</p>
                    </div>
                  </section>
                  <section className="urStake contentSct">
                    <strong className="sectionHeader">Contract Stats</strong>
                    <div>
                      <p className="panelHeader">Last Stake Time</p>
                      <p>{lastStakeTime==="0"?"0000.00.00 0:00:00 AM":lastStakeTime}</p>
                    </div>
                    <div className="flxHeader">
                      <p>
                        <p className="panelHeader">Last Withdraw Time</p>
                        <p>{lastWithdrawTime==="0"?"0000.00.00 0:00:00 AM":lastWithdrawTime}</p>
                      </p>
                    </div>
                    <div className="flxHeader">
                      <p>
                        <p className="panelHeader">Min Stake Amount</p>
                        <p>{minStakeAmount}</p>
                      </p>
                      <p className="panelFlx"></p>
                    </div>
                  </section>
                </p>
                <section
                  className="stakingAssets contentSct"
                >
                  <strong className="sectionHeader">My Contract Interaction</strong>
                  <div>
                      <p className="panelHeader">Allowance</p>
                      <p>{allowanceValue || "0.0000"}</p>
                    </div>
                    <div>
                      <p className="panelHeader">Deposit Amount</p>
                      <p>{balance}</p>
                    </div>
                </section>
              </aside>
              <aside className="rightBox">
                <section className="urRewards contentSct">
                  <strong className="sectionHeader">Rewards</strong>
                  <div>
                    <p className="panelHeader">Claimable Amount</p>
                    <p className="panelFlx">
                      <p>{(+claimAbleAmount).toFixed(4)}</p>
                    </p>
                  </div>
                  <div>
                    <p className="panelHeader">Last Claim Time</p>
                    <p className="panelFlx">
                      <p>{lastClaimTime=="0"?"0000.00.00 0:00:00 AM":lastClaimTime}</p>
                    </p>
                  </div>

                  <div className="boxArea">
                    {isClaiming ? (
                      <button className="claimBtn" disabled>
                        <img className="spinner" src={loading} alt="" />
                      </button>
                    ) : (
                      <button className="claimBtn" 
                      onClick={() => getStakeStatus(true)}
                      >
                        CLAIM
                      </button>
                    )}
                  </div>
                  <div className="boxArea">
                    <p className="detailBox">
                      <span className="panelFlx detailContent pt_13">
                        <span className="panelHeader">
                          Min Balance To Qualify For Claim
                        </span>
                        <p>{minBalanceToClaim}</p>
                      </span>
                      <span className="panelFlx detailContent pt_13">
                        <span className="panelHeader">Reward Rate</span>
                        <p>{rewardRate}</p>
                      </span>
                      <span className="panelFlx detailContent">
                        <span className="panelHeader">Rate Period</span>
                        <p>{ratesStart}&nbsp;~&nbsp;{ratesEnd}</p>
                      </span>
                      
                    </p>
                  </div>
                </section>
                {parseInt(allowanceValue) < 10000 ? (
                  isApproving ? (
                    <section className="lock contentSct">
                      <div>
                        <button className="lockBtn" disabled>
                          <img src={loading} alt="" className="spinner" />
                        </button>
                      </div>
                    </section>
                  ) : (
                    <section className="lock contentSct">
                      <div>
                        <button className="lockBtn" onClick={approve}>
                          APPROVE
                        </button>
                      </div>
                    </section>
                  )
                ) : (
                  <>
                    <section className="btnSection contentSct">
                      <div className="interactionBtn">
                        <button
                          className="lockBtn"
                          onClick={() => setDepositPopup(true)}
                        >
                          DEPOSIT
                        </button>
                      </div>
                      <div className="interactionBtn">
                        <button
                          className="lockBtn"
                          onClick={() => setWithdrawPopup(true)}
                        >
                          WITHDRAW
                        </button>
                      </div>
                    </section>
                  </>
                )}
              </aside>
            </div>
            <Footer/>
          </article>
        </div>
      </main>

      {depositPopup && (
        <>
          <DepositPopup
            off={setDepositPopup}
            con={setActive}
            maxVal={allowanceValue}
            balance={depositBal}
            minVal={minStakeAmount}
          />
          <PopupBg blur={true} off={setDepositPopup} />
        </>
      )}

      {withdrawPopup && (
        <>
          <WithdrawPopup
            off={setWithdrawPopup}
            con={setActive}
            maxVal={balance}
          />
          <PopupBg blur={true} off={setWithdrawPopup} />
        </>
      )}

      {msgAlert && (
        <>
          <MessageAlert off={setMsgAlert} msg={msg} />
          <PopupBg blur={true} off={setMsgAlert} />
        </>
      )}
    </PvariableRapt>
  );
}

const PvariableRapt = styled.div`
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

    span {
      font-family: Poppins;
      // font-size: 1.4rem;
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
      min-height: 67%;
      height: 100%;
      display: flex;
      flex-wrap: nowrap;
      gap: 24px;
      padding-top: 25px;

      .leftBox {
        display: flex;
        gap: 24px;
        flex-direction: column;
        width: 59%;
      }

      .rightBox {
        display: flex;
        gap: 24px;
        flex-direction: column;
        width: 41%;
      }

      .flexSection {
        display: flex;
        gap: 24px;
        // height: 75%;
        height: 100%;
      }

      .contentSct {
        width: 236px;
        height: 236px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 18px 26px 18px 26px;

        & > div {
          font-family: Poppins;
          font-size: 16px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: normal;
          letter-spacing: -0.32px;
          text-align: left;
          color: #fff;
        }

        .claimBtn {
          width: 100%;
          height: 34px;
          object-fit: contain;
          border-radius: 30px;
          border: solid 1px #fff;
        }

        .lockBtn {
          width: 100%;
          height: 34px;
          object-fit: contain;
          border-radius: 30px;
          border: solid 1px #fff;
        }

        @keyframes rotate_img {
          100% {
            transform: rotate(360deg);
          }
        }

        .spinner {
          animation: rotate_img 1s ease-in-out infinite;
          transform-origin: 50% 50%;
          height: 50%;
        }

        .detailBox {
          display: flex;
          flex-direction: column;
          object-fit: contain;
          border-radius: 10px;
          background-color: rgba(0, 0, 0, 0.2);
          height: 90px;
          gap: 4px;
          padding: 3% 0;
          justify-content: space-evenly;
        }

        .panelFlx {
          display: flex;
          justify-content: space-between;
          align-items: center;

          & > button {
            width: 100px;
            height: 34px;
            object-fit: contain;
            border-radius: 30px;
            border: solid 1px #fff;
          }
        }

        .assetsPoolData {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 4px;
        }

        .detailContent {
          padding: 0 18px;
        }
      }

      .panelHeader {
        padding-bottom: 3px;
        font-family: Poppins;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.24px;
        color: rgba(255, 255, 255, 0.5);
      }
      .stats {
        // width: 278px;
        // height: 278px;
        display: flex;
        flex-direction: column;
        width: 35%;
        height: 100%;
      }

      .urStake {
        // width: 406px;
        // height: 278px;
        display: flex;
        flex-direction: column;
        flex: 1;
        // width: 60%
        height: 100%;

        & > .flxHeader {
          display: flex;
          justify-content: space-between;
        }
      }

      .urRewards {
        // width: 460px;
        // height: 344px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .stakingAssets {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;

        width: 100% p {
          display: flex;
          justify-content: flex-start;

          & > button {
            width: 100px;
            height: 34px;
            object-fit: contain;
            border-radius: 30px;
            border: solid 1px #fff;
          }

          &:nth-child(1) {
            width: 120px;
          }

          :nth-child(2) {
            width: 68.516px;
          }

          :nth-child(3) {
            width: 31.563px;
          }

          :nth-child(4) {
            width: 49.063px;
          }

          :nth-child(5) {
            width: 98px;
          }
        }
      }

      .lock {
        height: 60px;
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;

        div{
          width: 100%;
        }
      }

      .btnSection {
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-evenly;
        gap: 3%;
        align-items: center;
        height: 60px;

        .interactionBtn {
          width: 50%;
        }
      }
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

    .sectionHeader {
      font-family: Poppins;
      font-size: 18px;
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: -0.36px;
      color: #fff;
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
