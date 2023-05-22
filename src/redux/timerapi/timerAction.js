import axios from 'axios';

const URL = 'https://api.timezonedb.com/v2.1/get-time-zone?key=GGZ2BBDNZ3Y4&format=json&by=position&lat=40.689247&lng=-74.044502'

const loadingTimer = () => {
    return {
        type: 'LOADING_TIMER'
    }
}

const loadingTimerSuccess = (payload) => {
    return {
        type: 'LOADING_TIMER_SUCCESS',
        payload
    }
}

const loadingTimerFailure = (payload) => {
    return {
        type: 'LOADING_TIMER_FAILURE',
        payload
    }
}

export const fetchTimer = () => {
    return async (dispatch) => {
        
        dispatch(loadingTimer())
        try {
            const response = await axios.get(URL)
            const timestamp = response.data.timestamp
            const date = response.data.formatted
           

            dispatch(loadingTimerSuccess({
                timestamp,
                date
            }))
        } catch (error) {
            dispatch(loadingTimerFailure(error))
        }
    }
}


    