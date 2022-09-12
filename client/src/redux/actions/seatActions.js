import * as API from '../../api';
import { ActionTypes } from '../constants/actionTypes';
import { getDates } from '../../helpers/auth';



export const seatType = (type) => async (dispatch) => {
    try {
        const response = await API.authAxiosPrivate.get(`/ticket/bus/${type}`);
        if (response) {
            dispatch({ type: ActionTypes.SEAT_TYPE, payload: response.data.data })
        }
    } catch (error) {
        if(error.response){
            dispatch({ type: ActionTypes.SET_ERROR, payload: { hasError: true, message: error.response.data.message } })
        }
    }

}

export const applyFareActions = (item) => async (dispatch) => {
    const { applyFare, ...obj } = item;
    try {
        if (applyFare) {
            dispatch({ type: ActionTypes.APPLY_FARE_ALL, payload: obj })
        } else {
            dispatch({ type: ActionTypes.APPLY_FARE, payload: obj })
        }
    } catch (error) {
        if(error.response){
            dispatch({ type: ActionTypes.SET_ERROR, payload: { hasError: true, message: error.response.data.message } })
        }
    }

}

export const createRoute = (data) => async (dispatch) => {

    const { starting_point, destination_point, departure_date, arrival_date } = data;
    try {
        const addRoute = await API.authAxiosPrivate.post('/schedule/chart', { starting_point, destination_point, departure_date, arrival_date })
        if (addRoute) {
            dispatch({ type: ActionTypes.CREATE_ROUTE, payload: addRoute.data.message })
        }
    } catch (error) {
        if(error.response) {
            dispatch({ type: ActionTypes.SET_ERROR, payload: { hasError: true, message: error.response.data.message } })
        }
    }
}

export const saveStop = (data, id, flag) => async(dispatch)=>{
    data.flag = flag;
    let action = (flag === 'boarding') ? ActionTypes.CREATE_BOARDING : ActionTypes.CREATE_DROPPING ; 
    try {
        const save = await API.authAxiosPrivate.post(`/schedule/stop/${id}`, data);
        if(save){
            dispatch({type: action, payload: save.data})
        }
    } catch (error) {
        if(error.response) {
            dispatch({ type: ActionTypes.SET_ERROR, payload: { hasError: true, message: error.response.data.message } })
        }
    }
}

export const editStop = (data, id, obj_id, flag) => async(dispatch)=>{
    try {
       data.flag = flag;
       data.id = obj_id;
       let action = (flag === 'boarding') ? ActionTypes.EDIT_BOARDING : ActionTypes.EDIT_DROPPING ;
       const edit = await API.authAxiosPrivate.put(`/schedule/edit/${id}`, data);
       if(edit){
        dispatch({type: action, payload: edit.data.result})
       }
    } catch (error) {
        if(error.response) {
            dispatch({ type: ActionTypes.SET_ERROR, payload: { hasError: true, message: error.response.data.message } })
        }
    }
}

export const createStoppings = (data, id) => async (dispatch) => {
    const { boardings, droppings } = data;
    try {
        let boarding_point = [];
        let dropping_point = [];
        boardings.map((boarding) => {
            let { arrival_time, ...obj } = boarding;
            obj.pincode = parseInt(obj.pincode)
            boarding_point.push({ cities: obj, arrival_time })
        })
        droppings.map((dropping) => {
            let { arrival_time, ...obj } = dropping;
            obj.pincode = parseInt(obj.pincode)
            dropping_point.push({ cities: obj, arrival_time })
        })
        const addStopping = await API.authAxiosPrivate.post(`/schedule/chart/${id}`, { boarding_point, dropping_point })
        if (addStopping) {
            dispatch({ type: ActionTypes.CREATE_STOPPINGS, payload: addStopping.data.message })
        }
    } catch (error) {
        if(error.response){
            dispatch({ type: ActionTypes.SET_ERROR, payload: { hasError: true, message: error.response.data.message } })
        }
    }

}

export const createSeats = (data, id) => async (dispatch) => {
    const { seats } = data;
    try {
        seats.map((seat) => {
            seat.booking_status = 'Available'
        })
        const addSeats = await API.authAxiosPrivate.post(`/schedule/seat/${id}`, { seats })
        if (addSeats) {
            dispatch({ type: ActionTypes.ADD_SEATS, payload: addSeats.data.message })
        }
    } catch (error) {
        if(error.response){
            dispatch({ type: ActionTypes.SET_ERROR, payload: { hasError: true, message: error.response.data.message } })
        }
    }

}

export const getItems = (page)=> async(dispatch)=>{
    try {
        const getSeat = await API.authAxiosPrivate.get(`/schedule/items?page=${page}`)
        if(getSeat){
            dispatch({type: ActionTypes.GET_ITEMS, payload: getSeat.data})
        }
    } catch (error) {
        if(error.response){
            dispatch({type:ActionTypes.SET_ERROR, payload: {hasError:true, message: error.response.data.message}})
        }
    }
}

export const applyFilter = (filter)=> async(dispatch)=>{
    try {
        let { boarding, dropping, value, ...rest} = filter;
        let board =  encodeURIComponent(JSON.stringify(boarding.filter((items) => items.name !== '')))
        let drop = encodeURIComponent(JSON.stringify(dropping.filter((items) => items.name !== '')))
        let from_date, to_date;
        if(getDates(value).length){
            if(getDates(value).every((val, i, arr)=> val === arr[0])){
                from_date = getDates(value)[0] 
            }else{
                from_date = getDates(value)[0];
                to_date = (getDates(value)[1]) ? getDates(value)[1] : 0; 
            }
        }
        
        const getItems_1 = await API.authAxiosPrivate.get(`/schedule/filter?board=${board}&drop=${drop}&from_date=${from_date}&to_date=${to_date}`)

    } catch (error) {
        
    }
}