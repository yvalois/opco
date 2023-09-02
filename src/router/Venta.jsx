import React, { useEffect, useState } from 'react'
import StakingCard from '../components/StakingNft/stakingCard';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import { fetchBlockchain } from '../redux/blockchain/blockchainAction';
import { Copy } from '../components/icons/copy';
import { Check } from '../components/icons/check';
import { useParams, useNavigate } from "react-router-dom";
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useConnect, useDisconnect, useSignMessage, } from 'wagmi'
import { getEthersProvider, getEthersSigner } from '../utils/ethers.js'


export default function Venta() {
    const dispatch = useDispatch();

    const { inversionesContract, accountAddress } = useSelector((state) => state.blockchain)

    const blockchain = useSelector((state) => state.blockchain)
    const [is, setIs] = useState(false)

    let prices = []
    const [link, setLink] = useState('');
    let [copyButtonStatus, setCopyButtonStatus] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);
    const { address } = useParams();

    const Inversiones = [
        {
            nombre: "Inversion #1",
            tipo: 1,
            price: 0,
            image: "https://violet-disgusted-halibut-418.mypinata.cloud/ipfs/QmUncKwRVF1yXsckcTA3cQ6GgfMag1M8nQxgrKXMLWkbWH/1.png"
        },
        {
            nombre: "Inversion #2",
            tipo: 2,
            price: 0,
            image: "https://violet-disgusted-halibut-418.mypinata.cloud/ipfs/QmUncKwRVF1yXsckcTA3cQ6GgfMag1M8nQxgrKXMLWkbWH/2.png"
        },
        {
            nombre: "Inversion #3",
            tipo: 3,
            price: 0,
            image: "https://violet-disgusted-halibut-418.mypinata.cloud/ipfs/QmUncKwRVF1yXsckcTA3cQ6GgfMag1M8nQxgrKXMLWkbWH/3.png"
        },
        {
            nombre: "Inversion #4",
            tipo: 4,
            price: 0,
            image: "https://violet-disgusted-halibut-418.mypinata.cloud/ipfs/QmUncKwRVF1yXsckcTA3cQ6GgfMag1M8nQxgrKXMLWkbWH/4.png"
        },
        {
            nombre: "Inversion #5",
            tipo: 5,
            price: 0,
            image: "https://violet-disgusted-halibut-418.mypinata.cloud/ipfs/QmUncKwRVF1yXsckcTA3cQ6GgfMag1M8nQxgrKXMLWkbWH/3.png"
        },

    ]

    const changeLoadingCard = (is) => {
        setCartLoading(is);
    }





    const copiar = () => {
        const aux = window.location.href;
        const a = aux.split('nn');
        const e = a[0];
        setLink(e);
        navigator.clipboard.writeText(`${e}${accountAddress}`);

        setCopyButtonStatus(true);
        setTimeout(() => {
            setCopyButtonStatus(copyButtonStatus);
        }, 2500);
    };






    const { isOpen, open, close, setDefaultChain } = useWeb3Modal()
    const { address: account, isConnecting, isDisconnected, isConnected } = useAccount()

    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { disconnect } = useDisconnect()

    const getSign = async () => {
        const signer = await getEthersSigner(56)
        const provider = getEthersProvider(56)
        dispatch(fetchBlockchain())
    }




    const abrir = () => {
        if (!isConnected) {
            open()
        }
    }


    return (<>
        {accountAddress ? (<div className='w-full h-full  overflow-hidden'>
            <div className="w-full h-full  flex justify-center items-center ">
                <div className="w-full h-full flex flex-col items-center justify-center  ">

                    <div className='w-full flex justify-center'>
                        <h1 className='text-white font-bold'>
                            Inversiones
                        </h1>
                    </div>

                    <div className='w-full flex justify-center md:justify-start md:ml-[670px]'>
                        <div className="flex justify-start h-9 items-center rounded-full bg-white shadow-card dark:bg-light-dark xl:mt-6">
                            <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
                                Link Referido
                            </div>
                            <div className="text w-28 grow-0 truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:w-32 sm:text-sm">
                                {`${link}/${accountAddress}`}
                            </div>
                            <div
                                className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                                title="Copy Address"
                                onClick={copiar}
                            >
                                {copyButtonStatus ? (
                                    <Check className="h-auto w-3.5 text-green-500" />
                                ) : (
                                    <Copy className="h-auto w-3.5" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-full flex justify-center overflow-auto'>

                        <div className='grid grid-cols-2  xl:grid-cols-3 2xl:grid-cols-3 gap-y-6 gap-x-6 md:gap-x-20 justify-start mt-4 '>
                            {
                                Inversiones.map((token, index) => (
                                    <div key={index}>
                                        <StakingCard
                                            url={token.image}
                                            price={token.price}
                                            id={token.tipo}
                                            name={token.nombre}
                                            rarity={token.tipo}
                                            inventory={false}
                                            addr={address}
                                            cartLoading={cartLoading}
                                            setCartLoading={changeLoadingCard}
                                            key={index}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>

        </div>) :
            <div className='w-full h-full flex justify-center items-center'>
                <button
                    onClick={() => abrir()}
                    className=" w-[200px] h-auto text-lg px-4 py-2 text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-orange-500 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                    {(isConnected && accountAddress === null) ? 'conectando...' : 'Conectar'}

                </button>
            </div>}

    </>
    )
}

