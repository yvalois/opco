import React, { useState, useEffect } from 'react'
import { BuyAction } from './BuyAction'
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlockchain } from '../../redux/blockchain/blockchainAction';
import { fetchP2p } from '../../redux/p2p/p2pActions';
import LoaderFullScreen from '../loaderFullScreen';
import ErrorMsg from '../ErrorMsg';


export const P2pMap = ({ items, buyModal, setBuyModal, accountAddress, busdBalance, usdtBalance, p2pContract, busdContract, usdtContract }) => {
    const dispatch = useDispatch();
    const addressSlice = (address) => {
        return address.slice(0, 4) + '...' + address.slice(address.length - 4)
    }

    const [id, setId] = useState(0)
    const [amount, setAmount] = useState(0)
    const [minAmount, setMinAmount] = useState(0)
    const [price, setPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const openBuyModal = (id, amount, minAmount, price) => {
        setId(id)
        setAmount(amount)
        setMinAmount(minAmount)
        setPrice(price)
        setBuyModal(true)
    }

    const cancelOffer = (id) => {
        if (accountAddress) {
            try {
                setLoading(true)
                p2pContract.cancelSellOffer(id);
                p2pContract.on('Cancel', (data) => {
                    dispatch(fetchBlockchain());
                    dispatch(fetchP2p());
                    setLoading(false)
                    setError(false)
                    setErrorMessage('')
                    setBuyModal(false)
                })
            } catch (e) {
                setLoading(false)
                if (e.reason) {
                    setError(true)
                    setErrorMessage(e.reason)
                }
            }
        } else {
            setError(true)
            setErrorMessage('You need to be logged in to cancel an offer')
        }
    }




    return (
        <>
            <LoaderFullScreen loading={loading} />
            <ErrorMsg error={error} errorMessage={errorMessage} setError={setError} />
            {buyModal && <BuyAction id={id} amount={amount} minAmount={minAmount} price={price} busdBalance={busdBalance} usdtBalance={usdtBalance} setBuyModal={setBuyModal} buyModal={buyModal} accountAddress={accountAddress} busdContract={busdContract} usdtContract={usdtContract} p2pContract={p2pContract} />}
            <div>
                {items.map(item => (
                    <div className='w-11/12 flex xxs:ml-4 md:ml-16 bg-gray-200 shadow-md rounded-lg p-2 space-x-4 justify-between items-center font-semibold' key={item.id}>
                        <div className='flex flex-col '>
                            <span className='text-gray-600'>Dueño</span>
                            <span className=' block md:hidden'>{addressSlice(item.owner)}</span>
                            <span className=' hidden md:block'>{item.owner}</span>

                        </div>
                        <div className='flex flex-col '>
                            <span className='text-gray-600'>Disponible</span>
                            <span>{item.amount}</span>
                        </div>
                        <div className='flex flex-col '>
                            <span className='text-gray-600'>Minimo</span>
                            <span>{item.minAmount}</span>
                        </div>
                        <div className='flex flex-col '>
                            <span className='text-gray-600'>Precio</span>
                            <span>{item.price}</span>
                        </div>
                        <div>
                            {item.owner === accountAddress ?
                                <button className='w-auto h-auto px-4 py-2 bg-red-600 text-white rounded-lg font-semibold shadow-lg'
                                    onClick={() => cancelOffer(item.id)}>Devolver
                                </button>
                                :
                                <button className='w-auto h-auto px-4 py-2 bg-yellow-300 text-white rounded-lg font-semibold shadow-lg'
                                    onClick={() => openBuyModal(
                                        item.id,
                                        item.amount,
                                        item.minAmount,
                                        item.price)}
                                >Comprar</button>
                            }
                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}
