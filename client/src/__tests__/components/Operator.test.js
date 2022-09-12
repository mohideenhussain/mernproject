import React from 'react';
import { screen, render, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Operator from '../../components/operator/Operator';
import { Experimental_CssVarsProvider } from '@mui/material';


describe("check for react hook forms", () => {
    it("check for form in dom", async () => {
        render(<Operator />)
        const checkForElement = screen.findByTestId(/operator-form/i)
        expect(checkForElement).toBeTruthy();
    })
});