import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import busd from '../../images/logo/busd.png';
import opco from '../../images/logo/logo.png';
import { AiFillStar } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { contract } from '../../redux/blockchain/blockchainRouter';
import { Link } from 'react-router-dom';

function NftCard({ url, price, id, listId, name, rarity, tokenPrice, owner, accountAddress, buyHandler, cancelHandler, discount }) {
  const router = contract();
  const repeatStar = (number) => {
    let stars = [];
    for (let i = 0; i < number; i++) {
      stars.push(<AiFillStar className="star" key={i} />);
    }
    return stars;
  }

  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (accountAddress) {
      if (owner.toLowerCase() === accountAddress.toLowerCase()) {
        setIsOwner(true);
      }
    }
  }, [accountAddress, owner]);

  const priceDivTokenXdiscount = (price / tokenPrice) * (1 - discount);


  return (
<div className="flex flex-col items-start bg-white shadow-2xl rounded-2xl overflow-hidden w-32 h-[255px] md:w-64  md:h-[400px] transform transition-all duration-500 ease-in-out hover:scale-105">

<Link to={`/nft-detail/${id}`} className="p-2 absolute z-10 top-2 right-2 text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">
  <AiOutlineSearch />
</Link>

<div className="w-full h-30 relative">
  <img className="w-full h-full object-cover rounded-t-2xl" src={url} alt={name} />
</div>

<div className=" md:px-4 md:py-2 flex-grow flex flex-col justify-between">
<div>
<h2 className="text-sm md:text-lg font-semibold text-gray-900 truncate">{name}</h2>
  <div className="flex justify-start w-full text-yellow-500 mt-[-8px]">
    {repeatStar(rarity)}
  </div>
</div>


  <div className=" w-full">
    {isOwner ?
      <button
        className="w-full px-4 py-2 text-white bg-red-500 rounded-full hover:bg-red-600 transition-all duration-200"
        onClick={() => cancelHandler(listId)}
      >
        Cancel
      </button>
      :
      <div className="flex flex-col justify-center items-center mb-2 md:mb-0  md:flex md:flex-row space-x-2 mt-2">
        <button
          className="w-9/12 md:w-full px-4 py-2 text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-orange-500 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
          onClick={() => buyHandler(listId, router.BUSD_ADDRESS, price)}
        >
          <img src={busd} alt='busd' className="w-4 h-4" />
          <span>{(parseFloat(price)).toFixed(2)}</span>
        </button>

        <button
          className="w-9/12 md:w-full px-4 md:py-2 text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-full hover:from-gray-900 hover:to-gray-700 transition-all duration-200 flex items-center justify-center space-x-2 "
          onClick={() => buyHandler(listId, router.AOEX_ADDRESS, priceDivTokenXdiscount)}
        >
          <img src={opco} alt='opco' className="w-4 h-4" />
          <span>{(parseFloat(priceDivTokenXdiscount)).toFixed(2)}</span>
        </button>
      </div>
    }
  </div>
</div>
</div>


  );
}

export default NftCard;