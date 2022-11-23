import React from 'react';
import  { screen, render, fireEvent }  from '@testing-library/react';
import Login from '../../components/authentication/Login';

const mockedUsedNavigate = jest.fn();
const mockedUsedLocation = jest.fn();
const mockedDispatch = jest.fn();



jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
  useLocation:()=> mockedUsedLocation
}));
jest.mock('react-redux',()=>({
    ...jest.requireActual('react-redux'),
    useDispatch : ()=> mockedDispatch
}))

const setup = ()=>{
    const util = render(<Login/>);
    const emailInput = screen.getByLabelText(/Email Address/);
    const passwordInput = screen.getByLabelText(/Password/);
    return {
        emailInput,
        passwordInput,
        ...util
    }
}

describe('Check for input element', ()=>{
    it('check for email element', ()=>{
        const { emailInput } = setup();
        expect(emailInput).toBeTruthy();
    })
    it('check for password',()=>{
        const { passwordInput } = setup();
        expect(passwordInput).toBeTruthy();
    })
    it('check for onChangeEmail', ()=>{
        const { emailInput } = setup();
        fireEvent.change(emailInput, {target : {value: 'abc@gmail.com'}})
        expect(emailInput.value).toBe('abc@gmail.com');
    })
    it('check for onChangePassword', ()=>{
        const { passwordInput } = setup();
        fireEvent.change(passwordInput, {target : {value: 'password123'}})
        expect(passwordInput.value).toBe('password123');
    })
})
