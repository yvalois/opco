import { ethers } from 'ethers'
import React from 'react'
import moment from "moment";
import { useSelector } from 'react-redux';
import ErrorMsg from '../ErrorMsg';

export const RetireNew = ({ data, accountAddress }) => {
    const { exchangeContract, busdContract } = useSelector(state => state.blockchain);
    const [error, setError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const timestampToDate = (timestamp) => {
        return moment.unix(timestamp).format("DD MMM, YYYY");
    }

    const retire = async (id) => {
        try {
            const tx = await exchangeContract.claimSell(id, busdContract.address);
            await tx.wait();
        } catch (error) {
            console.log(error);
            if (error.reason) {
                setErrorMsg(error.reason);
                setError(true);
            }
        }
    }


    return (
        <div>
            <ErrorMsg error={error} setError={setError} errorMsg={errorMsg} />
            <div className="text-center py-4 bg-white text-lg text-black font-bold">
                Retiros Pendientes
            </div>
      {/*Pasar a true*/}
      {!accountAddress         && data.map(data => (
                <div className="flex flex-col md:flex-row w-full my-4 rounded-lg p-4 bg-white text-black shadow-md space-y-4 md:space-y-0 md:space-x-4 justify-between items-start md:items-center">
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
                    <button
                        className="xxs:self-center w-auto h-auto px-4 py-2 bg-yellow-300 text-black rounded-lg shadow-lg font-semibold"
                        onClick={() => retire(data.id)}
                    >Retirar</button>

                    {/*
                     <div className="xxs:w-full flex flex-col space-y-2 jusify-center items-center">
                        <span className='text-gray-600 font-semibold'>Opco ingresado:</span>
                        <span className='text-yellow-300 font-bold'>{parseFloat((data.opcoAmount / 10 ** 8))}</span>
                    </div>
                     <div className="xxs:w-full flex flex-col space-y-2 jusify-center items-center">
                       <span className='text-gray-600 font-semibold'>Busd a retirar: </span>
                        <span className='text-yellow-300 font-bold'>{parseFloat(ethers.utils.formatEther(data.busdAmount))}</span>
                    </div>
                     <div className="xxs:w-full flex flex-col space-y-2 jusify-center items-center">
                       <span className='text-gray-600 font-semibold'>dia de retiro: </span>
                        <span className='text-yellow-300 font-bold'>{timestampToDate(parseInt(data.unlockTime))}</span>
                    </div>
                    <button
                        className="xxs:self-center w-auto h-auto px-4 py-2 bg-yellow-300 text-black rounded-lg shadow-lg font-semibold"
                        onClick={() => retire(data.id)}
                    >Retirar</button>  */}

                </div>
            ))}
        </div>

    )



}
