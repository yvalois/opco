"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: false,
  error: null,
  errorMsg: null,
  tokenContract: null,
  busdContract: null,
  busdBalance: null,
  bnbBalance: null,
  usdtBalance: null,
  inversionesBalance: [],
  inversionesStakingBalance: [],
  usdtContract: null,
  opcoContract: null,
  inversionesContract: null,
  inversioneStakingContract: null,
  tokenBalance: null,
  accountAddress: null,
  exchangeContract: null,
  stakingContract: null,
  priceSetterContract: null,
  opcoStoreContract: null,
  networkID: null,
  exchangeBalance: null,
  signer: null,
  tokenPrice: null,
  marketContract: null,
  p2pContract: null,
  isOwner: false,
  inversionesContractProvider: null,
  isConnect: false
};

var blockchainReducer = function blockchainReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOADING_BLOCKCHAIN':
      return _objectSpread({}, state, {
        loading: true,
        error: null,
        errorMsg: null
      });

    case 'LOADING_BLOCKCHAIN_SUCCESS':
      return _objectSpread({}, state, {
        loading: false,
        error: null,
        errorMsg: null,
        tokenContract: action.payload.tokenContract,
        busdContract: action.payload.busdContract,
        bnbBalance: action.payload.bnbBalance,
        tokenBalance: action.payload.tokenBalance,
        busdBalance: action.payload.busdBalance,
        usdtBalance: action.payload.usdtBalance,
        inversionesBalance: action.payload.inversionesBalance,
        inversionesStakingBalance: action.payload.inversionesStakingBalance,
        usdtContract: action.payload.usdtContract,
        opcoContract: action.payload.opcoContract,
        inversionesContract: action.payload.inversionesContract,
        inversioneStakingContract: action.payload.inversioneStakingContract,
        accountAddress: action.payload.accountAddress,
        exchangeContract: action.payload.exchangeContract,
        priceSetterContract: action.payload.priceSetterContract,
        stakingContract: action.payload.stakingContract,
        networkID: action.payload.networkID,
        exchangeBalance: action.payload.exchangeBalance,
        signer: action.payload.signer,
        opcoStoreContract: action.payload.opcoStoreContract,
        tokenPrice: action.payload.tokenPrice,
        marketContract: action.payload.marketContract,
        p2pContract: action.payload.p2pContract,
        isOwner: action.payload.isOwner,
        isConnect: true
      });

    case 'LOADING_BLOCKCHAIN_FAILURE':
      return _objectSpread({}, state, {
        loading: false,
        error: true,
        errorMsg: action.payload.errorMsg
      });

    case 'UPDATE_ACCOUNT':
      return _objectSpread({}, state, {
        accountAddress: action.payload.accountAddress,
        tokenBalance: action.payload.tokenBalance,
        busdBalance: action.payload.busdBalance,
        bnbBalance: action.payload.bnbBalance,
        usdtBalance: action.payload.usdtBalance,
        exchangeBalance: action.payload.exchangeBalance,
        tokenPrice: action.payload.tokenPrice,
        isOwner: action.payload.isOwner,
        isConnect: true
      });

    case 'UPDATE_BALANCE':
      return _objectSpread({}, state, {
        tokenBalance: action.payload.tokenBalance,
        busdBalance: action.payload.busdBalance,
        bnbBalance: action.payload.bnbBalance,
        usdtBalance: action.payload.usdtBalance
      });

    case 'UPDATE_BALANCE_STAKING':
      return _objectSpread({}, state, {
        inversionesStakingBalance: action.payload.tokens
      });

    case 'UPDATE_BALANCE_INVERSIONES':
      return _objectSpread({}, state, {
        inversionesBalance: action.payload.tokens
      });

    case 'UPDATE_INVERSIONES_PROVIDER':
      return _objectSpread({}, state, {
        inversionesContractProvider: action.payload.inversionesContract
      });

    case 'DISCONNECT_BLOCKCHAIN':
      return _objectSpread({}, state, {
        loading: false,
        error: null,
        errorMsg: null,
        tokenContract: null,
        busdContract: null,
        busdBalance: null,
        bnbBalance: null,
        usdtBalance: null,
        tokenBalance: null,
        accountAddress: null,
        exchangeContract: null,
        networkID: null,
        exchangeBalance: null,
        signer: null,
        opcoStoreContract: null,
        tokenPrice: null,
        marketContract: null,
        p2pContract: null,
        stakingContract: null,
        priceSetterContract: null,
        usdtContract: null,
        isConnect: false
      });

    default:
      return state;
  }
};

var _default = blockchainReducer;
exports["default"] = _default;