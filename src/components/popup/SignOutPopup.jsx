import styled, {keyframes} from 'styled-components-2rem';
import closeBtn from "../../assets/closeBtn.png";
import squares from "../../assets/squares.png";
import squaresOff from "../../assets/squaresOff.png";
import exportImg from "../../assets/exportImg.png";
import exportOff from "../../assets/exportOff.png";
import success from "../../assets/success.png";
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../reducers/common';
import {getLocalStorage, onclickcopy} from "../../util/common";
import { useState } from 'react';

export default function SignOutPopup({off, set, con}){
    const address = getLocalStorage("address")?.value;
    const dispatch = useDispatch();
    const [msgBoxPopup, setMsgBoxPopup] = useState(false); 

    function copyAddress(){
        onclickcopy(address);
        setMsgBoxPopup(true);
    }

    function signOut(){
        dispatch(setAddress({provider: "", address: ""}));
        localStorage.removeItem("wallet");
        localStorage.removeItem("address");
        if(set){
            set(0);
        }
        
        if(con){
            con(true);
        }
        off();
    }

    function viewPolygonScan(){
        window.open("https://mumbai.polygonscan.com/address/" + address);
    }

    return(
        <PsignOutPopup>
            <div className={`messageBox hidden ${msgBoxPopup ? "appear" : "disappear"}`}>
                <span>
                    <span><img src={success} alt="" /></span>
                    <span className="copyMsg">Copied Successfully</span>
                </span>
                <button onClick={()=>setMsgBoxPopup(false)}
                >
                    <img className="s_clsBtn" src={closeBtn} alt="" />
                </button>
            </div>
            
            <div className="blackBox">
                <div className="clsBtnWrap">
                    <button onClick={() => {off()}}>
                        <img className="clsBtn" src={closeBtn} alt="" />
                    </button>
                </div>
                <header>
                    <p className="description">Connected with</p>
                    <p className="title">{address?.substr(0, 6)}...{address?.substr(address.length - 4)}</p>
                </header>
                <article className="contentArea">
                    <div className="sideBtnWrap">
                        <button className="copyAdrs" onClick={copyAddress}>
                            <img className="sideBtn" src={squaresOff} alt="" />
                            Copy Address
                        </button>
                        <button className="viewPolygon" onClick={viewPolygonScan}>
                            <img className="sideBtn" src={exportOff} alt="" />
                            View on polygonscan
                        </button>
                    </div>
                    <button className="btnWrap" onClick={signOut}>
                        Sign out
                    </button>
                </article>
            </div>
        </PsignOutPopup>
    );
}

const PsignOutPopup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 6;
    top: 50%;
    left: 50%;
    width: 480px;
    height: 464px;
    
    .hidden{
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }

    .appear{
        visibility: visible;
        opacity: 1;
    }

    .messageBox{
        width: 100%;
        height: 40px;
        padding: 0 24px 0 24px;
        display: flex;
        justify-content: space-between;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 20px;
        font-family: 'Oxygen';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;

        & > span:first-child{
            display: flex;
        }

        .copyMsg{
            padding-left: 8px;
        }

        .s_clsBtn{
            width: 10.06px;
            height: 10.06px;
        }
    }

    .blackBox{
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        // align-items: center;
        width: 480px;
        height: 344px;
        background: #252422;
        border-radius: 20px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        transform: translate(-50%, -50%);
        z-index: 6;
        top: 50%;
        left: 50%;
        // width: 480px;
        // height: 464px;

        .clsBtnWrap{
            text-align: right;
            width: 100%;
            padding: 27.75px 36.75px 0 0;
        }

        .clsBtn{
            width: 16.5px;
            height: 16.5px;
            cursor: pointer;
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
            gap: 10px;
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
            gap: 24px;
            padding-bottom: 59px;

            & > .sideBtnWrap{
                display: flex;
                font-family: 'Poppins';
                font-weight: 400;
                font-size: 14px;
                line-height: 21px;
                text-align: center;
                justify-content: space-between;
                color: rgba(255, 255, 255, 0.6);

                .sideBtn{
                    // width: 18px;
                    // height: 18px;
                    padding-right: 6px;
                }

                & > .copyAdrs:hover{
                    color: #ffffff;

                    & > img{
                        content: url(${squares});
                    }
                }

                & > .viewPolygon:hover{
                    color: #ffffff;

                    & > img{
                        content: url(${exportImg});
                    }
                }
            }

            & > .btnWrap{
                width: 400px;
                height: 56px;
                border-radius: 12px;
                font-family: 'Poppins';
                border: 1px solid #FFFFFF;
                font-style: normal;
                font-weight: 500;
                font-size: 18px;
                text-align: center;
                letter-spacing: -0.02em;
                color: #FFFFFF;
                cursor: pointer;
                transition-duration: 0.3s;
            }

            & > .btnWrap:hover{
                transform: translateY(-2px);
            }

            span{
                color: #FFFFFF;
            }

        }
    }
    
`;