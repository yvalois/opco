import './SideDrawer.css'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { logOut } from '../../redux/store/actions/userAction'
import { logoutCart } from '../../redux/store/actions/cartActions';

import AcordionDrawer from './sideDrower/AcordionDrawer'
import AcordionDrawerCategory from './sideDrower/AcordionDrawerOrders'

const SideDrawer = ({show, click}) => {
  const sideDrawerClass = ['sidedrawer']
  const user = useSelector(state => state.user)
  const history = useNavigate()
  const {loginSuccess, userDetails} = user

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const {products} = cart

  const getCartCount = () => {
    return products.reduce((qty, item) => Number(item.qty) + qty, 0)
  }

  if (show) {
    sideDrawerClass.push('show')
  }
  const _handleLogout = () => {
    // console.log('click')

    dispatch(logoutCart());
    dispatch(logOut())
    history('/store')
  }

  return (
    <div className={sideDrawerClass.join(' ')}>
      <ul className="sidedrawer__links" onClick={click}
      style={{paddingLeft: '0px'}}
      >
      {loginSuccess? userDetails.role === "admin" ?
      <>     
      <AcordionDrawer />
      </>
      : null : null}
          <AcordionDrawerCategory/>
      <li>
          <Link to="/store/orders">
            <span>
              Orders
            </span>
          </Link>
        </li>
        <li>
          <Link to="/store/cart">
            <i className="fas fa-shopping-cart"></i>
            <span>
              Cart{' '}
              <span className="sidedrawer__cartbadge">{getCartCount()}</span>
            </span>
          </Link>
        </li>

        <li>
          <Link to="/store">Store</Link>
        </li>

        {!user.loginSuccess ? (
          <li>
            <Link to="/store/signin">Login</Link>
          </li>
        ) : (
          <li>
            <p onClick={_handleLogout}>Logout</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export default SideDrawer
