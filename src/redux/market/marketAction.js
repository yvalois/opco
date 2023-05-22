import { ethers } from "ethers";
import axios from 'axios';
import { contract } from "../blockchain/blockchainRouter";
import nftAbi from "../../abis/nft.json";
import marketAbi from "../../abis/market.json";
import priceSetterAbi from "../../abis/priceSetter.json";

const router = contract();
const URI = "https://res.cloudinary.com/opco/raw/upload/v1659658003/jsonraities/"

const marketLoading = ( ) => ({
    type: 'MARKET_LOADING'
});

const marketLoaded = (payload) => ({
    type: 'MARKET_LOADED',
    payload
});

const marketError = (payload) => ({
    type: 'MARKET_ERROR',
    payload
});


export const getMarket = (page) => {
    return async (dispatch) => {
        dispatch(marketLoading());
        try {
            const RPC = router.RPC_URL;
            const provider = new ethers.providers.JsonRpcProvider(RPC);
            const nft_address = router.NFT_ADDRESS;
            const market_address = router.MARKET;
            const price_setter_address = router.PRICE_SETTER_ADDRESS;
            const token_address = router.AOEX_ADDRESS;
            
            //const minterContract = new ethers.Contract(nft_address, nftAbi, provider);
            const priceSetter  = new ethers.Contract(price_setter_address, priceSetterAbi, provider);
            const marketContract = new ethers.Contract(market_address, marketAbi, provider);

            const ethprice = await priceSetter.price();
            const tokenPrice = ethers.utils.formatEther(ethprice);
         
          
            const market = await marketContract.getAllMarket();
            const discount = await marketContract.discounts(token_address);

            const market_data = await Promise.all(market.map(async (item) => {
                const nft = await axios.get(`${URI}${parseInt(item.token_id)}.json`);
                return {...nft.data, 
                    dollarPrice: ethers.utils.formatEther(item.dollarPrice),
                    listId: parseInt(item.listId),
                    token_id: parseInt(item.token_id),
                    owner: item.owner,
                };
            }
            ));
            dispatch(marketLoaded({
                market: market_data,
                marketContract: marketContract,
                tokenPrice: tokenPrice,
                discount: ethers.utils.formatEther(discount),
            }));
     
        } catch (error) {
            dispatch(marketError(error));
        }
    }
};





