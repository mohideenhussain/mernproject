import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { seatType } from '../../redux/actions/seatActions';
import Sleeper from '../../layout/seats/Sleeper';
import Semisleeper from '../../layout/seats/Semisleeper';
import {useFormContext, Controller } from "react-hook-form";
import Alert from '@mui/material/Alert';

const TextHeader = styled('div')(({ theme }) => ({
  width: '100%',
  padding: '10px',
}))


const SeatsInfo = () => {
  const { register, control, setValue, getValues, watch, formState: { errors, isValid,...formState } } = useFormContext();
  const watchField = watch(['bus_name', 'seats', 'bus_type', 'bus_total'])
  const busType = [
    {
      id: 1,
      name: 'Volvo Sleeper AC',
      seat: 30,
      type: 'sleeper'
    },
    {
      id: 2,
      name: 'Bharat Benz',
      seat: 24,
      type: 'sleeper'
    },
    {
      id: 3,
      name: 'Volvo Semi Sleeper',
      seat: 49,
      type: 'semi sleeper'
    }
  ];

  const [bus, setBus] = useState('');
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.seatReducer.seatType)

  const handleSeats = (e) => {
    setValue(e.target.name, e.target.value)
    if(getValues('seats').length <= 1){
      dispatch(seatType(e.target.value))
    }
  }

  const assignSeats = (data)=>{
    if(data.seats){
      setValue('seats', watchField[1].length === parseInt(watchField[4]) ? watchField[1] :  data.seats)
      setValue('bus_type', data.type)
      setValue('bus_total', data.total)
    }
  }
  useEffect(() => {
    if (selector.seats) {
      assignSeats(selector);
    }
  }, [selector])

  const switchSeat = ()=>{
    switch(getValues('bus_name')) {
      case 'Volvo Sleeper AC':
        return ( <Sleeper />)
      default:
        return(<Semisleeper />) 
    }
  }

  return (
    <Box>
      <TextHeader>
        <TextField
          sx={{ width: '50ch' }}
          id="outlined-select-currency"
          select
          label="Select"
          helperText="Please select type of Bus"
          {...register('bus_name', {
            required: true,
            onChange: (e)=>{handleSeats(e)}
          })}
        >
         
          {busType.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </TextHeader>
      {
        switchSeat()
      }
    </Box>
  )
}

export default SeatsInfo;