import React, { useState, useEffect } from "react";
import { authAxios } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { getRefreshToken } from "../redux/actions/authActions";

const useRefreshToken = ()=>{
    const dispatch = useDispatch();
    const getToken = useSelector((state)=> state.authReducer.token);
    const [token, setToken] = useState(null)
    dispatch(getRefreshToken());

    useEffect(()=>{
        setToken(getToken)
    },[getToken])

    return token;
}

export default useRefreshToken;