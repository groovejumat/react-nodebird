// configureStore.js 기본적인 next-redux-wrapper의 wrapper를 만드는 방식이다
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, compose } from  'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; 
// redux-saga를 불러온다
import createSagaMiddleware from 'redux-saga';

// 만들어 놓은 recucer를 불러옵니다
import reducer from '../reducers';
// rootSaga 만들기
import rootSaga from '../sagas';

// 미들웨어를 직접 만든다면? 고차함수
const  loggerMiddleware = ({ dispatch, getState}) => (next) => (action) => {
    console.log("loggerMiddleware : ",action);
    return next(action);
};

// 일반 리덕스와 비슷하다
const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, loggerMiddleware];

    //리덕스 모듈을 설정해 준다. 이때, 개발용과 배포용을 기분해서 설정해 주도록 한다.
    const enhancer = process.env.NODE_ENV === 'production'
        ? compose(applyMiddleware(...middlewares))
        //그리고 개발 모드일 때
        : composeWithDevTools(applyMiddleware(...middlewares    ))
    const store = createStore(reducer, enhancer);
    //rootsaga를 store.sagatask에 넣어준다
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development',
});

export default wrapper;