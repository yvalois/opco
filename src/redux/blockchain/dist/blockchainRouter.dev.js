"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contract = void 0;

var contract = function contract() {
  var a = "production";

  if (a !== "production") {
    return {
      BUSD_ADDRESS: "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7",
      AOEX_ADDRESS: "0x4bb18aEf2cb6F01703031137eFAaD56b3B99F035",
      EXCHANGE_ADDRESS: "0xf8769b8C4D345b3333958a54f69a32D655eA522A",
      PRICE_SETTER_ADDRESS: "0xa3366a1e1b2FA9df63967f3050f99e089E7de5E5",
      STAKING_ADDRESS: "0x58aeD71a7235D986F2858960F84849a7632B4f5B",
      NFT_ADDRESS: "0x2Fb9Fb5999667C474c032a966a07Fb94184A3439",
      OPCO_ADDRESS: "0xFE6d8A839466845a2eC3b1199C925D226b1F398e",
      RPC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      MARKET: '0x9A3aBA014647CFFFe0Fc4DD951109256c47656F6',
      USTD_ADDRESS: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
      P2P_ADDRESS: "0x1c120D2Ab6d0384491601EbF15CF465A0528C02c",
      EXCHANGE_OLD: "0x68d62db3CC068F96A9d94CFcC271c78239F4Ab9e"
    };
  }

  if (a === "production") {
    return {
      BUSD_ADDRESS: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      AOEX_ADDRESS: "0x473f2597Db9FA23a810a83756Af1f007c00722fB",
      EXCHANGE_ADDRESS: "0xd6DDD0d35850E2Fde80C7B1E6599EdC8E434E3Ce",
      PRICE_SETTER_ADDRESS: "0xC8f1D15b486770F1De3EB98A7B5cA81331F7B068",
      STAKING_ADDRESS: "0x9D35D8194a8707a1cD8C2e19D8abDdc00e8BDdca",
      NFT_ADDRESS: "0xEa83B555e2d032ABFb7DC80977Dac0b1E1d94a71",
      OPCO_ADDRESS: "0xff9f2DEa9F7C838DF4f9d3e5eCFabe1D4CB6b259",
      RPC_URL: 'https://bsc-dataseed1.ninicoin.io',
      MARKET: '0x3c9bf556F040D9D7E5690D90362A03Ac498693F4',
      USTD_ADDRESS: "0x55d398326f99059fF775485246999027B3197955",
      P2P_ADDRESS: "0xD9D3CD756eFb0Cb839a72A7d1c20432d010BDAF1",
      OPCO__ADDRESS: "0x473f2597Db9FA23a810a83756Af1f007c00722fB",
      INVERSIONES_ADDRESS: "0x70726A242EC321cDF05bd9CF8513FE5DADBF1B20",
      STAKING__ADDRESS: "0xcBbC296aCb2D9b37969A6cca6F0679b6BF090357"
    };
  }
}; //new exchange 0xd6DDD0d35850E2Fde80C7B1E6599EdC8E434E3Ce
//old exchange 0x1001Fa76BA2880acdC2Ab260713Dbd7E6243c446


exports.contract = contract;