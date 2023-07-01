import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {updateStakingTokens, updateInversionTokens} from '../../redux/blockchain/blockchainAction'

const ModalS = ({ isOpen, onClose, onRetirar, id }) => {

  const { inversionesContract, inversioneStakingContract, accountAddress} = useSelector((state) => state.blockchain)
  const [dropdownValue, setDropdownValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingT, setLoadingT] = useState(false);

  const [isApproved, setisApproved] = useState(false)
  const dispatch = useDispatch();

  const options = [
    {
      cant: '1 Mes',
      value: 1
    }, 
    {
      cant: '3 Meses',
      value: 2
    }, 
    {
      cant: '6 Meses',
      value: 3
    }, 
    {
      cant: '1 Año',
      value: 4
    }, 
  {
    cant: '2 Años',
    value: 5
  }];


  const closeModal = () => {
    onClose("s");
  };

  const handleRetirar = () => {
    // onRetirar(dropdownValue);
    closeModal();
  };

  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  const verifyApprove = async()=>{
    setLoading(true);
    const verify = await inversionesContract.isApprovedForAll(accountAddress, inversioneStakingContract.address);
    setisApproved(verify);
    setLoading(false);

  }

  const aprobar =async()=>{
      setLoadingT(true)
      try {
        const tx = await inversionesContract.setApprovalForAll(inversioneStakingContract.address, true);
        await tx.wait();
        
        setLoadingT(false);
        await verifyApprove()
        Swal.fire({
          title: 'Success',
          text: 'Aprovado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (err) {
        console.log(err)
        setLoadingT(false);
        Swal.fire({
          title: 'tokens no fueron aprovados correctamente',
          text: err.reason,
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
  }


  const stakear = async()=>{
    setLoadingT(true);
    try {
      if(dropdownValue >0 && dropdownValue < 6){
        const tx = await inversioneStakingContract.stake(id, dropdownValue);
        await tx.wait();
        dispatch(updateInversionTokens(inversionesContract ,accountAddress));
        dispatch(updateStakingTokens(inversioneStakingContract ,accountAddress));

        setLoadingT(false);
        await verifyApprove();
        Swal.fire({
          title: 'Success',
          text: 'Token stakeado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        closeModal();
      }else{
        setLoadingT(false);
        Swal.fire({
          title: 'Error',
          text: "Seleccione un valor correcto",
          icon: 'error',
          confirmButtonText: 'OK'
        })
      }
    } catch (err) {
      console.log(err)
      setLoadingT(false);
      Swal.fire({
        title: 'Error',
        text: err.reason,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }
  }

  useEffect(() => {
    verifyApprove()
  }, [])
  
  

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white w-[400px] h-[300px] rounded-lg p-6 z-10">
            <div className="flex  justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Stakear</h2>
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
            <div className="mb-4">
              <label htmlFor="dropdown" className="font-bold">
                Tiempo:
              </label>
              <select
                id="dropdown"
                className="block w-full mt-1 p-2 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={dropdownValue}
                onChange={handleDropdownChange}
              >
                <option value="">Seleccione una opción</option>
                {options.map((option, index) => (
                  <option key={index} value={option.value} >
                    {option.cant}
                  </option>
                ))}
              </select>
            </div>


            <div className="flex justify-center items-end mt-12">
              { isApproved && !loadingT ?
                (<button
                className="mr-2 px-4 py-2 bg-yellow-300 text-black rounded "
                onClick={stakear}
              >
                Stakear
              </button>) : !loadingT ?
              (<button
                className="mr-2 px-4 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-600"
                onClick={aprobar}
              >
                Aprobar
              </button>)
              :
              (<button
                className="mr-2 px-4 py-2 bg-yellow-300 text-black rounded "
              >
                loading...
              </button>)}
              {!loadingT ?
              (<button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancelar
              </button>):
              (<button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                loading...
              </button>)}


            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalS;
