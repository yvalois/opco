const INITIAL_STATE = {
    market:[],
    marketLoading:false,
    marketError:null,
    marketloaded:false,
    marketContract:null,
    tokenPrice:null,
    discount:null,
}

const marketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'MARKET_LOADING':
            return {
                ...state,
                marketLoading: true,
                marketError: null
            }
        case 'MARKET_LOADED':
            return {
                ...state,
                marketLoading: false,
                market: action.payload.market,
                marketloaded:true,
                marketContract:action.payload.marketContract,
                tokenPrice:action.payload.tokenPrice,
                discount:action.payload.discount,
            }
        case 'MARKET_ERROR':
            return {
                ...state,
                marketLoading: false,
                marketError: action.payload
            }
        default:
            return state
    }
}

export default marketReducer