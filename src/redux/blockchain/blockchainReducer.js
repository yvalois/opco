const initialState = {
    loading: false,
    error: null,
    errorMsg: null,
    tokenContract: null,
    busdContract: null,
    busdBalance: null,
    bnbBalance: null,
    usdtBalance: null,
    usdtContract: null,
    tokenBalance: null,
    accountAddress: null,  
    exchangeContract: null,  
    stakingContract: null,
    priceSetterContract: null,
    opcoStoreContract: null,
    networkID: null,
    exchangeBalance: null,
    signer: null,
    tokenPrice: null,
    marketContract: null,
    p2pContract: null,
    isOwner: false,
}

const blockchainReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOADING_BLOCKCHAIN':
            return {
                ...state,
                loading: true,
                error: null,
                errorMsg: null,
            }
        case 'LOADING_BLOCKCHAIN_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                errorMsg: null,
                tokenContract: action.payload.tokenContract,
                busdContract: action.payload.busdContract,
                bnbBalance: action.payload.bnbBalance,
                tokenBalance: action.payload.tokenBalance,
                busdBalance: action.payload.busdBalance,
                usdtBalance: action.payload.usdtBalance,
                usdtContract: action.payload.usdtContract,
                accountAddress: action.payload.accountAddress,
                exchangeContract: action.payload.exchangeContract,
                priceSetterContract: action.payload.priceSetterContract,
                stakingContract: action.payload.stakingContract,
                networkID: action.payload.networkID,
                exchangeBalance: action.payload.exchangeBalance,
                signer: action.payload.signer,
                opcoStoreContract: action.payload.opcoStoreContract,
                tokenPrice: action.payload.tokenPrice,
                marketContract: action.payload.marketContract,
                p2pContract: action.payload.p2pContract,
                isOwner: action.payload.isOwner,
        }
        case 'LOADING_BLOCKCHAIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.errorMsg,
            }
        case 'UPDATE_ACCOUNT':
            return {
                ...state,
                accountAddress: action.payload.accountAddress,
                tokenBalance: action.payload.tokenBalance,
                busdBalance: action.payload.busdBalance,
                bnbBalance: action.payload.bnbBalance,
                usdtBalance: action.payload.usdtBalance,
                exchangeBalance: action.payload.exchangeBalance,
                tokenPrice: action.payload.tokenPrice,
                isOwner: action.payload.isOwner,
            }
        case 'UPDATE_BALANCE':
            return {
                ...state,
                tokenBalance: action.payload.tokenBalance,
                busdBalance: action.payload.busdBalance,
                bnbBalance: action.payload.bnbBalance,
                usdtBalance: action.payload.usdtBalance,
            }
        case 'DISCONNECT_BLOCKCHAIN':
            return {
                ...state,
                loading: false,
                error: null,
                errorMsg: null,
                tokenContract: null,
                busdContract: null,
                busdBalance: null,
                bnbBalance: null,
                usdtBalance: null,
                tokenBalance: null,
                accountAddress: null,
                exchangeContract: null,
                networkID: null,
                exchangeBalance: null,
                signer: null,
                opcoStoreContract: null,
                tokenPrice: null,
                marketContract: null,
                p2pContract: null,
                stakingContract: null,
                priceSetterContract: null,
                usdtContract: null,

            }

        default:
            return state
        }
}

export default blockchainReducer