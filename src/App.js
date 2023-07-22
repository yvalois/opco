import { HashRouter, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import 'stream-browserify';
import 'stream-http';
import 'https-browserify';
import "tailwindcss/tailwind.css"
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon,bsc } from 'wagmi/chains'

import Layout from "./layout/Layout";
import "./style/style_main.css";
import "./App.css";
import Exchange from "./router/Exchange";
import Staking from "./router/Staking";
import Wallet from "./router/Wallet";
import Market from "./router/Market";
import StakingAdmin from "./router/StakingAdmin";
import Tienda from "./router/Tienda";
import NftOpco from "./router/NftOpco";
import LinkAccess from "./router/LinkAccess";
import  Retire  from "./router/Retire";
import  Administrador  from "./router/Administrador";

import ProductScreen from "./store/screens/ProductScreen";
import OrderScreen from "./store/screens/OrderScreen";
import HomeScreen from "./store/screens/HomeScreen";
import Checkout from "./store/screens/Checkout";
import CategoryScreen from "./store/screens/CategoryScreen";
import CartScreen from "./store/screens/CartScreen";
import AdminSite from "./store/screens/AdminSite";
import SignUp from "./store/screens/SignUp/index";
import SignIn from "./store/screens/SignIn/index";

import Dashboard from "./store/components/adminSite/Dasboard";
import AdminOrders from "./store/components/adminSite/AdminOrders";
import Adminproducts from "./store/components/adminSite/Adminproducts";
import AdminCategories from "./store/components/adminSite/AdminCategories";
import AdminOrdersDetail from "./store/components/adminSite/AdminOrdersDetail";
import AdminEdithProducts from "./store/components/adminSite/AdminEdithProducts";
import OrderDetails from "./store/components/Orders/OrdersDetail";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./store/components/Navbar";
import SideDrawer from "./store/components/SideDrawer";
import Backdrop from "./store/components/Backdrop";
import { fetchCart } from "./redux/store/actions/cartActions";
import { getUserDetails } from "./redux/store/actions/userAction";
import Nftmarket from "./router/Nftmarket";
import NftDetail from "./components/marketNft/NftDetail";
import StakingDetail from "./components/StakingNft/detailsStaking";
import ConfirmEmailScreen from "./store/screens/ConfirmEmailScreen";
import Subcategory from "./store/components/adminSite/Subcategory";
import { ChangePassword } from "./store/screens/ChangePassword/ChangePassword";
import { ConfirmPassword } from "./store/screens/ChangePassword/ConfirmPassword";
import { P2p } from "./router/P2p";
import StoreLayout from "./store/layout/StoreLayout";
import AdminExchange from "./components/administrador/AdminExchange";
import AdminReward from "./components/administrador/AdminReward";
import AdminStore from "./components/administrador/AdminStore";
import NewPool from "./components/administrador/stakingoptions/NewPool";
import ExistingPool from "./components/administrador/stakingoptions/ExistingPool"
import Data from "./components/administrador/stakingoptions/Data"
import Maintenance from "./router/Maintenance";
import Venta from "./router/Venta";
import Inventario from "./router/Inventario";



function App() {
  const [sideToggle, setSideToggle] = useState(false);
  const user = useSelector((state) => state.user);
  const { loginSuccess, userDetails } = user;

  // fetchCart
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchCart());
      dispatch(getUserDetails());
    }
  }, [dispatch]);

  return (<>

    <HashRouter>
      <div className="w-100 h-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Exchange />} />
            <Route path="/:refered" element={<Exchange />} />
            <Route path="/staking" element={<Staking />} />
            {/* <Route path="/staking" element={<Maintenance/>}/> */}
            <Route path="/stakin-admin" element={<StakingAdmin />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/tienda-fiat" element={<Tienda />} />
            <Route path="/nft" element={<NftOpco />} />
            <Route path="/nft/:password" element={<NftOpco />} />
            <Route path="/links" element={<LinkAccess />} />
            <Route path="/market/:page" element={<Nftmarket />} />
            <Route path="/market" element={<Nftmarket />} />
            <Route path="nft-detail/:id" element={<NftDetail />} />
            <Route path="/token-market" element={<P2p />} />
            <Route path="/retire" element={<Retire />} />
            <Route path="/venta/:address" element={<Venta />} />
            {/* <Route path="/ventaDetails/:id" element={<StakingDetail />} /> */}
            <Route path="/inventarioInversiones/:address" element={<Inventario />} />
            <Route path="/administrador" element={<Administrador/>}>
                <Route index element={<AdminExchange/>}/>
                <Route path="/administrador/admin-exchange" element={<AdminExchange/>}/>
                <Route path="/administrador/admin-rewards" element={<AdminReward/>}>
                  <Route index element={<NewPool/>}/>
                  <Route path="/administrador/admin-rewards/existingpool" element={<ExistingPool/>}/>
                  <Route path="/administrador/admin-rewards/newpool" element={<NewPool/>}/>
                  <Route path="/administrador/admin-rewards/data" element={<Data/>}/>
                </Route>
                <Route path="/administrador/admin-store" element={<AdminStore/>}/>
            </Route>
            <Route path="/store" element={<StoreLayout/>}>
              <Route index element={<HomeScreen />}/>
              <Route path="/store/product/:id" element={<ProductScreen />} />
              <Route path="/store/cart" element={<CartScreen />} />
              <Route path="/store/signup" element={<SignUp />} />
              <Route path="/store/signin" element={<SignIn />} />
              <Route path="/store/checkout" element={<Checkout />} />
              <Route path="/store/orders" element={<OrderScreen />} />
              <Route path="/store/order/:id" element={<OrderDetails />} />
              <Route path="/store/category/:id" element={<CategoryScreen />} />
              <Route path="/store/code" element={<ConfirmEmailScreen />} />
              <Route path="/store/reset" element={<ChangePassword />} />
              <Route path="/store/confirm-password" element={<ConfirmPassword />} />

              <Route path="/store/admin" element={<AdminSite />}>
                <Route index element={<Dashboard />} />
                <Route path="/store/admin/dashboard" element={<Dashboard />} />
                <Route path="/store/admin/orders" element={<AdminOrders />} />
                <Route path="/store/admin/products" element={<Adminproducts />} />
                <Route path="/store/admin/category" element={<AdminCategories />} />
                <Route path="/store/admin/subcategories" element={<Subcategory />} />
                <Route path="/store/admin/oders/:id" element={<AdminOrdersDetail />}/>
                <Route path="/store/admin/products/:id" element={<AdminEdithProducts />}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </HashRouter>

     </>
  );
}

export default App;
