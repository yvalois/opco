import "./CartItem.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Api } from "../utils/Api";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  const { tokenPrice } = useSelector((State) => State.tokenPrice);
  const tokenPricetoUsd = (price) => {
    return (price / tokenPrice).toFixed(2);
  }
// name, imageUrl.url, product, option, price

  return (
<div className="w-full p-2 sm:p-4 grid grid-cols-2 sm:grid-cols-7 gap-2 bg-white rounded-md items-center mb-2">
  <div className="col-span-2 sm:col-span-1">
    <img src={item.imageUrl.url} alt={item.name} className="w-full" />
  </div>
  <Link to={`/product/${item.product}`} className="col-span-2 sm:col-span-4 text-xs sm:text-sm md:text-base lg:text-lg text-black hover:text-pink-600">
    <p>{item.name}</p>
  </Link>
  <p className="col-span-2 sm:col-span-1 text-xs sm:text-sm md:text-base lg:text-lg">{item.option}</p>
  <p className="col-span-2 sm:col-span-1 text-xs sm:text-sm md:text-base lg:text-lg">{Api.TOKEN_NAME}:{tokenPricetoUsd(item.price)}</p>
  <p className="col-span-2 sm:col-span-1 text-xs sm:text-sm md:text-base lg:text-lg">BUSD:{item.price}</p>

  <select
    value={item.qty}
    onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
    className="col-span-2 sm:col-span-1 h-9"
  >
    {[...Array(item.countInStock).keys()].map((x) => (
      <option key={x + 1} value={x + 1}>
        {x + 1}
      </option>
    ))}
  </select>
  <button
    className="col-span-2 sm:col-span-1 p-2 text-red-600 bg-gray-200 border border-black hover:bg-black hover:text-white transform transition-all duration-300 ease-out hover:scale-110"
    onClick={() => removeHandler(item.product)}
  >
    <i className="fas fa-trash"></i>
  </button>
</div>
  );
};

export default CartItem;
