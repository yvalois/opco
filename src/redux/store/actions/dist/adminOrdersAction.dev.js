"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyUserRole = exports.confirmOrCancelOrder = exports.fetchAdminOrders = void 0;

var _Api = require("../../../store/utils/Api");

var requesAdminOrders = function requesAdminOrders() {
  return {
    type: "REQUEST_ADMIN_ORDER"
  };
};

var receiveAdminOrders = function receiveAdminOrders(payload) {
  return {
    type: "RECEIVE_ADMIN_ORDER",
    payload: payload
  };
};

var errorAdminOrders = function errorAdminOrders(payload) {
  return {
    type: "ERROR_ADMIN_ORDER",
    payload: payload
  };
};

var updateAdminOrders = function updateAdminOrders(payload) {
  return {
    type: "UPDATE_ADMIN_ORDER",
    payload: payload
  };
};

var updateAdminUsers = function updateAdminUsers(payload) {
  return {
    type: "UPDATE_ADMIN_OUSERS",
    payload: payload
  };
};

var fetchAdminOrders = function fetchAdminOrders() {
  return function _callee(dispatch) {
    var data, data2;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(requesAdminOrders());
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(_Api.Api.getAdminOrders());

          case 4:
            data = _context.sent;
            console.log(data);
            _context.next = 8;
            return regeneratorRuntime.awrap(_Api.Api.getUsers());

          case 8:
            data2 = _context.sent;
            dispatch(receiveAdminOrders({
              orders: data,
              users: data2
            }));
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            dispatch(errorAdminOrders(_context.t0));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 12]]);
  };
};

exports.fetchAdminOrders = fetchAdminOrders;

var confirmOrCancelOrder = function confirmOrCancelOrder(orderId, finalStatus) {
  return function _callee2(dispatch) {
    var data, data2;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(requesAdminOrders());
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(_Api.Api.confirmOrCancel(orderId, finalStatus));

          case 4:
            data = _context2.sent;
            _context2.next = 7;
            return regeneratorRuntime.awrap(_Api.Api.getUsers());

          case 7:
            data2 = _context2.sent;
            dispatch(receiveAdminOrders({
              orders: data,
              users: data2
            }));
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            dispatch(errorAdminOrders(_context2.t0));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 11]]);
  };
};

exports.confirmOrCancelOrder = confirmOrCancelOrder;

var modifyUserRole = function modifyUserRole(userId, newRole) {
  return function _callee3(dispatch) {
    var data;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dispatch(requesAdminOrders());
            _context3.prev = 1;
            _context3.next = 4;
            return regeneratorRuntime.awrap(_Api.Api.modifyUserRole(userId, newRole));

          case 4:
            data = _context3.sent;
            dispatch(updateAdminUsers(data));
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            dispatch(errorAdminOrders(_context3.t0));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 8]]);
  };
};

exports.modifyUserRole = modifyUserRole;