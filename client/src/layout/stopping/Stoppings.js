import React, { useEffect, useState } from "react";
import { useFieldArray, Controller, useFormContext } from "react-hook-form";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from "react-redux";
import { saveStop, editStop } from "../../redux/actions/seatActions";

const SubHeader = styled('div')`
width:100%;
display:flex;
`

const ItemHeaderAccord = styled('div')`
width: 50%;
display:inline-block;
`
const Header = styled('div')`
width:100%;
display:flex;
`

const Stoppings = () => {

    const selector = useSelector((state) => state.seatReducer.seatChart);
    const dispatch = useDispatch();

    const { register, control, setError, clearErrors, watch, formState: { errors } } = useFormContext();

    const { fields: boardingField, append: boardingAppend } = useFieldArray(
        {
            control,
            name: 'boardings'
        }
    )
    const { fields: droppingField, append: droppingAppend } = useFieldArray(
        {
            control,
            name: 'droppings'
        }
    )

    const watchFields = watch(['boardings', 'droppings'])

    const [enableBoardings, setEnableBoardings] = React.useState(watchFields[0])
    const [enableDroppings, setEnableDroppings] = React.useState(watchFields[1])

    React.useEffect(()=>{
        console.log(selector)
    },[selector])

    React.useEffect(() => {
        let mountedBoard = true;
        if (enableBoardings.length && mountedBoard) {
            setEnableBoardings(prevState => {
                prevState.map((boarding)=>{
                    Object.values(boarding).every(value=>{
                        if (value === null || value === undefined || value === '') {
                            boarding.type = 'add'
                        }else{
                            boarding.type = 'edit'
                        }
                    })
                })
                return [...prevState];
            })
        }

        return ()=>{
            
            mountedBoard = false;
        }

    },[])

    useEffect(()=>{
        let mountedDrop = true
        if (enableDroppings.length && mountedDrop) {
            setEnableDroppings(prevState => {
                prevState.map((dropping)=>{
                    Object.values(dropping).every(value=>{
                        if (value === null || value === undefined || value === '') {
                            dropping.type = 'add'
                        }else{
                            dropping.type = 'edit'
                        }
                    })
                })
                return [...prevState];
            })
        }
        return ()=>{
            mountedDrop = false
        }
    },[])
    const [expanded, setExpanded] = React.useState(0);
    const [expandedDrop, setExpandedDrop] = React.useState(0);


    const handleChange = (panel, type) => (event, isExpanded) => {
        if (type === 'dropping') {
            setExpandedDrop(isExpanded ? panel : false)
        } else {
            setExpanded(isExpanded ? panel : false);
        }

    };
    const removeField = (index) => {

    }


    const addField = (index, value) => {
        for (const key of Object.keys(watchFields[0][index])) {
            if (watchFields[0][index][key] === null || watchFields[0][index][key] === '') {
                setError(`boardings[${index}][${key}]`, { type: "focus" }, { shouldFocus: true })
            }else{
                clearErrors(`boardings[${index}][${key}]`)
            }
        }
       
        if (value === 'add') {
            if (!errors?.boardings && (!errors?.boardings?.[index])) {
                dispatch(saveStop(watchFields[0][index], selector?._id, 'boarding'))
                setEnableBoardings(prevState=>{
                    prevState[index].type = 'edit';
                    return [...prevState]
                })
                
                boardingAppend({
                    name: '',
                    address: '',
                    district: '',
                    pincode: '',
                    landmark: '',
                    arrival_time: null
                })
                
                setExpanded(expanded + 1)
                const newState = [...enableBoardings, {
                    name: '',
                    address: '',
                    district: '',
                    pincode: '',
                    landmark: '',
                    arrival_time: null,
                    type: 'add'
                }]
                setEnableBoardings(newState)
                
            }

        }else{
            if (!errors?.boardings && (!errors?.boardings?.[index])) {
                let get_id = selector.boarding_point.find((card, card_index)=> card_index === index);
                console.log(get_id)
                if(get_id){
                    dispatch(editStop(watchFields[0][index], selector?._id, get_id?._id, 'boarding'))  
                }
            }
        }
    }
    const addField_drop = (index, value) => {
        for (const key of Object.keys(watchFields[1][index])) {
            if (watchFields[1][index][key] === null || watchFields[1][index][key] === '') {
                setError(`droppings[${index}][${key}]`, { type: "focus" }, { shouldFocus: true })
            }
        }
        if(value === 'add'){
            if (!errors?.droppings && (!errors?.droppings?.[index])) {
                dispatch(saveStop(watchFields[1][index], selector?._id, 'dropping'))
                setEnableDroppings(prevState=>{
                    prevState[index].type = 'edit';
                    return [...prevState]
                })
                setExpandedDrop(expandedDrop + 1)
                const newStateDrop = [...enableDroppings, {
                    name: '',
                    address: '',
                    district: '',
                    pincode: '',
                    landmark: '',
                    arrival_time: null,
                    type: 'add'
                }]
                setEnableDroppings(newStateDrop)
                droppingAppend({
                    name: '',
                    address: '',
                    district: '',
                    pincode: '',
                    landmark: '',
                    arrival_time: null
                })
            }
        }else {
            if (!errors?.droppings && (!errors?.droppings?.[index])) {
                let get_id = selector.dropping_point.find((card, card_index)=> card_index === index);
                console.log(get_id)
                if(get_id){
                    dispatch(editStop(watchFields[1][index], selector?._id, get_id?._id, 'dropping'))  
                }
               // dispatch(editStop(watchFields[0][index], selector?._id, get_id?._id, 'dropping'))
            }
        }
    
    }


    return (
        <div>
            <SubHeader>
                <Header>
                    <Box sx={{ width: '100%' }}>
                        <Chip sx={{ m: 0, p: 2, width: '100%', fontSize: '1rem' }} label="BOARDING POINT" color="primary" />
                        <div>
                            {
                                boardingField.map((boarding, index) => {
                                    return (
                                        <Accordion expanded={expanded === index} onChange={handleChange(index, 'boarding')} key={boarding.id}>
                                            <AccordionSummary
                                                sx={{ marginLeft: '15px', marginRight: '15px' }}
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                {
                                                    watchFields[0][index] && (<Typography sx={{ width: '33%', flexShrink: 0 }}>{watchFields[0][index].district}</Typography>)
                                                }
                                                {
                                                    watchFields[0][index] && (<Typography sx={{ color: 'text.secondary' }}>{watchFields[0][index].name}</Typography>)
                                                }


                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <ItemHeaderAccord>
                                                    <TextField
                                                        sx={{ p: 1, width: '100%' }}
                                                        id='outlined-required'
                                                        label='Name'
                                                        control={control}
                                                        {...register(`boardings[${index}].name`, {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.boardings?.[index]?.name && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Name is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <ItemHeaderAccord>
                                                    <TextField
                                                        sx={{ p: 1, width: '100%' }}
                                                        id='outlined-required'
                                                        label='District'
                                                        control={control}
                                                        {...register(`boardings[${index}].district`, {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.boardings?.[index]?.district && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">District is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <ItemHeaderAccord>
                                                    <TextField
                                                        sx={{ p: 1, width: '100%' }}
                                                        id='outlined-required'
                                                        label='Pincode'
                                                        control={control}
                                                        {...register(`boardings[${index}].pincode`, {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.boardings?.[index]?.pincode && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Pincode is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <ItemHeaderAccord>
                                                    <TextField
                                                        sx={{ p: 1, width: '100%' }}
                                                        id='outlined-required'
                                                        label='landmark'
                                                        control={control}
                                                        {...register(`boardings[${index}].landmark`, {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.boardings?.[index]?.landmark && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Landmark is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <ItemHeaderAccord>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <Controller
                                                            control={control}
                                                            name={`boardings[${index}].arrival_time`}
                                                            render={({ field }) => (
                                                                <DateTimePicker
                                                                    label="Arrival Date"
                                                                    renderInput={(props) => <TextField sx={{ p: 1, width: '100%' }} {...register(`boardings[${index}].arrival_time`, { required: true })} {...props} />}
                                                                    onChange={(e) => { field.onChange(e) }}
                                                                    value={field.value}
                                                                />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                    {errors.boardings?.[index]?.arrival_time && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Arrival Time is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <ItemHeaderAccord>
                                                    <TextField
                                                        sx={{ p: 1, width: '100%' }}
                                                        id="outlined-multiline-static"
                                                        label="Address"
                                                        multiline
                                                        control={control}
                                                        rows={4}
                                                        {...register(`boardings[${index}].address`, {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.boardings?.[index]?.address && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Address is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <div style={{ 'width': '100%', 'text-align': 'center' }}>
                                                    {(enableBoardings?.[index]?.type === 'add') && (<Button sx={{ mr: 1 }} variant="contained" onClick={() => addField(index, 'add')} >Add</Button>)}
                                                    {(enableBoardings?.[index]?.type === 'edit') && <Button sx={{ mr: 1 }} variant="contained" onClick={() => addField(index, 'edit')}>Save</Button>}
                                                    <Button variant="contained" onClick={() => removeField(index)}>Remove</Button>

                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })
                            }
                        </div>
                    </Box>
                </Header>
                <Header>
                    <Box sx={{ width: '100%' }}>
                        <Chip sx={{ m: 0, p: 2, width: '100%', fontSize: '1rem' }} label="DROPPING POINT" color="primary" />
                        <div>
                            {
                                droppingField.map((dropping, index) => {
                                    return (

                                        <Accordion expandedDrop={expandedDrop === index} onChange={handleChange(index, 'dropping')} key={dropping.id}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                            >
                                                {
                                                    watchFields[1][index] && (<Typography sx={{ width: '75%', flexShrink: 0 }}>{watchFields[1][index].district}</Typography>)
                                                }
                                                {
                                                    watchFields[1][index] && (<Typography sx={{ color: 'text.secondary' }}>{watchFields[1][index].name}</Typography>)
                                                }
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <ItemHeaderAccord>
                                                    <TextField
                                                        sx={{ p: 1, width: '100%' }}
                                                        id='outlined-required'
                                                        label='Name'
                                                        control={control}
                                                        {...register(`droppings[${index}].name`, {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.droppings?.[index]?.name && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Name is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <ItemHeaderAccord>
                                                    <TextField
                                                        sx={{ p: 1, width: '100%' }}
                                                        id='outlined-required'
                                                        label='District'
                                                        control={control}
                                                        {...register(`droppings[${index}].district`, {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.droppings?.[index]?.district && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">District is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <ItemHeaderAccord>
                                                    <TextField
                                                        sx={{ p: 1, width: '100%' }}
                                                        id='outlined-required'
                                                        label='Pincode'
                                                        control={control}
                                                        {...register(`droppings[${index}].pincode`, {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.droppings?.[index]?.pincode && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Pincode is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <ItemHeaderAccord>
                                                    <TextField
                                                        sx={{ p: 1, width: '100%' }}
                                                        id='outlined-required'
                                                        label='landmark'
                                                        control={control}
                                                        {...register(`droppings[${index}].landmark`, {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.droppings?.[index]?.landmark && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Landmark is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <ItemHeaderAccord>
                                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                        <Controller
                                                            control={control}
                                                            name={`droppings[${index}].arrival_time`}
                                                            render={({ field }) => (
                                                                <DateTimePicker
                                                                    label="Arrival Date"
                                                                    renderInput={(props) => <TextField sx={{ p: 1, width: '100%' }} {...register(`droppings[${index}].arrival_time`, { required: true })} {...props} />}
                                                                    onChange={(e) => { field.onChange(e) }}
                                                                    value={field.value}
                                                                />
                                                            )}
                                                        />
                                                    </LocalizationProvider>
                                                    {errors.droppings?.[index]?.arrival_time && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Arrival Time is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <ItemHeaderAccord>
                                                    <TextField
                                                        sx={{ p: 1, width: '100%' }}
                                                        id="outlined-multiline-static"
                                                        label="Address"
                                                        multiline
                                                        control={control}
                                                        rows={4}
                                                        {...register(`droppings[${index}].address`, {
                                                            required: true
                                                        })}
                                                    />
                                                    {errors.droppings?.[index]?.address && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Address is required</Alert>)}
                                                </ItemHeaderAccord>
                                                <div style={{ 'width': '100%', 'text-align': 'center' }}>
                                                {(enableDroppings?.[index]?.type === 'add') && (<Button sx={{ mr: 1 }} variant="contained" onClick={() => addField_drop(index, 'add')} >Add</Button>)}
                                                    {(enableDroppings?.[index]?.type === 'edit') && <Button sx={{ mr: 1 }} variant="contained" onClick={() => addField_drop(index, 'edit')}>Save</Button>}
                                                    <Button variant="contained" onClick={() => removeField(index)} >Remove</Button>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>

                                    )
                                })
                            }
                        </div>

                    </Box>
                </Header>
            </SubHeader>
        </div>
    )
}

export default Stoppings;