import React, { useEffect, useState } from 'react'
import {ethers} from 'ethers'
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux'
import { fetchBlockchain } from '../../redux/blockchain/blockchainAction';
import ErrorMsg from '../ErrorMsg';
import { fetchP2p } from '../../redux/p2p/p2pActions';
import LoaderFullScreen from '../loaderFullScreen';
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useConnect, useDisconnect, useSignMessage,  } from 'wagmi'
import {getEthersProvider,getEthersSigner } from '../../utils/ethers'
export const BuyAction = ({ id, amount, minAmount, price, busdBalance, usdtBalance, setBuyModal, buyModal, accountAddress, busdContract, usdtContract, p2pContract }) => {
    const dispatch = useDispatch();

    const closeBuyModal = () => {
        setBuyModal(false)
        setAllowanceVerified(false)
        setBusdInput(0)
        setTokenInput(0)
        setError(false)
        setErrorMessage('')
        setSelectToken('')
        setTokenInput(0)

    }

  
   
    const { address} = useAccount()
  

  
    const conectar = async() => {
        const signer = await getEthersSigner(56)
        const provider =  getEthersProvider(56)
        dispatch(fetchBlockchain(address, signer, provider))
    }

    const [tokenInput, setTokenInput] = useState(0)
    const [BusdInput, setBusdInput] = useState(0)
    const [selectToken, setSelectToken] = useState('')

    const [readyToBuy, setReadyToBuy] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [busdAllowance, setBusdAllowance] = useState(0)
    const [usdtAllowance, setUsdtAllowance] = useState(0)
    const [allowanceVerified, setAllowanceVerified] = useState(false)

    const verifyApprove = async () => {
        if (accountAddress) {
            try {
                const approvedUsdtAmount = await usdtContract.allowance(accountAddress, p2pContract.address)
                const approvedBusdAmount = await busdContract.allowance(accountAddress, p2pContract.address)
                setUsdtAllowance(parseFloat(ethers.utils.formatEther(approvedUsdtAmount)))
                setBusdAllowance(parseFloat(ethers.utils.formatEther(approvedBusdAmount)))
            } catch (e) {
                setError(true)
                setErrorMessage(e.reason)
            }
        } else {
            alert('You need to be logged in to approve tokens')
        }
    }

    const approveBusd = async () => {
        if (accountAddress) {
            try {
                setLoading(true)
                const approvedBusd = await busdContract.approve(p2pContract.address, ethers.utils.parseEther('99999'));
                busdContract.on('Approval', (data) => {
                    conectar();
                    setLoading(false)
                    setError(false)
                    setErrorMessage('')
                    setBusdAllowance(99999)
                })
            } catch (e) {
                setLoading(false)
                if (e.reason) {
                    setError(true)
                    setErrorMessage(e.reason)
                }
            }
        } else {
            alert('login account to approve tokens')
        }
    }

    const approveUsdt = async () => {
        if (accountAddress) {
            try {
                setLoading(true)
                const approvedUsdt = await usdtContract.approve(p2pContract.address, ethers.utils.parseEther('99999'));
                usdtContract.on('Approval', (data) => {
                    conectar();
                    setLoading(false)
                    setError(false)
                    setErrorMessage('')
                    setUsdtAllowance(parseFloat(ethers.utils.formatEther('99999')))
                })
            } catch (e) {
                setLoading(false)
                if (e.reason) {
                    setError(true)
                    setErrorMessage(e.reason)
                }
            }
        } else {
            alert('login account to approve tokens')
        }
    }
                

    useEffect(() => {
        if(accountAddress && !allowanceVerified) {
            verifyApprove()
            setAllowanceVerified(true)
        }
    } , [accountAddress])



    useEffect(() => {
        setTokenInput(BusdInput / price)
    }, [BusdInput, price])

    useEffect(() => {
        setBusdInput(tokenInput * price)
    }, [tokenInput, price])

    useEffect(() => {
        console.log(tokenInput, minAmount, selectToken)
        if (tokenInput >= minAmount && selectToken != '' && accountAddress && tokenInput > 0) {
            if(selectToken == 'BUSD' && busdBalance >= BusdInput) {
            setReadyToBuy(true)
            } else if(selectToken == 'USDT' && usdtBalance >= BusdInput) {
            setReadyToBuy(true)
            } else {
            setReadyToBuy(false)
            }
        } else {
            setReadyToBuy(false)
        }
    } , [tokenInput, minAmount, selectToken])

    const maxToken = () => {
        if(selectToken == 'BUSD'){
            const max =  Math.floor(busdBalance / price)
            if(max > amount){
                setBusdInput(amount * price)
                setTokenInput(amount)
            }else{
                setBusdInput(max * price)
                setTokenInput(max)
            }
        }else if(selectToken == 'USDT'){
            const max =  Math.floor(usdtBalance / price)
            if(max > amount){
                setBusdInput(amount * price)
                setTokenInput(amount)
            }else{
                setBusdInput(max * price)
                setTokenInput(max)
            }
        }else {
            alert('Please select a token')
        }
    }

    const buyBUSD = async () => {
        if (accountAddress) {
            try {
                setLoading(true)
                const Amount = (BusdInput*10**18).toString();
                
                const ID = id;
                const Token = selectToken === 'BUSD' ? busdContract.address : usdtContract.address;
              
                await p2pContract.buyOffer(Amount, ID, Token);
                p2pContract.on('Buy', (data) => {
                    conectar();
                    dispatch(fetchP2p());
                    setLoading(false)
                    closeBuyModal()
                })
            } catch (e) {
                setLoading(false)
                if (e.reason) {
                    setError(true)
                    setErrorMessage(e.reason)
                }
            }
        } else {
            alert('login account to buy tokens')
        }
    }

    const buyUSDT = async () => {
        if (accountAddress) {
            try {
                setLoading(true)
                const Amount = ethers.utils.parseEther(BusdInput.toString());
                const ID = id;
                const Token = selectToken === 'BUSD' ? busdContract.address : usdtContract.address;
                await p2pContract.buyOffer(Amount, ID, Token);
                p2pContract.on('Buy', (data) => {
                    conectar();
                    dispatch(fetchP2p());
                    setLoading(false)
                    closeBuyModal()
                })
            } catch (e) {
                setLoading(false)
                if (e.reason) {
                    setError(true)
                    setErrorMessage(e.reason)
                }
            }
        } else {
            alert('login account to buy tokens')
        }
    }


                



    return (
        <AnimatePresence>
            {buyModal &&
                <motion.div
                    className="p2p-background-dark"
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                        opacity: 0, y: -100,
                        display: 'none'
                    }}


                >
                    <ErrorMsg error={error} errorMsg={errorMessage} setError={setError}/>
                    <LoaderFullScreen loading={loading} />
                    <div className='p2p-modal-buy'>
                        <div className='row'>
                            <div className='col-md-4 d-flex flex-column justify-content-center gap-3 p2p-col1-precio'>
                                <div>monto: {amount}</div>
                                <div>precio: {price}</div>
                                <div
                                style={{color: tokenInput >= minAmount ? '#000000' : '#ff0000'}}
                                >minimo: {minAmount}</div>
                                {accountAddress &&
                                    <div className='p2p-balance'>
                                         BUSD: {busdBalance?.toFixed(2)} <br />
                                         USDT: {usdtBalance?.toFixed(2)}
                                    </div>
                                }
                            </div>
                            <div className='col-md-8 d-flex flex-column align-items-end h-100 gap-4'>
                            <div className='d-flex w-100'>
                                    token:
                                    <select className='p-0' value={selectToken}
                                    style={{backgroundColor: '#DDD'}}
                                     onChange={(e) => setSelectToken(e.target.value)}>
                                        <option value=''>select</option>
                                        <option value='BUSD'>BUSD</option>
                                        <option value='USDT'>USDT</option>
                                    </select>
                                </div>
                                <div className='d-flex'>
                                    OPCO: <input
                                        type='number'
                                        value={tokenInput}
                                        onChange={(e) => setTokenInput(e.target.value)}
                                    />
                                    <button
                                    onClick={maxToken}
                                    >MAX</button>
                                </div>
                                <div className='d-flex'>
                                    {selectToken? selectToken : 'token'}: <input type='number'
                                        value={BusdInput}
                                        onChange={(e) => setBusdInput(e.target.value)}
                                    />
                                    <button
                                        onClick={maxToken}
                                    >MAX</button>
                                </div>
             

                                <div className='w-100 d-flex justify-content-end'>
                                    <button
                                        onClick={closeBuyModal}
                                        className='btn btn-danger mr-2'
                                    >cancelar
                                    </button>
                                    {selectToken === 'BUSD' && busdAllowance >= tokenInput &&
                                    <button className={`btn ${readyToBuy? 'btn-dark': 'btn-secondary p2p-not-allowed'}`}
                                        onClick={buyBUSD}
                                    >comprar con BUSD
                                    </button>
                            
                                    }
                                    {selectToken === 'USDT' && usdtAllowance >= tokenInput &&
                                    <button className={`btn ${readyToBuy? 'btn-dark': 'btn-secondary p2p-not-allowed'}`}
                                        onClick={buyUSDT}
                                    >comprar con USDT
                                    </button>
                                    }

                                    {selectToken === 'BUSD' && busdAllowance < tokenInput &&
                                    <button className='btn btn-warning' onClick={approveBusd}
                                    >approbar BUSD</button>
                                    }

                                    {selectToken === 'USDT' && usdtAllowance < tokenInput &&
                                    <button className='btn btn-warning' onClick={approveUsdt}
                                    >approbar USDT</button>
                                    }

                                    {!accountAddress &&
                                    <button className='btn btn-dark ml-2'
                                    // onClick={connect}
                                    >conectar</button>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>
            }
        </AnimatePresence>
    )
}
