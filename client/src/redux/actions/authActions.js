
import * as API from '../../api';
import { ActionTypes } from '../constants/actionTypes';
import * as helper from '../../helpers/auth';


export const authLogin = (obj, navigate)=> async (dispatch)=>{
    const response = await API.authAxios.post('/users/signin', obj);
    if(response){
        //helper.setUserSession(response.data);
        dispatch({type: ActionTypes.AUTH_LOGIN, payload: response.data});
        helper.runAuthTimer(dispatch, response.data)
       // helper.runAutoLogout(dispatch, response.data.expiresIn)
        navigate('/dashboard');
    }
}

export const getRefreshToken = ()=> async (dispatch)=>{
    const response =  await API.authAxios.get('/users/refreshtoken',{
        withCredentials:true
    });
    if(response){
        dispatch({type: ActionTypes.REFRESH_TOKEN, payload:response.data})
        helper.runAuthTimer(dispatch, response.data)
    }
} 

export const authLogout = ()=> async (dispatch) =>{
    //helper.deleteUserSession(dispatch);
    dispatch({type: ActionTypes.AUTH_LOGOUT, payload:null});
}