import React, { useState } from 'react'
import StakingCard from '../components/StakingNft/stakingCard';
import Table from '../components/StakingNft/stakingTabla';
import ModalW from '../components/StakingNft/modalWithdraw';



export default function Inventario() {


  const Inversiones = [
    {
      nombre: "Inversion #1",
      tipo: 1,
      price: 100,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #2",
      tipo: 2,
      price: 200,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #3",
      tipo: 3,
      price: 500,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #4",
      tipo: 4,
      price: 1000,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #5",
      tipo: 5,
      price: 2000,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #6",
      tipo: 6,
      price: 5000,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #1",
      tipo: 1,
      price: 100,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #2",
      tipo: 2,
      price: 200,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #3",
      tipo: 3,
      price: 500,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #4",
      tipo: 4,
      price: 1000,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #5",
      tipo: 5,
      price: 2000,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },
    {
      nombre: "Inversion #6",
      tipo: 6,
      price: 5000,
      image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
    },

  ]

  const data =[{
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },

  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },

  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },
  {
    TokenId: 0,
    TiempoRestante:10000000,
    Acumulado:10000000000
  },

]
  const [staking, setStaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(10)
  const onOfStakedFilter = () => {
    setStaking(!staking);
  }
  const manejadorModal = (id)=>{
      onClose()
  }
  const onClose=()=>{
    setIsOpen(!isOpen)
  }


  return (
    <div className='w-full h-full  overflow-hidden'>
      <div className="w-full h-full  flex justify-center items-center ">
        <div className="w-full h-full flex flex-col items-center justify-start  ">


        <div className="flex justify-start items-end w-full mb-2 ml-24 mt-6 mr-8">
              <span className="font-bold text-lg mr-2 text-white"> Staked: </span>
              <div
                onClick={onOfStakedFilter}
                className="border border-gray-600 h-6 w-10 rounded-full flex items-center cursor-pointer bg-transparent"
                style={{ justifyContent: staking ? "flex-end" : "flex-start" }}
              >
                <div className="rounded-full shadow-md h-5 w-5 bg-white"
                ></div>
              </div>
            </div>
        

          {!staking ? (<>
          
          
          
          
          
          
          <div className='w-full flex justify-center'>
            <h1 className='text-white font-bold mt-[-30px]'>
              Inventario
            </h1>
          </div>
          <div>
            
          </div>

          <div className='w-full h-full flex justify-center overflow-auto'>
            <div className='grid grid-cols-2 xs:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-20   gap-y-5 justify-start mt-4'>
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
          </div> </>) :
          <Table data={data} modalManage={manejadorModal} />
          }

          <ModalW isOpen={isOpen} onClose={onClose} />




        </div>
      </div>

    </div>
  )
}

