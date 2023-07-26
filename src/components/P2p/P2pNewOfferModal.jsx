import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux'
import { fetchBlockchain } from '../../redux/blockchain/blockchainAction';
import ErrorMsg from '../ErrorMsg';
import { fetchP2p } from '../../redux/p2p/p2pActions';
import LoaderFullScreen from '../loaderFullScreen';
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useConnect, useDisconnect, useSignMessage,  } from 'wagmi'
import {getEthersProvider,getEthersSigner } from '../../utils/ethers.js'
import { useSelector } from 'react-redux';

export const P2pNewOfferModal = ({ offerModal, setOfferModal, tokenBalance, contractP2p, accountAddress, tokenContract }) => {
    const dispatch = useDispatch();
    const [precios, setPrecios] = useState(0);
    const [minimo, setMinimo] = useState(0);
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const[is, setIs] = useState(false)
    const blockchain = useSelector(state => state.blockchain);
    const [checkApproved, setCheckApproved] = useState(false);
    const [approvedTokens, setApprovedTokens] = useState(0);

    const verifyApproveStatus = async () => {
        const approvedAmount = await tokenContract.allowance(accountAddress, contractP2p.address);

        const approvedAmountWei = parseFloat(ethers.utils.formatEther(approvedAmount));
        setApprovedTokens(approvedAmountWei);
    }

    const { isOpen, open, close, setDefaultChain } = useWeb3Modal()
    const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  
    const {connect, connectors,  isLoading, pendingConnector} = useConnect()
    const { disconnect } = useDisconnect()
  
    const getSign = async()=>{
      const signer = await getEthersSigner(56)
      const provider =  getEthersProvider(56)
      dispatch(fetchBlockchain(address, signer, provider))               
  }
  
    useEffect(() => {
        if(isConnected && accountAddress === null && is === false) {
          setTimeout(() => {
          getSign();
          setIs(true)
          }, 2000);
        }else if(!isConnected ){
          setIs(false)
        }
    }, [isConnected])
  
    const abrir =()=>{
      if(isConnected && accountAddress === null){
          console.log("No")
      }else{
        open()
      }
    }
    
    useEffect(() => {
        if(isConnected && accountAddress === null && is === false) {
          setTimeout(() => {
          getSign();
          setIs(true)
          }, 2000);
        }else if(!isConnected ){
          setIs(false)
        }
    }, [isConnected])

    const approve = async () => {
        setLoading(true);
        try {
            const approved = await tokenContract.approve(contractP2p.address, ethers.utils.parseEther('99999999999999'));
            tokenContract.on('Approval', (event) => {
                setApprovedTokens(99999999999999);
                setLoading(false);
            })
        } catch (e) {
            console.log(e);
            setLoading(false);
            if (e.reason) {
                setErrorMsg(e.reason);
                setError(true);
            }
        }
    }




    useEffect(() => {
        if (!checkApproved && accountAddress) {
            verifyApproveStatus();
            setCheckApproved(true);
        }
    }, [checkApproved])



    const closeOfferModal = () => {
        setAmount(0);
        setMinimo(0);
        setPrecios(0);
        setOfferModal(false);
        setCheckApproved(false);
    }

    const max = () => {
        setAmount(tokenBalance)
    }

    const createOffer = () => {
        if (accountAddress) {
            try {
                setLoading(true);
                const Amount = (amount * 10 ** 8).toFixed(0);
                const Price = ethers.utils.parseEther(precios.toString());
                const MinAmount = ethers.utils.parseEther(minimo.toString());
                contractP2p.adSellOffer(Amount.toString(), Price, MinAmount);
                contractP2p.on('Sell', (address, amount, price) => {
                    getSign();
                    dispatch(fetchP2p());
                    setLoading(false);
                    closeOfferModal();
                })
            } catch (e) {
                console.log(e)
                if (e.reason) {
                    setError(true);
                    setErrorMsg(e.reason);
                }
                setLoading(false);
            }
        } else {
            setError(true);
            setErrorMsg('No tienes una cuenta activa');

        }
    }


    return (
        <AnimatePresence>
            <LoaderFullScreen isLoading={loading} key={'loader-handler'} />
            <ErrorMsg error={error} errorMsg={errorMsg} setError={setError} key={'error-handler'} />
            {offerModal &&

                <motion.div
                    className="fixed flex flex-col justify-center items-center bg-black bg-opacity-50 top-0 left-0 w-full h-full z-10"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                        opacity: 0, y: -100,
                        display: 'none'
                    }}
                >
                    <div className='bg-white p-6 rounded-lg shadow-lg sm:w-full md:w-8/12 lg:w-3/12 mx-4'>

                        <div className='flex flex-col items-center gap-4 w-full'>
                            <div className='flex flex-col sm:flex-row w-full justify-between items-center gap-2'>
                                <span className='font-bold text-lg'>OPCO:</span>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <input
                                        type='number'
                                        placeholder='total'
                                        className='border-2 border-gray-200 rounded-md w-full text-lg p-2'
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                    <button
                                        onClick={max}
                                        className='bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto'
                                    >MAX</button>
                                </div>
                            </div>
                            <div className='flex flex-col sm:flex-row w-full justify-between items-center gap-2'>
                                <span className='font-bold text-lg'>Precio:</span>
                                <input
                                    type='number'
                                    className='border-2 border-gray-200 rounded-md w-full text-lg p-2'
                                    value={precios}
                                    onChange={(e) => setPrecios(e.target.value)}
                                />
                            </div>

                            <div className='flex flex-col sm:flex-row w-full justify-between items-center gap-2'>
                                <span className='font-bold text-lg'>Minimo:</span>
                                <input type='number'
                                    className='border-2 border-gray-200 rounded-md w-full text-lg p-2'
                                    value={minimo}
                                    onChange={(e) => setMinimo(e.target.value)}
                                />
                            </div>

                            <div className='w-full flex flex-col sm:flex-row justify-end gap-2 mt-4'>
                                <button
                                    onClick={closeOfferModal}
                                    className=' h-auto rounded-md bg-red-700 px-4 py-2 text-white w-full sm:w-auto'
                                >Cancelar
                                </button>
                                {approvedTokens >= amount &&
                                    <button className=' h-auto rounded-md bg-green-700 px-4 py-2 text-white w-full sm:w-auto'
                                        onClick={createOffer}
                                    >Crear oferta
                                    </button>
                                }
                                {approvedTokens < amount && accountAddress &&
                                    <button className=' h-auto rounded-md bg-yellow-400 px-4 py-2 text-white w-full sm:w-auto'
                                        onClick={approve}
                                    >Aprobar
                                    </button>
                                }
                                {accountAddress &&
                                    <button className=' h-auto rounded-md bg-gray-700 px-4 py-2 text-whitew-full sm:w-auto'
                                    onClick={abrir}
                                    >                          {(isConnected && accountAddress === null) ? 'conectando...' : 'Conectar'}
</button>
                                }
                            </div>
                        </div>
                    </div>
                </motion.div>
            }
        </AnimatePresence>



    )
}
