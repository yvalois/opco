import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'
import { contract } from '../redux/blockchain/blockchainRouter';
import coffeeAbi from "../abis/coffeeAbi.json";
import abiToken from "../abis/abiERC20.json";
import NftInversion from "../abis/Inversiones.json";


const router = contract();

const AOEX_ADDRESS = router.AOEX_ADDRESS;
const BUSD_ADDRESS = router.BUSD_ADDRESS;
const USDT_ADDRESS = router.USTD_ADDRESS;
const EXCHANGE_ADDRESS = router.EXCHANGE_ADDRESS;
const STAKING_ADDRESS = router.STAKING_ADDRESS;
const P2P_ADDRESS = router.P2P_ADDRESS;
const OPCO__ADDRESS = router.OPCO__ADDRESS;
const INVERSIONES_ADDRESS = router.INVERSIONES_ADDRESS;
const STAKING__ADDRESS = router.STAKING__ADDRESS;
export const getBalance = async (address, contract, publicClient) => {

  let contractAddress;
  let abi;
  switch (contract) {
    case 'busd':
      contractAddress = BUSD_ADDRESS
      abi = abiToken;
      break
    case 'usdt':
      contractAddress = USDT_ADDRESS
      abi = abiToken;
      break
    default:
      contractAddress = AOEX_ADDRESS
      abi = coffeeAbi
      break;
  }

  if(address !== undefined){
    const data =  readContract({
      address: contractAddress,
      abi: abi,
      functionName: 'totalSupply',
 
    })
    console.log(data)
    return data
  }

 
} 

export const buyNft = async (address, contract, publicClient) => {
  let contractAddress;
  let abi;
  switch (contract) {
    case 'busd':
      contractAddress = BUSD_ADDRESS
      abi = abiToken;
      break
    case 'usdt':
      contractAddress = USDT_ADDRESS
      abi = abiToken;
      break
    default:
      contractAddress = AOEX_ADDRESS
      abi = coffeeAbi
      break;
  }

  if(address !== undefined){
    const data = await readContract({
      address: contractAddress,
      abi: abi,
      functionName: 'totalSupply',
 
    })
    console.log(data)
    return data
  }

 
} 