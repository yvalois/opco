import React, { useState, useEffect } from 'react'
import { P2pMap } from '../components/P2p/P2pMap';
import "../style/style_p2p.css";
import { useSelector, useDispatch } from 'react-redux';
import { fetchP2p } from '../redux/p2p/p2pActions';
import { P2pMenu } from '../components/P2p/P2pMenu';
import { P2pNewOfferModal } from '../components/P2p/P2pNewOfferModal';
import logo from '../images/logo/logo.png';




export const P2p = () => {
    const dispatch = useDispatch();
    const [buyModal, setBuyModal] = useState(false);
    const [offerModal, setOfferModal] = useState(false);
    const [priceFilter, setPriceFilter] = useState(0);
    const [minFilter, setMinFilter] = useState(0);
    const [order, setOrder] = useState('');

    const { accountAddress, busdBalance, tokenBalance, usdtBalance, p2pContract, tokenContract, busdContract, usdtContract } = useSelector(state => state.blockchain);

    const { buyData, sellData, loaded } = useSelector(state => state.p2p);

    const [filterData, setFilterData] = useState(sellData);
    console.log(buyData)
    console.log(sellData)

    useEffect(() => {
        if (!loaded) {
            dispatch(fetchP2p())
        }
    }, [loaded])

    useEffect(() => {
        let data = sellData;
        if (priceFilter > 0) {
            data = data.filter(item => item.price <= priceFilter)
        }
        if (minFilter > 0) {
            data = data.filter(item => item.minAmount <= minFilter)
        }
        if (order === 'maxPrice') {
            data = data.sort((a, b) => a.price - b.price)
        }
        if (order === 'minPrice') {
            data = data.sort((a, b) => b.price - a.price)
        }
        if (order === 'minAmount') {
            data = data.sort((a, b) => a.minAmount - b.minAmount)
        }
        if (order === 'maxAmount') {
            data = data.sort((a, b) => b.minAmount - a.minAmount)
        }
        data = data.filter(item => item.isActive === true)
        setFilterData(data);
    }, [sellData, priceFilter, minFilter, order])

    console.log("sellData", sellData);

    return (



        <div className="w-full h-full overflow-auto">


            <div className="w-full h-full  bg-white rounded-lg m-2">
                <div className=' w-full bg-white h-full overflow-auto'>
                    <P2pMenu priceFilter={priceFilter} setPriceFilter={setPriceFilter} minFilter={minFilter} setMinFilter={setMinFilter} order={order} setOrder={setOrder} />
                    <P2pNewOfferModal offerModal={offerModal} setOfferModal={setOfferModal} tokenBalance={tokenBalance} contractP2p={p2pContract} accountAddress={accountAddress} tokenContract={tokenContract} />
                    <div >
                        <div className='w-full h-full flex flex-col '>
                            <div className='self-center w-6/12 h-[30px] flex bg-yellow-300 shadow-md my-5 rounded-lg p-6 justify-between items-center font-medium text-center text-white cursor-pointer'
                                onClick={() => setOfferModal(true)}>
                                <div className='w-100'>
                                    Crear oferta 
                                </div>
                            </div>
                            <P2pMap
                                items={filterData}
                                buyModal={buyModal}
                                setBuyModal={setBuyModal}
                                accountAddress={accountAddress}
                                busdBalance={busdBalance}
                                usdtBalance={usdtBalance}
                                p2pContract={p2pContract}
                                busdContract={busdContract}
                                usdtContract={usdtContract}
                            />
                        </div>
                    </div>
                </div>

            </div>

        </div>


    )
}
