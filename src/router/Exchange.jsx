import { CgArrowsExchangeAltV } from 'react-icons/cg';
import { BsArrowDown } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import logo from '../images/logo/logo.png';
import busd from '../images/logo/busd.png';
import cafe from '../images/logo/coffee.png';
import cafe2 from '../images/logo/OpenCoffe.png';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import ExchangeLoading from '../components/ExchangeLoading';
import { fetchBlockchain, fetchBalance } from '../redux/blockchain/blockchainAction';
import Timer from '../components/Timer';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser'
import { contract } from '../redux/blockchain/blockchainRouter';
import { useWeb3Modal } from '@web3modal/react'
import { useAccount, useConnect, useDisconnect, useSignMessage, } from 'wagmi'
import { getEthersProvider, getEthersSigner } from '../utils/ethers.js'
const fee = 0.01;



export default function Exchange() {
  const dispatch = useDispatch();


  const { refered } = useParams();
  //console.log('blockchain',blockchain);
  const [isHover, setIsHover] = useState(false);
  const [aoexPrice, setAoexPrice] = useState(0);
  const [busdPrice, setBusdPrice] = useState(0);
  const [aoexToBusd, setAoexToBusd] = useState(false);
  const [goldPrice, setGoldPrice] = useState(0);
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [busdCost, setBusdCost] = useState(0);
  const [aoexCost, setAoexCost] = useState(0);
  const [timerToBuy, setTimerToBuy] = useState(0);

  const [busdAllowance, setBusdAllowance] = useState(0);
  const [aoexAllowance, setAoexAllowance] = useState(0);
  const [nuevoPrecio, setNuevoPrecio] = useState(0);
  const [owner, setOwner] = useState('');
  const [yoAreOwner, setYoAreOwner] = useState(false);
  const [referalCount, setReferalCount] = useState(0);
  const [is, setIs] = useState(false)
  const {accountAddress, priceSetterContract} = useSelector(state => state.blockchain);
  const blockchain = useSelector(state => state.blockchain);



  const referalRef = useRef();

  const [loginError, setLoginError] = useState('');

  const InputButtonGroup = ({ onChange, value, onClick, image, text }) => (
    <div className='flex flex-row justify-between items-center w-4/5 bg-white bg-opacity-70 border-4 border-black mt-2 h-10 text-xs rounded-full'>
      <input
        type="number"
        className='text-lg text-right flex-grow border-none'
        value={value}
        onChange={onChange}
      />
      <button
        className='h-full bg-black text-white rounded-tr-full rounded-br-full w-12 hover:bg-gray-400'
        onClick={onClick}
      >MAX</button>
    </div>
  );

  const BalanceInfo = ({ isAOEX, image, text, balance }) => (
    <div className='text-sm flex justify-between items-center w-4/5 justify-self-center self-center'>
      <div className='flex items-center rounded-md relative text-sm'>
        <img src={image} alt={text} className='w-10 mr-2' />
        {text}
        {isAOEX && (
          <div
            className='flex justify-center items-center font-bold text-md pointer bg-black text-white r
            ounded-3xl w-8 h-8 ml-2 text-md'
            onClick={handleAddTokenToMetamask}
          >
            +
          </div>
        )}
      </div>
      <div className='flex justify-center items-center rounded-md  ml-auto text-sm'>
        balance: {balance === null ? 0 : balance?.toFixed(2)}
      </div>
    </div>
  );

  useEffect(() => {
    if (blockchain.exchangeContract !== null && blockchain.accountAddress !== null) {

      const fetchGoldPrice = async () => {

        const gold = await blockchain.exchangeContract.fetchPrice();

        setGoldPrice(parseFloat(ethers.utils.formatEther(gold)));

        const timer = await blockchain.exchangeContract.dateToUnlock();

        setTimerToBuy(timer);

        const busdAllowance = await blockchain.busdContract.allowance(blockchain.accountAddress, blockchain.exchangeContract.address);

        const aoexAllowance = await blockchain.tokenContract.allowance(blockchain.accountAddress, blockchain.exchangeContract.address);

        const getOwner = await blockchain.priceSetterContract.owner();
        setOwner(getOwner);
        setBusdAllowance(parseFloat(ethers.utils.formatUnits(busdAllowance, 8)));
        setAoexAllowance(parseFloat(ethers.utils.formatUnits(aoexAllowance, 8)));
      }

      fetchGoldPrice();

    }
  }, [blockchain.exchangeContract, blockchain.accountAddress]);

  const ownerVerification = () => {
    if (blockchain.accountAddress) {
      if (blockchain.accountAddress.toLowerCase() === owner.toLowerCase()) {
        setYoAreOwner(true);

      }
    }
  }

  useEffect(() => {
    ownerVerification();

  }
    , [owner]);




  useEffect(() => {
    if (blockchain.error === 'Error de transaccion') {
      setLoader(true);
      setLoginError(blockchain.error);
    }
  }, [blockchain.error])

  const handleHovertoggle = () => {
    setIsHover(true);
  };

  const handleHoverout = () => {
    setIsHover(false);
  };

  const handleAoexToBusd = () => {
    if (aoexToBusd === true) {
      setAoexToBusd(false);
    } else {
      setAoexToBusd(true);
    }
    setAoexPrice(0);
    setBusdPrice(0);
    setAoexCost(0);
    setBusdCost(0);
  };

  const setNewPrice = async () => {
    const nuevoPrecioTowei = ethers.utils.parseEther(nuevoPrecio.toString())
    try {
       await priceSetterContract.newPrice(nuevoPrecioTowei)
    } catch (e) {
      console.log(e);
    }
  }


  const calculateBUSDPriceUp = (e) => {
    setBusdPrice(e.target.value);
    setBusdCost(e.target.value);
    setAoexPrice(e.target.value / goldPrice);
    setAoexCost((e.target.value / goldPrice) - (e.target.value / goldPrice) * fee);
  }

  const calculateAoexPriceUp = (e) => {
    setAoexPrice(e.target.value);
    setAoexCost(e.target.value);
    setBusdPrice(e.target.value * goldPrice);
    setBusdCost(e.target.value * goldPrice - ((e.target.value * goldPrice) * fee));
  }

  const busdMaxClickUp = () => {
    setBusdPrice(blockchain.busdBalance - (blockchain.busdBalance * 0.000001));
    setBusdCost(blockchain.busdBalance - (blockchain.busdBalance * 0.0000012));
    setAoexPrice(blockchain.busdBalancee / goldPrice);
    setAoexCost((blockchain.busdBalance / goldPrice) - (blockchain.busdBalance / goldPrice) * fee);

  }

  const aoexMaxClickUp = () => {
    setAoexPrice(blockchain.tokenBalance - (blockchain.tokenBalance * 0.000001));
    setAoexCost(blockchain.tokenBalance - (blockchain.tokenBalance * 0.000001));
    setBusdPrice(blockchain.tokenBalance * goldPrice);
    setBusdCost(blockchain.tokenBalance * goldPrice - ((blockchain.tokenBalance * goldPrice) * fee));
  }

  const calculateBUSDPriceDown = (e) => {
    setAoexPrice(e.target.value);
    setAoexCost(e.target.value);
    setBusdPrice(e.target.value * goldPrice + ((e.target.value * goldPrice) * fee));
    setBusdCost(e.target.value * goldPrice + ((e.target.value * goldPrice) * fee));
  }

  const calculateAoexPriceDown = (e) => {
    setBusdPrice(e.target.value);
    setBusdCost(e.target.value);
    setAoexPrice((e.target.value / goldPrice) + (e.target.value / goldPrice) * fee);
    setAoexCost((e.target.value / goldPrice) + (e.target.value / goldPrice) * fee);
  }

  const busdMaxClickDown = () => {
    setBusdPrice(blockchain.busdBalance - (blockchain.busdBalance * 0.000001));
    setBusdCost(blockchain.busdBalance - (blockchain.busdBalance * 0.000001));
    setAoexPrice((blockchain.busdBalance / goldPrice) + (blockchain.busdBalance / goldPrice) * fee);
    setAoexCost((blockchain.busdBalance / goldPrice) + (blockchain.busdBalance / goldPrice) * fee);

  }

  const aoexMaxClickDown = () => {
    setAoexPrice(blockchain.tokenBalance - (blockchain.tokenBalance * 0.00001));
    setAoexCost(blockchain.tokenBalance - (blockchain.tokenBalance * 0.00001));
    setBusdPrice(blockchain.tokenBalance * goldPrice + ((blockchain.tokenBalance * goldPrice) * fee));
    setBusdCost(blockchain.tokenBalance * goldPrice + ((blockchain.tokenBalance * goldPrice) * fee));
  }

  const buyAOEX = async () => {
    setError(false);
    setSuccess(false);
    setLoader(true);
    try {
      const addressBUSD = blockchain.busdContract.address;
      const tx = await blockchain.exchangeContract.buyToken(ethers.utils.parseEther(busdPrice.toString()), addressBUSD);
      await tx.wait();
      setSuccess(true);
      dispatch(fetchBalance());
      setBusdPrice(0);
      setAoexPrice(0);
      setBusdCost(0);
      setAoexCost(0);
    } catch (e) {
      console.log(e);
      setError(true);
    }

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


  const abrir = () => {
    if (!isConnected) {
      open()
    }
  }



  const sellAOEX = async () => {
    setError(false);
    setSuccess(false);
    setLoader(true);
    try {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "Tu venta se validara en 5 dias podras ver el estado en la seccion de retiros",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vender!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const adrressBUSD = blockchain.busdContract.address;
          const _amount = (aoexPrice * 10 ** 8).toFixed(0);
          try {
            const tx = await blockchain.exchangeContract.sellToken((_amount.toString()), adrressBUSD);
            await tx.wait()
            setSuccess(true);
            getSign()
            setBusdPrice(0);
            setAoexPrice(0);
            setAoexCost(0);
            setBusdCost(0);
            setLoader(false);
          } catch (err) {
            setLoader(false);
            Swal.fire({
              title: 'failed_',
              text: err.reason,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
        } else {
          Swal.fire(
            'Cancelado'
          )
          setLoader(false);
        }
      })

    } catch (e) {
      console.log(e);
      setError(true);
      setLoader(false);
    }
  }

  const approveBusd = async () => {
    setError(false);
    setSuccess(false);
    setLoader(true);
    try {
      const tx = await blockchain.busdContract.approve(blockchain.exchangeContract.address, ethers.utils.parseEther('999999999999'));
      await tx.wait()
      setSuccess(true);
      getSign()


    } catch (err) {
      console.log(err.reason);
      setError(true);
    }
  }

  const approveAoex = async () => {
    setError(false);
    setSuccess(false);
    setLoader(true);

    try {
      const tx = await blockchain.tokenContract.approve(blockchain.exchangeContract.address, ethers.utils.parseEther('999999999999'));
      await tx.wait();
      setSuccess(true);
      getSign()


    } catch (err) {
      console.log(err.reason);
      setError(true);
    }
  }

  const copyValue = () => {
    referalRef.current.select();
    document.execCommand('copy');
  }


  const handleAddTokenToMetamask = async () => {
    const tokenAddress = blockchain.tokenContract.address;
    const tokenSymbol = "OPCO";
    const tokenDecimals = 8;
    const tokenImage = 'https://gateway.pinata.cloud/ipfs/QmU77uxsKixrC4au2xaQmt3QhUz5yW7itwxnpXgQ7bdC6w';

    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tokenAddress, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: tokenImage, // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className=" w-full h-full flex flex-col 2xl:flex-row justify-around items-center p-4" >

      <ExchangeLoading
        loginError={loginError}
        loader={loader}
        setLoader={setLoader}
        success={success}
        setSuccess={setSuccess}
        error={error} />


      <div className=' flex flex-col justify-center lg:flex-row  items-center space-y-4 lg:space-y-0 lg:space-x-4'>
        <img className='w-24 lg:w-auto' src={logo} alt='logo' />
        <h1 className='text-4xl lg:text-10xl text-black font-bold text-center'>
          OPEN COFFEE
        </h1>
      </div>


      <div className='w-full lg:w-8/12  2xl:w-4/12 h-full flex flex-col justify-center items-center'>

        <div className="w-full border border-solid rounded-lg flex flex-col font-bold relative justify-center align-middle  text-black">
          {/* {accountAddress ?
            <div className="flex flex-col items-start justify-start bg-gray-100 p-5">
              <div className="flex flex-col items-start justify-start bg-white p-5">
                <p className="mb-2 font-medium text-gray-700">link de referido</p>
                <div className="flex items-center justify-start">
                  <input
                    type="text"
                    value={`https://opencoffee.io/app/#/${blockchain.accountAddress}`}
                    ref={referalRef}
                    readOnly
                    className="border border-gray-300 rounded-md p-2 mr-2 flex-grow"
                  />
                  <button
                    onClick={copyValue}
                    className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    copiar
                  </button>
                </div>
                <p className="mt-2 font-medium text-gray-700">referidos:{referalCount}</p>
              </div>
            </div>

            :
            null} */}







          <div className='w-full flex flex-col p-4 bg-white shadow-blue-500/50 '>

            <div className='flex flex-col justify-center items-center space-y-2'>
              <div className='font-bold text-lg'>Exchange</div>
              <div className='text-xs'>{contract().AOEX_ADDRESS}</div>
            </div>


            <div className='w-full h-2/5 flex flex-col justify-center align-start text-lg'>
              <div className='text-sm flex justify-between items-center w-4/5 justify-self-center self-center'>{aoexToBusd ?
                <>
                  <div className='flex items-center rounded-md  relative text-sm'>
                    <img src={logo} alt="aoex" className='w-10 mr-2' />
                    OPCO

                  </div>
                  <div
                    className='flex justify-center items-center font-bold text-md pointer bg-black text-white rounded-3xl w-8 h-8 ml-2 text-md'
                    onClick={handleAddTokenToMetamask}
                  >
                    +
                  </div>
                  <div className='flex justify-center items-center rounded-md  ml-auto text-md font-bold'>
                    balance: {blockchain.tokenBalance === null ? 0 : blockchain.tokenBalance?.toFixed(2)}
                  </div>
                </>
                :
                <>
                  <div className='flex items-center rounded-md  relative text-sm'>
                    <img src={busd} alt="busd" className='w-10 mr-2' />
                    BUSD
                  </div>
                  <div className='flex justify-center items-center rounded-md  ml-auto text-sm'>
                    balance: {blockchain.busdBalance === null ? 0 : blockchain.busdBalance?.toFixed(2)}
                  </div>
                </>
              }</div>
              <div className='flex justify-center items-center '>
                <div className="flex flex-row justify-between items-center w-4/5 bg-white bg-opacity-70 border-4 border-black mt-2 h-10 text-xs rounded-full">
                  <input
                    className=" w-full text-lg text-right flex-grow rounded-full border-none focus:outline-none"
                    onChange={aoexToBusd ? calculateAoexPriceUp : calculateBUSDPriceUp}
                    type="number"
                    value={aoexToBusd ? aoexPrice : busdPrice}
                  />
                  <button
                    className="h-full bg-black text-white rounded-tr-full rounded-br-full w-12 hover:bg-gray-400"
                    onClick={aoexToBusd ? aoexMaxClickUp : busdMaxClickUp}
                  >
                    MAX
                  </button>
                </div>

              </div>
            </div>

            <div className='w-[100%]  flex flex-col justify-center items-center cursor-pointer  h-20 mt-4 text-xl'
              onMouseOver={handleHovertoggle}
              onMouseOut={handleHoverout}
              onClick={handleAoexToBusd}
            >

              {isHover ? (
                <CgArrowsExchangeAltV className='icon-hover' />
              ) : (
                <BsArrowDown className='icon' />
              )}

            </div>

            <div className='w-full h-2/5 flex flex-col justify-center align-start text-lg'>
              <div className='text-sm flex justify-between items-center w-4/5 justify-self-center self-center'>{
                aoexToBusd ?
                  <>
                    <div className='flex items-center rounded-md  relative text-sm'>
                      <img src={busd} alt="busd" className='w-10 mr-2' />
                      BUSD
                    </div>

                    <div className='flex justify-center items-center rounded-md  ml-auto text-sm'>
                      balance: {blockchain.busdBalance === null ? 0 : blockchain.busdBalance?.toFixed(2)}
                    </div>
                  </>
                  :
                  <>
                    <div className='flex items-center rounded-md  relative text-sm'>
                      <img src={logo} alt="aoex" className='w-10 mr-2' />
                      OPCO
                      <div
                        className='flex justify-center items-center font-bold text-md pointer bg-black text-white rounded-3xl w-8 h-8 ml-2 text-md'
                        onClick={handleAddTokenToMetamask}
                      >
                        +
                      </div>
                    </div>

                    <div className='flex justify-center items-center rounded-md  ml-auto text-sm'>
                      balance: {blockchain?.tokenBalance === null ? 0 : blockchain?.tokenBalance?.toFixed(2)}
                    </div>
                  </>
              }</div>
              <div className='flex justify-center items-center '>
                <div className='flex flex-row justify-between items-center w-4/5 bg-white bg-opacity-70 border-4 border-black mt-2 h-10 text-xs rounded-full'>
                  <input
                    type="number"
                    className='w-full text-lg text-right flex-grow rounded-full border-none focus:outline-none'
                    value={aoexToBusd ? busdCost : aoexCost}
                    onChange={aoexToBusd ? calculateAoexPriceDown : calculateBUSDPriceDown}
                    inputMode="numeric"

                  />
                  <button
                    className='h-full bg-black text-white rounded-tr-full rounded-br-full w-12 hover:bg-gray-400'
                    onClick={aoexToBusd ? busdMaxClickDown : aoexMaxClickDown}
                  >MAX</button>
                </div>
              </div>

            </div>

            <div className='w-full h-[20%] flex flex-col justify-center items-start  font-bold  text-[clamp(15px, 0.8vw, 40px)]  mt-2.5'>
              Tus OPCO's: {blockchain.exchangeBalance === null ? 0 : blockchain.exchangeBalance?.toFixed(2)}
            </div>

            <div className='w-full flex justify-center items-center'>

              {accountAddress === null ?
                <button className='mt-5 text-md font-semibold bg-black text-white w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                 hover:text-black'
                  onClick={() => abrir()}
                >                          {(isConnected && accountAddress === null) ? 'conectando...' : 'conectar'}
                </button>
                :
                <>
                  {aoexToBusd ?
                    <>
                      {blockchain.tokenBalance > aoexPrice ?
                        <>
                          {loader ?
                            <button className='mt-5 text-md font-semibold bg-yellow-300 text-black w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                           hover:text-white '>loading...</button>
                            :
                            aoexAllowance >= aoexPrice && aoexPrice > 0 ?
                              <button className='mt-5 text-md font-semibold bg-yellow-300 text-black w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                           hover:text-white ' onClick={sellAOEX}>Exchange</button>
                              : aoexPrice > 0 ?
                                <button className='mt-5 text-md font-semibold bg-yellow-300 text-black w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                           hover:text-white ' onClick={approveAoex}>Aprobar</button>
                                :
                                <button className='mt-5 text-md font-semibold bg-gray-300 text-black w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                           hover:text-white '>Ingresar valor</button>
                          }
                        </>
                        :
                        <button className='mt-5 text-md font-semibold bg-yellow-300 text-black w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                           hover:text-white '>insufficient funds</button>
                      }
                    </>
                    :
                    <>
                      {blockchain.busdBalance > busdPrice ?
                        <>
                          {loader ?
                            <button className='mt-5 text-md font-semibold bg-yellow-300 text-black w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                           hover:text-white '>loading...</button>
                            :
                            busdAllowance >= busdPrice && busdPrice > 0 ?
                              <button className='mt-5 text-md font-semibold bg-yellow-300 text-black w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                           hover:text-white '  onClick={buyAOEX}>Exchange</button>
                              : busdPrice > 0 ?
                                <button className='mt-5 text-md font-semibold bg-yellow-300 text-black w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                           hover:text-white ' onClick={approveBusd}>Aprobar</button>

                                :
                                <button className='mt-5 text-md font-semibold bg-gray-300 text-black w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                           hover:text-white '>Ingresar valor</button>
                          }
                        </>
                        :
                        <button className='mt-5 text-md font-semibold bg-yellow-300 text-black w-[30%] h-12 transition-colors duration-500 ease-in rounded-full mb-2.5 hover:bg-
                         hover:text-white '>insufficient funds</button>
                      }
                    </>
                  }
                </>
              }
            </div>
          </div>




        </div>



        {blockchain.networkID === 56 || blockchain.networkID === 97 ?
          null
          : <div className="bg-yellow-500 mt-8 text-white p-3 rounded-md text-center font-bold">Connect to Binance Smart Chain</div>}

        {yoAreOwner ?
          <div className="w-full h-auto mt-4 p-4 text-black">
            <p className="mb-2 font-bold">Precio actual: {goldPrice}</p>
            <input
              className="border-2 border-gray-300 p-2 rounded-md mb-2 w-full"
              type="number"
              value={nuevoPrecio}
              onChange={(e) => setNuevoPrecio(e.target.value)}
              placeholder="0.12"
            />
            <button className="bg-blue-500 text-white p-2 rounded-md w-full" onClick={setNewPrice}>
              Cambiar precio
            </button>
          </div>
          : null}
      </div>




    </div>
  )
}
