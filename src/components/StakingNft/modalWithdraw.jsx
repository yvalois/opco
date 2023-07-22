import { useState,  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { ethers } from "ethers";
import {updateStakingTokens, updateInversionTokens} from '../../redux/blockchain/blockchainAction'

const Modal = ({ isOpen, onClose, onRetirar, id }) => {
  const [dropdownValue, setDropdownValue] = useState('');
  const { inversioneStakingContract, usdtContract, opcoContract, inversionesContract,accountAddress } = useSelector((state) => state.blockchain)
  const [restTime, setRestTime] = useState(0)
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [isOpco, setIsOpco] = useState(false);
  const [porcentaje, setProcentaje] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [precioO, setprecioO] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [allowanceO, setAllowanceO] = useState(0);
  const [opcoP, setOpco] = useState(0);
  const dispatch = useDispatch();



  const closeModal = () => {
    onClose("w");
  };

  const options = [
    {
      token: 'Opco',
      value: opcoContract.address
    }, 
    {
      token: 'Busd',
      value: usdtContract.address
    }, 
];


  

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
    
  };

  const getRestTime=async()=>{
    const _restTime = await inversioneStakingContract.getRestTime(id);
    setRestTime(parseInt(_restTime));
  }

  const Withdraw = async()=>{
    try {
      setLoading(true);
      const tx = await inversioneStakingContract.Withdraw(id);
      //const tx = await opcoContract.mint(accountAddress, ethers.utils.parseUnits("10000", 18));
      await tx.wait();
      dispatch(updateInversionTokens(inversionesContract ,accountAddress));
      dispatch(updateStakingTokens(inversioneStakingContract ,accountAddress));

      setLoading(false);
      Swal.fire({
        title: 'Success',
        text: 'Token retirado correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: 'Error',
        text: err.reason,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

  }

  const WithdrawCastigo =async()=>{
    try {
      setLoading(true);
      const tx = await inversioneStakingContract.withdrawP(id);
      //const tx = await opcoContract.mint(accountAddress, ethers.utils.parseUnits("10000", 18));
      await tx.wait();
      dispatch(updateInversionTokens(inversionesContract ,accountAddress));
      setLoading(false);
      Swal.fire({
        title: 'Success',
        text: 'Token retirado correctamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: 'Error',
        text: err.reason,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

const getInfo =async()=>{
  const _porcentaje = (parseInt(await inversioneStakingContract.punishment()) / 10);
  setProcentaje(_porcentaje);
  const precio = await inversionesContract.getPrice(id); 
  setPrecio((ethers.utils.formatUnits(await inversionesContract.getPrice(id), 18)) * (_porcentaje / 100) );
  setprecioO((ethers.utils.formatUnits(await inversioneStakingContract.usdtToOpco(precio), 18)) * (_porcentaje / 100) );

}

const getAllowance = async () => {
  setLoading(true)
  const allowance = await usdtContract.allowance(accountAddress, inversionesContract.address);
  const parseAllowance = parseFloat(ethers.utils.formatUnits(allowance, 18)).toFixed(2);
  console.log(parseAllowance > precio);
  setAllowance(parseAllowance)
  setLoading(false)

}

const getAllowanceO = async () => {
  setLoading(true)
  const allowance = await opcoContract.allowance(accountAddress, inversionesContract.address);
  const parseAllowance = parseFloat(ethers.utils.formatUnits(allowance, 18)).toFixed(2);
  setAllowanceO(parseAllowance)
  setLoading(false)

}


const Approve = async () => {
  try {
    setLoading(true);
    const cant = precio.toString()
    const tx = await usdtContract.approve(inversioneStakingContract.address, ethers.utils.parseUnits(cant, 18));
    await tx.wait();
    getAllowance();
    setLoading(false);
    Swal.fire({
      title: 'Success',
      text: 'Aprobado correctamente',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  } catch (err) {
    setLoading(false);
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
    setLoading(true);
    const cant = precioO.toString();
    const tx = await opcoContract.approve(inversioneStakingContract.address, ethers.utils.parseUnits(cant, 18));
    await tx.wait();
    getAllowanceO();
    setLoading(false);
    Swal.fire({
      title: 'Success',
      text: 'Aprobado correctamente',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  } catch (err) {
    setLoading(false);
    Swal.fire({
      title: 'Error',
      text: err.reason,
      icon: 'error',
      confirmButtonText: 'OK'
    })
  }
}


  useEffect(() => {
    getRestTime();
    getInfo();
  }, [id])
  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="flex flex-col justify-between bg-white w-[400px] h-auto rounded-lg p-6 z-10">
            <div className=" flex  justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Retirar</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M18 6L6 18M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="mb-2">
              {restTime === 0 ?
                (<p>Estas apunto de retirar el token: {id}</p>)
                :
                (<p>Aun faltan: {restTime}, si gustas puedes retirar tu token pagando un porcentaje ({porcentaje}%) de su valor.</p>)
              }
            </div>

            {dropdownValue === usdtContract.address ?
            (<div>  
              Precio: {precio}
            </div>): dropdownValue === opcoContract.address ?
            (<div>
              Precio: {precioO}
            </div>):
            (<div>
              Seleciona el token
            </div>)

            }


            {restTime === 0?
            null:
            (<select
                id="dropdown"
                className="block w-full mt-1 p-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={dropdownValue}
                onChange={handleDropdownChange}
              >
                <option value="">Seleccione un token</option>
                {options.map((option, index) => (
                  <option key={index} value={option.value} >
                    {option.token}
                  </option>
                ))}
              </select>)
            }
            <div className="flex justify-center items-end mt-12">
              {restTime === 0 && !loading ? 
              (<button
                className="mr-2 px-4 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-500"
                onClick={Withdraw}
              >
                Retirar
              </button>):restTime === 0 && loading ?
              (<button
                className="mr-2 px-4 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-500"
              >
                loading...
              </button>):

              null
              }

              {restTime > 0 && dropdownValue === usdtContract.address && allowance < precio && !loading ?
                (<button
                className="mr-2 px-4 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-500"
                onClick={Approve}
              >
                Aprobar
              </button>) : restTime > 0 && dropdownValue === opcoContract.address && allowanceO < precioO &&  !loading ?
              (<button
                className="mr-2 px-4 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-500"
                onClick={ApproveO}
              >
                Aprobar
              </button>): !loading ?
              (<button
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={WithdrawCastigo}
              >
                Retirar
              </button>):  
              (<button
                className="mr-2 px-4 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-500"
              >
                loading...
              </button>)
              
              }



              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
