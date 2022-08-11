const getmyaddress = (wallet) => {
  if (wallet == "metamask" && window.ethereum?.selectedAddress) {
    return window.ethereum?.selectedAddress;
  } else if (wallet == "klaytn" && window.klaytn?.selectedAddress) {
    return window.klaytn?.selectedAddress;
    // return "0x2B843A7f3D62b2DfA77f404D07DddaaA62325510"; // => has more than 1 employed items
    // return "0xcfafe47dd0089ededd844c6387ca31474cc4c3d4"; // => very rich guy with 4821 tokens
    // return "0x876c42dbd390c29d45a6c653cbcc940aa8a44118"; // => staking fail
  } else {
    return null;
  }
};
export { getmyaddress };
