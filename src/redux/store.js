import { applyMiddleware, compose, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

import  blockchainReducer  from "./blockchain/blockchainReducer";
import dataReducer from "./blockchain/dataReducer"; 
import timerReducer from "./timerapi/timerReducer";
import minterReducer from "./blockchain/minterReducer";
import apiReducer from "./api/apiReducer";
import storeReducer from "./store/reducers/storeReducer";
import productReducers from "./store/reducers/productReducers";
import orderReducer from "./store/reducers/orderReducer";
import categoryReducer from "./store/reducers/categoryReducer";
import cartReducers from "./store/reducers/cartReducers";
import adminOrdersReducer from "./store/reducers/adminOrdersReducer";
import userReducer from "./store/reducers/userReducer";
import tokenPriceReducer from "./store/reducers/tokenPriceReducer";
import marketReducer from "./market/marketReducer";
import subCategoryReducer from "./store/reducers/subCategoryReducer";
import bannedReducer from "./bannedAccounts/bannedReducers";
import p2pReducer from "./p2p/p2preducer";

const rootReducer = combineReducers({
    blockchain: blockchainReducer,
    data: dataReducer,
    time: timerReducer,
    minter: minterReducer,
    api: apiReducer,
    user: userReducer,
    store: storeReducer,
    product: productReducers,
    orders: orderReducer,
    category: categoryReducer,
    cart: cartReducers,
    adminOrders: adminOrdersReducer,
    tokenPrice: tokenPriceReducer,
    market: marketReducer,
    subcategory: subCategoryReducer,
    banned: bannedReducer,
    p2p: p2pReducer
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
    return createStore(rootReducer, composeEnhancers);
}

const store = configureStore();

export default store;