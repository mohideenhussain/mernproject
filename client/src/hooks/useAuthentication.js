import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRefreshToken } from "../redux/actions/authActions";

const useAuthentication = ()=>{
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state.authReducer.isLoggedIn)
    const getRefresh = ()=>{
        return Promise.resolve(dispatch(getRefreshToken()));
    }

    return getRefresh;
}

export default useAuthentication;