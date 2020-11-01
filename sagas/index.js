import {all, fork} from 'redux-saga/effects'

import postSaga from './post'
import userSaga from './user'


export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga),
    ]);
}



/* 1. 리스너의 구현
로그인 함수가 실행이 되어지면 위를 실행한다
이 이미벤트 리스너는 휘발성이다. 한번 쓰면 사라져 버림 ㄷㄷ 그래서 while문으로 감싸는 것으로 이를 무한하게 실행해 줄 수 있도록 시스템을 짜준다
하지만 이런 방식의 코드가 직관적이지 못한 탓에 "takeEvery"를 사용한다
takeLatest : 마지막 클릭한 것 만, takeLeading : 처음 클릭 한 것만, takeLatest : 마지막 response만 가지고 온다. 요청이 여러번 되어졌을 경우에 대한 백엔드 처리는 무조껀 서버에서 해주어야 한다. */
/* function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
} */
 
/* 제너레이터를 활용 func*의 형태를 말한다
일반적으로 아래와 같이 rootsaga를 만들어 놓은 뒤에, "비동기 액션"들을 하나씩 넣어준다.
all의 배열 안에 있는 모든 제너레이터 함수를 실행해 준다.
fork, call에 대해서 잘 구분해서 사용한다 */


/* 함수에 yield를 중간에 넣어서 작성을 하게되면 next할때마다 그전단계가 하나씩 하나씩 호출되어진다. 단계별로 실행이 되어진다. 중단점을 설정해 줄 수 있는 함수
.next를 호출함으로써 특정상황에 대한 이벤트리스너를 활용 할 수 있다. */