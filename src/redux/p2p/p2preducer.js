const INITIAL_STATE = {
    buyData: [],
    sellData: [],
    loading: false,
    error: null,
    loaded: false,
    contractP2p: null
}

const p2pReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_P2P_START':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_P2P_SUCCESS':
            return {
                ...state,
                loading: false,
                loaded: true,
                buyData: action.payload.buyData,
                sellData: action.payload.sellData,
                contractP2p: action.payload.contractP2p
            }
        case 'FETCH_P2P_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default p2pReducer;