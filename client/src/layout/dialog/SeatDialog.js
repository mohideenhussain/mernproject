import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm, Controller, useFormContext } from "react-hook-form";
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { useDispatch } from 'react-redux';
import { applyFareActions } from '../../redux/actions/seatActions';

import SeatsInfo from '../../components/seats_info/SeatsInfo';
import Alert from '@mui/material/Alert';


const StyledDialog = styled(Dialog)`
  .MuiBackdrop-root {
    background-color: rgb(0 0 0 / 50%);
  }
  .MuiPaper-root{
    color: #fff;
    box-shadow:none;
  }
`;
const StyledDiv = styled('div')`
  display: flex
`;
const SeatDialog = (props) => {

    const { register, control, setValue, watch, setError, formState: { errors } } = useFormContext();
    const { openDialog, closeDialog, item } = props;

    const [loading, setLoading] = useState(false);
    const dispatchSeat = useDispatch();
    const watchFieldAray = watch('seats')

    const handleClick = () => {
        setLoading(true)
        watchFieldAray.map((card, index) => {
            setValue(`seats[${index}].fare`, watchFieldAray[item].fare)
        })
        setLoading(false)
    }
    const handleApply = (index) => {
        if(watchFieldAray[index].fare === null || watchFieldAray[index].fare === ''){
            setError(`seats[${index}].fare`, { type: "focus" }, { shouldFocus: true })
            return
        }
        setValue(`seats[${index}].fare`, watchFieldAray[index].fare)
        closeDialog()   
    }


    return (
        <StyledDialog
            open={openDialog}
            onClose={(_, reason) => {
                if (reason !== "backdropClick") {
                    closeDialog()
                }
            }}
        >
            <DialogTitle id="responsive-dialog-title">
                Seat Details
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <Box
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                    >
                        <Controller
                            control={control}
                            name={`seats[${item}].seat_id`}
                            render={({ field }) => (
                                <TextField
                                id="outlined-basic"
                                label="Seat Number"
                                readOnly
                                disabled
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name={`seats[${item}].fare`}
                            rules={{
                                required: "Fare is required"
                              }}
                            render={({ field }) => (
                                <TextField
                                id="outlined-basic"
                                label="Seat Fare"
                                    {...field}
                                />
                            )}
                        />
                        {errors.seats?.[item]?.fare && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Kindly enter the fare</Alert>)}
                        <StyledDiv>
                            <div>
                                <label>Ladies Seat</label>
                                <Controller
                                    name={`seats[${item}].ladies_seat`}
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <FormControlLabel
                                            control={<Switch value={value} onChange={onChange} />}
                                        />

                                    )}
                                />
                            </div>
                            <div>
                                <label>Available</label>
                                <Controller
                                    name={`seats[${item}].is_available`}
                                    control={control}
                                    render={({ field: { value, onChange } }) => (
                                        <FormControlLabel
                                            control={<Switch value={value} onChange={onChange} />}
                                        />
                                    )}
                                />
                            </div>

                        </StyledDiv>
                        <div style={{'width': '100%', 'display':'flex'}}>

                            <label style={{'margin-right': '10px'}} >Apply this fare to all the seats</label>
                            {/* <LoadingButton
                                size="small"
                                onClick={handleClick}
                                loading={loading}
                                loadingPosition="end"
                                variant="contained"
                            >
                                Apply
                            </LoadingButton> */}
                            <Button variant="contained" onClick={() => handleClick}>Apply</Button>

                        </div>
                        <Button variant="contained" onClick={() => handleApply(item)}>
                            Save
                        </Button>
                        <Button variant="contained" onClick={() => closeDialog()}>
                            Close
                        </Button>


                    </Box>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </StyledDialog>)

}

export default SeatDialog;