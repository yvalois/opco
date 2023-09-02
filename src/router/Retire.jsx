import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';  
import { RetireHistory } from '../components/retire/RetireHistory';

import { RetireNew } from "../components/retire/RetireNew";
import "../style/style_retire.css"
import logo from '../images/logo/logo.png';



const Retire = () => {
  const [data, setData] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);
  const { accountAddress, exchangeContract } = useSelector(state => state.blockchain);

  const Data = async () => {
    const fetchData = await exchangeContract.getSaledata();
    console.log(fetchData);
    if (viewHistory) {
      setData(fetchData.filter(data => data.claimed === true && data.owner.toLowerCase() === accountAddress.toLowerCase()));
    } else {
      setData(fetchData.filter(data => data.claimed === false && data.owner.toLowerCase() === accountAddress.toLowerCase()));
    }
  }

  useEffect(() => {
    if (accountAddress) {
      Data();
    }
  }, [viewHistory, accountAddress])

  const data2 = [{
    opcoAmount: 100,
    busdAmoun: 100,
    unlockTime: 1000000
  },
  {
    opcoAmount: 100,
    busdAmoun: 100,
    unlockTime: 1000000
  },
  {
    opcoAmount: 100,
    busdAmoun: 100,
    unlockTime: 1000000
  }]



  return (




    <div className="w-full h-full overflow-auto">

      <div className="h-full w-full p-[30px] bg-white mb-[20px] rounded-lg">
        <div className='w-full h-full flex flex-col justify-between'>
          <div className="w-full flex justify-between gap-2 md:gap-4">
            <div className="w-[100%] text-center py-[10px] rounded-lg cursor-pointer bg-yellow-300" onClick={() => setViewHistory(false)}>Retiros pendientes</div>
            <div className="w-[100%] text-center py-[10px] rounded-lg cursor-pointer bg-gray-600 text-white
                " onClick={() => setViewHistory(true)}>Retiros efectuados</div>
          </div>
          <div className="w-full mt-[5px] h-full rounded-md">
             {viewHistory === false ? 
           <RetireNew
           data = {data}
            accountAddress = {accountAddress}
           />
           :
           <RetireHistory
              data = {data}
                accountAddress = {accountAddress}
           />} 


          </div>
          {/* <div className="rounded-lg h-[40px] bg-gray-400 p-[5px] ">
            <strong className='text-black'>Total BUSD: 10</strong>

          </div> */}
        </div>
      </div>

    </div>


  )
}

export default Retire; 
