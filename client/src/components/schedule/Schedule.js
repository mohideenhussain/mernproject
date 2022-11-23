import React, { useState, useEffect, useReducer } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, applyFilter } from '../../redux/actions/seatActions';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


import ClickAwayListener from '@mui/base/ClickAwayListener';

import Fade from '@mui/material/Fade';
import Popper from "@mui/material/Popper";
import Dialog from '@mui/material/Dialog';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Checkbox from '@mui/material/Checkbox';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Schedule = () => {


    const handleChange = (boarding, payload) => {
        let newArray = [...boarding];
        newArray[payload.ref][payload.name] = payload.item;
        return newArray;
    }


    let reducer = (state, action) => {
        switch (action.type) {
            case 'OPEN_DIALOG':
                return { ...state, open: true, anchorEl: action.payload }
            case 'CLOSE_DIALOG':
                return { ...state, open: action.payload }
            case 'HANDLE_CHANGE':
                return { ...state, checked: action.payload.dom, expanded: ((action.payload.isExpanded) ? action.payload.label : false) }
            case 'HANDLE_CHANGE_POINT':
                return { ...state, checkedRange: action.payload.dom, expanded: ((action.payload.isExpanded) ? action.payload.label : false) }
            case 'HANDLE_DATE':
                return { ...state, value: action.payload }
            case 'ADD_FIELD_BOARD':
                return { ...state, boarding: [...state.boarding, { name: '' }] }
            case 'ADD_FIELD_DROP':
                return { ...state, dropping: [...state.dropping, { name: '' }] }
            case 'DELETE_FIELD_BOARD':
                return { ...state, boarding: state.boarding.filter((board, index) => index !== action.payload) }
            case 'DELETE_FIELD_DROP':
                return { ...state, dropping: state.dropping.filter((drop, index) => index !== action.payload) }
            case 'UPDATE_BOARDING':
                return { ...state, boarding: handleChange(state.boarding, action.payload) }
            case 'UPDATE_DROPPING':
                return { ...state, dropping: handleChange(state.dropping, action.payload) }
            default:
                return state
        }

    }

    const selector = useSelector((state) => state.seatReducer.items);
    const selectorCount = useSelector((state) => state.seatReducer.itemsCount);
    const dispatch = useDispatch();
    const [schedule, setSchedule] = useState(null);
    const [count, setCount] = useState(0)

    const [state, dispatchReducer] = useReducer(reducer, { open: false, value: [null, null], anchorEl: null, expanded: false, checked: false, checkedRange: false, boarding: [{ name: '' }], dropping: [{ name: '' }] })

    const id = state.open ? 'simple-popper' : undefined;

    useEffect(() => {
        let mount = true;
        if (mount) {
            if (selector) {
                setSchedule(selector)
                setCount(parseInt(selectorCount/5))
            } else {
                dispatch(getItems(1))
                setSchedule(selector)
                setCount(parseInt(selectorCount/5))
            }
        }
        return () => {
            mount = false;
        }
    }, [selector, selectorCount])


    
    const handlePage = (e,p)=>{
        dispatch(getItems(p))
    }

    const submitHandle = (e)=>{
        e.preventDefault();
        dispatch(applyFilter(state))
       
    }



    return (
        <Box>
            <div style={{ display: 'flex', paddingBottom: '10px' }}>
                <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 700 }}
                >

                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search Google Maps"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />
                    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>

                </Paper>
                <div style={{ paddingLeft: '10px' }}>
                    <Button aria-describedby={id} variant="outlined" onClick={(e) => dispatchReducer({ type: 'OPEN_DIALOG', payload: e.currentTarget })}>
                        <FilterListIcon />
                        Filters
                    </Button>
                    <Dialog open={state.open} sx={{ zIndex: 0 }}>
                        <Popper
                            placement='bottom'
                            modifiers={[
                                {
                                    name: 'flip',
                                    enabled: false
                                },
                                {
                                    name: 'preventOverflow',
                                    options: {
                                        mainAxis: false, // true by default
                                    }
                                }

                            ]}
                            anchorEl={state.anchorEl}
                            id={id}
                            open={state.open}
                            transition


                        >
                            {({ TransitionProps }) => (
                                <ClickAwayListener onClickAway={() => dispatchReducer({ type: 'CLOSE_DIALOG', payload: false })}>
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Paper>
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                                onSubmit = {submitHandle}
                                            >
                                                <div>
                                                    <Checkbox
                                                        checked={state.checkedRange}
                                                        onChange={(e, isExpanded) => dispatchReducer({ type: 'HANDLE_CHANGE_POINT', payload: { label: 'panel2', dom: e.target.checked, isExpanded: isExpanded } })}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                    <label>Set Boarding & Dropping Point</label>
                                                    <Accordion expanded={state.expanded === 'panel2'} >
                                                        <AccordionSummary
                                                            aria-controls="panel2bh-content"
                                                            id="panel2bh-header"
                                                        >
                                                        </AccordionSummary>
                                                        <AccordionDetails>

                                                            <div>
                                                                {
                                                                    state.boarding && state.boarding.map((board, index) => (
                                                                        <div key={index}>
                                                                            <TextField
                                                                                label="Boarding Point"
                                                                                id="outlined-size-small"
                                                                                size="small"
                                                                                name="name"
                                                                                value={board.name}
                                                                                onChange={(e) => dispatchReducer({ type: 'UPDATE_BOARDING', payload: { ref: index, name: e.target.name, item: e.target.value } })}
                                                                            />
                                                                            <AddCircleRoundedIcon onClick={() => dispatchReducer({ type: 'ADD_FIELD_BOARD' })} />
                                                                            <RemoveCircleOutlineRoundedIcon onClick={() => dispatchReducer({ type: 'DELETE_FIELD_BOARD', payload: index })} />

                                                                        </div>
                                                                    ))
                                                                }
                                                                {
                                                                    state.dropping && state.dropping.map((drop, index) => (
                                                                        <div key={index}>
                                                                            <TextField
                                                                                label="Dropping Point"
                                                                                id="outlined-size-small"
                                                                                size="small"
                                                                                type="text"
                                                                                name="name"
                                                                                value={drop.name}
                                                                                onChange={(e) => dispatchReducer({ type: 'UPDATE_DROPPING', payload: { ref: index, name: e.target.name, item: e.target.value } })}
                                                                            />
                                                                            <AddCircleRoundedIcon onClick={() => dispatchReducer({ type: 'ADD_FIELD_DROP' })} />
                                                                            <RemoveCircleOutlineRoundedIcon onClick={() => dispatchReducer({ type: 'DELETE_FIELD_DROP', payload: index })} />

                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>

                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                                <div>
                                                    <Checkbox
                                                        checked={state.checked}
                                                        //onChange={handleChange('panel1')}
                                                        onChange={(e, isExpanded) => dispatchReducer({ type: 'HANDLE_CHANGE', payload: { label: 'panel1', dom: e.target.checked, isExpanded: isExpanded } })}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                    <label>Date Range</label>
                                                    <Accordion expanded={state.expanded === 'panel1'} >
                                                        <AccordionSummary
                                                            aria-controls="panel1bh-content"
                                                            id="panel1bh-header"
                                                        >
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                                <StaticDateRangePicker
                                                                    displayStaticWrapperAs="desktop"
                                                                    value={state.value}
                                                                    onChange={(newValue) => {
                                                                        dispatchReducer({ type: 'HANDLE_DATE', payload: newValue })
                                                                    }}
                                                                    renderInput={(startProps, endProps) => (
                                                                        <React.Fragment>
                                                                            <TextField {...startProps} />
                                                                            <Box sx={{ mx: 2 }}> to </Box>
                                                                            <TextField {...endProps} />
                                                                        </React.Fragment>
                                                                    )}
                                                                />
                                                            </LocalizationProvider>

                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                                <div style={{ alignItems: 'left'}}>
                                                    <Button type='submit' variant="outlined">Apply</Button>
                                                </div>

                                            </Box>
                                        </Paper>
                                    </Fade>
                                </ClickAwayListener>
                            )}
                        </Popper>
                    </Dialog>
                </div>
            </div>
            {
                (schedule && schedule.map((card) => (
                    <Card key={card._id} variant="outlined">
                        <CardContent>
                            <Typography>
                                {card.starting_point}
                            </Typography>
                            <Typography>
                                {card.destination_point}
                            </Typography>
                            <Typography>
                                {card.departure_date}
                            </Typography>
                            <Typography>
                                {card.arrival_date}
                            </Typography>
                        </CardContent>
                    </Card>
                )))
            }
            
            <Stack spacing={2} sx={{ alignItems: 'center', margin: '15px'}}>
                <Pagination count={count} variant="outlined" shape="rounded" onChange={handlePage}/>
            </Stack>
            
        </Box>
    )
}
export default Schedule;