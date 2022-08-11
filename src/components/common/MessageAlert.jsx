import styled, {keyframes} from 'styled-components-2rem';
import metamaskimg from "../../assets/metaMask.png";
import walletconnect from "../../assets/walletConnect.png";
import closeBtn from "../../assets/closeBtn.png";
import squares from "../../assets/squares.png";
import squaresOff from "../../assets/squaresOff.png";
import exportImg from "../../assets/exportImg.png";
import exportOff from "../../assets/exportOff.png";
import success from "../../assets/success.png";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../reducers/common';
import {onclickcopy} from "../../util/common";
import { useTranslation } from 'react-i18next';

export default function MessageAlert({off, msg}){
    return(
        <PmessageAlert>
            <div className={`messageBox`}>
                <span>
                    <span><img src={success} alt="" /></span>
                    <span className="copyMsg">{msg}</span>
                </span>
                <button onClick={()=>off(false)}
                >
                    <img className="s_clsBtn" src={closeBtn} alt="" />
                </button>
            </div>
        </PmessageAlert>
    );
}

const PmessageAlert = styled.div`
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 6;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 25%;
};
    
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