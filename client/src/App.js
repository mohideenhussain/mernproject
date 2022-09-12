
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'
import Container from '@mui/material/Container';
import Dashboard from './components/dashboard/Dashboard';
import Operator from './components/operator/Operator';
import Login from './components/authentication/Login';
import { checkforLogin, isUserLoggedIn } from './helpers/auth';
import Navbar from './layout/navbar/NavBar';
import { styled } from '@mui/material/styles';
import SeatsInfo from './components/seats_info/SeatsInfo';
import AddTrips from './components/trip/AddTrips';
import useAuthentication from './hooks/useAuthentication';
import Schedule from './components/schedule/Schedule';
import ProtectedRoute from './protected';
import { getRefreshToken } from './redux/actions/authActions';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' || prop !== 'isloggedin'  })(
  ({ theme, open, isloggedin}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    ...((open || !isloggedin) && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function App() {


   const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  //const refresh = useAuthentication();

  const getLogin = useSelector((state)=>state.authReducer.isLoggedIn)

  const [isLoggedIn, setIsLoggedIn] = useState(getLogin)

  useEffect(()=>{
    //let isMounted = true;
    if(!getLogin){
      dispatch(getRefreshToken())
      setIsLoggedIn(getLogin)
    }
  },[getLogin])


  // useEffect(()=>{
  //   setIsLoggedIn(getLogin)
  // },[getLogin])

  



  

  // useEffect(()=>{
  //   let isMounted = true;
  //   const verifyToken = ()=>{
  //     try {
  //       refresh()
  //     } catch (error) {
        
  //     }
  //     finally{
  //       isMounted && setIsLoggedIn(getLogin)
  //     }
  //   }
  //   !getLogin ? verifyToken() : setIsLoggedIn(getLogin)  
  // },[getLogin])

  // console.log(isLoggedIn)
  const [open, setOpen] = useState(true);
  console.log(getLogin)
  return (
    <Container maxWidth="100%">
      {
        (getLogin && <Navbar 
          handleDrawerOpen = {()=>setOpen(true)}
          handleDrawerClose = {()=>setOpen(false)}
          open = {open}
        />)
      }
      {/* <ProtectedRoute>
      <Navbar 
          handleDrawerOpen = {()=>setOpen(true)}
          handleDrawerClose = {()=>setOpen(false)}
          open = {open}
        />
      </ProtectedRoute> */}
      <Main open={open} isloggedin = {isLoggedIn}>
      <DrawerHeader />
        <Routes>
        <Route path='/login' element={<ErrorBoundary><Login /></ErrorBoundary>} />
        <Route element={<ProtectedRoute isLogin = {getLogin} />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/addtrip' element={<AddTrips />} />
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/' exact element={<Dashboard/>} />
        </Route>
          {/* <Route path='/' exact element={<ProtectedRoute isloggedin={isLoggedIn} ><ErrorBoundary><Operator /></ErrorBoundary></ProtectedRoute>} />
          <Route path='/dashboard' element={<ProtectedRoute isloggedin={isLoggedIn}><ErrorBoundary><Dashboard /></ErrorBoundary></ProtectedRoute>} />
          <Route path='/addtrip' element={<ProtectedRoute isloggedin={isLoggedIn} ><ErrorBoundary><AddTrips /></ErrorBoundary></ProtectedRoute>} />
          <Route path='/schedule' element={<ProtectedRoute isloggedin={isLoggedIn} ><ErrorBoundary><SeatsInfo /></ErrorBoundary></ProtectedRoute>} />
          <Route path='/login' element={<ErrorBoundary><Login /></ErrorBoundary>} /> */}
        </Routes>
      </Main>
    </Container>
  );
}

export default App;
