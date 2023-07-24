import React, { useState, useEffect } from 'react'
import StakingCard from '../components/StakingNft/stakingCard';
import Table from '../components/StakingNft/stakingTabla';
import ModalW from '../components/StakingNft/modalWithdraw';
import ModalS from '../components/StakingNft/modalStaking';
import ModalT from '../components/StakingNft/modalTransfer';
import { fetchBlockchain } from '../redux/blockchain/blockchainAction';
import { Copy } from '../components/icons/copy';
import { Check } from '../components/icons/check';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";



export default function Inventario() {

  const { inversionesBalance, accountAddress } = useSelector((state) => state.blockchain)
  const dispatch = useDispatch();

  const [staking, setStaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenS, setIsOpenS] = useState(false);
  const [isOpenT, setIsOpenT] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  const { address } = useParams();
  const [link, setLink] = useState('');
  let [copyButtonStatus, setCopyButtonStatus] = useState(false);

  const [id, setId] = useState()
  
  const onOfStakedFilter = () => {
    setStaking(!staking);
  }
  const manejadorModal = (id, type) => {
    setId(id);
    onClose(type);
  }

  
  const changeLoadingCard = (is)=>{
    setCartLoading(is);
}
  const onClose = (type) => {

    if (type === "s") {
      setIsOpenS(!isOpenS)

    } else if (type === "w") {
      setIsOpen(!isOpen)

    } else
      setIsOpenT(!isOpenT)
  }

  const copiar = () => {
    const aux = window.location.href;
    const a = aux.split('inventarioInversiones/nn');
    const e = a[0];
    setLink(e);   
    navigator.clipboard.writeText(`${e}venta/${accountAddress}`);

    setCopyButtonStatus(true);
    setTimeout(() => {
        setCopyButtonStatus(copyButtonStatus);
    }, 2500);
};



  

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
              <h1 className='text-white font-bold md:mt-[-30px]'>
                Inventario
              </h1>
            </div>
            <div>

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
                        addr={address}
                        cartLoading={cartLoading}
                        setCartLoading={changeLoadingCard}
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

