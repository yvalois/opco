import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Table = ({  modalManage }) => {
  const { inversionesStakingBalance,inversioneStakingContract, usdtContract  } = useSelector((state) => state.blockchain);
  const [loading, setLoading] = useState(false);
  const [restTime, setRestTime] = useState(0)

    const callFunction = (id) =>{
        modalManage(id, "w")
    }

    const claimReward =async(id)=>{
      try {
        setLoading(true);
        const tx = await inversioneStakingContract.claimReward(id, usdtContract.address,false );
        await tx.wait();
        setLoading(false);
        Swal.fire({
          title: 'Success',
          text: 'Recompensa reclamda',
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

    
  // const getRestTime=async()=>{
  //   const _restTime = await inversioneStakingContract.getRestTime(id);
  //   setRestTime(parseInt(_restTime));
  // }
    
    return (<>
<div className="w-full lg:w-4/5 h-full overflow-hidden">
  <div className="overflow-y-auto h-[800px] ">
    <table className="w-full h-1/2 divide-y divide-gray-200 ">
      <thead className="bg-gray-50 sticky top-0  ">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TokenId</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiempo restante</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proximo pago</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Botón Claim rewards</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Botón Withdraw</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {inversionesStakingBalance.map((item) => (
          <tr key={item.TokenId}>
            <td className="px-6 py-4 whitespace-normal">{item.id}</td>
            <td className="px-6 py-4 whitespace-normal">{item.Tiempo}</td>
            <td className="px-6 py-4 whitespace-normal">{item.currentReward}</td>
            <td className="px-6 py-4 whitespace-normal">
              {!loading ?(<button className="px-4 py-2 text-sm font-bold text-black  bg-yellow-300 rounded-md" onClick={()=>{claimReward(item.id)}}>
                Claim rewards
              </button>):
              (<button className="px-4 py-2 text-sm font-bold text-black  bg-yellow-300 rounded-md" >
                loading...
              </button>)
              }
            </td>
            <td className="px-6 py-4 whitespace-normal">
              {!loading ? (<button className="px-4 py-2 text-sm font-bold text-white bg-gray-700 rounded-md" onClick={() => callFunction(item.id)} >
                Withdraw
              </button>):
              (<button className="px-4 py-2 text-sm font-bold text-white bg-gray-700 rounded-md" >
                loading...
              </button>)
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


</>


    );
};

export default Table;
