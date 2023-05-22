import {ethers} from 'ethers';
import P2PABI from '../../abis/p2pAbi.json'
import { contract } from '../blockchain/blockchainRouter';

const Router = contract();
const P2P_ADDRESS = Router.P2P_ADDRESS;
const RPC_URL = Router.RPC_URL;


const fetchP2pStart = () => ({
    type: 'FETCH_P2P_START',
})

const fetchP2pSuccess = (payload) => ({
    type: 'FETCH_P2P_SUCCESS',
    payload
})

const fetchP2pFailure = (payload) => ({
    type: 'FETCH_P2P_FAILURE',
    payload
})

export const fetchP2p = () => {
    return async (dispatch) => {
        dispatch(fetchP2pStart());
        try {
        
            const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
            const p2pContract = new ethers.Contract(P2P_ADDRESS, P2PABI, provider);
            const buy = await p2pContract.getAllBuyOffers();

            const sell = await p2pContract.getAllSellOffers();
            const sellData = sell.map(item => {
                return {
                    amount: parseFloat(ethers.utils.formatEther(item.amount)),
                    id: parseInt(item.id),
                    isActive: item.isActive,
                    minAmount: parseFloat(ethers.utils.formatEther(item.minAmount)),
                    owner: item.owner,
                    price: parseFloat(ethers.utils.formatEther(item.price)),
                }})

            dispatch(fetchP2pSuccess({
                buyData: buy,
                sellData: sellData,
                contractP2p: p2pContract
            }));
        } catch (error) {
            dispatch(fetchP2pFailure(error));
        }
    }
}
