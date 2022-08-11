import styled, {keyframes} from 'styled-components-2rem';
import metamaskimg from "../../assets/metaMask.png";
import walletconnect from "../../assets/walletConnect.png";
import closeBtn from "../../assets/closeBtn.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAddress, setWallet, setWalletIcon } from '../../reducers/common';
import { getmyaddress, setLocalStorage } from '../../util/common';
import { useTranslation } from 'react-i18next';

export default function ConnectWalletPopup({off}){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function onClickMetaMask(){
        const { ethereum } = window;

        if(!ethereum || !ethereum?.isMetaMask){
            setTimeout(()=>{
                window.open(
                    "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
                    "_blank"
                )
            }, 1000);
            return;
        }

        const [address] = await window.ethereum.request({
            method: "eth_requestAccounts"
        });

        dispatch(setWalletIcon(0));
        dispatch(setWallet("metamask"));
        dispatch(setAddress({provider: "metaMask", address}));
        setLocalStorage("wallet", "metamask");
        setLocalStorage("address", address);
        off();
    }

    return(
        <PconnectWallet>
            <div className="clsBtnWrap" onClick={() => {off()}}>
                <img className="clsBtn" src={closeBtn} alt="" />
            </div>
            <header>
                <p className="title">Connect Wallet</p>
                <p className="description">To Start Using bicoswap</p>
            </header>
            <article className="contentArea">
                <div onClick={onClickMetaMask}>
                    <img src={metamaskimg} alt="" />
                    <span>Metamask</span>
                </div>
            </article>
        </PconnectWallet>
    );
}

const PconnectWallet = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 480px;
    height: 410px;
    top: 50%;
    left: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 6;
    background: #252422;
    border-radius: 20px;

    .clsBtnWrap{
        text-align: right;
        width: 100%;
        padding: 27.75px 36.75px 0 0;
        cursor: pointer;
    }

    .clsBtn{
        width: 16.5px;
        height: 16.5px;
    }
    
    .title{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        line-height: 36px;

        display: flex;
        align-items: center;
        text-align: center;
        letter-spacing: -0.02em;

        color: #FFFFFF;
    }

    header{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }

    .description{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
        /* identical to box height */

        display: flex;
        align-items: center;
        text-align: center;

        color: rgba(255, 255, 255, 0.6);
    }

    .contentArea{
        display: flex;
        flex-direction : column;
        gap: 20px;
        padding-bottom: 59px;

        & > div{
            background: #000000;
            width: 400px;
            height: 70px;
            border-radius: 40px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 18px;
            line-height: 27px;
            display: flex;
            align-items: center;
            text-align: center;
            letter-spacing: -0.02em;
            color: #FFFFFF;
            gap: 14px;
            padding-left: 40px;
            cursor: pointer;
        }

        & > div:hover{
            box-shadow : 0px 0px 20px rgba(255, 255, 255, 0.2);
        }

        img{
            width: 38px;
            height: 38px;
        }

        span{
            // font-family: 'Poppins';
            // font-style: normal;
            // font-weight: 500;
            // font-size: 18px;
            // line-height: 27px;
            // display: flex;
            // align-items: center;
            // text-align: center;
            // letter-spacing: -0.02em;
            color: #FFFFFF;
        }
    }

    .cnfrmBtn{
        width: 312px;
        height: 56px;
        border-radius: 12px;
        background-color: #fff;
    }
`;