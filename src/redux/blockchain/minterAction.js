import { ethers } from "ethers";
import nftAbi from "../../abis/nft.json"
import axios from "axios";
import { contract } from "./blockchainRouter";


const MINTERADDRESS = contract().NFT_ADDRESS;
const URI = "https://res.cloudinary.com/opco/raw/upload/v1659658003/jsonraities/"


const loadingMinter = () => ({
    type: 'LOADING_MINTER',
})

const loadingMinterSuccess = (payload) => ({
    type: 'LOADING_MINTER_SUCCESS',
    payload,
})

const loadingMinterFailure = (payload) => ({
    type: 'LOADING_MINTER_FAILURE',
    payload,
})

const updateMinter = (payload) => ({
    type: 'UPDATE_MINTER',
    payload
})

const disconnectMinter = () => ({
    type: 'DISCONNECT_MINTER',
})



export const fetchMinter = () => {
    return async (dispatch, getState) => {
        dispatch(loadingMinter())

        try {
            const { accountAddress, signer } = getState().blockchain;


            let minterBalanceArray = []

            const minter = new ethers.Contract(MINTERADDRESS, nftAbi, signer);
            const totalSupply = await minter.totalSupply();
            

            const cotractOwner = await minter.owner();
            let verifyOwnerResult = false; 
            if (accountAddress.toLowerCase() === cotractOwner.toLowerCase()) {
                verifyOwnerResult = true;
            }

            
            for (let i = 1; i <= totalSupply; i++) {
                const owned = await minter.ownerOf(i);

                if(owned.toLowerCase() === accountAddress.toLowerCase()) {
                const number = i;

                const nft = await axios.get(`${URI}${number}.json`);
                minterBalanceArray.push({
                    ...nft.data,
                    tokenId: number,
                })
            }
            }

            
            dispatch(loadingMinterSuccess({
                mintContract: minter,
                nftBalance: minterBalanceArray,
                ifOwner: verifyOwnerResult
            }))


        } catch (error) {
            dispatch(loadingMinterFailure({
                errorMsg: 'Error de transaccion',
            }))
            console.log(error)
        }
    }
}

export const fetchMinterAction = () => {
    return async (dispatch, getState) => {

        dispatch(loadingMinter())
        try {
            const { accountAddress, signer } = getState().blockchain;
            const minter = new ethers.Contract(MINTERADDRESS, nftAbi, signer);
            const totalSupply = await minter.totalSupply();
            let minterBalanceArray = [];
            const owner = await minter.owner();


            let verifyOwnerResult = false;
            if (accountAddress.toLowerCase() === owner.toLowerCase()) {
                verifyOwnerResult = true;
            }
            
            for (let i = 1; i <= totalSupply.length; i++) {
                const owned = await minter.ownerOf(i);  
                if(owned.toLowerCase() === accountAddress.toLowerCase()) {
                const number = i;
                const nft = await axios.get(`${URI}${number}.json`);
                minterBalanceArray.push({
                    ...nft.data,
                    tokenId: number,
                })
            }
            }
            


            dispatch(updateMinter({
                nftBalance: minterBalanceArray,
                verifyOwnerResult
            }));
        } catch (error) {
            dispatch(loadingMinterFailure({
                errorMsg: 'Error de transaccion',
            }))
            console.log(error)
        }
    }
}


export const disconnectMinterAction = () => {
    return async (dispatch) => {

        dispatch(disconnectMinter())
    }
};


