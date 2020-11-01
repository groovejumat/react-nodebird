import axios from 'axios';
import { delay, put, takeLatest, all, fork } from '/redux-saga/effects'; 


function* watchLogin() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogout() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}

export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}

function LoginAPI() {
    return axios.post('/api/Login')
}

function* logIn(action) {
    try {
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data : action.data
        });
    } catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        })
    }
}

function LogOutAPI() {
    return axios.post('/api/LogOut')
}

function* logOut(action) {
    try {
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data : result.data
        });
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        })
    }
}