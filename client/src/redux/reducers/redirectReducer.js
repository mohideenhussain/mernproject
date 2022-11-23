import { ActionTypes } from '../constants/actionTypes';

export const redirectReducer = (state = { path: null }, {type, payload})=>{
    switch(type){
        case ActionTypes.REDIRECT :
            return {...state, path: payload}
        default: 
            return state;
    } 
}