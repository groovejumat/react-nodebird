// configureStore.js 기본적인 next-redux-wrapper의 wrapper를 만드는 방식이다
import { createWrapper } from 'next-redux-wrapper';
import { createStore } from  'redux';

// 만들어 놓은 recucer를 불러옵니다
import reducer from '../reducers'

// 일반 리덕스와 비슷하다
const configureStore = () => {
    const store = createStore(reducer);
    return store;
};

const wrapper = createWrapper(configureStore, { debug: process.env.NODE_ENV === 'development',
});

export default wrapper;