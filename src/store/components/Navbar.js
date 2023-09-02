import './Navbar.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserDetails, logOut } from '../../redux/store/actions/userAction';
import { getToken } from '../utils/localstorage';
import { fetchCart, logoutCart } from '../../redux/store/actions/cartActions';
import { fetchStore } from '../../redux/store/actions/storeActions';
import { fetchOrder } from '../../redux/store/actions/orderActions';
import { fetchProducts } from '../../redux/store/actions/productActions';
import { fetchCategory } from '../../redux/store/actions/categoryAction';
import DropdownCategory from './DropdownCategory';
import { loadTokenPrice } from '../../redux/store/actions/tokenPriceActions';
import { fetchSubCategory } from '../../redux/store/actions/subCategoryAction';
import cafe from "../../images/logo/logo.png";


const Navbar = ({ click }) => {
  const location = useLocation();
  const cart = useSelector(state => state.cart);
  const history = useNavigate();
  const user = useSelector(state => state.user);
  const store = useSelector(state => state.store);

  const dispatch = useDispatch();
  // console.log({user})
  const { storeName, discount, StoreLoaded } = store;
  const { products, cartLoaded } = cart;
  const { loginSuccess, userDetails } = user;


  const getCartCount = () => {
    return products.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  const [cartloadedsuccess, setCartloadedsuccess] = useState(false);

  const _handleLogout = () => {
    // console.log('click')
    dispatch(logoutCart());
    dispatch(logOut());
    history('/store');
  }

  useEffect(() => {
    if (!StoreLoaded) {
      dispatch(fetchStore());
      dispatch(fetchCategory());
      dispatch(fetchSubCategory());
      dispatch(fetchProducts());
      dispatch(loadTokenPrice());
    }
  }, [dispatch, StoreLoaded])

  useEffect(() => {
    const token = getToken();
    if (token)
      dispatch(getUserDetails());
  }, [dispatch])

  useEffect(() => {
    if (loginSuccess) {
      dispatch(fetchCart());
      dispatch(fetchOrder());
    }
  }, [dispatch, loginSuccess])

  useEffect(() => {
    if (cartLoaded) {
      setCartloadedsuccess(true)
    }
  }, [cartLoaded])





  return (

<nav className="flex flex-wrap items-center justify-start md:justify-between w-full bg-yellow-300 h-auto lg:h-[66px]  ">
  {/* Descomentar */}
  {/* <div className="navbar__logo">
    <Link to="/store">
      <h2>{StoreLoaded ?
        storeName : 'Loading...'
      }</h2>
    </Link>
  </div> */}

  <div className="w-full lg:w-auto">
    <Link to="/store">
      <h2 className="text-[#494949] text-lg cursor-pointer ml-4 lg:ml-0 mt-2 lg:mt-0">
        {StoreLoaded ? null : 'Loading...'}
      </h2>
    </Link>
  </div>
<div className='w-full flex justify-center md:justify-end items-center lg:mr-2'>
<ul className="flex flex-wrap justify-center items-center list-none ">
  <DropdownCategory />
    {loginSuccess && userDetails.role === "admin" && (
      <li className="pl-4 lg:pl-6">
        <Link
          to="/store/admin/dashboard"
          className="no-underline text-gray-800 text-lg flex items-center font-semibold"
        >
          Admin
        </Link>
      </li>
    )}
    {loginSuccess && (
      <li className="pl-4 lg:pl-6">
        <Link
          to="/store/orders"
          className="no-underline text-gray-800 text-lg flex items-center font-semibold"
        >
          Ordenes
        </Link>
      </li>
    )}
    <li className="pl-4 lg:pl-6 flex items-center">
      <Link
        to="/store/cart"
        className="no-underline text-gray-800 text-lg flex items-center font-semibold"
      >
        <i className="fas fa-shopping-cart"></i>
        <span className="ml-2">
          {cartloadedsuccess ? getCartCount() : 0}
        </span>
      </Link>
    </li>
    <li className="pl-4 lg:pl-6">
      <Link
        to="/store"
        className="no-underline text-gray-800 text-lg flex items-center font-semibold"
      >
        Store
      </Link>
    </li>
    {!user.loginSuccess ? (
      <li className="pl-4 lg:pl-6">
        <Link
          to="/store/signin"
          className="no-underline text-gray-800 text-lg flex items-center font-semibold"
        >
          Login
        </Link>
      </li>
    ) : (
      <li className="pl-4 lg:pl-6">
        <p
          className="cursor-pointer text-gray-800 text-lg flex items-center font-semibold m-0"
          onClick={_handleLogout}
        >
          Logout
        </p>
      </li>
    )}
  </ul>
</div>


</nav>


  )
}

export default Navbar
