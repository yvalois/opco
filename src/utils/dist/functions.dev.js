"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buyNft = exports.getBalance = void 0;

var _core = require("@wagmi/core");

var _blockchainRouter = require("../redux/blockchain/blockchainRouter");

var _coffeeAbi = _interopRequireDefault(require("../abis/coffeeAbi.json"));

var _abiERC = _interopRequireDefault(require("../abis/abiERC20.json"));

var _Inversiones = _interopRequireDefault(require("../abis/Inversiones.json"));

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

var getBalance = function getBalance(address, contract, publicClient) {
  var contractAddress, abi, data;
  return regeneratorRuntime.async(function getBalance$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.t0 = contract;
          _context.next = _context.t0 === 'busd' ? 3 : _context.t0 === 'usdt' ? 6 : 9;
          break;

        case 3:
          contractAddress = BUSD_ADDRESS;
          abi = _abiERC["default"];
          return _context.abrupt("break", 12);

        case 6:
          contractAddress = USDT_ADDRESS;
          abi = _abiERC["default"];
          return _context.abrupt("break", 12);

        case 9:
          contractAddress = AOEX_ADDRESS;
          abi = _coffeeAbi["default"];
          return _context.abrupt("break", 12);

        case 12:
          if (!(address !== undefined)) {
            _context.next = 16;
            break;
          }

          data = (0, _core.readContract)({
            address: contractAddress,
            abi: abi,
            functionName: 'totalSupply'
          });
          console.log(data);
          return _context.abrupt("return", data);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getBalance = getBalance;

var buyNft = function buyNft(address, contract, publicClient) {
  var contractAddress, abi, data;
  return regeneratorRuntime.async(function buyNft$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.t0 = contract;
          _context2.next = _context2.t0 === 'busd' ? 3 : _context2.t0 === 'usdt' ? 6 : 9;
          break;

        case 3:
          contractAddress = BUSD_ADDRESS;
          abi = _abiERC["default"];
          return _context2.abrupt("break", 12);

        case 6:
          contractAddress = USDT_ADDRESS;
          abi = _abiERC["default"];
          return _context2.abrupt("break", 12);

        case 9:
          contractAddress = AOEX_ADDRESS;
          abi = _coffeeAbi["default"];
          return _context2.abrupt("break", 12);

        case 12:
          if (!(address !== undefined)) {
            _context2.next = 18;
            break;
          }

          _context2.next = 15;
          return regeneratorRuntime.awrap((0, _core.readContract)({
            address: contractAddress,
            abi: abi,
            functionName: 'totalSupply'
          }));

        case 15:
          data = _context2.sent;
          console.log(data);
          return _context2.abrupt("return", data);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.buyNft = buyNft;