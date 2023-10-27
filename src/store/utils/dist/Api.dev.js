"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Api = exports.TOKEN_NAME = exports.STORE_ID = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _localstorage = require("./localstorage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API = process.env.REACT_APP_BACK; //const API = "http://localhost:3000/api"

var STORE_ID = "62f8d7884c3b4800136678c8";
exports.STORE_ID = STORE_ID;
var TOKEN_NAME = 'OPCO';
exports.TOKEN_NAME = TOKEN_NAME;

var getStore = function getStore() {
  var _ref, data;

  return regeneratorRuntime.async(function getStore$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/stores/").concat(STORE_ID)));

        case 2:
          _ref = _context.sent;
          data = _ref.data;
          return _context.abrupt("return", data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var updateStore = function updateStore(store) {
  var token, headers, _ref2, data;

  return regeneratorRuntime.async(function updateStore$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context2.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(API, "/stores/update"), store, {
            headers: headers
          }));

        case 4:
          _ref2 = _context2.sent;
          data = _ref2.data;
          return _context2.abrupt("return", data);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getUser = function getUser() {
  var token, headers, _ref3, data;

  return regeneratorRuntime.async(function getUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context3.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/user/user"), {
            headers: headers
          }));

        case 4:
          _ref3 = _context3.sent;
          data = _ref3.data;
          return _context3.abrupt("return", data);

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getUsers = function getUsers() {
  var token, headers, _ref4, data;

  return regeneratorRuntime.async(function getUsers$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context4.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/user/users"), {
            headers: headers
          }));

        case 4:
          _ref4 = _context4.sent;
          data = _ref4.data;
          return _context4.abrupt("return", data);

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var sigIn = function sigIn(_ref5) {
  var email, password, _ref6, data;

  return regeneratorRuntime.async(function sigIn$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          email = _ref5.email, password = _ref5.password;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/user/signin"), {
            email: email,
            password: password,
            storeId: STORE_ID
          }));

        case 3:
          _ref6 = _context5.sent;
          data = _ref6.data;
          //save token to localstorage
          (0, _localstorage.setToken)(data.token);
          return _context5.abrupt("return", data);

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var sigUp = function sigUp(fullName, email, password) {
  var _ref7, data;

  return regeneratorRuntime.async(function sigUp$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/user/signup"), {
            fullName: fullName,
            email: email,
            password: password,
            storeId: STORE_ID
          }));

        case 2:
          _ref7 = _context6.sent;
          data = _ref7.data;
          //save token to localstorage
          (0, _localstorage.setToken)(data.token);
          return _context6.abrupt("return", data);

        case 6:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var verifyEmail = function verifyEmail(code) {
  var token, headers, _ref8, data;

  return regeneratorRuntime.async(function verifyEmail$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context7.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/user/verify/email/code"), {
            verificationCode: code
          }, {
            headers: headers
          }));

        case 4:
          _ref8 = _context7.sent;
          data = _ref8.data;
          return _context7.abrupt("return", data);

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var newCode = function newCode() {
  var token, headers, _ref9, data;

  return regeneratorRuntime.async(function newCode$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context8.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/user/verify/email/code/new"), {}, {
            headers: headers
          }));

        case 4:
          _ref9 = _context8.sent;
          data = _ref9.data;
          return _context8.abrupt("return", data);

        case 7:
        case "end":
          return _context8.stop();
      }
    }
  });
};

var modifyUserRole = function modifyUserRole(userId, newRole) {
  var token, headers, _ref10, data;

  return regeneratorRuntime.async(function modifyUserRole$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context9.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(API, "/user/user"), {
            _id: userId,
            role: newRole
          }, {
            headers: headers
          }));

        case 4:
          _ref10 = _context9.sent;
          data = _ref10.data;
          return _context9.abrupt("return", data);

        case 7:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var getProducts = function getProducts() {
  var _ref11, data;

  return regeneratorRuntime.async(function getProducts$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/products/").concat(STORE_ID)));

        case 2:
          _ref11 = _context10.sent;
          data = _ref11.data;
          return _context10.abrupt("return", data);

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var getProductById = function getProductById(id) {
  var _ref12, data;

  return regeneratorRuntime.async(function getProductById$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/products/").concat(id)));

        case 2:
          _ref12 = _context11.sent;
          data = _ref12.data;
          return _context11.abrupt("return", data);

        case 5:
        case "end":
          return _context11.stop();
      }
    }
  });
};

var getProductsByCategory = function getProductsByCategory(storeId, category) {
  var _ref13, data;

  return regeneratorRuntime.async(function getProductsByCategory$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/products/category/").concat(storeId, "/").concat(category)));

        case 2:
          _ref13 = _context12.sent;
          data = _ref13.data;
          return _context12.abrupt("return", data);

        case 5:
        case "end":
          return _context12.stop();
      }
    }
  });
};

var createProduct = function createProduct(formData) {
  var token, headers, _ref14, data;

  return regeneratorRuntime.async(function createProduct$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Authorization': "Bearer ".concat(token)
          };
          _context13.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/products/"), {
            formData: formData
          }, {
            headers: headers
          }));

        case 4:
          _ref14 = _context13.sent;
          data = _ref14.data;
          return _context13.abrupt("return", data);

        case 7:
        case "end":
          return _context13.stop();
      }
    }
  });
};

var updateProduct = function updateProduct(formData, id) {
  var token, headers, _ref15, data;

  return regeneratorRuntime.async(function updateProduct$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context14.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(API, "/products/").concat(id), {
            formData: formData
          }, {
            headers: headers
          }));

        case 4:
          _ref15 = _context14.sent;
          data = _ref15.data;
          return _context14.abrupt("return", data);

        case 7:
        case "end":
          return _context14.stop();
      }
    }
  });
};

var deleteProduct = function deleteProduct(id) {
  var token, headers, _ref16, data;

  return regeneratorRuntime.async(function deleteProduct$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context15.next = 4;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(API, "/products/").concat(id), {
            headers: headers
          }));

        case 4:
          _ref16 = _context15.sent;
          data = _ref16.data;
          return _context15.abrupt("return", data);

        case 7:
        case "end":
          return _context15.stop();
      }
    }
  });
};

var getCategories = function getCategories() {
  var _ref17, data;

  return regeneratorRuntime.async(function getCategories$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/categories/").concat(STORE_ID)));

        case 2:
          _ref17 = _context16.sent;
          data = _ref17.data;
          return _context16.abrupt("return", data);

        case 5:
        case "end":
          return _context16.stop();
      }
    }
  });
};

var getCategoryById = function getCategoryById(id) {
  var _ref18, data;

  return regeneratorRuntime.async(function getCategoryById$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/categories/").concat(id)));

        case 2:
          _ref18 = _context17.sent;
          data = _ref18.data;
          return _context17.abrupt("return", data);

        case 5:
        case "end":
          return _context17.stop();
      }
    }
  });
};

var createCategory = function createCategory(name) {
  var token, headers, _ref19, data;

  return regeneratorRuntime.async(function createCategory$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context18.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/categories/"), {
            name: name
          }, {
            headers: headers
          }));

        case 4:
          _ref19 = _context18.sent;
          data = _ref19.data;
          return _context18.abrupt("return", data);

        case 7:
        case "end":
          return _context18.stop();
      }
    }
  });
};

var deleteCategory = function deleteCategory(id) {
  var token, headers, _ref20, data;

  return regeneratorRuntime.async(function deleteCategory$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context19.next = 4;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(API, "/categories/").concat(id), {
            headers: headers
          }));

        case 4:
          _ref20 = _context19.sent;
          data = _ref20.data;
          return _context19.abrupt("return", data);

        case 7:
        case "end":
          return _context19.stop();
      }
    }
  });
};

var addToCart = function addToCart(productId, quantity, option) {
  var token, headers, _ref21, data;

  return regeneratorRuntime.async(function addToCart$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context20.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/cart/add"), {
            productId: productId,
            count: quantity,
            option: option
          }, {
            headers: headers
          }));

        case 4:
          _ref21 = _context20.sent;
          data = _ref21.data;
          return _context20.abrupt("return", data);

        case 7:
        case "end":
          return _context20.stop();
      }
    }
  });
};

var removeFromCart = function removeFromCart(productId) {
  var token, headers, _ref22, data;

  return regeneratorRuntime.async(function removeFromCart$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context21.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/cart/delete/").concat(productId), {}, {
            headers: headers
          }));

        case 4:
          _ref22 = _context21.sent;
          data = _ref22.data;
          return _context21.abrupt("return", data);

        case 7:
        case "end":
          return _context21.stop();
      }
    }
  });
};

var getCart = function getCart() {
  var token, headers, _ref23, data;

  return regeneratorRuntime.async(function getCart$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context22.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/cart/"), {
            headers: headers
          }));

        case 4:
          _ref23 = _context22.sent;
          data = _ref23.data;
          return _context22.abrupt("return", data);

        case 7:
        case "end":
          return _context22.stop();
      }
    }
  });
};

var clearCart = function clearCart() {
  var token, headers, _ref24, data;

  return regeneratorRuntime.async(function clearCart$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context23.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/cart/clear"), {}, {
            headers: headers
          }));

        case 4:
          _ref24 = _context23.sent;
          data = _ref24.data;
          return _context23.abrupt("return", data);

        case 7:
        case "end":
          return _context23.stop();
      }
    }
  });
};

var modifyCart = function modifyCart(productId, quantity) {
  var token, headers, _ref25, data;

  return regeneratorRuntime.async(function modifyCart$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context24.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/cart/modify"), {
            productId: productId,
            count: quantity
          }, {
            headers: headers
          }));

        case 4:
          _ref25 = _context24.sent;
          data = _ref25.data;
          return _context24.abrupt("return", data);

        case 7:
        case "end":
          return _context24.stop();
      }
    }
  });
};

var getOrders = function getOrders() {
  var token, headers, _ref26, data;

  return regeneratorRuntime.async(function getOrders$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context25.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/orders/"), {
            headers: headers
          }));

        case 4:
          _ref26 = _context25.sent;
          data = _ref26.data;
          return _context25.abrupt("return", data);

        case 7:
        case "end":
          return _context25.stop();
      }
    }
  });
};

var createOrder = function createOrder(order) {
  var token, body, headers, _ref27, data;

  return regeneratorRuntime.async(function createOrder$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          body = {
            fullName: order.Address.fullName,
            address: order.Address.address,
            zipCode: order.Address.zipCode,
            city: order.Address.city,
            country: order.Address.country,
            state: order.Address.state,
            phone: order.Address.phone,
            total: order.total,
            payed: order.payed,
            tokenUsed: order.tokenUsed,
            wallet: order.wallet,
            txHash: order.txHash,
            orderType: order.orderType,
            products: order.cartItems.map(function (item) {
              return {
                productId: item.product,
                count: item.qty,
                price: item.price,
                name: item.name,
                option: item.option
              };
            })
          };
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context26.next = 5;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/orders/"), body, {
            headers: headers
          }));

        case 5:
          _ref27 = _context26.sent;
          data = _ref27.data;
          return _context26.abrupt("return", data);

        case 8:
        case "end":
          return _context26.stop();
      }
    }
  });
};

var confirmOrCancel = function confirmOrCancel(orderId, finalStatus) {
  var token, headers, _ref28, data;

  return regeneratorRuntime.async(function confirmOrCancel$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context27.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(API, "/orders/").concat(orderId), {
            finalStatus: finalStatus
          }, {
            headers: headers
          }));

        case 4:
          _ref28 = _context27.sent;
          data = _ref28.data;
          return _context27.abrupt("return", data);

        case 7:
        case "end":
          return _context27.stop();
      }
    }
  });
};

var getAdminOrders = function getAdminOrders() {
  var token, headers, _ref29, data;

  return regeneratorRuntime.async(function getAdminOrders$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context28.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/orders/admin"), {
            headers: headers
          }));

        case 4:
          _ref29 = _context28.sent;
          data = _ref29.data;
          return _context28.abrupt("return", data);

        case 7:
        case "end":
          return _context28.stop();
      }
    }
  });
};

var getSubCategories = function getSubCategories() {
  var _ref30, data;

  return regeneratorRuntime.async(function getSubCategories$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          _context29.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get("".concat(API, "/subcategories/").concat(STORE_ID)));

        case 2:
          _ref30 = _context29.sent;
          data = _ref30.data;
          return _context29.abrupt("return", data);

        case 5:
        case "end":
          return _context29.stop();
      }
    }
  });
};

var createSubCategory = function createSubCategory(name) {
  var token, headers, _ref31, data;

  return regeneratorRuntime.async(function createSubCategory$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context30.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/subcategories/"), {
            name: name
          }, {
            headers: headers
          }));

        case 4:
          _ref31 = _context30.sent;
          data = _ref31.data;
          return _context30.abrupt("return", data);

        case 7:
        case "end":
          return _context30.stop();
      }
    }
  });
};

var createSubcategoryOption = function createSubcategoryOption(id, option) {
  var token, headers, _ref32, data;

  return regeneratorRuntime.async(function createSubcategoryOption$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context31.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/subcategories/").concat(id), {
            name: option
          }, {
            headers: headers
          }));

        case 4:
          _ref32 = _context31.sent;
          data = _ref32.data;
          return _context31.abrupt("return", data);

        case 7:
        case "end":
          return _context31.stop();
      }
    }
  });
};

var deleteSubCategory = function deleteSubCategory(id) {
  var token, headers, _ref33, data;

  return regeneratorRuntime.async(function deleteSubCategory$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context32.next = 4;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(API, "/subcategories/").concat(id), {
            headers: headers
          }));

        case 4:
          _ref33 = _context32.sent;
          data = _ref33.data;
          return _context32.abrupt("return", data);

        case 7:
        case "end":
          return _context32.stop();
      }
    }
  });
};

var updateSubCategory = function updateSubCategory(id, name) {
  var token, headers, _ref34, data;

  return regeneratorRuntime.async(function updateSubCategory$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context33.next = 4;
          return regeneratorRuntime.awrap(_axios["default"].put("".concat(API, "/subcategories/").concat(id), {
            name: name
          }, {
            headers: headers
          }));

        case 4:
          _ref34 = _context33.sent;
          data = _ref34.data;
          return _context33.abrupt("return", data);

        case 7:
        case "end":
          return _context33.stop();
      }
    }
  });
};

var deletesubcategoryoption = function deletesubcategoryoption(id, option) {
  var token, headers, _ref35, data;

  return regeneratorRuntime.async(function deletesubcategoryoption$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          token = (0, _localstorage.getToken)();
          headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer ".concat(token)
          };
          _context34.next = 4;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(API, "/subcategories/").concat(id, "/").concat(option), {
            headers: headers
          }));

        case 4:
          _ref35 = _context34.sent;
          data = _ref35.data;
          return _context34.abrupt("return", data);

        case 7:
        case "end":
          return _context34.stop();
      }
    }
  });
};

var requestChangePassword = function requestChangePassword(email) {
  var _ref36, data;

  return regeneratorRuntime.async(function requestChangePassword$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          _context35.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/user/reset/password/").concat(STORE_ID), {
            email: email
          }));

        case 2:
          _ref36 = _context35.sent;
          data = _ref36.data;
          return _context35.abrupt("return", data);

        case 5:
        case "end":
          return _context35.stop();
      }
    }
  });
};

var changePassword = function changePassword(code, password, email) {
  var _ref37, data;

  return regeneratorRuntime.async(function changePassword$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          _context36.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(API, "/user/reset/password/new/").concat(STORE_ID), {
            verificationCode: code,
            password: password,
            email: email
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }));

        case 2:
          _ref37 = _context36.sent;
          data = _ref37.data;
          return _context36.abrupt("return", data);

        case 5:
        case "end":
          return _context36.stop();
      }
    }
  });
};

var Api = {
  getUser: getUser,
  sigIn: sigIn,
  sigUp: sigUp,
  getProducts: getProducts,
  getProductById: getProductById,
  getProductsByCategory: getProductsByCategory,
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  getCategories: getCategories,
  getCategoryById: getCategoryById,
  createCategory: createCategory,
  deleteCategory: deleteCategory,
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  getCart: getCart,
  clearCart: clearCart,
  modifyCart: modifyCart,
  getOrders: getOrders,
  STORE_ID: STORE_ID,
  createOrder: createOrder,
  getStore: getStore,
  updateStore: updateStore,
  confirmOrCancel: confirmOrCancel,
  getAdminOrders: getAdminOrders,
  TOKEN_NAME: TOKEN_NAME,
  getUsers: getUsers,
  modifyUserRole: modifyUserRole,
  verifyEmail: verifyEmail,
  newCode: newCode,
  getSubCategories: getSubCategories,
  createSubCategory: createSubCategory,
  deleteSubCategory: deleteSubCategory,
  updateSubCategory: updateSubCategory,
  createSubcategoryOption: createSubcategoryOption,
  deletesubcategoryoption: deletesubcategoryoption,
  requestChangePassword: requestChangePassword,
  changePassword: changePassword
};
exports.Api = Api;