import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import busd from '../../images/logo/busd.png';
import opco from '../../images/logo/logo.png';
import tether from '../../images/logo/tether.png';

import { AiFillStar } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { contract } from '../../redux/blockchain/blockchainRouter';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ethers } from 'ethers';
import Swal from 'sweetalert2';
import { updateStakingTokens, updateInversionTokens } from '../../redux/blockchain/blockchainAction'


function StakingCard({ url, price, name, rarity, inventory, switcherS, id, addr,setCartLoading, cartLoading }) {

  const repeatStar = (number) => {
    let stars = [];
    for (let i = 0; i < number; i++) {
      stars.push(<AiFillStar className="star" key={i} />);
    }
    return stars;
  }
  const { inversionesContract, usdtContract, opcoContract, busdContract, accountAddress } = useSelector((state) => state.blockchain)
  const dispatch = useDispatch();
  const [opcoP, setOpco] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [allowanceO, setAllowanceO] = useState(0);
  const [allowanceU, setAllowanceU] = useState(0);
  const code = process.env.REACT_APP_OPCO_PASSWORD
  const [token, setToken] = useState("OPCO")


  const openStaking = (type) => {
    switcherS(id, type)
  }

  const UsdtToOpco = async () => {
    setCartLoading(true)
    try{
      const valor = ethers.utils.parseUnits(precio.toString(), 8)
      const opco = await inversionesContract.usdtToOpco(valor)
      const precioO = parseFloat(ethers.utils.formatUnits(opco, 8)).toFixed(2);
      setOpco(precioO)
      setCartLoading(false)
    }catch(error){
      console.log(error.reason)
      setCartLoading(false)

    }

  }

  const returnPrice = async (tipo) => {
    setCartLoading(true)
    const precio = await inversionesContract.prices_Per_Type(tipo);
    const parsePrice = parseFloat(ethers.utils.formatUnits(precio, 8)).toFixed(2);
    setPrecio(parsePrice)
    setCartLoading(false)

  }

  const getAllowance = async () => {
    setCartLoading(true)
    const allowance = await busdContract.allowance(accountAddress, inversionesContract.address);
    const parseAllowance = parseFloat(ethers.utils.formatUnits(allowance, 8)).toFixed(2);
    setAllowance(parseAllowance)
    setCartLoading(false)

  }
  const getAllowanceU = async () => {
    setCartLoading(true)
    const allowance = await usdtContract.allowance(accountAddress, inversionesContract.address);
    const parseAllowance = parseFloat(ethers.utils.formatUnits(allowance, 8)).toFixed(2);
    setAllowance(parseAllowance)
    setCartLoading(false)

  }

  const getAllowanceO = async () => {
    setCartLoading(true)
    const allowance = await opcoContract.allowance(accountAddress, inversionesContract.address);
    const parseAllowance = parseFloat(ethers.utils.formatUnits(allowance, 8)).toFixed(2);
    setAllowanceO(parseAllowance)
    setCartLoading(false)

  }

  const ApproveB = async () => {
    try {
      setCartLoading(true);
      const cant = precio.toString()
      const tx = await busdContract.approve(inversionesContract.address, ethers.utils.parseUnits(cant, 18));
      //const tx = await opcoContract.mint(accountAddress, ethers.utils.parseUnits("10000", 18));
      await tx.wait();
      getAllowance();
      setCartLoading(false);
      Swal.fire({
        title: 'Success',
        text: 'Aprobado correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      setCartLoading(false);
      Swal.fire({
        title: 'Error',
        text: err.reason,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  const ApproveU = async () => {
    try {
      setCartLoading(true);
      const cant = precio.toString()
      const tx = await usdtContract.approve(inversionesContract.address, ethers.utils.parseUnits(cant, 18));
      //const tx = await opcoContract.mint(accountAddress, ethers.utils.parseUnits("10000", 18));
      await tx.wait();
      getAllowance();
      setCartLoading(false);
      Swal.fire({
        title: 'Success',
        text: 'Aprobado correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      setCartLoading(false);
      Swal.fire({
        title: 'Error',
        text: err.reason,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  const ApproveO = async () => {
    try {
      setCartLoading(true);
      const cant = opcoP.toString();
      const tx = await opcoContract.approve(inversionesContract.address, ethers.utils.parseUnits(cant, 18));
      await tx.wait();
      getAllowanceO();
      setCartLoading(false);
      Swal.fire({
        title: 'Success',
        text: 'Aprobado correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      setCartLoading(false);
      Swal.fire({
        title: 'Error',
        text: err.reason,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const buyB = async () => {
    try {
      setCartLoading(true);
      //
      if (addr !== "nn") {
        const tx = await inversionesContract.buyToken(rarity, busdContract.address, code, true, addr);
        await tx.wait();
        dispatch(updateInversionTokens(inversionesContract, accountAddress));
        setCartLoading(false);
        Swal.fire({
          title: 'Success',
          text: 'Comprado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {

        const tx = await inversionesContract.buyToken(rarity, busdContract.address, code, false, accountAddress);
        await tx.wait();
        dispatch(updateInversionTokens(inversionesContract, accountAddress));
        setCartLoading(false);
        Swal.fire({
          title: 'Success',
          text: 'Comprado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      setCartLoading(false);
      Swal.fire({
        title: 'Hubo un error en la transacion',
        text: err.reason,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const buyU = async () => {
    try {
      setCartLoading(true);
      //
      if (addr !== "nn") {
        const tx = await inversionesContract.buyToken(rarity, usdtContract.address, code, true, addr);
        await tx.wait();
        dispatch(updateInversionTokens(inversionesContract, accountAddress));
        setCartLoading(false);
        Swal.fire({
          title: 'Success',
          text: 'Comprado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {

        const tx = await inversionesContract.buyToken(rarity, usdtContract.address, code, false, accountAddress);
        await tx.wait();
        dispatch(updateInversionTokens(inversionesContract, accountAddress));
        setCartLoading(false);
        Swal.fire({
          title: 'Success',
          text: 'Comprado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      setCartLoading(false);
      Swal.fire({
        title: 'Hubo un error en la transacion',
        text: err.reason,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  const buyOpco = async () => {
    try {
      setCartLoading(true);
      if (addr !== "nn") {
        const tx = await inversionesContract.buyToken(rarity, opcoContract.address, code, true, addr);
        await tx.wait();
        dispatch(updateInversionTokens(inversionesContract, accountAddress));
        setCartLoading(false);
        Swal.fire({
          title: 'Success',
          text: 'Comprado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        const tx = await inversionesContract.buyToken(rarity, opcoContract.address, code, false, accountAddress);
        await tx.wait();
        dispatch(updateInversionTokens(inversionesContract, accountAddress));
        setCartLoading(false);
        Swal.fire({
          title: 'Success',
          text: 'Comprado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }

    } catch (err) {
      setCartLoading(false);
      Swal.fire({
        title: 'Hubo un error en la transacion',
        text: err.reason,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }


  useEffect(() => {
    returnPrice(rarity)
    getAllowance()
    getAllowanceO()
    getAllowanceU();
  }, [])

  useEffect(() => {
    UsdtToOpco()
  }, [precio])


  return (
    <div className="flex flex-col items-start bg-white shadow-2xl rounded-2xl overflow-hidden w-[160px] h-auto  md:w-72  md:h-[280px] transform transition-all duration-500 ease-in-out hover:scale-105">

      {/* {!inventory && (<Link to={`/ventaDetails/${rarity}`} className="p-2 absolute z-10 top-2 right-2 text-white bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300">
        <AiOutlineSearch />
      </Link>)
      } */}
      <div className="w-full  relative">
        <img className="w-full h-4/5 object-cover rounded-t-2xl" src={url} alt={name} />
      </div>

      <div className="w-full px-2 md:px-4 md:py-2 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-sm md:text-lg font-semibold text-gray-900 truncate">{name}</h2>
          <div className="flex justify-start w-full text-yellow-500 mt-[-8px]">
            {repeatStar(rarity)}
          </div>
        </div>
        <div className='w-full flex justify-start mt-2'>
          <div className='w-4/5 md:w-2/5 '>
            <select onChange={(e) => setToken(e.target.value)}>
              <option value='OPCO'>OPCO</option>
              <option value='USDT'>USDT</option>
              <option value='BUSD'>BUSD</option>
            </select>
          </div>
        </div>



        {!inventory && <div className="w-full flex flex-col justify-between items-center mb-2 md:mb-0  md:flex-row  md:justify-around space-x-2 mt-2">
          {token === "BUSD" && (allowance < parseInt(precio) && !cartLoading ?
            (<button
              className="w-9/12 md:2-3/5 px-4 py-2 text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-orange-500 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
              onClick={ApproveB}
            >
              <img src={busd} alt='busd' className="w-4 h-4" />
              <span>
                <span>Aprobar</span>

              </span>
            </button>)
            : !cartLoading ?
              (<button
                className="w-9/12 md:2-3/5 px-4 py-2 text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-orange-500 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
                onClick={buyB}
              >
                <img src={busd} alt='busd' className="w-4 h-4" />
                <span>
                  <span>{precio}</span>
                </span>
              </button>) :
              (<button
                className="w-9/12 md:2-3/5 px-4 py-2 text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-orange-500 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <img src={busd} alt='busd' className="w-4 h-4" />
                <span>
                  <span>Loading...</span>
                </span>
              </button>)
          )}

          {token === "OPCO" && (
            allowanceO < parseInt(opcoP) && !cartLoading ?
              (<button
                className="w-9/12 md:w-4/5 px-4 py-2 text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-full hover:from-gray-900 hover:to-gray-700 transition-all duration-200 flex items-center justify-center space-x-2 "
                onClick={ApproveO}
              >
                <img src={opco} alt='opco' className="w-4 h-4" />
                <span>
                  <span>Aprobar</span>
                </span>
              </button>) : !cartLoading ?
                (<button
                  className="w-9/12 md:w-4/5 px-4 py-2 text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-full hover:from-gray-900 hover:to-gray-700 transition-all duration-200 flex items-center justify-center space-x-2 "
                  onClick={buyOpco}
                >
                  <img src={opco} alt='opco' className="w-4 h-4" />
                  <span>
                    <span>{opcoP}</span>
                  </span>
                </button>) :
                (<button
                  className="w-9/12 md:w-4/5 px-4 py-2 text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-full hover:from-gray-900 hover:to-gray-700 transition-all duration-200 flex items-center justify-center space-x-2 "
                >
                  <img src={opco} alt='opco' className="w-4 h-4" />
                  <span>
                    <span>Loading...</span>
                  </span>
                </button>))}

          {token === "USDT" && (
            allowanceU < parseInt(precio) && !cartLoading ?
              (<button
                className="w-9/12 md:w-4/5 px-4 py-2 text-white bg-gradient-to-r from-green-700 to-green-900 rounded-full hover:from-green-900 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 "
                onClick={ApproveU}
              >
                <img src={tether} alt='opco' className="w-4 h-4" />
                <span>
                  <span>Aprobar</span>
                </span>
              </button>) : !cartLoading ?
                (<button
                  className="w-9/12 md:w-4/5 px-4 py-2 text-white bg-gradient-to-r from-green-700 to-green-900 rounded-full hover:from-green-900 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 "
                  onClick={buyU}
                >
                  <img src={tether} alt='opco' className="w-4 h-4" />
                  <span>
                    <span>{opcoP}</span>
                  </span>
                </button>) :
                (<button
                  className="w-9/12 md:w-4/5 px-4 py-2 text-white bg-gradient-to-r from-green-700 to-green-900 rounded-full hover:from-green-900 hover:to-green-700 transition-all duration-200 flex items-center justify-center space-x-2 "
                >
                  <img src={tether} alt='opco' className="w-4 h-4" />
                  <span>
                    <span>Loading...</span>
                  </span>
                </button>))}



        </div>}

        {inventory &&
          <div className="w-full flex flex-col justify-between items-center mb-2 md:mb-0  md:flex-row  md:justify-around">
            <button
              className="w-9/12 md:w-auto px-4 py-2 text-white bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-orange-500 hover:to-yellow-400 transition-all duration-200 flex items-center justify-center space-x-2"
              onClick={() => { openStaking("s") }}>
              <span>
                <span>Stakear</span>
              </span>
            </button>
          </div>}


      </div>
    </div>


  );
}

export default StakingCard;