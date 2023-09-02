import React, { useState, useEffect } from 'react';
import coffee from '../images/logo/nft.JPG';
import logo from '../images/logo/logo.png';

import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux';
import { fetchMinter, fetchMinterAction } from '../redux/blockchain/minterAction';
import axios from "axios";
// import "../style/style_nft.css";
import Loader from '../components/Loader';
import ErrorMsg from '../components/ErrorMsg';
import TransferModal from "../components/marketNft/TransferModal";
import SellModal from '../components/marketNft/SellModal';
import { AiFillStar } from 'react-icons/ai';
import { fetchBlockchain } from '../redux/blockchain/blockchainAction';
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useConnect, useDisconnect, useSignMessage, } from 'wagmi'
import { getEthersProvider, getEthersSigner } from '../utils/ethers.js'
import { ConnectKitButton } from "connectkit";

export default function NftOpco() {
    const { password } = useParams();
    const minter = useSelector(state => state.minter);
    const { market, marketloaded } = useSelector(state => state.market);
    //const {market, marketloaded} = useSelector(state => state.market);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [transferModal, setTransferModal] = useState(false);
    const [sellModal, setSellModal] = useState(false);
    const [selectedNft, setSelectedNft] = useState();
    const [approved, setApproved] = useState(false);
    const [is, setIs] = useState(false)
    const { accountAddress } = useSelector(state => state.blockchain);
    const blockchain = useSelector(state => state.blockchain);


    const dispatch = useDispatch();

    //const [nftOwned, setNftOwned] = useState([]);



    // useEffect(() => {
    //     if (minter.mintContract){
    //         setNftOwned(minter.nftBalance);
    //     }else{
    //         setNftOwned([]);
    //     }

    // }, [minter.mintContract, minter.nftBalance]);

    const mintNft = async () => {
        setLoading(true);
        try {

            const contract = minter.mintContract;
            const mint = await contract.safeMint(blockchain.accountAddress, password.toString());
            contract.on('Transfer', (from, to, id) => {

                dispatch(fetchMinter());
                setLoading(false);
            })

        } catch (err) {
            if (err.reason) {
                console.log(err);
                setErrorMsg(err.reason);
                setError(true);
            }
            setLoading(false);
        }
    }

    const oppenTransferModal = (id) => {
        setTransferModal(true);
        setSelectedNft(id);
    }

    const openSellModal = (id) => {
        setSellModal(true);
        setSelectedNft(id);
    }


    useEffect(() => {
        if (blockchain.accountAddress && minter.mintContract) {
            verifyApprove();
        }
    }, [minter.mintContract, blockchain.accountAddress]);

    const verifyApprove = async () => {
        const check = await minter.mintContract.isApprovedForAll(blockchain.accountAddress, blockchain.marketContract.address);
        setApproved(check);
    }

    const approve = async () => {
        try {
            setLoading(true);
            const approve = await minter.mintContract.setApprovalForAll(blockchain.marketContract.address, true);
            minter.mintContract.on('ApprovalForAll', (owner, spender, value) => {
                setApproved(true);
                setLoading(false);
            })
        } catch (err) {
            if (err.reason) {
                console.log(err);
                setErrorMsg(err.reason);
                setError(true);

            }
            setLoading(false);
        }


    }

    const repeatStar = (number) => {
        let stars = [];
        for (let i = 0; i < number; i++) {
            stars.push(<AiFillStar className="star" key={i} />);
        }
        return stars;
    }






    const { isOpen, open, close, setDefaultChain } = useWeb3Modal()
    const { address, isConnecting, isDisconnected, isConnected } = useAccount()

    const { connect, connectors, isLoading, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()

    const getSign = async () => {
        const signer = await getEthersSigner(56)
        const provider = getEthersProvider(56)
        dispatch(fetchBlockchain(address, signer, provider))
    }






    return (


        <div className="bg-transparent shadow-lg overflow-hidden  rounded-b-xl flex flex-row justify-center w-full h-full">
            <div className="w-full h-full flex justify-center items-center overflow-hidden">

                <SellModal
                    sellModal={sellModal}
                    setSellModal={setSellModal}
                    selectedNft={selectedNft}
                />
                <TransferModal
                    transferModal={transferModal}
                    setTransferModal={setTransferModal}
                    selectedNft={selectedNft}
                />

                <div>

                    <ErrorMsg error={error} errorMsg={errorMsg} setError={setError} />
                    <Loader isLoading={loading} />

                    {/*Jugar con el bool pero queda como true*/}
                    {minter.mintContract ?
                        <div className=' w-full h-full grid  grid-rows-3 grid-cols-1 sm:grid-cols-2   md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5  '>
                            {minter.nftBalance.map((nft, index) => (
                                <div className="flex flex-col w-64 h-[400px] m-4 bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">

                                    <div className="h-2/3 w-full overflow-hidden">
                                        {/* Descomentar primera borrar segunda */}
                                        {/* <img className="h-full w-full object-cover" src={nft.image} alt="coffee" /> */}
                                        <img className="h-full w-full object-cover" src={coffee} alt="coffee" />
                                    </div>

                                    <div className="p-4 flex-grow">
                                        <h2 className="text-lg font-semibold text-gray-700">{nft.name}</h2>
                                        <div className="flex justify-start w-full text-yellow-500  text-lg">
                                            {repeatStar(parseInt(nft.rarity))}
                                        </div>
                                    </div>

                                    <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
                                        <div className="text-xs text-gray-500 uppercase font-semibold mb-2">Acciones</div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-600 w-full text-center"
                                                onClick={() => setTransferModal(nft.edition)}
                                            >
                                                Enviar
                                            </button>
                                            {approved ? (
                                                <button
                                                    className="bg-green-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-green-600 w-full text-center"
                                                    onClick={() => setSellModal(nft.edition)}
                                                >
                                                    Vender
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={approve}
                                                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-yellow-600 w-full text-center"
                                                >
                                                    Aprobar
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                        : !accountAddress ?
                            <div className='w-full h-full flex justify-center items-center z-[-10]'>
                                <ConnectKitButton.Custom>
                                    {({ isConnected, show, truncatedAddress, ensName }) => {
                                        return (
                                            <button
                                                onClick={show}
                                                className=" w-[200px] h-auto text-lg px-4 py-2 text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-orange-500 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
                                            >
                                                {(isConnected && accountAddress === null) ? 'conectando...' : 'Conectar'}
                                            </button>);
                                    }}
                                </ConnectKitButton.Custom>
                            </div>
                            : null
                    }













                </div>


            </div>
        </div>




    )
}
