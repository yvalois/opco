import { useDispatch, useSelector } from 'react-redux';
import { contract } from '../../redux/blockchain/blockchainRouter';
import { useState } from 'react';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
export default function AdminStore() {
    const { tokenContract, busdContract, accountAddress, opcoStoreContract } = useSelector(state => state.blockchain);
    const router = contract();

    const [busdBalance, setBusdBalance] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);

    const busdStoreBalance = async () => {
        const balance = await busdContract.balanceOf(opcoStoreContract.address);
        setBusdBalance(ethers.utils.formatEther(balance));
    }

    const tokenStoreBalance = async () => {
        const balance = await tokenContract.balanceOf(opcoStoreContract.address);
        setTokenBalance(ethers.utils.formatUnits(balance, 8));
        console.log(ethers.utils.formatUnits(balance, 8));
    }

    useEffect(() => {
        if(accountAddress){
        busdStoreBalance();
        tokenStoreBalance();
        }
    }, [accountAddress]);

    const retireTokenBalanace = async () => {
        try{
        const tx = await opcoStoreContract.retireTokenBalance(tokenContract.address);
        await tx.wait();
        tokenStoreBalance();
        Swal.fire({
            icon: 'success',
            title: 'Tokens retirados',
            text: 'Los tokens han sido retirados del contrato',
            showConfirmButton: false,
            timer: 1500
        });
        tokenBalance();
        }catch(e){
            console.log(e);
            if(e.reason){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: e.reason,
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        
    }

    const retireBUSDBalanace = async () => {
        try{
        const tx = await opcoStoreContract.retireBUSDBalance(busdContract.address);
        await tx.wait();
        busdStoreBalance();
        Swal.fire({
            icon: 'success',
            title: 'Tokens retirados',
            text: 'Los tokens han sido retirados del contrato',
            showConfirmButton: false,
            timer: 1500
        });
        }
        catch(e){
            console.log(e);
            if(e.reason){
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: e.reason,
                    showConfirmButton: false,
                    timer: 1500
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ha ocurrido un error',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    }

    return (
        <div className='mt-8'>
            <div className="Admin-exchange-tittle">
                Adminstrador tienda <p className='text-sm md:text-[16px]'> {router.OPCO_ADDRESS} </p>
            </div>
            <div>
                <div className='border d-flex justify-content-around my-2'>
                    <div>Balance OPCO: {tokenBalance} </div>
                    <div> <button className='btn btn-dark'
                        onClick={retireTokenBalanace}
                    >retirar</button></div>
                </div>
                <div className='border d-flex justify-content-around my-2'>
                    <div>Balance BUSD: {busdBalance} </div>
                    <div> <button className='btn btn-dark'
                        onClick={retireBUSDBalanace}
                    >retirar</button></div>
                </div>
            </div>
        </div>
    )
}