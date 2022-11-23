import React, { useState } from "react";
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material';
import {Controller, useFormContext } from "react-hook-form";

import Alert from '@mui/material/Alert';

const ItemHeader = styled('div')`
width: 25%;
`
const Header = styled('div')`
width:100%;
display:flex;
`

const AddRoute = ()=>{
    const { register, control, formState: { errors } } = useFormContext();
    return(
        <div>
                <Header>
                    <ItemHeader>
                        <TextField
                            sx={{ pl:0, pr:1, pt: 1, pb:1, width: '100%' }}
                            id='outlined-required'
                            label='Starting Point'
                            {...register('starting_point', {
                                required: true
                            })}
                        />
                        {errors.starting_point?.type === 'required' && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Starting point is required</Alert>)}
                    </ItemHeader>
                    <ItemHeader>
                        <TextField
                            sx={{ p: 1, width: '100%' }}
                            id='outlined-required'
                            label='Destination Point'
                            {...register('destination_point', {
                                required: true,
                            })}

                        />
                        {errors.destination_point?.type === 'required' && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Destination point is required</Alert>)}
                    </ItemHeader>
                    <ItemHeader>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Controller
                                control={control}
                                name='departure_date'
                                render={({ field }) => (
                                    <DateTimePicker
                                        label="Depature Date"
                                        renderInput={(props) => <TextField {...register('departure_date', { required: true })} sx={{ p: 1, width: '100%' }} {...props} />}
                                        onChange={(e) => { field.onChange(e) }}
                                        value={field.value}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        {errors.departure_date?.type === 'required' && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Destination Date is required</Alert>)}
                    </ItemHeader>
                    <ItemHeader>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Controller
                                control={control}
                                name='arrival_date'
                                render={({ field }) => (
                                    <DateTimePicker
                                        label="Arrival Date"
                                        renderInput={(props) => <TextField {...register('arrival_date', { required: true })} sx={{  pl:1, pr:0, pt: 1, pb:1, width: '100%' }} {...props} />}
                                        onChange={(e) => { field.onChange(e) }}
                                        value={field.value}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        {errors.arrival_date?.type === 'required' && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Arrival Date is required</Alert>)}
                    </ItemHeader>
                </Header>
        </div>
    )
}

export default AddRoute;