const initialState = {
    isLoading: false,
    isError: false,
    errorMessage: '',
    timestamp: 0,
    date: '',
    success: false,
}
const timerReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_TIMER':
            return {
                ...state,
                isLoading: true,
                isError: false,
                errorMessage: '',
            }
        case 'LOADING_TIMER_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                errorMessage: '',
                timestamp: action.payload.timestamp,
                date: action.payload.date,
                success: true,
            }
        case 'LOADING_TIMER_FAILURE':
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorMessage: action.payload.errorMessage,
            }
        default:
            return state
    }
}

export default timerReducer

