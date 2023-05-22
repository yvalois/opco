
import {CgArrowsExchangeAlt} from 'react-icons/cg';
import {RiHandCoinLine} from 'react-icons/ri';
import {BsWallet} from 'react-icons/bs';
import {AiOutlineShopping} from 'react-icons/ai';
import { Link } from 'react-router-dom';


const routes = [
    {
        path: '/',
        name: 'Exchange',
        icon: <CgArrowsExchangeAlt/>,
    },
    {
        path: '/staking',
        name: 'Staking',
        icon: <RiHandCoinLine/>,
    },
    {
        path: '/wallet',
        name: 'Wallet',
        icon: <BsWallet/>,
    },
    {
        path: '/market',
        name: 'Tienda',
        icon: <AiOutlineShopping/>,
    }
]

export default function MovilNavbar() {
  return (
    <div className="movil-Navbar">
         {routes.map((route, index) => (
                <Link
                    key={index}
                    to={route.path}
                    className='movil-link'
                    
                >
                    <div className='movil-link-icon'>
                        {route.icon}
                    </div>
                    <div className='movil-link-name'>
                        {route.name}
                    </div>
                </Link>
            ))}
    </div>
  )
}
