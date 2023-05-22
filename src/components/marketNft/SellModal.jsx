import React, {useEffect, useState} from 'react'
import loader from '../../images/loader/loader.gif';
import {motion, AnimatePresence} from 'framer-motion';
import { useSelector, useDispatch} from 'react-redux';
import { fetchMinter } from '../../redux/blockchain/minterAction';
import {getMarket} from '../../redux/market/marketAction';
import {ethers} from 'ethers';

export default function SellModal({sellModal, selectedNft, setSellModal}) {
  const dispatch = useDispatch();
  const blockchain = useSelector(state => state.blockchain);
  const minter = useSelector(state => state.minter);
  const {marketContract} = useSelector(state => state.blockchain);
  const {mintContract} = minter;
    const {market, marketloaded} = useSelector(state => state.market);


  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const sell = async(id) => {
    try{
    setLoading(true);
    const priceInEth =  ethers.utils.parseEther(price);

    const sell = await marketContract.addListing(id, priceInEth);
    marketContract.on("ListingAdded", (owner, id, price) =>{

        dispatch(fetchMinter());
        dispatch(getMarket());
        setLoading(false);
        setSellModal(false);
    } )}catch(err){
    if (err.reason) {
        console.log(err);
        setErrorMsg(err.reason);
        setError(true);
    }else{
        console.log(err);
    }
    setLoading(false);
}}


  const handleClose = () => {
    setSellModal(false);
  }

 

  return (
<AnimatePresence>
  {sellModal && (
    <motion.div
      className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
      initial={{opacity: 0, y: -100}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -100}}
    >
      <motion.div 
        className="bg-white p-6 rounded-lg max-w-md w-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <img src={loader} alt='loader' className="w-24 h-24" />
            <p className="mt-4">Por favor espere...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-center text-lg font-semibold mb-6">Vender NFT</h2>
            <label className="block">
              Precio en USD
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="$USD"
                className="mt-2 p-2 block w-full border border-gray-300 rounded"
              />
            </label>
            <div className="flex justify-around mt-6">
              <button 
                className="py-2 px-6 bg-blue-500 text-white rounded"
                onClick={() => sell(selectedNft)}
              >
                Vender
              </button>
              <button 
                className="py-2 px-6 bg-red-500 text-white rounded"
                onClick={handleClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

  )
}
