import { ActionTypes } from "../constants/actionTypes";

const initialState ={
    seatChart: {
        boarding_point: [],
        dropping_point: []
    },
    seatType: [],
    error: {
        hasError: false,
        message: null
    },
    items: null,
    itemsCount: 0
}

export const seatReducer = (state = initialState, {type, payload})=>{
    switch(type){
        case ActionTypes.SEAT_TYPE: 
            return {...state, seatType: payload }
        case ActionTypes.APPLY_FARE:
            return {...state, seatChart: {...state.seatChart, seats:state.seatChart.seats.map((seat)=> (seat.seat_id === payload.seat_id) ? payload : seat)}}
        case ActionTypes.APPLY_FARE_ALL:
            return {...state, seatChart: {...state.seatChart, seats:state.seatChart.seats.map((seat)=> (seat.seat_id === payload.seat_id) ? payload :({...seat, fare:payload.fare}))}}    
        case ActionTypes.CREATE_ROUTE:
            return {...state, seatChart: {...state.seatChart, _id: payload._id, starting_point:payload.starting_point, destination_point:payload.destination_point, departure_date:payload.departure_date, arrival_date:payload.arrival_date}}
        case ActionTypes.CREATE_STOPPINGS:
            return {...state, seatChart: {...state.seatChart, dropping_point: payload.dropping_point, boarding_point: payload.boarding_point }}    
        case ActionTypes.ADD_SEATS:
            return {...state, seatChart: {...state.seatChart, seats: payload.seats}} 
        case ActionTypes.SET_ERROR:
            return {...state, error: {...state.error, hasError: payload.hasError, message: payload.message}} 
        case ActionTypes.GET_ITEMS:
            return {...state, items:payload.items, itemsCount: payload.count}
        case ActionTypes.CREATE_BOARDING:
            console.log(state.seatChart)
            return {...state, seatChart: { ...state.seatChart, boarding_point: [...state.seatChart.boarding_point, payload.result] }}  
        case ActionTypes.CREATE_DROPPING:
            return {...state, seatChart: { ...state.seatChart, boarding_point: [...state.seatChart.dropping_point, payload.result] }}
        case ActionTypes.EDIT_BOARDING:
            return {...state, seatChart: { ...state.seatChart, boarding_point: state.seatChart.boarding_point.map((item)=> (item._id === payload.result._id) ? payload.result : item)}}
        case ActionTypes.EDIT_DROPPING:
            return {...state, seatChart: { ...state.seatChart, dropping_point: state.seatChart.dropping_point.map((item)=> (item._id === payload.result._id) ? payload.result : item)}}                       
        default: return state;    
    }
}
