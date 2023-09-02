"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _blockchainReducer = _interopRequireDefault(require("./blockchain/blockchainReducer"));

var _dataReducer = _interopRequireDefault(require("./blockchain/dataReducer"));

var _timerReducer = _interopRequireDefault(require("./timerapi/timerReducer"));

var _minterReducer = _interopRequireDefault(require("./blockchain/minterReducer"));

var _apiReducer = _interopRequireDefault(require("./api/apiReducer"));

var _storeReducer = _interopRequireDefault(require("./store/reducers/storeReducer"));

var _productReducers = _interopRequireDefault(require("./store/reducers/productReducers"));

var _orderReducer = _interopRequireDefault(require("./store/reducers/orderReducer"));

var _categoryReducer = _interopRequireDefault(require("./store/reducers/categoryReducer"));

var _cartReducers = _interopRequireDefault(require("./store/reducers/cartReducers"));

var _adminOrdersReducer = _interopRequireDefault(require("./store/reducers/adminOrdersReducer"));

var _userReducer = _interopRequireDefault(require("./store/reducers/userReducer"));

var _tokenPriceReducer = _interopRequireDefault(require("./store/reducers/tokenPriceReducer"));

var _marketReducer = _interopRequireDefault(require("./market/marketReducer"));

var _subCategoryReducer = _interopRequireDefault(require("./store/reducers/subCategoryReducer"));

var _bannedReducers = _interopRequireDefault(require("./bannedAccounts/bannedReducers"));

var _p2preducer = _interopRequireDefault(require("./p2p/p2preducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootReducer = (0, _redux.combineReducers)({
  blockchain: _blockchainReducer["default"],
  data: _dataReducer["default"],
  time: _timerReducer["default"],
  minter: _minterReducer["default"],
  api: _apiReducer["default"],
  user: _userReducer["default"],
  store: _storeReducer["default"],
  product: _productReducers["default"],
  orders: _orderReducer["default"],
  category: _categoryReducer["default"],
  cart: _cartReducers["default"],
  adminOrders: _adminOrdersReducer["default"],
  tokenPrice: _tokenPriceReducer["default"],
  market: _marketReducer["default"],
  subcategory: _subCategoryReducer["default"],
  banned: _bannedReducers["default"],
  p2p: _p2preducer["default"]
});
var middleware = [_reduxThunk["default"]];
var composeEnhancers = (0, _redux.compose)(_redux.applyMiddleware.apply(void 0, middleware));

var configureStore = function configureStore() {
  return (0, _redux.createStore)(rootReducer, composeEnhancers);
};

var store = configureStore();
var _default = store;
exports["default"] = _default;