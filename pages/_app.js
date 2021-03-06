import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head'; //head부분을 수정 할 수 있는 next컴포넌트 입니다
import 'antd/dist/antd.css'

// next와 redux-saga를 연결해주는 연습을 합니다
import withReduxSaga from 'next-redux-saga';

import wrapper from '../store/configureStore';



//여기서 페이지들의 공통된 속성들을 처리해 줄 수 있습니다.
//app.js완전 공통적인 속성을 위해서 사용
const NodeBird = ({ Component }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <title>My NodeBird</title>
            </Head>
            <Component />
        </>
    );
};

NodeBird.propTypes = {
    Component: PropTypes.elementType.isRequired,
}

// reducer에서 만든 redux를 적용해줍니다.
export default wrapper.withRedux(withReduxSaga(NodeBird));