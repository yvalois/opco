import React, {useEffect, useState} from 'react'
import loader from '../../images/loader/loader.gif';
import {motion, AnimatePresence} from 'framer-motion';
import { useSelector, useDispatch} from 'react-redux';
import { fetchMinter } from '../../redux/blockchain/minterAction';

export default function TransferModal({transferModal, selectedNft, setTransferModal}) {
  const dispatch = useDispatch();
  const blockchain = useSelector(state => state.blockchain);
  const minter = useSelector(state => state.minter);
  const {mintContract} = minter;

  const [toWallet, setToWallet] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");


  const handleTransfer = async() => {


    try{
      setLoading(true);
      const transfer = await mintContract.transferFrom(blockchain.accountAddress, toWallet, selectedNft.toString());
      mintContract.on('Transfer', (from, to, id) => {
     
      dispatch(fetchMinter());
      setLoading(false);
      setTransferModal(false);
      })
    }catch(err){
      if (err.reason) {
        console.log(err);
        setErrorMsg(err.reason);
        setError(true);

      }else{
        console.log(err)
      }
      
      setLoading(false);
    }
  }




  const handleClose = () => {
    setTransferModal(false);
  }

  return (
<AnimatePresence>
  {transferModal && (
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
            <p className="mt-4">Cargando...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-center text-lg font-semibold mb-6">Transferir NFT</h2>
            <label className="block">
              Transferir a:
              <input 
                type="text" 
                value={toWallet}
                onChange={(e) => setToWallet(e.target.value)}
                className="mt-2 p-2 block w-full border border-gray-300 rounded"
              />
            </label>
            <div className="flex justify-around mt-6">
              <button 
                className="py-2 px-6 bg-blue-500 text-white rounded"
                onClick={handleTransfer}
              >
                Transferir
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
