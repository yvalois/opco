import React from 'react'
import moment from 'moment'
import { ethers } from 'ethers'
export const RetireHistory = ({ data, accountAddress }) => {
  const timestampToDate = (timestamp) => {
    return moment.unix(timestamp).format("DD MMM, YYYY");
  }


  return (
    <div>
      <div className="text-center py-4 bg-white text-lg text-black font-bold">
        Retiros anteriores
      </div>
      {/*Pasar a true*/}
      {!accountAddress &&
        data.map(data => (
          <div className="flex flex-col md:flex-row w-full my-4 rounded-lg p-4 bg-white text-black shadow-md space-y-4 md:space-y-0 md:space-x-4 justify-between items-start md:items-center">
            {/* <div className="xxs:w-full flex flex-col space-y-2 jusify-center items-center">                  
            <span className='text-gray-600 font-semibold'>Opco ingresado:</span> 
            <span className='text-yellow-300 font-bold'>{parseFloat((data.opcoAmount / 10 ** 8))}</span>
            </div>

            <div className="xxs:w-full flex flex-col space-y-2 jusify-center items-center">  
            <span className='text-gray-600 font-semibold'>Busd a retirar:</span> 
            <span className='text-yellow-300 font-bold'>{parseFloat(ethers.utils.formatEther(data.busdAmount))}</span>
            </div>

            <div className="xxs:w-full flex flex-col space-y-2 jusify-center items-center"> 
            <span className='text-gray-600 font-semibold'>Dia de retiro:</span> 
            <span className='text-yellow-300 font-bold'>{timestampToDate(parseInt(data.unlockTime))}</span>
            </div> */}


             <div className="xxs:w-full flex flex-col space-y-2 jusify-center items-center">
              <span className='text-gray-600 font-semibold'>Opco ingresado:</span>
              <span className='text-yellow-300 font-bold'>1</span>
            </div>
            <div className="xxs:w-full flex flex-col space-y-2 jusify-center items-center">
              <span className='text-gray-600 font-semibold'>Busd a retirar:</span>
              <span className='text-yellow-300 font-bold'>1</span>
            </div>
            <div className="xxs:w-full flex flex-col space-y-2 jusify-center items-center">
              <span className='text-gray-600 font-semibold'>Dia de retiro:</span>
              <span className='text-yellow-300 font-bold'>Ayer</span>
            </div>

          </div>

        ))}
    </div>
  )
}

