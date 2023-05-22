import "./Product.css";
import { Link } from "react-router-dom";
import { Api } from "../utils/Api";
import { useSelector } from "react-redux";

const Product = ({ imageUrl, description, price, name, productId, tokenPrice }) => {
  
  
  return (
    <div className="w-72 p-8 cursor-pointer mx-auto flex flex-col space-y-4 rounded-lg bg-white hover:shadow-2xl hover:z-1 border border-transparent hover:border-gray-700">
    <div >
    <img src={imageUrl} alt={name} className="w-full lg:h-[170px] object-fill rounded-lg"   />

    </div>

      <div >
        <p className="text-[18px] font-bold overflow-hidden mt-[4px]">{name}</p>

        <p className="mb-3 text-md  hidden md:block">{description.substring(0, 100)}...</p>

        <p className="font-bold">{`${Api.TOKEN_NAME}: `}
        <span>${tokenPrice}</span></p>
        <div>
        <p > BUSD: <span className="font-bold">${price}</span> </p>
        </div>
        

        <Link to={`/store/product/${productId}`} className=" rounded-lg block no-underline text-center w-full py-2 px-5 text-base bg-yellow-300 hover:yellow-400 transition-all duration-200   text-black cursor-pointer font-bold   hover:scale-110 hover:shadow-lg">
          View
        </Link>
      </div>
    </div>
  );
};

export default Product;
