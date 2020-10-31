import { all, fork, call, put, take, takeEvery, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

//하단에서 쓸 AddpostAPI는 제너레이터 함수를 사용하지 않는다 (주의)
//실제 비동기 작업에 대한 코드들을 (example : axios)실행하는 역할로 쓰인다
function LoginAPI() {
    return axios.post('/api/Login')
}

// 이런식으로 한줄 한줄 테스트가 가능하다
// const l = logIn({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}})
// l.next();
// l.next();

// 실제로 로그인을 보낸 api콜의 결과값을 반환 받는다
function* logIn(action) {
    try {
        // yield call을 하여 로그인 api를 실행 한 뒤에, 리턴해주는 값을 result에 받아온다 yeild에서 put을 dispatch(redux에서 데이터를 패치해주는 거)와 유사한 경우라고 생각하면 된다
        // call과 fork의 차이 // fork : 비동기 함수 호출, call : 동기 함수 호출(blocking) 콜이 끝날 때까지 기다려주느냐, 안기다려 주느냐의 차이
        // 첫번째 인자로는 call할 함수를, 그리고 그 다음으로는 매개변수들을 차례로 넣어 준다
        // 클릭을 실수로 두번 했을 때, 두번 요청이가지 않도록 해주는 처리
        // const result = yield call(LoginAPI, action.data, 'a');
        // 원래는 윗줄처럼 사용해주어야 하는 것이 맞지만, 현재 api서버가 없기 때문에 가짜로 처리해줄 함수를 만들어 주자
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data : result.data
        });
    } catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        })
    }
}



function addPostAPI(data) { //addPost 2
    return axios.post('/api/post', data) //addPost 3
}

// 실제로 로그인을 보낸 api콜의 결과값을 반환 받는다
function* addPost(action) {
    try {
        yield put({
            type: 'ADD_POST_REQUEST',
        });
        // yield call을 하여 로그인 api를 실행 한 뒤에, 리턴해주는 값을 result에 받아온다 yeild에서 put을 dispatch(redux에서 데이터를 패치해주는 거)와 유사한 경우라고 생각하면 된다
        // call과 fork의 차이 // fork : 비동기 함수 호출, call : 동기 함수 호출(blocking) 콜이 끝날 때까지 기다려주느냐, 안기다려 주느냐의 차이
        // const result = yield call(addPostAPI, action.data); //addPost 1
        yield delay(1000);
        yield put({
            type: 'ADD_POST_SUCCESS',
            data : result.data
        });
    } catch (err) {
        yield put({
            type: 'ADD_POST_FAILURE',
            data: err.response.data,
        })
    }
}

// 1. 리스너의 구현
// 로그인 함수가 실행이 되어지면 위를 실행한다
// 이 이미벤트 리스너는 휘발성이다. 한번 쓰면 사라져 버림 ㄷㄷ 그래서 while문으로 감싸는 것으로 이를 무한하게 실행해 줄 수 있도록 시스템을 짜준다
// 하지만 이런 방식의 코드가 직관적이지 못한 탓에 "takeEvery"를 사용한다
// takeLatest : 마지막 클릭한 것 만, takeLeading : 처음 클릭 한 것만, takeLatest : 마지막 response만 가지고 온다. 요청이 여러번 되어졌을 경우에 대한 백엔드 처리는 무조껀 서버에서 해주어야 한다.
function* watchLogin() {
    // while (true) {
    //     yield take('LOG_IN_REQUEST');
    // }
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogout() {
    yield takeLatest('LOG_OUT_REQUEST', logIn);
}

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}
 
// 제너레이터를 활용 func*의 형태를 말한다
// 일반적으로 아래와 같이 rootsaga를 만들어 놓은 뒤에, "비동기 액션"들을 하나씩 넣어준다.
// all의 배열 안에 있는 모든 제너레이터 함수를 실행해 준다.
// fork, call에 대해서 잘 구분해서 사용한다
export default function* rootSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchAddPost),
    ]);
// 무한의 이벤트 리스너로써 활용 할 수 있겠다

}

//함수에 yield를 중간에 넣어서 작성을 하게되면 next할때마다 그전단계가 하나씩 하나씩 호출되어진다. 단계별로 실행이 되어진다. 중단점을 설정해 줄 수 있는 함수
//.next를 호출함으로써 특정상황에 대한 이벤트리스너를 활용 할 수 있다.