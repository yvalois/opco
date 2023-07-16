import axios from 'axios';

export const APIROUTER = 'https://linksopco.herokuapp.com/';

const loadingApi = () => ({
    type: 'LOADING_API',
});

const loadingApiSuccess = (payload) => ({
    type: 'LOADING_API_SUCCESS',
    payload,
});

const loadingApiFailure = (payload) => ({
    type: 'LOADING_API_FAILURE',
    payload,
});

export const getLinks = (address) => async (dispatch) => {
    dispatch(loadingApi());
    try{
  
    const { data } = await axios.get(APIROUTER + 'showlinks/' + address);
    dispatch(loadingApiSuccess({
        links: data.links,
        categories: data.categories,
        vipAccess: data.vipAccess,
        linksLoaded: true
    }));
    } catch(error) {
        dispatch(loadingApiFailure({
            errorMsg: error.message,
        }));
    }
}

export const addLink = (name, url, description, accountAddress, category) => async (dispatch) => {
    dispatch(loadingApi());
    try{
       
    const { data } = await axios.post(APIROUTER + 'newlink', {
        name,
        url,
        description,
        accountAddress,
        category,
    });
    dispatch(loadingApiSuccess({
        links: data.links,
        categories: data.categories,
        vipAccess: data.vipAccess,
    }));
    } catch(error) {
        dispatch(loadingApiFailure({
            errorMsg: error.message,
        }));
    }
}

export const addCategory = (category, accountAddress) => async (dispatch) => {
    dispatch(loadingApi());
  
    try{
    const { data } = await axios.post(APIROUTER + 'newcategory', {
        name: category,
        accountAddress,
    });
    dispatch(loadingApiSuccess({
        links: data.links,
        categories: data.categories,
        vipAccess: data.vipAccess,
    }));
    } catch(error) {
        dispatch(loadingApiFailure({
            errorMsg: error.message,
        }));
    }
}

export const editCategory = (category, editCategorytext,  accountAddress) => async (dispatch) => {
    dispatch(loadingApi());

    try{

        const { data } = await axios.put(APIROUTER + `editcategory/${category}`, {
            name: editCategorytext,
            accountAddress,
        });

        dispatch(loadingApiSuccess({
            links: data.links,
            categories: data.categories,
            vipAccess: data.vipAccess,
        }));
    } catch(error) {
        dispatch(loadingApiFailure({
            errorMsg: error.message,
        }));
    }
}
 

export const deleteLink = (link, accountAddress) => async (dispatch) => {
    dispatch(loadingApi());
    try{
    const { data } = await axios.delete(`${APIROUTER}deletelink/${link}/${accountAddress}`);
    dispatch(loadingApiSuccess({
        links: data.links,
        categories: data.categories,
        vipAccess: data.vipAccess,
    }));
    } catch(error) {
        dispatch(loadingApiFailure({
            errorMsg: error.message,
        }));
    }
}

export const deleteCategory = (category, accountAddress) => async (dispatch) => {
    dispatch(loadingApi());
    try{
    const { data } = await axios.delete(`${APIROUTER}deletecategory/${category}/${accountAddress}`);
    dispatch(loadingApiSuccess({
        links: data.links,
        categories: data.categories,
        vipAccess: data.vipAccess,
    }));
    } catch(error) {
        dispatch(loadingApiFailure({
            errorMsg: error.message,
        }));
    }
}
