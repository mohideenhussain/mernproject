import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import { authLogin } from '../../redux/actions/authActions'


const Login = ()=> {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputField, setInputField] = useState({email: '', password: ''});
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  
  const formValid = ()=>{
    setError({});
    if(!inputField.email){
      setError({...error, email:'Please enter the email'})
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inputField.email)){
      setError({...error, email:'Invalid email address'})
    }

    if(!inputField.password){
      setError({...error, password:'Please enter the password'})
    }
  }
  const handleSubmit = (e)=> {
    e.preventDefault();
    formValid();
    if(!Object.keys(error).length){
      dispatch(authLogin(inputField, navigate))
    }
   
  }
    return (
      <Container sx={{height: '100vh', width: '75ch'}}>
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
            
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1,width: '70%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value= {inputField.email}
              autoComplete="email"
              onChange={(e)=>setInputField({...inputField, email:e.target.value})}
              autoFocus
            />
            {(error.email) && ( <Alert severity="error">{error.email}</Alert>)}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value= {inputField.password}
              onChange={(e)=>setInputField({...inputField, password:e.target.value})}
              autoComplete="current-password"
            />
            {(error.password) && ( <Alert severity="error">{error.password}</Alert>)}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    );
  }
  
  export default Login;