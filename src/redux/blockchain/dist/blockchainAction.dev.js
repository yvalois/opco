"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disconnectBlockchainAction = exports.fetchBalance = exports.fetchBlockchain = exports.updateStakingTokens = exports.updateInversionTokens = exports.updateTokenI = exports.updateTokenS = void 0;

var _ethers = require("ethers");

var _web3modal = _interopRequireDefault(require("web3modal"));

var _abiERC = _interopRequireDefault(require("../../abis/abiERC20.json"));

var _exchangedelay = _interopRequireDefault(require("../../abis/exchangedelay.json"));

var _priceSetter = _interopRequireDefault(require("../../abis/priceSetter.json"));

var _coffeeAbi = _interopRequireDefault(require("../../abis/coffeeAbi.json"));

var _staking = _interopRequireDefault(require("../../abis/staking.json"));

var _opcoStore = _interopRequireDefault(require("../../abis/opcoStore.json"));

var _market = _interopRequireDefault(require("../../abis/market.json"));

var _p2pAbi = _interopRequireDefault(require("../../abis/p2pAbi.json"));

var _OpcoP = _interopRequireDefault(require("../../abis/OpcoP.json"));

var _Inversiones = _interopRequireDefault(require("../../abis/Inversiones.json"));

var _inversionesStaking = _interopRequireDefault(require("../../abis/inversionesStaking.json"));

var _Usdt = _interopRequireDefault(require("../../abis/Usdt.json"));

var _wagmi = require("wagmi");

var _ethereumProvider = require("@walletconnect/ethereum-provider");

var _web3Provider = _interopRequireDefault(require("@walletconnect/web3-provider"));

var _walletSdk = _interopRequireDefault(require("@coinbase/wallet-sdk"));

var _blockchainRouter = require("./blockchainRouter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _blockchainRouter.contract)();
var AOEX_ADDRESS = router.AOEX_ADDRESS;
var BUSD_ADDRESS = router.BUSD_ADDRESS;
var USDT_ADDRESS = router.USTD_ADDRESS;
var EXCHANGE_ADDRESS = router.EXCHANGE_ADDRESS;
var STAKING_ADDRESS = router.STAKING_ADDRESS;
var P2P_ADDRESS = router.P2P_ADDRESS;
var OPCO__ADDRESS = router.OPCO__ADDRESS;
var INVERSIONES_ADDRESS = router.INVERSIONES_ADDRESS;
var STAKING__ADDRESS = router.STAKING__ADDRESS;
/*   
const providerOptions = await EthereumProvider.init({
    projectId: "1550c9dc2fbedff21b49981400c69490", // REQUIRED your projectId
    chains: [56], // REQUIRED chain ids
    showQrModal: true,
    qrModalOptions:undefined
  });
  await providerOptions.connect({

     chains:[56], // OPTIONAL chain ids
     rpcMap: {
             31337: "http://localhost:8545", // Agrega el RPC de tu red local de Hardhat/             
             56: "https://bsc-dataseed.binance.org/",
     },
   });
   */

var providerOptions = {
  walletconnect: {
    "package": _walletSdk["default"],
    options: {
      rpc: {
        31337: "http://localhost:8545",
        // Agrega el RPC de tu red local de Hardhat
        56: "https://bsc-dataseed.binance.org/",
        97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
      }
    }
  }
};
var web3Modal = new _web3modal["default"]({
  disableInjectedProvider: false,
  cacheProvider: true,
  providerOptions: providerOptions // required

});

var loadingBlockchain = function loadingBlockchain() {
  return {
    type: 'LOADING_BLOCKCHAIN'
  };
};

var loadingBlockchainSuccess = function loadingBlockchainSuccess(payload) {
  return {
    type: 'LOADING_BLOCKCHAIN_SUCCESS',
    payload: payload
  };
};

var loadingBlockchainFailure = function loadingBlockchainFailure(payload) {
  return {
    type: 'LOADING_BLOCKCHAIN_FAILURE',
    payload: payload
  };
};

var updateAccount = function updateAccount(payload) {
  return {
    type: 'UPDATE_ACCOUNT',
    payload: payload
  };
};

var updateBalance = function updateBalance(tokenBalance, busdBalance) {
  return {
    type: 'UPDATE_BALANCE',
    payload: {
      tokenBalance: tokenBalance,
      busdBalance: busdBalance
    }
  };
};

var updateTokenS = function updateTokenS(tokens) {
  return {
    type: 'UPDATE_BALANCE_STAKING',
    payload: {
      tokens: tokens
    }
  };
};

exports.updateTokenS = updateTokenS;

var updateTokenI = function updateTokenI(tokens) {
  return {
    type: 'UPDATE_BALANCE_INVERSIONES',
    payload: {
      tokens: tokens
    }
  };
};

exports.updateTokenI = updateTokenI;

var disconnectBlockchain = function disconnectBlockchain() {
  return {
    type: 'DISCONNECT_BLOCKCHAIN'
  };
}; // const updateInversionesProvider = (inversionesContract) => ({
//     type:'UPDATE_INVERSIONES_PROVIDER',
//     payload: {
//         inversionesContract
//     }
// })
// export const updateProvider =()=>{
//     return async( dispatch) =>{
//         const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
//         const inversionesContract = new ethers.Contract(INVERSIONES_ADDRESS, inversionesAbi, provider);
//         dispatch(updateInversionesProvider({
//             inversionesContract
//         }))
//     }
// }


var updateInversionTokens = function updateInversionTokens(inversionesContract, accountAddress) {
  return function _callee(dispatch) {
    var inversionesBalance, inversionesBalances, i, tipo, name, info;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            inversionesBalance = [];
            _context.next = 3;
            return regeneratorRuntime.awrap(inversionesContract.getMyInventory(accountAddress));

          case 3:
            inversionesBalances = _context.sent;
            i = 0;

          case 5:
            if (!(inversionesBalances.length > i)) {
              _context.next = 15;
              break;
            }

            _context.next = 8;
            return regeneratorRuntime.awrap(inversionesContract.getTipo(parseInt(inversionesBalances[i])));

          case 8:
            tipo = _context.sent;
            name = "Inversiones ".concat(tipo);
            info = {
              nombre: name,
              id: parseInt(inversionesBalances[i]),
              tipo: parseInt(tipo),
              image: "https://violet-disgusted-halibut-418.mypinata.cloud/ipfs/QmUncKwRVF1yXsckcTA3cQ6GgfMag1M8nQxgrKXMLWkbWH/".concat(tipo, ".png")
            };
            inversionesBalance.push(info);

          case 12:
            i++;
            _context.next = 5;
            break;

          case 15:
            console.log(inversionesBalance);
            dispatch(updateTokenI(inversionesBalance));

          case 17:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.updateInversionTokens = updateInversionTokens;

var updateStakingTokens = function updateStakingTokens(inversioneStakingContract, accountAddress) {
  return function _callee2(dispatch) {
    var inversionesStakingBalance, inversionesStakingBalances, i, restTime, reward, valorConvertido, info;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            inversionesStakingBalance = [];
            _context2.next = 3;
            return regeneratorRuntime.awrap(inversioneStakingContract.getNfts(accountAddress));

          case 3:
            inversionesStakingBalances = _context2.sent;
            i = 0;

          case 5:
            if (!(inversionesStakingBalances.length > i)) {
              _context2.next = 18;
              break;
            }

            _context2.next = 8;
            return regeneratorRuntime.awrap(inversioneStakingContract.getRestTime(parseInt(inversionesStakingBalances[i])));

          case 8:
            restTime = _context2.sent;
            _context2.next = 11;
            return regeneratorRuntime.awrap(inversioneStakingContract.rewardPerToken(parseInt(inversionesStakingBalances[i]), accountAddress));

          case 11:
            reward = _context2.sent;
            valorConvertido = _ethers.ethers.utils.formatUnits(reward, 8);
            info = {
              id: parseInt(inversionesStakingBalances[i]),
              Tiempo: parseInt(restTime),
              currentReward: valorConvertido
            };
            inversionesStakingBalance.push(info);

          case 15:
            i++;
            _context2.next = 5;
            break;

          case 18:
            dispatch(updateTokenS(inversionesStakingBalance));

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.updateStakingTokens = updateStakingTokens;

var fetchBlockchain = function fetchBlockchain(address, signer, provider) {
  return function _callee3(dispatch) {
    var a, networkID, tokenContract, busdContract, usdtContract, exchangeContract, stakingContract, priceSetterContract, opcoStoreContract, marketContract, p2pContract, opcoContract, inversionesContract, inversioneStakingContract, tokenBalance, exchangeBalance, bnbBalance, busdBalance, usdtBalance, accountAddress, tokenBalanceFormatted, exchangeBalanceFormatted, busdBalanceFormatted, usdtBalanceFormatted, bnbBalanceFormatted, tokenPriceWeth, tokenPrice, exchangeOwner, isOwner, inversionesBalance, inversionesStakingBalance, inversionesBalances, inversionesStakingBalances, i, tipo, name, info, _i, restTime, reward, valorConvertido, _info;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            a = "production";
            dispatch(loadingBlockchain());
            _context3.prev = 2;
            _context3.prev = 3;
            _context3.next = 6;
            return regeneratorRuntime.awrap(provider.getNetwork());

          case 6:
            networkID = _context3.sent;

            if (!(a === 'production' && networkID.chainId === 56 || a === 'development' && networkID.chainId === 97)) {
              _context3.next = 85;
              break;
            }

            tokenContract = new _ethers.ethers.Contract(AOEX_ADDRESS, _coffeeAbi["default"], signer);
            busdContract = new _ethers.ethers.Contract(BUSD_ADDRESS, _abiERC["default"], signer);
            usdtContract = new _ethers.ethers.Contract(USDT_ADDRESS, _abiERC["default"], signer);
            exchangeContract = new _ethers.ethers.Contract(EXCHANGE_ADDRESS, _exchangedelay["default"], signer);
            stakingContract = new _ethers.ethers.Contract(STAKING_ADDRESS, _staking["default"], signer);
            priceSetterContract = new _ethers.ethers.Contract(router.PRICE_SETTER_ADDRESS, _priceSetter["default"], signer);
            opcoStoreContract = new _ethers.ethers.Contract(router.OPCO_ADDRESS, _opcoStore["default"], signer);
            marketContract = new _ethers.ethers.Contract(router.MARKET, _market["default"], signer);
            p2pContract = new _ethers.ethers.Contract(P2P_ADDRESS, _p2pAbi["default"], signer);
            opcoContract = new _ethers.ethers.Contract(OPCO__ADDRESS, _OpcoP["default"], signer);
            inversionesContract = new _ethers.ethers.Contract(INVERSIONES_ADDRESS, _Inversiones["default"], signer);
            inversioneStakingContract = new _ethers.ethers.Contract(STAKING__ADDRESS, _inversionesStaking["default"], signer);
            _context3.next = 22;
            return regeneratorRuntime.awrap(tokenContract.balanceOf(address));

          case 22:
            tokenBalance = _context3.sent;
            _context3.next = 25;
            return regeneratorRuntime.awrap(tokenContract.balanceOf(EXCHANGE_ADDRESS));

          case 25:
            exchangeBalance = _context3.sent;
            _context3.next = 28;
            return regeneratorRuntime.awrap(provider.getBalance(address));

          case 28:
            bnbBalance = _context3.sent;
            _context3.next = 31;
            return regeneratorRuntime.awrap(busdContract.balanceOf(address));

          case 31:
            busdBalance = _context3.sent;
            _context3.next = 34;
            return regeneratorRuntime.awrap(usdtContract.balanceOf(address));

          case 34:
            usdtBalance = _context3.sent;
            accountAddress = address; //8 decimals token

            tokenBalanceFormatted = parseFloat(tokenBalance) / Math.pow(10, 8);
            exchangeBalanceFormatted = parseFloat(exchangeBalance) / Math.pow(10, 8);
            busdBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(busdBalance));
            usdtBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(usdtBalance));
            bnbBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(bnbBalance));
            _context3.next = 43;
            return regeneratorRuntime.awrap(exchangeContract.fetchPrice());

          case 43:
            tokenPriceWeth = _context3.sent;
            tokenPrice = parseFloat(_ethers.ethers.utils.formatEther(tokenPriceWeth));
            _context3.next = 47;
            return regeneratorRuntime.awrap(exchangeContract.owner());

          case 47:
            exchangeOwner = _context3.sent;
            isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase(); // *TODO: Buscar una mejor solucion.

            inversionesBalance = [];
            inversionesStakingBalance = [];
            _context3.next = 53;
            return regeneratorRuntime.awrap(inversionesContract.getMyInventory(accountAddress));

          case 53:
            inversionesBalances = _context3.sent;
            _context3.next = 56;
            return regeneratorRuntime.awrap(inversioneStakingContract.getNfts(accountAddress));

          case 56:
            inversionesStakingBalances = _context3.sent;
            i = 0;

          case 58:
            if (!(inversionesBalances.length > i)) {
              _context3.next = 68;
              break;
            }

            _context3.next = 61;
            return regeneratorRuntime.awrap(inversionesContract.getTipo(parseInt(inversionesBalances[i])));

          case 61:
            tipo = _context3.sent;
            name = "Inversiones ".concat(tipo);
            info = {
              nombre: name,
              id: parseInt(inversionesBalances[i]),
              tipo: parseInt(tipo),
              image: "https://violet-disgusted-halibut-418.mypinata.cloud/ipfs/QmUncKwRVF1yXsckcTA3cQ6GgfMag1M8nQxgrKXMLWkbWH/".concat(tipo, ".png")
            };
            inversionesBalance.push(info);

          case 65:
            i++;
            _context3.next = 58;
            break;

          case 68:
            _i = 0;

          case 69:
            if (!(inversionesStakingBalances.length > _i)) {
              _context3.next = 82;
              break;
            }

            _context3.next = 72;
            return regeneratorRuntime.awrap(inversioneStakingContract.getRestTime(parseInt(inversionesStakingBalances[_i])));

          case 72:
            restTime = _context3.sent;
            _context3.next = 75;
            return regeneratorRuntime.awrap(inversioneStakingContract.rewardPerToken(parseInt(inversionesStakingBalances[_i]), accountAddress));

          case 75:
            reward = _context3.sent;
            valorConvertido = parseFloat(_ethers.ethers.utils.formatUnits(reward, 8)).toFixed(2);
            _info = {
              id: parseInt(inversionesStakingBalances[_i]),
              Tiempo: parseInt(restTime),
              currentReward: valorConvertido
            };
            inversionesStakingBalance.push(_info);

          case 79:
            _i++;
            _context3.next = 69;
            break;

          case 82:
            dispatch(loadingBlockchainSuccess({
              tokenContract: tokenContract,
              busdContract: busdContract,
              usdtContract: usdtContract,
              opcoContract: opcoContract,
              inversionesContract: inversionesContract,
              inversioneStakingContract: inversioneStakingContract,
              tokenBalance: tokenBalanceFormatted,
              bnbBalance: bnbBalanceFormatted,
              busdBalance: busdBalanceFormatted,
              usdtBalance: usdtBalanceFormatted,
              inversionesBalance: inversionesBalance,
              inversionesStakingBalance: inversionesStakingBalance,
              accountAddress: accountAddress,
              exchangeContract: exchangeContract,
              priceSetterContract: priceSetterContract,
              stakingContract: stakingContract,
              networkID: networkID.chainId,
              exchangeBalance: exchangeBalanceFormatted,
              signer: signer,
              opcoStoreContract: opcoStoreContract,
              tokenPrice: tokenPrice,
              marketContract: marketContract,
              p2pContract: p2pContract,
              isOwner: isOwner
            })); //   instance.on("accountsChanged", async (accounts) => {
            //       const tokenBalance = await tokenContract.balanceOf(address);
            //       const exchangeBalance = await tokenContract.balanceOf(EXCHANGE_ADDRESS);
            //       const bnbBalance = await provider.getBalance(address);
            //       const busdBalance = await busdContract.balanceOf(address);
            //       const usdtBalance = await usdtContract.balanceOf(address);
            //       const accountAddress = address;
            //       const tokenBalanceFormatted = parseFloat(tokenBalance) / 10 ** 8;
            //       const exchangeBalanceFormatted = parseFloat(exchangeBalance) / 10 ** 8;
            //       const busdBalanceFormatted = parseFloat(ethers.utils.formatEther(busdBalance));
            //       const usdtBalanceFormatted = parseFloat(ethers.utils.formatEther(usdtBalance));
            //       const bnbBalanceFormatted = parseFloat(ethers.utils.formatEther(bnbBalance));
            //       const exchangeOwner = await exchangeContract.owner();
            //       const isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase(); // *TODO: Buscar una mejor solucion.
            //       dispatch(updateAccount({
            //           tokenBalance: tokenBalanceFormatted,
            //           bnbBalance: bnbBalanceFormatted,
            //           busdBalance: busdBalanceFormatted,
            //           accountAddress,
            //           exchangeBalance: exchangeBalanceFormatted,
            //           usdtBalance: usdtBalanceFormatted,
            //           isOwner
            //       }))
            //   })

            _context3.next = 114;
            break;

          case 85:
            if (!(a === 'production')) {
              _context3.next = 105;
              break;
            }

            _context3.prev = 86;
            _context3.next = 89;
            return regeneratorRuntime.awrap(provider.provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{
                chainId: "0x".concat(Number(56).toString(16))
              }]
            }));

          case 89:
            _context3.next = 103;
            break;

          case 91:
            _context3.prev = 91;
            _context3.t0 = _context3["catch"](86);

            if (!(_context3.t0.code === 4902)) {
              _context3.next = 103;
              break;
            }

            _context3.prev = 94;
            _context3.next = 97;
            return regeneratorRuntime.awrap(provider.provider.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: "0x".concat(Number(56).toString(16)),
                chainName: "Binance Smart Chain ",
                nativeCurrency: {
                  name: "Binance Chain Native Token",
                  symbol: "BNB",
                  decimals: 18
                },
                rpcUrls: ["https:bsc-dataseed.binance.org"],
                blockExplorerUrls: ["https:bscscan.com"]
              }]
            }));

          case 97:
            _context3.next = 103;
            break;

          case 99:
            _context3.prev = 99;
            _context3.t1 = _context3["catch"](94);
            console.log(_context3.t1);
            dispatch(loadingBlockchainFailure(_context3.t1));

          case 103:
            _context3.next = 114;
            break;

          case 105:
            if (!(a === 'development')) {
              _context3.next = 114;
              break;
            }

            _context3.prev = 106;
            _context3.next = 109;
            return regeneratorRuntime.awrap(provider.provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{
                chainId: "0x".concat(Number(97).toString(16))
              }]
            }));

          case 109:
            _context3.next = 114;
            break;

          case 111:
            _context3.prev = 111;
            _context3.t2 = _context3["catch"](106);
            console.log(_context3.t2);

          case 114:
            _context3.next = 120;
            break;

          case 116:
            _context3.prev = 116;
            _context3.t3 = _context3["catch"](3);
            dispatch(loadingBlockchainFailure({
              errorMsg: 'Error de transaccion'
            }));
            console.log(_context3.t3);

          case 120:
            _context3.next = 128;
            break;

          case 122:
            _context3.prev = 122;
            _context3.t4 = _context3["catch"](2);
            alert(_context3.t4);
            web3Modal.clearCachedProvider();
            dispatch(loadingBlockchainFailure({
              errorMsg: 'Error de conneccion'
            }));
            console.log(_context3.t4);

          case 128:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[2, 122], [3, 116], [86, 91], [94, 99], [106, 111]]);
  };
};

exports.fetchBlockchain = fetchBlockchain;

var fetchBalance = function fetchBalance() {
  return function _callee4(dispatch, getState) {
    var _getState$blockchain, tokenContract, busdContract, usdtContract, accountAddress, exchangeContract, tokenBalance, busdBalance, usdtBalance, tokenBalanceFormatted, busdBalanceFormatted, usdtBalanceFormatted;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _getState$blockchain = getState().blockchain, tokenContract = _getState$blockchain.tokenContract, busdContract = _getState$blockchain.busdContract, usdtContract = _getState$blockchain.usdtContract, accountAddress = _getState$blockchain.accountAddress, exchangeContract = _getState$blockchain.exchangeContract;
            _context4.next = 3;
            return regeneratorRuntime.awrap(tokenContract.balanceOf(accountAddress));

          case 3:
            tokenBalance = _context4.sent;
            _context4.next = 6;
            return regeneratorRuntime.awrap(busdContract.balanceOf(accountAddress));

          case 6:
            busdBalance = _context4.sent;
            _context4.next = 9;
            return regeneratorRuntime.awrap(usdtContract.balanceOf(accountAddress));

          case 9:
            usdtBalance = _context4.sent;
            tokenBalanceFormatted = parseFloat(tokenBalance) / Math.pow(10, 8);
            busdBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(busdBalance));
            usdtBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(usdtBalance));
            dispatch(updateBalance(tokenBalanceFormatted, busdBalanceFormatted, usdtBalanceFormatted));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    });
  };
};

exports.fetchBalance = fetchBalance;

var disconnectBlockchainAction = function disconnectBlockchainAction() {
  return function _callee5(dispatch) {
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            //providerOptions.clearCachedProvider();
            dispatch(disconnectBlockchain());

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    });
  };
};

exports.disconnectBlockchainAction = disconnectBlockchainAction;