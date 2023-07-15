import { ethers } from "ethers";
import Web3Modal from "web3modal";
import abiToken from '../../abis/abiERC20.json';
import exchangeAbi from '../../abis/exchangedelay.json';
import priceSetterAbi from '../../abis/priceSetter.json';
import coffeeAbi from "../../abis/coffeeAbi.json";
import stakingAbi from '../../abis/staking.json';
import storeAbi from '../../abis/opcoStore.json';
import marketAbi from '../../abis/market.json';
import p2pAbi from '../../abis/p2pAbi.json';
import opcoAbi from '../../abis/OpcoP.json';
import inversionesAbi from '../../abis/Inversiones.json';
import InverStakingAbi from '../../abis/inversionesStaking.json';
import usdtAbi from '../../abis/Usdt.json';
import {useProvider, useSigner, useAccount } from 'wagmi';



import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { contract } from './blockchainRouter';

const router = contract();

const AOEX_ADDRESS = router.AOEX_ADDRESS;
const BUSD_ADDRESS = router.BUSD_ADDRESS;
const USDT_ADDRESS = router.USTD_ADDRESS;
const EXCHANGE_ADDRESS = router.EXCHANGE_ADDRESS;
const STAKING_ADDRESS = router.STAKING_ADDRESS;
const P2P_ADDRESS = router.P2P_ADDRESS;
const USDT__ADDRESS = router.USDT__ADDRESS;
const OPCO__ADDRESS = router.OPCO__ADDRESS;
const INVERSIONES_ADDRESS = router.INVERSIONES_ADDRESS;
const STAKING__ADDRESS = router.STAKING__ADDRESS;


const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
        31337: "http://localhost:8545", // Agrega el RPC de tu red local de Hardhat
          56: "https://bsc-dataseed.binance.org/",
          97: "https://data-seed-prebsc-1-s1.binance.org:8545/"
        }
      }
    }
  };
  
const web3Modal = new Web3Modal({
    disableInjectedProvider: false,
    cacheProvider: true,
    providerOptions // required
});


const loadingBlockchain = () => ({
    type: 'LOADING_BLOCKCHAIN',
})

const loadingBlockchainSuccess = (payload) => ({
    type: 'LOADING_BLOCKCHAIN_SUCCESS',
    payload,
})

const loadingBlockchainFailure = (payload) => ({
    type: 'LOADING_BLOCKCHAIN_FAILURE',
    payload,
})

const updateAccount = (payload) => ({
    type: 'UPDATE_ACCOUNT',
    payload
})

const updateBalance = (tokenBalance, busdBalance) => ({
    type: 'UPDATE_BALANCE',
    payload: {
        tokenBalance,
        busdBalance,
    },
})

export const updateTokenS = (tokens) => ({
    type: 'UPDATE_BALANCE_STAKING',
    payload: {
        tokens
    },
})

export const updateTokenI = (tokens) => ({
    type: 'UPDATE_BALANCE_INVERSIONES',
    payload: {
        tokens
    },
})

const disconnectBlockchain = () => ({
    type: 'DISCONNECT_BLOCKCHAIN',
})

// const updateInversionesProvider = (inversionesContract) => ({
//     type:'UPDATE_INVERSIONES_PROVIDER',
//     payload: {
//         inversionesContract
//     }
// })

// export const updateProvider =()=>{
//     return async( dispatch) =>{
//         const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
//         const inversionesContract = new ethers.Contract(INVERSIONES_ADDRESS, inversionesAbi, provider);
//         dispatch(updateInversionesProvider({
//             inversionesContract
//         }))
//     }
// }

export const updateInversionTokens = (inversionesContract, accountAddress) => async(dispatch)=>{
    let inversionesBalance = [];
    let inversionesBalances = await inversionesContract.getMyInventory(accountAddress);

    for(let i = 0;inversionesBalances.length > i; i++){
        const tipo = await inversionesContract.getTipo(parseInt(inversionesBalances[i]));
        const name = `Inversiones ${tipo}`
        let info = {
            nombre: name,
            id: parseInt(inversionesBalances[i]),
            tipo: parseInt(tipo),
            image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
        }
        inversionesBalance.push(info)
    }

    console.log(inversionesBalance)
    dispatch(updateTokenI(inversionesBalance))
}

export const updateStakingTokens = (inversioneStakingContract, accountAddress) => async(dispatch)=>{
    let inversionesStakingBalance = [];
    let inversionesStakingBalances = await inversioneStakingContract.getNfts(accountAddress);

    for(let i = 0;inversionesStakingBalances.length > i; i++){
        const restTime = await inversioneStakingContract.getRestTime(parseInt(inversionesStakingBalances[i]));
        const  reward = await inversioneStakingContract.rewardPerToken(parseInt(inversionesStakingBalances[i]), accountAddress);
        const valorConvertido = ethers.utils.formatUnits(reward, 18);
        let info = {
            id: parseInt(inversionesStakingBalances[i]),
            Tiempo: parseInt(restTime),
            currentReward: valorConvertido
        }
        console.log(info)
        inversionesStakingBalance.push(info)
    }
    dispatch(updateTokenS(inversionesStakingBalance))
}


export const fetchBlockchain = (signer, provider, address) => {
    return async (dispatch) => {
        const a = "production"
        dispatch(loadingBlockchain())
        try {

            try {
                const networkID = 56;
           
                // *TODO: Cambiar
                 /*if (a === 'production')  {
                     const tokenContract = new ethers.Contract(AOEX_ADDRESS, coffeeAbi, signer)
                     const busdContract = new ethers.Contract(BUSD_ADDRESS, abiToken, signer)
                     const usdtContract = new ethers.Contract(USDT_ADDRESS, abiToken, signer)
                     const exchangeContract = new ethers.Contract(EXCHANGE_ADDRESS, exchangeAbi, signer)
                     const stakingContract = new ethers.Contract(STAKING_ADDRESS, stakingAbi, signer)
                     const priceSetterContract = new ethers.Contract(router.PRICE_SETTER_ADDRESS, priceSetterAbi, signer);
                     const opcoStoreContract = new ethers.Contract(router.OPCO_ADDRESS, storeAbi, signer);
                     const marketContract = new ethers.Contract(router.MARKET, marketAbi, signer);
                     const p2pContract = new ethers.Contract(P2P_ADDRESS, p2pAbi, signer);
                     const fUsdtContract = new ethers.Contract(USDT__ADDRESS,usdtAbi, signer);
                     const fOpcoContract = new ethers.Contract(OPCO__ADDRESS, opcoAbi, signer);
                     const inversionesContract = new ethers.Contract(INVERSIONES_ADDRESS, inversionesAbi, signer);
                     const inversioneStakingContract = new ethers.Contract(STAKING__ADDRESS, InverStakingAbi, signer);
                    

                     const tokenBalance = 0;
                     const exchangeBalance = 0;
                     const bnbBalance = 0;
                     const busdBalance = 0;
                     const usdtBalance = 0;
                     const accountAddress = address;
                     //8 decimals token
                     const tokenBalanceFormatted = parseFloat(tokenBalance) / 10 ** 8;
                     const exchangeBalanceFormatted = parseFloat(exchangeBalance) / 10 ** 8;
                     const busdBalanceFormatted = parseFloat(ethers.utils.formatEther(busdBalance));
                     const usdtBalanceFormatted = parseFloat(ethers.utils.formatEther(usdtBalance));
                     const bnbBalanceFormatted = parseFloat(ethers.utils.formatEther(bnbBalance));
                     const tokenPriceWeth = 0;
                     const tokenPrice = parseFloat(ethers.utils.formatEther(tokenPriceWeth));
                     const exchangeOwner = "0xb029ac7caf182421dbb72ac6645fbbb499020bfc";
                     const isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase();
                     let inversionesBalance = [];
                     let inversionesStakingBalance = [];

                     let inversionesBalances = await inversionesContract.getMyInventory(accountAddress);
                     let inversionesStakingBalances = await inversioneStakingContract.getNfts(accountAddress);

                     for(let i = 0;inversionesBalances.length > i; i++){
                         const tipo = await inversionesContract.getTipo(parseInt(inversionesBalances[i]));
                         const name = `Inversiones ${tipo}`
                         let info = {
                             nombre: name,
                             id: parseInt(inversionesBalances[i]),
                             tipo: parseInt(tipo),
                             image: "https://guapacho.com/wp-content/uploads/2022/08/boredape_nft-1024x577.jpg"
                         }
                         inversionesBalance.push(info)
                     }
                    
                     for(let i = 0;inversionesStakingBalances.length > i; i++){
                         const restTime = await inversioneStakingContract.getRestTime(parseInt(inversionesStakingBalances[i]));
                         const  reward = await inversioneStakingContract.rewardPerToken(parseInt(inversionesStakingBalances[i]), accountAddress);
                         const valorConvertido = ethers.utils.formatUnits(reward, 18);
                         let info = {
                             id: parseInt(inversionesStakingBalances[i]),
                             Tiempo: parseInt(restTime),
                             currentReward: valorConvertido
                         }
                         inversionesStakingBalance.push(info)
                     }

                     dispatch(loadingBlockchainSuccess({
                         tokenContract,
                         busdContract,
                         usdtContract: fUsdtContract,
                         opcoContract:fOpcoContract,
                         inversionesContract,
                         inversioneStakingContract,
                         tokenBalance: tokenBalanceFormatted,
                         bnbBalance: bnbBalanceFormatted,
                         busdBalance: busdBalanceFormatted,
                         usdtBalance: usdtBalanceFormatted,
                         inversionesBalance,
                         inversionesStakingBalance,
                         accountAddress,
                         exchangeContract,
                         priceSetterContract,
                         stakingContract,
                         networkID: networkID.chainId,
                         exchangeBalance: exchangeBalanceFormatted,
                         signer,
                         opcoStoreContract,
                         tokenPrice,
                         marketContract,
                         p2pContract,
                         isOwner
                     }))

                     // instance.on("accountsChanged", async (accounts) => {
                     
                     //     const tokenBalance = await tokenContract.balanceOf(address);
                     //     const exchangeBalance = await tokenContract.balanceOf(EXCHANGE_ADDRESS);
                     //     const bnbBalance = await provider.getBalance(address);
                     //     const busdBalance = await busdContract.balanceOf(address);
                     //     const usdtBalance = await usdtContract.balanceOf(address);
                     //     const accountAddress = address;
                     //     const tokenBalanceFormatted = parseFloat(tokenBalance) / 10 ** 8;
                     //     const exchangeBalanceFormatted = parseFloat(exchangeBalance) / 10 ** 8;
                     //     const busdBalanceFormatted = parseFloat(ethers.utils.formatEther(busdBalance));
                     //     const usdtBalanceFormatted = parseFloat(ethers.utils.formatEther(usdtBalance));
                     //     const bnbBalanceFormatted = parseFloat(ethers.utils.formatEther(bnbBalance));
                     //     const exchangeOwner = await exchangeContract.owner();
                     //     const isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase();
                     //     dispatch(updateAccount({
                     //         tokenBalance: tokenBalanceFormatted,
                     //         bnbBalance: bnbBalanceFormatted,
                     //         busdBalance: busdBalanceFormatted,
                     //         accountAddress,
                     //         exchangeBalance: exchangeBalanceFormatted,
                     //         usdtBalance: usdtBalanceFormatted,
                     //         isOwner
                     //     }))

                     // })
                 } else {
                     if (a === 'production') {
                             try {
                                 await provider.provider.request({
                                     method: 'wallet_switchEthereumChain',
                                     params: [{ chainId: `0x${Number(56).toString(16)}`}],
                                  })
                                 
                             } catch (switchError) {
                                 if (switchError.code === 4902) {
                                     try {
                                         await provider.provider.request({
                                             method: 'wallet_addEthereumChain',
                                             params: [{
                                                 chainId: `0x${Number(56).toString(16)}`,
                                                 chainName: "Binance Smart Chain ",
                                                 nativeCurrency: {
                                                     name: "Binance Chain Native Token",
                                                     symbol: "BNB",
                                                     decimals: 18,
                                                 },
                                                 rpcUrls: [
                                                     "https://bsc-dataseed.binance.org",
                                                 ],
                                                 blockExplorerUrls: [
                                                     "https://bscscan.com",
                                                 ],
                                             }],
                                         })
                                     } catch (addError) {
                                         console.log(addError)
                                         dispatch(loadingBlockchainFailure(addError))
                                     }
                                 }
                             }
                     }else if(a === 'development'){
                         try {
                             await provider.provider.request({
                                 method: 'wallet_switchEthereumChain',
                                 params: [{ chainId: `0x${Number(97).toString(16)}` }],
                             })
                           
                         } catch (error) {
                             console.log(error)
                         }
                     }
                 }*/

                  if ((a === 'production' && networkID.chainId === 56) ||
                      (a === 'development' && networkID.chainId === 97)) {
                      const tokenContract = new ethers.Contract(AOEX_ADDRESS, coffeeAbi, signer)
                      const busdContract = new ethers.Contract(BUSD_ADDRESS, abiToken, signer)
                      const usdtContract = new ethers.Contract(USDT_ADDRESS, abiToken, signer)
                      const exchangeContract = new ethers.Contract(EXCHANGE_ADDRESS, exchangeAbi, signer)
                      const stakingContract = new ethers.Contract(STAKING_ADDRESS, stakingAbi, signer)
                      const priceSetterContract = new ethers.Contract(router.PRICE_SETTER_ADDRESS, priceSetterAbi, signer);
                      const opcoStoreContract = new ethers.Contract(router.OPCO_ADDRESS, storeAbi, signer);
                      const marketContract = new ethers.Contract(router.MARKET, marketAbi, signer);
                      const p2pContract = new ethers.Contract(P2P_ADDRESS, p2pAbi, signer);

                      const tokenBalance = await tokenContract.balanceOf(address)
                      const exchangeBalance = await tokenContract.balanceOf(EXCHANGE_ADDRESS);
                      const bnbBalance = await provider.getBalance(address)
                      const busdBalance = await busdContract.balanceOf(address)
                      const usdtBalance = await usdtContract.balanceOf(address)
                      const accountAddress = address;


                      //8 decimals token
                      const tokenBalanceFormatted = parseFloat(tokenBalance) / 10 ** 8
                      const exchangeBalanceFormatted = parseFloat(exchangeBalance) / 10 ** 8
                      const busdBalanceFormatted = parseFloat(ethers.utils.formatEther(busdBalance))
                      const usdtBalanceFormatted = parseFloat(ethers.utils.formatEther(usdtBalance))
                      const bnbBalanceFormatted = parseFloat(ethers.utils.formatEther(bnbBalance));
                      const tokenPriceWeth = await exchangeContract.fetchPrice();
                      const tokenPrice = parseFloat(ethers.utils.formatEther(tokenPriceWeth))

                      const exchangeOwner = await exchangeContract.owner();
                      const isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase(); // *TODO: Buscar una mejor solucion.

                      dispatch(loadingBlockchainSuccess({
                          tokenContract,
                          busdContract,
                          usdtContract,
                          tokenBalance: tokenBalanceFormatted,
                          bnbBalance: bnbBalanceFormatted,
                          busdBalance: busdBalanceFormatted,
                          usdtBalance: usdtBalanceFormatted,
                          accountAddress,
                          exchangeContract,
                          priceSetterContract,
                          stakingContract,
                          networkID: networkID.chainId,
                          exchangeBalance: exchangeBalanceFormatted,
                          signer,
                          opcoStoreContract,
                          tokenPrice,
                          marketContract,
                          p2pContract,
                          isOwner
                      }))

                    //   instance.on("accountsChanged", async (accounts) => {
                     
                    //       const tokenBalance = await tokenContract.balanceOf(address);
                    //       const exchangeBalance = await tokenContract.balanceOf(EXCHANGE_ADDRESS);
                    //       const bnbBalance = await provider.getBalance(address);
                    //       const busdBalance = await busdContract.balanceOf(address);
                    //       const usdtBalance = await usdtContract.balanceOf(address);
                    //       const accountAddress = address;
                    //       const tokenBalanceFormatted = parseFloat(tokenBalance) / 10 ** 8;
                    //       const exchangeBalanceFormatted = parseFloat(exchangeBalance) / 10 ** 8;
                    //       const busdBalanceFormatted = parseFloat(ethers.utils.formatEther(busdBalance));
                    //       const usdtBalanceFormatted = parseFloat(ethers.utils.formatEther(usdtBalance));
                    //       const bnbBalanceFormatted = parseFloat(ethers.utils.formatEther(bnbBalance));
                    //       const exchangeOwner = await exchangeContract.owner();
                    //       const isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase(); // *TODO: Buscar una mejor solucion.
                    //       dispatch(updateAccount({
                    //           tokenBalance: tokenBalanceFormatted,
                    //           bnbBalance: bnbBalanceFormatted,
                    //           busdBalance: busdBalanceFormatted,
                    //           accountAddress,
                    //           exchangeBalance: exchangeBalanceFormatted,
                    //           usdtBalance: usdtBalanceFormatted,
                    //           isOwner
                    //       }))

                    //   })
                  } else {
                    
                      if (a === 'production') {
                              try {
                                  await provider.provider.request({
                                      method: 'wallet_switchEthereumChain',
                                      params: [{ chainId: `0x${Number(56).toString(16)}`}],
                                   })
                                 
                              } catch (switchError) {
                                  if (switchError.code === 4902) {
                                      try {
                                          await provider.provider.request({
                                              method: 'wallet_addEthereumChain',
                                              params: [{
                                                  chainId: `0x${Number(56).toString(16)}`,
                                                  chainName: "Binance Smart Chain ",
                                                  nativeCurrency: {
                                                      name: "Binance Chain Native Token",
                                                      symbol: "BNB",
                                                      decimals: 18,
                                                  },
                                                  rpcUrls: [
                                                      "https:bsc-dataseed.binance.org",
                                                  ],
                                                  blockExplorerUrls: [
                                                      "https:bscscan.com",
                                                  ],
                                              }],
                                          })
                                      } catch (addError) {
                                          console.log(addError)
                                          dispatch(loadingBlockchainFailure(addError))
                                      }
                                  }
                              }
                      }else if(a === 'development'){
                          try {
                              await provider.provider.request({
                                  method: 'wallet_switchEthereumChain',
                                  params: [{ chainId: `0x${Number(97).toString(16)}` }],
                              })
                           
                          } catch (error) {
                              console.log(error)
                          }
                      }
                  }
            } catch (error) {
                dispatch(loadingBlockchainFailure({
                    errorMsg: 'Error de transaccion',
                }))
                console.log(error)
            }
        } catch (error) {
            alert(error)
            web3Modal.clearCachedProvider();
            dispatch(loadingBlockchainFailure({
                errorMsg: 'Error de conneccion',
            }))
            console.log(error)
        }
    }
}





export const fetchBalance = () => {
    return async (dispatch, getState) => {
        const { tokenContract, busdContract, usdtContract  ,accountAddress, exchangeContract } = getState().blockchain
        const tokenBalance = await tokenContract.balanceOf(accountAddress)
        const busdBalance = await busdContract.balanceOf(accountAddress)
        const usdtBalance = await usdtContract.balanceOf(accountAddress)
        const tokenBalanceFormatted = parseFloat(tokenBalance) / 10 ** 8
        const busdBalanceFormatted = parseFloat(ethers.utils.formatEther(busdBalance))
        const usdtBalanceFormatted = parseFloat(ethers.utils.formatEther(usdtBalance))
        dispatch(updateBalance(tokenBalanceFormatted, busdBalanceFormatted, usdtBalanceFormatted))
    }
}

export const disconnectBlockchainAction = () => {
    return async (dispatch) => {
        web3Modal.clearCachedProvider();
        dispatch(disconnectBlockchain())


    }
};


