import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LogoutPrompt from './logoutPrompt';
import useAuthentication from './hooks/useAuthentication';

import { useState, useEffect, useLayoutEffect } from 'react';

import { useSelector } from 'react-redux';

// const ProtectedRoute = ({isloggedin, children})=>{

//     const location = useLocation();

//     //const useAuth = useAuthentication();

//     //const [loggedIn, setLoggedIn] = useState(useAuth)

//     // useEffect(()=>{
//     //     setLoggedIn(useAuth)
//     // },[useAuth])

//     console.log(isloggedin)

//     return (isloggedin) ? children : <Navigate to="/login" replace state ={{ path: location.pathname }} />
// //     return (isloggedin) ? children : <LogoutPrompt
// //     openDialog={true}
// // />

// }


const ProtectedRoute = ({isLogin}) => {

    const location = useLocation();

    const [auth, setAuth] = useState(false)

    const getAuth = useSelector((state) => state.authReducer.isLoggedIn)

    console.log(isLogin)

    useEffect(()=>{
        setAuth(isLogin)
    },[isLogin])

    // const getAccess = true;

    // const refresh = useAuthentication();
    // const getAuth = useSelector((state) => state.authReducer.isLoggedIn)


    // const [isLoggedIn, setIsLoggedIn] = useState(Promise.resolve(getAuth));
    // let isMounted = false;

    // useLayoutEffect(() => {
        
    //         isMounted = true;
    //         const verifyToken = () => {
    //             try {
    //                 refresh()
    //             } catch (error) {
    //                 console.log(error)
    //             }
    //             finally {
    //                 isMounted && Promise.resolve(setIsLoggedIn(getAuth))
    //             }
    //         }
    //         !getAuth ? verifyToken() : setIsLoggedIn(getAuth ? true: false)

    //         return ()=> isLoggedIn

    // }, [getAuth])

    return (
        
        <>

        {
             (isLogin) ? <Outlet/> :  <Navigate to="/login" replace state ={{ path: location.pathname }} />
            
        }
        </>
    )
}

export default ProtectedRoute;