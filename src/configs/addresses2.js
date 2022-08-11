import { NET } from "./net";
let addresses;
if (NET == "ETH_TESTNET") {
  addresses = {
    USDT: "0xe34bb854d830f176ad79931f35c15ea0a3d9b30d", // owner : 0x90033484A520b20169b60F131B4e2F7f46923FAf
    USDC: "0xEf7e7bF3d466f727bbbFcD68CB5C35667eC2b390",
    BUSD: "0xB664537f605B152Fb25Cd7723e50D677b9966d1b",
    ADMIN: "0x0A400968AB933C13fE668Ab8AAD34181E197c74b",
    STABLE_SWAP: "0xcc8dd69caecb43cfa44d715ae1526c56c1d59347",
    //		, SWAP : '0xcc8dd69caecb43cfa44d715ae1526c56c1d59347'
    AKD: "0x144449346f10A8E5305189e3669506e4EEB7D8a4",
    AKG: "0xff817302e7b6d116cdff1a730508551ee1557875",
    FACTORY: "0xb252e3934c60dc4eac1d95b4c111998ea3ffd830", // owner : 0x90033484A520b20169b60F131B4e2F7f46923FAf
    ROUTER: "0xf8b2ece6ed74c5bd826a973f72b089b507883af2",
    // admin : 0x584D282AD755ad2b3b0Ef9789E51301902d8A58b' misses set_custom_stable_token
  };
} else if (NET == "KLAY_TESTNET") {
  addresses = {};
}
export { addresses };

// name: 'USDT' , address : '0xe34bb854d830f176ad79931f35c15ea0a3d9b30d'
// name: 'USDC' , address : '0xEf7e7bF3d466f727bbbFcD68CB5C35667eC2b390'
// name : 'BUSD' , address : '0xB664537f605B152Fb25Cd7723e50D677b9966d1b'
