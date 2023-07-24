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
//  const providerOptions = {
//      walletconnect: {
//        package: WalletConnectProvider,
//        options: {
//          rpc: {
//          31337: "http://localhost:8545", // Agrega el RPC de tu red local de Hardhat
//            56: "https://bsc-dataseed.binance.org/",
//            97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
//          }
//        }
//      }
//    };

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
              _context2.next = 19;
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
            console.log(info);
            inversionesStakingBalance.push(info);

          case 16:
            i++;
            _context2.next = 5;
            break;

          case 19:
            dispatch(updateTokenS(inversionesStakingBalance));

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.updateStakingTokens = updateStakingTokens;

var fetchBlockchain = function fetchBlockchain() {
  return function _callee4(dispatch) {
    var a, _providerOptions, instance, provider, signer, accounts, networkID, tokenContract, busdContract, usdtContract, exchangeContract, stakingContract, priceSetterContract, opcoStoreContract, marketContract, p2pContract, opcoContract, inversionesContract, inversioneStakingContract, tokenBalance, exchangeBalance, bnbBalance, busdBalance, usdtBalance, accountAddress, tokenBalanceFormatted, exchangeBalanceFormatted, busdBalanceFormatted, usdtBalanceFormatted, bnbBalanceFormatted, tokenPriceWeth, tokenPrice, exchangeOwner, isOwner, inversionesBalance, inversionesStakingBalance, inversionesBalances, inversionesStakingBalances, i, tipo, name, info, _i, restTime, reward, valorConvertido, _info;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            a = "production";
            dispatch(loadingBlockchain());
            _context4.prev = 2;
            _context4.next = 5;
            return regeneratorRuntime.awrap(_ethereumProvider.EthereumProvider.init({
              projectId: '8e703b1c2e1918ec37ad64a8b1a38dd9',
              // required
              chains: [1],
              // required
              showQrModal: false // requires @walletconnect/modal

            }));

          case 5:
            _providerOptions = _context4.sent;
            _context4.next = 8;
            return regeneratorRuntime.awrap(web3Modal.connect(_providerOptions));

          case 8:
            instance = _context4.sent;
            provider = new _ethers.ethers.providers.Web3Provider(instance);
            signer = provider.getSigner();
            _context4.prev = 11;
            _context4.next = 14;
            return regeneratorRuntime.awrap(provider.listAccounts());

          case 14:
            accounts = _context4.sent;
            _context4.next = 17;
            return regeneratorRuntime.awrap(provider.getNetwork());

          case 17:
            networkID = _context4.sent;

            if (!(a === 'production' && networkID.chainId === 56 || a === 'development' && networkID.chainId === 97)) {
              _context4.next = 97;
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
            _context4.next = 33;
            return regeneratorRuntime.awrap(tokenContract.balanceOf(accounts[0]));

          case 33:
            tokenBalance = _context4.sent;
            _context4.next = 36;
            return regeneratorRuntime.awrap(tokenContract.balanceOf(EXCHANGE_ADDRESS));

          case 36:
            exchangeBalance = _context4.sent;
            _context4.next = 39;
            return regeneratorRuntime.awrap(provider.getBalance(accounts[0]));

          case 39:
            bnbBalance = _context4.sent;
            _context4.next = 42;
            return regeneratorRuntime.awrap(busdContract.balanceOf(accounts[0]));

          case 42:
            busdBalance = _context4.sent;
            _context4.next = 45;
            return regeneratorRuntime.awrap(usdtContract.balanceOf(accounts[0]));

          case 45:
            usdtBalance = _context4.sent;
            accountAddress = accounts[0]; //8 decimals token

            tokenBalanceFormatted = parseFloat(tokenBalance) / Math.pow(10, 8);
            exchangeBalanceFormatted = parseFloat(exchangeBalance) / Math.pow(10, 8);
            busdBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(busdBalance));
            usdtBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(usdtBalance));
            bnbBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(bnbBalance));
            _context4.next = 54;
            return regeneratorRuntime.awrap(exchangeContract.fetchPrice());

          case 54:
            tokenPriceWeth = _context4.sent;
            tokenPrice = parseFloat(_ethers.ethers.utils.formatEther(tokenPriceWeth));
            _context4.next = 58;
            return regeneratorRuntime.awrap(exchangeContract.owner());

          case 58:
            exchangeOwner = _context4.sent;
            isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase(); // *TODO: Buscar una mejor solucion.

            inversionesBalance = [];
            inversionesStakingBalance = [];
            _context4.next = 64;
            return regeneratorRuntime.awrap(inversionesContract.getMyInventory(accountAddress));

          case 64:
            inversionesBalances = _context4.sent;
            _context4.next = 67;
            return regeneratorRuntime.awrap(inversioneStakingContract.getNfts(accountAddress));

          case 67:
            inversionesStakingBalances = _context4.sent;
            i = 0;

          case 69:
            if (!(inversionesBalances.length > i)) {
              _context4.next = 79;
              break;
            }

            _context4.next = 72;
            return regeneratorRuntime.awrap(inversionesContract.getTipo(parseInt(inversionesBalances[i])));

          case 72:
            tipo = _context4.sent;
            name = "Inversiones ".concat(tipo);
            info = {
              nombre: name,
              id: parseInt(inversionesBalances[i]),
              tipo: parseInt(tipo),
              image: "https://violet-disgusted-halibut-418.mypinata.cloud/ipfs/QmUncKwRVF1yXsckcTA3cQ6GgfMag1M8nQxgrKXMLWkbWH/".concat(tipo, ".png")
            };
            inversionesBalance.push(info);

          case 76:
            i++;
            _context4.next = 69;
            break;

          case 79:
            _i = 0;

          case 80:
            if (!(inversionesStakingBalances.length > _i)) {
              _context4.next = 93;
              break;
            }

            _context4.next = 83;
            return regeneratorRuntime.awrap(inversioneStakingContract.getRestTime(parseInt(inversionesStakingBalances[_i])));

          case 83:
            restTime = _context4.sent;
            _context4.next = 86;
            return regeneratorRuntime.awrap(inversioneStakingContract.rewardPerToken(parseInt(inversionesStakingBalances[_i]), accountAddress));

          case 86:
            reward = _context4.sent;
            valorConvertido = parseFloat(_ethers.ethers.utils.formatUnits(reward, 8)).toFixed(2);
            _info = {
              id: parseInt(inversionesStakingBalances[_i]),
              Tiempo: parseInt(restTime),
              currentReward: valorConvertido
            };
            inversionesStakingBalance.push(_info);

          case 90:
            _i++;
            _context4.next = 80;
            break;

          case 93:
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
            }));
            instance.on("accountsChanged", function _callee3(accounts) {
              var tokenBalance, exchangeBalance, bnbBalance, busdBalance, usdtBalance, accountAddress, tokenBalanceFormatted, exchangeBalanceFormatted, busdBalanceFormatted, usdtBalanceFormatted, bnbBalanceFormatted, exchangeOwner, isOwner;
              return regeneratorRuntime.async(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return regeneratorRuntime.awrap(tokenContract.balanceOf(accounts[0]));

                    case 2:
                      tokenBalance = _context3.sent;
                      _context3.next = 5;
                      return regeneratorRuntime.awrap(tokenContract.balanceOf(EXCHANGE_ADDRESS));

                    case 5:
                      exchangeBalance = _context3.sent;
                      _context3.next = 8;
                      return regeneratorRuntime.awrap(provider.getBalance(accounts[0]));

                    case 8:
                      bnbBalance = _context3.sent;
                      _context3.next = 11;
                      return regeneratorRuntime.awrap(busdContract.balanceOf(accounts[0]));

                    case 11:
                      busdBalance = _context3.sent;
                      _context3.next = 14;
                      return regeneratorRuntime.awrap(usdtContract.balanceOf(accounts[0]));

                    case 14:
                      usdtBalance = _context3.sent;
                      accountAddress = accounts[0];
                      tokenBalanceFormatted = parseFloat(tokenBalance) / Math.pow(10, 8);
                      exchangeBalanceFormatted = parseFloat(exchangeBalance) / Math.pow(10, 8);
                      busdBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(busdBalance));
                      usdtBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(usdtBalance));
                      bnbBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(bnbBalance));
                      _context3.next = 23;
                      return regeneratorRuntime.awrap(exchangeContract.owner());

                    case 23:
                      exchangeOwner = _context3.sent;
                      isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase(); // *TODO: Buscar una mejor solucion.

                      dispatch(updateAccount({
                        tokenBalance: tokenBalanceFormatted,
                        bnbBalance: bnbBalanceFormatted,
                        busdBalance: busdBalanceFormatted,
                        accountAddress: accountAddress,
                        exchangeBalance: exchangeBalanceFormatted,
                        usdtBalance: usdtBalanceFormatted,
                        isOwner: isOwner
                      }));

                    case 26:
                    case "end":
                      return _context3.stop();
                  }
                }
              });
            });
            _context4.next = 126;
            break;

          case 97:
            if (!(a === 'production')) {
              _context4.next = 117;
              break;
            }

            _context4.prev = 98;
            _context4.next = 101;
            return regeneratorRuntime.awrap(provider.provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{
                chainId: "0x".concat(Number(56).toString(16))
              }]
            }));

          case 101:
            _context4.next = 115;
            break;

          case 103:
            _context4.prev = 103;
            _context4.t0 = _context4["catch"](98);

            if (!(_context4.t0.code === 4902)) {
              _context4.next = 115;
              break;
            }

            _context4.prev = 106;
            _context4.next = 109;
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

          case 109:
            _context4.next = 115;
            break;

          case 111:
            _context4.prev = 111;
            _context4.t1 = _context4["catch"](106);
            console.log(_context4.t1);
            dispatch(loadingBlockchainFailure(_context4.t1));

          case 115:
            _context4.next = 126;
            break;

          case 117:
            if (!(a === 'development')) {
              _context4.next = 126;
              break;
            }

            _context4.prev = 118;
            _context4.next = 121;
            return regeneratorRuntime.awrap(provider.provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{
                chainId: "0x".concat(Number(97).toString(16))
              }]
            }));

          case 121:
            _context4.next = 126;
            break;

          case 123:
            _context4.prev = 123;
            _context4.t2 = _context4["catch"](118);
            console.log(_context4.t2);

          case 126:
            _context4.next = 132;
            break;

          case 128:
            _context4.prev = 128;
            _context4.t3 = _context4["catch"](11);
            dispatch(loadingBlockchainFailure({
              errorMsg: 'Error de transaccion'
            }));
            console.log(_context4.t3);

          case 132:
            _context4.next = 140;
            break;

          case 134:
            _context4.prev = 134;
            _context4.t4 = _context4["catch"](2);
            alert(_context4.t4);
            web3Modal.clearCachedProvider();
            dispatch(loadingBlockchainFailure({
              errorMsg: 'Error de conneccion'
            }));
            console.log(_context4.t4);

          case 140:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[2, 134], [11, 128], [98, 103], [106, 111], [118, 123]]);
  };
};

exports.fetchBlockchain = fetchBlockchain;

var fetchBalance = function fetchBalance() {
  return function _callee5(dispatch, getState) {
    var _getState$blockchain, tokenContract, busdContract, usdtContract, accountAddress, exchangeContract, tokenBalance, busdBalance, usdtBalance, tokenBalanceFormatted, busdBalanceFormatted, usdtBalanceFormatted;

    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _getState$blockchain = getState().blockchain, tokenContract = _getState$blockchain.tokenContract, busdContract = _getState$blockchain.busdContract, usdtContract = _getState$blockchain.usdtContract, accountAddress = _getState$blockchain.accountAddress, exchangeContract = _getState$blockchain.exchangeContract;
            _context5.next = 3;
            return regeneratorRuntime.awrap(tokenContract.balanceOf(accountAddress));

          case 3:
            tokenBalance = _context5.sent;
            _context5.next = 6;
            return regeneratorRuntime.awrap(busdContract.balanceOf(accountAddress));

          case 6:
            busdBalance = _context5.sent;
            _context5.next = 9;
            return regeneratorRuntime.awrap(usdtContract.balanceOf(accountAddress));

          case 9:
            usdtBalance = _context5.sent;
            tokenBalanceFormatted = parseFloat(tokenBalance) / Math.pow(10, 8);
            busdBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(busdBalance));
            usdtBalanceFormatted = parseFloat(_ethers.ethers.utils.formatEther(usdtBalance));
            dispatch(updateBalance(tokenBalanceFormatted, busdBalanceFormatted, usdtBalanceFormatted));

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    });
  };
};

exports.fetchBalance = fetchBalance;

var disconnectBlockchainAction = function disconnectBlockchainAction() {
  return function _callee6(dispatch) {
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            //providerOptions.clearCachedProvider();
            dispatch(disconnectBlockchain());

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    });
  };
};

exports.disconnectBlockchainAction = disconnectBlockchainAction;