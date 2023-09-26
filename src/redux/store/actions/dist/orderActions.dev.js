"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirmOrCancelOrder = exports.createOrder = exports.fetchOrder = void 0;

var _Api = require("../../../store/utils/Api");

var requestOrder = function requestOrder() {
  return {
    type: "REQUEST_ORDER"
  };
};

var receiveOrder = function receiveOrder(payload) {
  return {
    type: "RECEIVE_ORDER",
    payload: payload
  };
};

var errorOrder = function errorOrder(payload) {
  return {
    type: "ERROR_ORDER",
    payload: payload
  };
};

var updateOrder = function updateOrder(payload) {
  return {
    type: "UPDATE_ORDER",
    payload: payload
  };
};

var deleteOrder = function deleteOrder(payload) {
  return {
    type: "DELETE_ORDER",
    payload: payload
  };
};

var savingOrder = function savingOrder() {
  return {
    type: "SAVING_ORDER"
  };
};

var orderSaved = function orderSaved(payload) {
  return {
    type: "ORDER_SAVED",
    payload: payload
  };
};

var fetchOrder = function fetchOrder() {
  return function _callee(dispatch) {
    var data;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch(requestOrder());
            console.log(_Api.Api);
            _context.prev = 2;
            _context.next = 5;
            return regeneratorRuntime.awrap(_Api.Api.getOrders());

          case 5:
            data = _context.sent;
            dispatch(receiveOrder(data));
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            dispatch(errorOrder(_context.t0));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[2, 9]]);
  };
};

exports.fetchOrder = fetchOrder;

var createOrder = function createOrder(order) {
  return function _callee2(dispatch) {
    var data;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch(requestOrder());
            dispatch(savingOrder());
            _context2.prev = 2;
            _context2.next = 5;
            return regeneratorRuntime.awrap(_Api.Api.createOrder(order));

          case 5:
            data = _context2.sent;
            dispatch(receiveOrder(data));
            _context2.next = 13;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](2);
            dispatch(errorOrder(_context2.t0));
            dispatch(orderSaved(false));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[2, 9]]);
  };
};

exports.createOrder = createOrder;

var confirmOrCancelOrder = function confirmOrCancelOrder(orderId, finalStatus) {
  return function _callee3(dispatch) {
    var data;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            dispatch(requestOrder());
            dispatch(savingOrder());
            _context3.prev = 2;
            _context3.next = 5;
            return regeneratorRuntime.awrap(_Api.Api.confirmOrCancel(orderId, finalStatus));

          case 5:
            data = _context3.sent;
            dispatch(receiveOrder(data.orders));
            _context3.next = 13;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](2);
            dispatch(errorOrder(_context3.t0));
            dispatch(orderSaved(false));

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[2, 9]]);
  };
};

exports.confirmOrCancelOrder = confirmOrCancelOrder;