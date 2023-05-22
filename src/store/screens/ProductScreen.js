import './ProductScreen.css';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Api } from '../utils/Api';
import Swal from 'sweetalert2';

// Actions
import {addToCart, removeFromCart} from '../../redux/store/actions/cartActions';
import {fetchProducts} from '../../redux/store/actions/productActions';


const ProductScreen = () => {
  const navigate = useNavigate(); 
  const {id} = useParams();
  const [qty, setQty] = useState(1);
  const [option, setOption] = useState('');
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const productDetails = useSelector(state => state.product);
  const {initialLoad, error, products, errorMsg} = productDetails;
  const { tokenPrice } = useSelector(state => state.tokenPrice);

  useEffect(() => {
    if(initialLoad){
      dispatch(fetchProducts());
    }
  }, [dispatch], [initialLoad]);

  useEffect(() => {
    if (!initialLoad && id !== products._id) {
      const producto = products.find(p => p._id === id)
      setProduct(producto);
      setLoading(false);
    }
  }, [id, products, initialLoad, dispatch]);

  const addToCartHandler = () => {
    if(product.countInStock < 1){
      Swal.fire({
        title: 'Oops...',
        text: 'Quantity must be at least 1',
        icon: 'error',
        confirmButtonText: 'OK'
      })
      return;
    }
    if(option !== ''){
    if (user.loginSuccess) {
     
      dispatch(addToCart(product._id, qty, option));
      if(error){
        Swal.fire({
          title: 'Oops...',
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'OK'
        })
        return;
      }
      navigate(`/store/cart`)
      return
    } else {
      Swal.fire({
        title: 'Please login to add to cart',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Login',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          navigate(`/store/signin`)
        }
      })
    }
  } else {
    Swal.fire({
      title: 'Please select an option',
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',

    })

  }
  }

  const tokenPriceInDolar = (price) => {
    return (price/tokenPrice).toFixed(2)
  }

  return (
<div className="w-full h-screen bg-white shadow-lg rounded-xl p-6 flex flex-col 2xl:flex-row">
{loading ? (
         <h2>Loading...</h2>
       ) : error ? (
         <h2>{error}</h2>
       ) : (

         <>
         <div className="md:flex-grow  2xl:w-1/2  w-full mb-4 md:mb-0">
        <img className='w-full  md:h-[600px] 2xl:object-cover' src={product.imageUrl.url} alt={product.name} />
    </div>
    <div className="flex-grow md:ml-6 lg:pl-6">
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <p className="my-2 text-gray-700">Description: {product.description}</p>
        <div className="grid grid-cols-2 text-gray-700 my-4">
            <p>BUSD:</p><p>12</p>
            <p>{Api.TOKEN_NAME}:</p><p>${product.price}</p>
            <p>Status:</p><p> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
            <p>Qty:</p>
            <select value={qty} onChange={e => setQty(e.target.value)}>
                {[...Array(product.countInStock).keys()].map(x => (
                    <option key={x + 1} value={x + 1}>
                        {x + 1}
                    </option>
                ))}
            </select>
            <p>Options:</p>
            <select className='py-1 px-2' value={option} onChange={e => setOption(e.target.value)}>
                <option value="">Select...</option>
                 {product.subCategoryId.options.map(option => (
                    <option key={option} value={option.name}>
                        {option.name}
                    </option>
                ))} 
            </select>
        </div>
        <button className='w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none' type="button" onClick={addToCartHandler}>
            Add To Cart
        </button>
    </div>
         </>
       )}
     </div>


  )
}

export default ProductScreen
