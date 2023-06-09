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

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            rpc: {
                56: "https://bsc-dataseed.binance.org/",
                97: "https://data-seed- prebsc-1-s1.binance.org:8545/"
            }, // required
        }
    },


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

const disconnectBlockchain = () => ({
    type: 'DISCONNECT_BLOCKCHAIN',
})

export const fetchBlockchain = () => {
    return async (dispatch) => {
        const a = "production"
        dispatch(loadingBlockchain())
        try {
            const instance = await web3Modal.connect(providerOptions);
            const provider = new ethers.providers.Web3Provider(instance);
            const signer = provider.getSigner();

            try {
                const accounts = await provider.listAccounts();
                const networkID = await provider.getNetwork();

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

                    const tokenBalance = await tokenContract.balanceOf(accounts[0])
                    const exchangeBalance = await tokenContract.balanceOf(EXCHANGE_ADDRESS);
                    const bnbBalance = await provider.getBalance(accounts[0])
                    const busdBalance = await busdContract.balanceOf(accounts[0])
                    const usdtBalance = await usdtContract.balanceOf(accounts[0])
                    const accountAddress = accounts[0]
                    //8 decimals token
                    const tokenBalanceFormatted = parseFloat(tokenBalance) / 10 ** 8
                    const exchangeBalanceFormatted = parseFloat(exchangeBalance) / 10 ** 8
                    const busdBalanceFormatted = parseFloat(ethers.utils.formatEther(busdBalance))
                    const usdtBalanceFormatted = parseFloat(ethers.utils.formatEther(usdtBalance))
                    const bnbBalanceFormatted = parseFloat(ethers.utils.formatEther(bnbBalance));
                    const tokenPriceWeth = await exchangeContract.fetchPrice();
                    const tokenPrice = parseFloat(ethers.utils.formatEther(tokenPriceWeth))

                    const exchangeOwner = await exchangeContract.owner();
                    const isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase();

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

                    instance.on("accountsChanged", async (accounts) => {
                     
                        const tokenBalance = await tokenContract.balanceOf(accounts[0]);
                        const exchangeBalance = await tokenContract.balanceOf(EXCHANGE_ADDRESS);
                        const bnbBalance = await provider.getBalance(accounts[0]);
                        const busdBalance = await busdContract.balanceOf(accounts[0]);
                        const usdtBalance = await usdtContract.balanceOf(accounts[0]);
                        const accountAddress = accounts[0];
                        const tokenBalanceFormatted = parseFloat(tokenBalance) / 10 ** 8;
                        const exchangeBalanceFormatted = parseFloat(exchangeBalance) / 10 ** 8;
                        const busdBalanceFormatted = parseFloat(ethers.utils.formatEther(busdBalance));
                        const usdtBalanceFormatted = parseFloat(ethers.utils.formatEther(usdtBalance));
                        const bnbBalanceFormatted = parseFloat(ethers.utils.formatEther(bnbBalance));
                        const exchangeOwner = await exchangeContract.owner();
                        const isOwner = accountAddress.toLowerCase() === exchangeOwner.toLowerCase();
                        dispatch(updateAccount({
                            tokenBalance: tokenBalanceFormatted,
                            bnbBalance: bnbBalanceFormatted,
                            busdBalance: busdBalanceFormatted,
                            accountAddress,
                            exchangeBalance: exchangeBalanceFormatted,
                            usdtBalance: usdtBalanceFormatted,
                            isOwner
                        }))

                    })
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


