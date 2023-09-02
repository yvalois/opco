import './CartScreen.css'
import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import Loader from '../../components/Loader';
import {Api} from '../utils/Api'

// Components
import CartItem from '../components/CartItem'

// Actions
import { modifyCart, removeFromCart} from '../../redux/store/actions/cartActions';


const CartScreen = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  const {tokenPrice} = useSelector(state => state.tokenPrice)
  const {loginSuccess} = user
  const {cartLoaded, products, loading} = cart

  const qtyChangeHandler = (id, qty) => {
    dispatch(modifyCart(id, qty))
  }

  const removeFromCartHandler = item => {
    dispatch(removeFromCart(item._id))
  }

  const getCartCount = () => {
    return products.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  const getCartSubTotal = () => {
    return products
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2)
  }

  const getCartSubTotalToken = () => {
    return products
      .reduce((price, item) => price + item.price * item.qty / tokenPrice, 0)
      .toFixed(2)
  }

  const navigateToCheckout = () => {
    products.length > 0 ? history('/store/checkout') : alert('Cart is empty')
  }
// name, imageUrl.url, product, option, price

  if (!cartLoaded) return(
  <div className="w-full h-full">
  <div className='w-full flex justify-center mt-12'>
  <h2 className='font-bold'>Loading.....</h2>

  </div>
  </div>
  ) 

  else if (cartLoaded)
    return (
      <>
<div className="w-full h-full">
  <Loader isLoading={loading} />
  <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-8">
    <div className="flex-grow lg:mr-4 bg-transparent p-4">
      <h2 className="mb-4 text-xl font-bold">Shopping Cart</h2>

      {products.length === 0 ? (
        <div className="text-center">
          Your Cart Is Empty <Link to="/store" className="text-blue-500">Go Back</Link>
        </div>
      ) : (
        products.map(item => (
          <CartItem
            key={item.product}
            item={item}
            qtyChangeHandler={qtyChangeHandler}
            removeHandler={() => removeFromCartHandler(item)}
          />
        ))
      )}
    </div>

    <div className="flex-none lg:w-1/4 bg-white shadow-md rounded-lg p-4">
      <div className="border-b border-gray-200 p-4">
        <p className="text-lg font-bold mb-2">Subtotal ({getCartCount()}) items</p>
        <p className="text-gray-800 mb-2">{Api.TOKEN_NAME}:{getCartSubTotalToken()}</p>
        <p className="text-gray-800">{getCartSubTotal()} BUSD</p>
      </div>
      <div className="p-4">
        <button
          className="w-full py-2 px-4 bg-black text-white rounded-md hover:opacity-90 transition-all duration-200 ease-in-out"
          onClick={navigateToCheckout}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  </div>
</div>



      </>
    )
}

export default CartScreen
