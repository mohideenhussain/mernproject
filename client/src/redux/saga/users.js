import * as API from '../../api';
import { call, put, take } from 'redux-saga/effects';
import { ActionTypes } from '../constants/actionTypes';

function* fetchUsers (){
    try {
        const users = yield call(API.authAxiosPrivate.get('/ticket/users'));
        yield put({ type: ActionTypes.GET_USERS, payload: users })
    } catch (error) {
        yield put ({type: ActionTypes.SET_ERROR, payload: error.message})
    }
}

function* usersSaga(){
    yield take(fetchUsers)
}

export default usersSaga;

