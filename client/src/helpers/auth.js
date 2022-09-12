import { authLogout, getRefreshToken } from "../redux/actions/authActions"
import { ActionTypes } from "../redux/constants/actionTypes";
import LogoutPrompt from "../logoutPrompt";

export const setUserSession = (data)=>{
    console.log(data)
    data.expiryDate = new Date(new Date().getTime() + data.expiresIn *1000)
    localStorage.setItem('token', JSON.stringify(data))
}

export const isUserLoggedIn =()=>{
    return JSON.parse(localStorage.getItem('token')) ? true : false
}

export const deleteUserSession = (dispatch)=>{
    //dispatch(getRefreshToken())
}

export const runAutoLogout = (dispatch, data)=>{
    // setTimeout(()=>{
    //     dispatch(authLogout());
    // }, timer)
    console.log((JSON.parse(atob(data.token.split('.')[1]))).exp * 1000 - new Date().getTime())
    


}


export const runAuthTimer = (dispatch, data)=>{
    let timer = (JSON.parse(atob(data.token.split('.')[1]))).exp * 1000 - new Date().getTime();
    setTimeout(()=>{
        dispatch(authLogout(dispatch))
        return(
            <LogoutPrompt
                openDialog={true}
            />
        )

    }, timer)
}

export const checkforLogin = (dispatch, navigate)=>{
    const getToken = (JSON.parse(localStorage.getItem('token')))?? null;
    if(getToken){
        if(new Date() > getToken.expiryDate){
            dispatch(authLogout())
            return;
        }
        dispatch({type:ActionTypes.AUTH_LOGIN, payload:getToken});
        navigate('/dashboard')
        runAutoLogout(dispatch, (new Date(getToken.expiryDate).getTime() - new Date().getTime()))
    }
    else{
        dispatch(authLogout())
        return;
    }
}


export const getDates = (value) =>{
    if(value.length){
        let items = []
        value.forEach((date)=> {
            if(date){
                let item = new Date(date);
                items.push(item.getFullYear()+ '-'+ (item.getMonth()+1) + '-' + item.getDate());
            }
        })
        return items
    }
}



