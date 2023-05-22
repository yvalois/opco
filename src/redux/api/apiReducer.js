const initialState = {
    loading: false,
    error: null,
    errorMsg: null,
    linksLoaded: false,
    links: [],
    categories: [],
    vipAccess: false,
}

const apiReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOADING_API':
            return {
                ...state,
                loading: true,
                error: null,
                errorMsg: null,
            }
        case 'LOADING_API_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                errorMsg: null,
                linksLoaded: true,
                links: action.payload.links,
                categories: action.payload.categories,
                vipAccess: action.payload.vipAccess,
            }
        case 'LOADING_API_FAILURE':
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload.errorMsg,
            }
        default:
            return state;
    }
}

export default apiReducer;