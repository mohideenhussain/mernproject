import { combineReducers } from "redux";
import { authReducer } from '../reducers/authReducer';
import { redirectReducer } from '../reducers/redirectReducer';
import { seatReducer } from "./seatReducers";

const reducers = combineReducers({
    authReducer: authReducer,
    redirectReducer: redirectReducer,
    seatReducer: seatReducer
})

export default reducers;