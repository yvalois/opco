const initialState = {
    loading: false,
    error: null,
    errorMsg: null,
    mintContract: null,
    ifOwner: false,
    nftBalance: [],
}

const minterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOADING_MINTER':
            return {
                ...state,
                loading: true,
                error: null,
                errorMsg: null,
            }
        case 'LOADING_MINTER_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                errorMsg: null,
                ifOwner: action.payload.ifOwner,
                mintContract: action.payload.mintContract,
                nftBalance: action.payload.nftBalance,
        }
        case 'LOADING_MINTER_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
                ifOwner: false,
                errorMsg: action.payload.errorMsg,
            }
        case 'UPDATE_MINTER':
            return {
                ...state,
                nftBalance: action.payload.nftBalance,
                ifOwner: action.payload.ifOwner,

            }
        case 'DISCONNECT_MINTER':
            return {
                ...state,
                loading: false,
                error: null,
                errorMsg: null,
                mintContract: null,
                ifOwner: false,
                nftBalance: [],
            }
        default:
            return state
        }
}

export default minterReducer