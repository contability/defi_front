import { useEffect, useState } from "react";
import styled from "styled-components-2rem";

const Footer = () => {
    return (
        <Pfooter>
            <span>
                © 2022 Bicoswap.com. All rights reserved
            </span>
        </Pfooter>
    );
};

const Pfooter = styled.div`
    width: 100%;
    // height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 41%;
    align-items: flex-end;
    padding-top: 5%;

    & > span{
        font-family: Poppins;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        -webkit-letter-spacing: -0.28px;
        -moz-letter-spacing: -0.28px;
        -ms-letter-spacing: -0.28px;
        letter-spacing: -0.28px;
        text-align: left;
        color: rgba(255,255,255,0.7);
    }
`;
export default Footer;