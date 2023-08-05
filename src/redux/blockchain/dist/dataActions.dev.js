"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logOutAction = exports.updateDataAction = exports.fetchData = void 0;

var _store = _interopRequireDefault(require("../store"));

var _ethers = require("ethers");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var timestampToDays = function timestampToDays(timestamp) {
  if (timestamp < 60) {
    return "".concat(timestamp, " seconds");
  } else if (timestamp < 3600) {
    return "".concat(Math.floor(timestamp / 60), " minutes");
  } else if (timestamp < 86400) {
    return "".concat(Math.floor(timestamp / 3600), " hours");
  } else if (timestamp < 2592000) {
    return "".concat(Math.floor(timestamp / 86400), " days");
  } else if (timestamp < 31536000) {
    return "".concat(Math.floor(timestamp / 2592000), " months");
  } else {
    return "".concat(Math.floor(timestamp / 31536000), " years");
  }
};

var timestampToDate = function timestampToDate(timestamp) {
  return _moment["default"].unix(timestamp).format("DD MMM, YYYY");
};

var loadingData = function loadingData() {
  return {
    type: "LOADING_DATA"
  };
};

var loadingDataSuccess = function loadingDataSuccess(payload) {
  return {
    type: "LOADING_DATA_SUCCESS",
    payload: payload
  };
};

var loadingDataFailure = function loadingDataFailure(payload) {
  return {
    type: "LOADING_DATA_FAILURE",
    payload: payload
  };
};

var updateData = function updateData(pools, accountPools, Data) {
  return {
    type: "UPDATE_DATA",
    payload: {
      pools: pools,
      accountPools: accountPools,
      Data: Data
    }
  };
};

var logOut = function logOut() {
  return {
    type: "LOG_OUT"
  };
};

var fetchData = function fetchData() {
  return function _callee(dispatch) {
    var Pools, Data, AccountPools, staking, token, getPools, data, accountPools, address, allow, allowed, _ref, bannedAccounts, bannedLoaded, bannedWallets, filterbanPools, pools, getData, accountsPools1, accountsPools, getAccountPools, TokenPrice, tokenPrice;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(loadingData());
            _context.prev = 1;
            //cambia nombre de funcionas y un poco de logica de como se hacen los gets
            Pools = [];
            Data = [];
            AccountPools = [];
            _context.next = 7;
            return regeneratorRuntime.awrap(_store["default"].getState().blockchain.stakingContract);

          case 7:
            staking = _context.sent;
            _context.next = 10;
            return regeneratorRuntime.awrap(_store["default"].getState().blockchain.tokenContract);

          case 10:
            token = _context.sent;

            if (!staking) {
              _context.next = 45;
              break;
            }

            _context.next = 14;
            return regeneratorRuntime.awrap(staking.getAllPools());

          case 14:
            getPools = _context.sent;
            _context.next = 17;
            return regeneratorRuntime.awrap(staking.getAllData());

          case 17:
            data = _context.sent;
            _context.next = 20;
            return regeneratorRuntime.awrap(staking.getStakingPoolInfos());

          case 20:
            accountPools = _context.sent;
            _context.next = 23;
            return regeneratorRuntime.awrap(_store["default"].getState().blockchain.accountAddress);

          case 23:
            address = _context.sent;
            _context.next = 26;
            return regeneratorRuntime.awrap(token.allowance(_store["default"].getState().blockchain.accountAddress, staking.address));

          case 26:
            allow = _context.sent;
            allowed = _ethers.ethers.utils.formatEther(allow);
            _context.next = 30;
            return regeneratorRuntime.awrap(_store["default"].getState().banned);

          case 30:
            _ref = _context.sent;
            bannedAccounts = _ref.bannedAccounts;
            bannedLoaded = _ref.bannedLoaded;
            bannedWallets = bannedAccounts.banneds;
            filterbanPools = getPools.filter(function (pool) {
              var banned = bannedWallets.find(function (banned) {
                return banned.addressBanned === address;
              });

              if (banned) {
                if (banned.poolsBanned.includes(pool.poolId)) {
                  return false;
                }
              }

              return true;
            });
            pools = filterbanPools.map(function (pool) {
              Pools.push({
                stakeTokensLimit: parseFloat(_ethers.ethers.utils.formatEther(pool.stakeTokensLimit)),
                stakingStartTime: (0, _moment["default"])(pool.stakingStartTime).format("DD MMM YYYY"),
                stakeApr: parseInt(_ethers.ethers.utils.formatEther(pool.stakeApr)),
                tokenLockedTime: timestampToDays(pool.tokenLockedTime),
                poolId: pool.poolId,
                active: pool.active,
                tokenLimitPerWallet: parseFloat(_ethers.ethers.utils.formatEther(pool.tokenLimitPerWallet))
              });
            });
            getData = data.map(function (data) {
              Data.push({
                owner: data.owner,
                stakedTokens: parseFloat(_ethers.ethers.utils.formatEther(data.stakedTokens)),
                rewardedAmount: parseFloat(_ethers.ethers.utils.formatEther(data.rewardedAmount)),
                index: parseInt(data.index),
                poolId: data.poolId,
                stakeTime: timestampToDate(data.stakeTime),
                startTime: timestampToDate(data.startTime),
                dateClaimed: timestampToDate(data.dateClaimed),
                tokenLockedTime: _moment["default"].unix(data.tokenLockedTime).format("DD MMM YYYY"),
                active: data.active
              });
            });
            accountsPools1 = accountPools.filter(function (accountPool) {
              return parseFloat(accountPool.stakedTokens) !== 0;
            }); // filter banned pools from accountPools

            accountsPools = accountsPools1.filter(function (accountPool) {
              var banned = bannedWallets.find(function (banned) {
                return banned.addressBanned === address;
              });

              if (banned) {
                return !banned.poolsBanned.includes(accountPool.poolId);
              } else {
                return true;
              }
            });
            getAccountPools = accountsPools.map(function (pool) {
              if (pool.active === true) {
                AccountPools.push({
                  poolId: pool.poolId,
                  stakedTokens: parseFloat(_ethers.ethers.utils.formatEther(pool.stakedTokens)).toFixed(2),
                  rewardedAmount: parseFloat(_ethers.ethers.utils.formatEther(pool.rewardedAmount)).toFixed(2),
                  active: pool.active,
                  stakeTime: pool.stakeTime,
                  startTime: (0, _moment["default"])(pool.startTime).format("DD MMM YYYY"),
                  tokenLockedTime: pool.tokenLockedTime,
                  dateClaimed: pool.dateClaimed,
                  index: parseInt(pool.index)
                });
              }
            });
            _context.next = 42;
            return regeneratorRuntime.awrap(staking.tokenPrice());

          case 42:
            TokenPrice = _context.sent;
            tokenPrice = parseFloat(_ethers.ethers.utils.formatEther(TokenPrice));
            dispatch(loadingDataSuccess({
              pools: Pools,
              accountPools: AccountPools,
              Data: Data,
              tokenPrice: tokenPrice,
              allowance: allowed
            }));

          case 45:
            _context.next = 50;
            break;

          case 47:
            _context.prev = 47;
            _context.t0 = _context["catch"](1);
            dispatch(loadingDataFailure({
              errorMsg: _context.t0
            }));

          case 50:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 47]]);
  };
};

exports.fetchData = fetchData;

var updateDataAction = function updateDataAction() {
  return function (dispatch) {
    try {
      dispatch(fetchData());
    } catch (error) {
      console.log(error);
    }
  };
};

exports.updateDataAction = updateDataAction;

var logOutAction = function logOutAction() {
  return function (dispatch) {
    dispatch(logOut());
  };
};

exports.logOutAction = logOutAction;