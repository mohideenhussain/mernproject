import axios from 'axios';
import store from '../redux/store';


const API_URL = 'http://localhost:5000';
//const obj = JSON.parse(localStorage.getItem('token'))?? null;
export const authAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

export const authAxiosPrivate = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

authAxiosPrivate.interceptors.request.use(
    config => {
        const state = store.getState();
        if(!config?.headers['Authorization'] && state?.authReducer?.token){
            config.headers['Authorization'] = `Bearer ${state?.authReducer?.token}`
        }
        return config;
    }, (err)=> Promise.reject(err)
)

authAxiosPrivate.interceptors.response.use(
    response => response,
    async (err)=>{
        
        const getPrevRequest = err?.config;
        if(err?.response?.status === 403 && !getPrevRequest?.sent){
            getPrevRequest.sent = true;
            
            const newToken = await authAxios.get('/users/refreshtoken',{
                withCredentials:true
            });
            if(newToken){
                getPrevRequest.headers['Authorization'] = `Bearer ${newToken.data.token}`
            };

            return authAxiosPrivate(getPrevRequest);
        }
    }
)