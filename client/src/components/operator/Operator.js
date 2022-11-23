import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Alert from '@mui/material/Alert';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const ItemHeader = styled('div')`
width: 25%;
`
const ItemHeaderFields = styled('div')`
width: 50%;
display:inline-flex;
`
const Header = styled('div')`
width:100%;
display:flex;
`
const SubHeader = styled('div')`
width:100%;
display:flex;
`




const Operator = () => {

    const { register, control, handleSubmit, reset, formState: { errors, isDirty, dirtyFields, isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            starting_point: '',
            destination_point: '',
            departure_date: null,
            arrival_date: null,
            boardings: [{
                name: '',
                address: '',
                district: '',
                postal: '',
                landmark: '',
                arrival_time: null
            }],
            droppings: [{
                name: '',
                address: '',
                district: '',
                postal: '',
                landmark: '',
                arrival_time: null
            }]
        }
    });
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

    const [boardings, setBoardings] = useState([{
        name: '',
        address: '',
        district: '',
        postal: '',
        landmark: '',
        arrival_date: null
    }])
    const [droppings, setdroppings] = useState({
        name: '',
        address: '',
        district: '',
        postal: '',
        landmark: '',
        arrival_date: null
    })

    const [inputField, setInputField] = useState(
        {
            starting_point: '',
            destination_point: '',
            boarding_point: [
                {
                    boarding_name: '',
                    boarding_address: '',
                    boarding_district: '',
                    boarding_postal: '',
                    boarding_landmark: '',
                    boarding_arrival_date: null
                }
            ],
            dropping_point: [
                {
                    dropping_name: '',
                    dropping_address: '',
                    dropping_district: '',
                    dropping_postal: '',
                    dropping_landmark: '',
                    dropping_arrival_date: null
                }
            ],
            departure_date: null,
            arrival_date: null,
        }
    );

    const addField = (index) => {
        setExpanded(expanded+1)
        boardingAppend({
            name: '',
            address: '',
            district: '',
            postal: '',
            landmark: '',
            arrival_date: null
        })
    }


    // const handleAdd = () => {
    //     let updatedList = { ...inputField };
    //     updatedList.boarding_point.push(boarding)
    //     setInputField(updatedList);
    //     reset(boarding)
    //     console.log(boarding)
    // }
    // const handleAddDropping = () => {
    //     let updatedList = { ...inputField };
    //     updatedList.dropping_point.push(dropping)
    //     setInputField(updatedList);
    //     reset(dropping)
    //     console.log(dropping)
    // }

    const handleInputChange = (e, index, type) => {
        const { name, value } = e.target;
        let updateField = { ...inputField };
        updateField[type][index][name] = value;
        setInputField(updateField);
    }

    const handleDateChange = (value, index, type) => {
        let updateDate = { ...inputField };
        updateDate.stoppings[index][type] = value;
        setInputField(updateDate);
    }

    const removeItem = (i) => {
        inputField.stoppings.splice(i, 1)
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    const [expanded, setExpanded] = React.useState(0);
    const [expandedDrop, setExpandedDrop] = React.useState(0);

    const handleChange = (panel, type) => (event, isExpanded) => {
        if(type === 'dropping'){
            setExpandedDrop(isExpanded ? panel : false)
        }else{
            setExpanded(isExpanded ? panel : false);
        }
        
    };
    const removeField =(index)=>{
    }


    return (



        <div className="Operator" data-test-id= "operator-form">
            <Header>
                <Chip sx={{ m: 2, p: 3, width: '100%', fontSize: '1.2rem' }} label="ROUTE DETAILS" color="primary" />
            </Header>
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
            >
                <Header>
                    <ItemHeader>
                        <TextField
                            sx={{ p: 1, width: '100%' }}
                            id='outlined-required'
                            label='Starting Point'
                            {...register('starting_point', {
                                onChange: (e) => setInputField({ ...inputField, starting_point: e.target.value }),
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
                                onChange: (e) => setInputField({ ...inputField, destination_point: e.target.value }),
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
                                        defaultValue={inputField.departure_date}
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
                                        renderInput={(props) => <TextField {...register('arrival_date', { required: true })} sx={{ p: 1, width: '100%' }} {...props} />}
                                        onChange={(e) => { field.onChange(e) }}
                                        value={field.value}
                                        defaultValue={inputField.arrival_date}
                                    />
                                )}
                            />
                        </LocalizationProvider>
                        {errors.arrival_date?.type === 'required' && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Arrival Date is required</Alert>)}
                    </ItemHeader>
                </Header>
                <SubHeader>
                    <Header>
                        <Box sx={{ width: '100%' }}>
                            <Chip sx={{ m: 1, p: 2, width: '95%', fontSize: '1rem' }} label="BOARDING POINT" color="primary" />
                            <div>
                                {
                                    boardingField.map((boarding, index) => {
                                        return (
                                            <Accordion expanded={expanded === index} onChange={handleChange(index, 'boarding')} key={boarding.id}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1bh-content"
                                                    id="panel1bh-header"
                                                >
                                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
    
                                                    </Typography>
                                                    <Typography sx={{ color: 'text.secondary' }}>{boardings?.[index]?.address}</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <div>
                                                        <Button disabled variant="contained" onClick={() => addField(index)} >Add</Button>
                                                        <Button variant="contained" onClick={()=> removeField(index)}>Remove</Button>
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
                            <Chip sx={{ m: 1, p: 2, width: '95%', fontSize: '1rem' }} label="DROPPING POINT" color="primary" />
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
                                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                        General settings
                                                    </Typography>
                                                    <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <ItemHeaderFields>
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
                                                    </ItemHeaderFields>
                                                    <ItemHeaderFields>
                                                        <TextField
                                                            sx={{ p: 1, width: '100%' }}
                                                            id="outlined-multiline-static"
                                                            label="Address"
                                                            multiline
                                                            control={control}
                                                            rows={4}
                                                            {...register(`dropping[${index}].address`, {
                                                                required: true
                                                            })}
                                                        />
                                                        {errors.droppings?.[index]?.address && (<Alert sx={{ p: 1, mr: 1, ml: 1 }} severity="error">Address is required</Alert>)}
                                                    </ItemHeaderFields>
                                                    <div>
                                                        <Button variant="contained"  >Add</Button>
                                                        <Button variant="contained" >Clear</Button>
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

                <Button variant="contained" type='submit'>Submit</Button>
            </Box>

        </div>

    );
}

export default Operator;