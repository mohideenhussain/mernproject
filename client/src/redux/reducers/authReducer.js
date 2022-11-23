import { ActionTypes } from '../constants/actionTypes';
const initialState = {
    user: null,
    isLoggedIn: false,
    token:null
}
export const authReducer = (state = initialState , {type, payload})=>{
    switch (type){
        case ActionTypes.AUTH_LOGIN: 
            return {...state, user: payload, isLoggedIn: true, token: payload.token};
        case ActionTypes.AUTH_LOGOUT: 
            return {...state, user: null, isLoggedIn: false, token: null};
        case ActionTypes.REFRESH_TOKEN:
            console.log(payload)
            return {...state, user: null, isLoggedIn: true, token:payload}    
        default: return state
    }
}
