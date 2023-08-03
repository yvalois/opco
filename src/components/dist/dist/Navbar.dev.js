"use strict";

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;

var react_redux_1 = require("react-redux");

require("../style/style_navbar.css");

var blockchainAction_1 = require("../redux/blockchain/blockchainAction");

var logo_png_1 = require("../images/logo/logo.png");

var ai_1 = require("react-icons/ai");

var react_1 = require("react");

var fa_1 = require("react-icons/fa");

var fi_1 = require("react-icons/fi");

var dataActions_1 = require("../redux/blockchain/dataActions");

var minterAction_1 = require("../redux/blockchain/minterAction");

var marketAction_1 = require("../redux/market/marketAction");

var bannedActions_1 = require("../redux/bannedAccounts/bannedActions");

var react_2 = require("@web3modal/react");

var wagmi_1 = require("wagmi");

var ethers_js_1 = require("../utils/ethers.js");

function Navbar(_a) {
  var _this = this;

  var _b;

  var isOpen2 = _a.isOpen2,
      setIsOpen2 = _a.setIsOpen2;
  var blockchain = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  });
  var accountAddress = react_redux_1.useSelector(function (state) {
    return state.blockchain;
  }).accountAddress;

  var _c = react_redux_1.useSelector(function (state) {
    return state.market;
  }),
      market = _c.market,
      marketloaded = _c.marketloaded;

  var dispatch = react_redux_1.useDispatch();

  var _d = react_1.useState(""),
      account = _d[0],
      setAccountAddress = _d[1];

  var _e = react_1.useState(false),
      is = _e[0],
      setIs = _e[1];

  react_1.useEffect(function () {
    if (blockchain.accountAddress) {
      var accountAddress_1 = blockchain.accountAddress.slice(0, 4) + "..." + blockchain.accountAddress.slice(blockchain.accountAddress.length - 4);
      setAccountAddress(accountAddress_1);
      dispatch(bannedActions_1.getBanned());
      dispatch(minterAction_1.fetchMinter());
    }
  }, [blockchain.accountAddress]);
  react_1.useEffect(function () {
    if (!marketloaded) {
      dispatch(marketAction_1.getMarket());
    }
  }, [marketloaded]);

  var disconnectBlockchain = function disconnectBlockchain() {
    dispatch(blockchainAction_1.disconnectBlockchainAction());
    dispatch(dataActions_1.logOutAction());
    dispatch(minterAction_1.disconnectMinterAction());
    disconnect();
  };

  var _f = react_2.useWeb3Modal(),
      isOpen = _f.isOpen,
      open = _f.open,
      close = _f.close,
      setDefaultChain = _f.setDefaultChain;

  var _g = wagmi_1.useAccount(),
      address = _g.address,
      isConnecting = _g.isConnecting,
      isDisconnected = _g.isDisconnected,
      isConnected = _g.isConnected;

  var _h = wagmi_1.useConnect(),
      connect = _h.connect,
      connectors = _h.connectors,
      error = _h.error,
      isLoading = _h.isLoading,
      pendingConnector = _h.pendingConnector;

  var disconnect = wagmi_1.useDisconnect().disconnect;
  var chain = wagmi_1.useNetwork().chain;

  var getSign = function getSign() {
    return __awaiter(_this, void 0, void 0, function () {
      var signer, provider;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , ethers_js_1.getEthersSigner(chain === null || chain === void 0 ? void 0 : chain.id)];

          case 1:
            signer = _a.sent();
            provider = ethers_js_1.getEthersProvider(chain === null || chain === void 0 ? void 0 : chain.id);
            dispatch(blockchainAction_1.fetchBlockchain(address, signer, provider));
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  react_1.useEffect(function () {
    if (isConnected && accountAddress === null && is === false && (chain === null || chain === void 0 ? void 0 : chain.unsupported) !== undefined && !(chain === null || chain === void 0 ? void 0 : chain.unsupported)) {
      setTimeout(function () {
        getSign();
        setIs(true);
      }, 2000);
    } else if ((chain === null || chain === void 0 ? void 0 : chain.unsupported) !== undefined && (chain === null || chain === void 0 ? void 0 : chain.unsupported)) {
      open();
    } else if (!isConnected) {
      setIs(false);
    }
  }, [isConnected, accountAddress, account]);

  var abrir = function abrir() {
    if (!isConnected) {
      open();
    }
  };

  return React.createElement("section", {
    className: "bg-gray-200 p-0 m-0 fixed top-0 w-screen z-10"
  }, React.createElement("nav", {
    className: "navbar navbar-dropdown navbar-fixed-top navbar-expand-lg bg-black"
  }, React.createElement("div", {
    className: "container-fluid"
  }, React.createElement("div", {
    className: "w-auto flex flex-row items-center ml-5 space-x-2 no-underline"
  }, React.createElement("span", null, React.createElement("a", {
    href: "https://opencoffee.io"
  }, React.createElement("img", {
    src: logo_png_1["default"],
    alt: "",
    className: "w-12"
  }))), React.createElement("span", {
    className: "hidden sm:block"
  }, React.createElement("div", {
    className: "navbar-caption text-white font-semibold text-lg",
    href: "https://opencoffee.io"
  }, "OPEN COFFEE"))), React.createElement("div", {
    className: "flex w-auto space-x-2"
  }, React.createElement("div", {
    className: "flex items-center justify-center space-x-2 "
  }, React.createElement("a", {
    className: "iconfont-wrapper hidden xl:block",
    href: "https://www.facebook.com/OpenCoffeToken/",
    target: "_blank",
    rel: "noreferrer"
  }, React.createElement(fa_1.FaFacebookF, {
    className: "text-xl text-yellow-300"
  })), React.createElement("a", {
    className: "iconfont-wrapper hidden xl:block",
    href: "https://twitter.com/opencoffeetoken",
    target: "_blank",
    rel: "noreferrer"
  }, React.createElement(fa_1.FaTwitter, {
    className: "text-xl text-yellow-300"
  })), React.createElement("a", {
    className: "iconfont-wrapper hidden xl:block",
    href: "https://www.instagram.com/opencoffeetoken/",
    target: "_blank",
    rel: "noreferrer"
  }, React.createElement(fi_1.FiInstagram, {
    className: "text-xl text-yellow-300"
  })), React.createElement("a", {
    className: "iconfont-wrapper hidden xl:block",
    href: "https://youtube.com/channel/UC2plERh9CPd-AttJ_8D0cWw",
    target: "_blank",
    rel: "noreferrer"
  }, React.createElement(fa_1.FaYoutube, {
    className: "text-xl text-yellow-300"
  }))), React.createElement("div", {
    className: "flex space-x-4"
  }, React.createElement("div", {
    className: "flex items-center ml-2"
  }, accountAddress === null ? React.createElement("button", {
    className: "text-black text-sm flex items-center justify-center rounded-lg py-1 px-3 cursor-pointer  border-black bg-yellow-300 min-w-60  shadow-text",
    onClick: function onClick() {
      abrir();
    }
  }, isConnected && accountAddress === null ? 'conectando...' : 'Conectar') : React.createElement(React.Fragment, null, React.createElement("div", {
    className: "connection flex items-center space-x-2"
  }, "+", React.createElement("div", null, React.createElement("p", {
    className: "text-white text-sm pb-0 mb-0"
  }, account), React.createElement("p", {
    className: "text-white text-sm pb-0 mb-0"
  }, "OPCO:", (_b = blockchain === null || blockchain === void 0 ? void 0 : blockchain.tokenBalance) === null || _b === void 0 ? void 0 : _b.toFixed(2))), React.createElement("div", {
    className: "logOut bg-red-500 text-white text-sm font-semibold flex items-center justify-center cursor-pointer h-7 py-0 px-2 rounded-md",
    onClick: disconnectBlockchain
  }, "logout")))), React.createElement("button", {
    className: "navbar-toggler ms-auto lg:hidden",
    type: "button",
    onClick: function onClick() {
      setIsOpen2(!isOpen2);
    }
  }, React.createElement(ai_1.AiOutlineMenu, {
    className: "text-white"
  })))))));
}

exports["default"] = Navbar;