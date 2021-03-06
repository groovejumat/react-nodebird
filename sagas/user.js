import axios from 'axios';
import { delay, put, takeLatest, all, fork } from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,

    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
} from '../reducers/user'


function LoginAPI() {
    return axios.post('/api/Login')
}

function* logIn(action) {
    try {
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data : action.data
        });
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
    }
}

function LogOutAPI() {
    return axios.post('/api/LogOut')
}

function* logOut() {
    try {
        yield delay(1000);
        yield put({
            type: LOG_OUT_SUCCESS,
            data : result.data
        });
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }
}


function signUpAPI() {
    return axios.post('/api/LogOut')
}

function* signUp() {
    try {
        // const result = yield call(signUpAPI)
        yield delay(1000);
        // 에러 발생시에 대한 처리
        // throw new Error('')
        yield put({
            type: SIGN_UP_SUCCESS,
            data : result.data
        });
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}


function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}


export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}