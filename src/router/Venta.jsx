import React,{useEffect} from 'react'
import StakingCard from '../components/StakingNft/stakingCard';
import { useDispatch,useSelector } from 'react-redux';
import { ethers } from 'ethers';

export default function Venta() {
    const dispatch = useDispatch();

    const {inversionesContract} = useSelector((state)=> state.blockchain)
    let prices = []

    const Inversiones = [
        {
            nombre: "Inversion #1",
            tipo: 1,
            price: 0,
            image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
        },
        {
            nombre: "Inversion #2",
            tipo: 2,
            price: 0,
            image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
        },
        {
            nombre: "Inversion #3",
            tipo: 3,
            price: 0,
            image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
        },
        {
            nombre: "Inversion #4",
            tipo: 4,
            price: 0,
            image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
        },
        {
            nombre: "Inversion #5",
            tipo: 5,
            price: 0,
            image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
        },
        {
            nombre: "Inversion #6",
            tipo: 6,
            price: 0,
            image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
        },

    ]

    // const UsdtToOpco =async()=>{
    //     const valor = ethers.utils.parseUnits(price.toString(), 18)
    //       const opco = await inversionesContract.usdtToOpco(valor)
    //       const precio = parseFloat(ethers.utils.formatUnits(opco, 18)).toFixed(2);
    //       return precio; 
    //   }

    //   const returnPrice =async(tipo)=>{
    //       const precio = await inversionesContract.prices_Per_Type(tipo)
    //       return precio; 
    //   }

    

    return (
        <div className='w-full h-full  overflow-hidden'>
            <div className="w-full h-full  flex justify-center items-center ">
                <div className="w-full h-full flex flex-col items-center justify-center  ">

                    <div className='w-full flex justify-center'>
                        <h1 className='text-white font-bold'>
                            Inversiones
                        </h1>
                    </div>

                    <div className='w-full h-full flex justify-center overflow-auto'>
                        <div className='grid grid-cols-2 xs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3 gap-x-20 justify-start mt-4'>
                            {
                                Inversiones.map((token, index) => (
                                    <div>
                                        <StakingCard
                                            url={token.image}
                                            price={token.price}
                                            id={token.tipo}
                                            name={token.nombre}
                                            rarity={token.tipo}
                                            key={index}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
                </div>

        </div>
    )
}

