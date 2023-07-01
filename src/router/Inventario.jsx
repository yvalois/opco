import React, { useState, useEffect } from 'react'
import StakingCard from '../components/StakingNft/stakingCard';
import Table from '../components/StakingNft/stakingTabla';
import ModalW from '../components/StakingNft/modalWithdraw';
import ModalS from '../components/StakingNft/modalStaking';
import ModalT from '../components/StakingNft/modalTransfer';
import { fetchBlockchain } from '../redux/blockchain/blockchainAction';

import { useDispatch, useSelector } from 'react-redux';



export default function Inventario() {

  const { inversionesBalance, accountAddress } = useSelector((state) => state.blockchain)
  const dispatch = useDispatch();

  const [staking, setStaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenS, setIsOpenS] = useState(false);
  const [isOpenT, setIsOpenT] = useState(false);


  const [id, setId] = useState()
  
  const onOfStakedFilter = () => {
    setStaking(!staking);
  }
  const manejadorModal = (id, type) => {
    setId(id);
    onClose(type);
  }
  const onClose = (type) => {

    if (type === "s") {
      setIsOpenS(!isOpenS)

    } else if (type === "w") {
      setIsOpen(!isOpen)

    } else
      setIsOpenT(!isOpenT)
  }
  

  return (<>
    {accountAddress ? (<div className='w-full h-full  overflow-hidden'>
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
              <div className='grid grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-y-6 gap-x-6  md:gap-x-20 justify-start mt-4 '>
                {
                  inversionesBalance.map((token, index) => (
                    <div>
                      <StakingCard
                        url={token.image}
                        price={0}
                        id={token.id}
                        name={token.nombre}
                        rarity={token.tipo}
                        inventory={true}
                        switcherS={manejadorModal}
                        key={index}
                      />
                    </div>
                  ))
                }
              </div>
            </div> </>) :
            <Table  modalManage={manejadorModal} />
          }

          {id !== undefined && (<ModalW isOpen={isOpen} onClose={onClose} id={id} />)}
          {id !== undefined &&(<ModalS isOpen={isOpenS} onClose={onClose} id={id} />)}








        </div>
      </div>

    </div>) :
      <div className='w-full h-full flex justify-center items-center'>
        <button
          onClick={() => dispatch(fetchBlockchain())}
          className=" w-[200px] h-auto text-lg px-4 py-2 text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-orange-500 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
        >Conectar</button>
      </div>}


  </>

  )
}

