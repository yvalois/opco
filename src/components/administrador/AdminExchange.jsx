import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ethers } from 'ethers';
import moment from 'moment';
import { contract } from '../../redux/blockchain/blockchainRouter';

export default function AdminExchange() {
    const router = contract();
    const timestampToDate = (timestamp) => {
        return moment.unix(timestamp).format("DD MMM, YYYY");
    }
    const sliceAddress = (address) => {
        return address.slice(0, 4) + "..." + address.slice(address.length - 4);
    }

    const { tokenContract, busdContract, accountAddress, exchangeContract } = useSelector(state => state.blockchain);
    const dispatch = useDispatch();

    const [busdBalance, setBusdBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);
    const [tokenAmount, setTokenAmount] = useState(0);
    const [busdAmount, setBusdAmount] = useState(0);

    const [data, setData] = useState([]);
    const [totalBusd, setTotalBusd] = useState(0);

    const exchangeBalanace = async () => {
        const busd = await busdContract.balanceOf(exchangeContract.address);
        const token = await tokenContract.balanceOf(exchangeContract.address);
        setBusdBalance(ethers.utils.formatEther(busd));
        setTokenBalance(parseFloat(token / 10 ** 8));
    }

    useEffect(() => {
        if (accountAddress) {
            exchangeBalanace();
        }
    }, [accountAddress])

    const Data = async () => {
        const fetchData = await exchangeContract.getSaledata();
        console.log(fetchData);
        setData(fetchData.filter(data => data.claimed === false));
    }

    useEffect(() => {
        if (accountAddress) {
            Data();
        }
    }, [accountAddress])

    useEffect(() => {
        if (data.length > 0) {
            let total = 0;
            data.forEach(data => {
                total += parseFloat(ethers.utils.formatEther(data.busdAmount));
            });
            setTotalBusd(total);
        }
    }, [data])

    const retire = async (option) => {
        if (accountAddress) {
            if (option === 1) {
                const amount = (tokenAmount * 10 ** 8).toString();
                const tx = await exchangeContract.withdrawToken(tokenContract.address, amount);
                await tx.wait();
                exchangeBalanace();
                setTokenAmount(0);
            }
            if (option === 2) {
                const amount = ethers.utils.parseEther(busdAmount.toString());
                const tx = await exchangeContract.withdrawToken(busdContract.address, amount);
                await tx.wait();
                exchangeBalanace();
                setTokenAmount(0);
            }
        } else {
            alert('Connect wallet');
        }
    }


    return (
        <div>
            <div className="Admin-exchange-tittle">
                Adminstrador Exchange {router.EXCHANGE_ADDRESS}
            </div>
            <div>
                <div className='border  my-2'>
                    <div className='col'>Balance OPCO: {tokenBalance} </div>
                    <div className='col'>
                        <input
                            type={'number'}
                            onChange={(e) => setTokenAmount(e.target.value)}
                            value={tokenAmount}
                        />
                        <button
                            onClick={() => retire(1)}
                        >retirar</button>
                    </div>
                </div>
                <div className='border  my-2'>
                    <div className='col'>Balance BUSD: {busdBalance} </div>
                    <div className='col'>
                        <input
                            type={'number'}
                            onChange={(e) => setBusdAmount(e.target.value)}
                            value={busdAmount}
                        />
                        <button
                            onClick={() => retire(2)}
                        >retirar</button></div>
                </div>
                {/* <div className='border d-flex justify-content-around my-2'>
                    <div>Precio OPCO: {tokenBalance}</div>
                    <div><input /> <button>cambiar</button></div>
                </div> */}
            </div>
            <div className="Admin-exchange-tittle">
                Retiros Pendientes
            </div>
            <div>
                {accountAddress && data.map((data, index) => (
                    <div className='border d-flex justify-content-around my-2' key={index}>
                        <div className='col'>Wallet {sliceAddress(data.owner)} </div>
                        <div className='col'>OPCO {parseFloat(data.opcoAmount / 10 ** 8)} </div>
                        <div className='col'>BUSD: {ethers.utils.formatEther(data.busdAmount)}</div>
                        <div className='col'>{timestampToDate(parseInt(data.unlockTime))}</div>
                    </div>
                ))}

                <div className='border d-flex justify-content-around my-2'>
                    <div>TOTAL </div>
                    <div>BUSD: {totalBusd}</div>
                </div>
            </div>
        </div>
    )
}