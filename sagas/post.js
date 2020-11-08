import axios from 'axios';
import { delay, put, takeLatest, all, fork } from 'redux-saga/effects';

import {
    ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST,
    ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST,  
} from '../reducers/post'

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}

function addPostAPI(data) {
    return axios.post('/api/post', data)
}

/* 실제로 로그인을 보낸 api콜의 결과값을 반환 받는다 */
function* addPost(action) {
    try {
        /*yield call을 하여 로그인 api를 실행 한 뒤에, 리턴해주는 값을 result에 받아온다 yeild에서 put을 dispatch(redux에서 데이터를 패치해주는 거)와 유사한 경우라고 생각하면 된다
        call과 fork의 차이 // fork : 비동기 함수 호출, call : 동기 함수 호출(blocking) 콜이 끝날 때까지 기다려주느냐, 안기다려 주느냐의 차이
        const result = yield call(addPostAPI, action.data); //addPost 1 */
        yield delay(1000);
        yield put({
            type: ADD_POST_SUCCESS,
            data : result.data
        });
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        })
    }
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data : result.data
        });
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        })
    }
}

/* 1. 리스너의 구현
로그인 함수가 실행이 되어지면 위를 실행한다
이 이미벤트 리스너는 휘발성이다. 한번 쓰면 사라져 버림 ㄷㄷ 그래서 while문으로 감싸는 것으로 이를 무한하게 실행해 줄 수 있도록 시스템을 짜준다
하지만 이런 방식의 코드가 직관적이지 못한 탓에 "takeEvery"를 사용한다
takeLatest : 마지막 클릭한 것 만, takeLeading : 처음 클릭 한 것만, takeLatest : 마지막 response만 가지고 온다. 요청이 여러번 되어졌을 경우에 대한 백엔드 처리는 무조껀 서버에서 해주어야 한다. */
function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}

function* watchAddComment() {
    yield takeLatest('ADD_COMMENT_REQUEST', addComment);
}