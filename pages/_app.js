import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head'; //head부분을 수정 할 수 있는 next컴포넌트 입니다
import 'antd/dist/antd.css'

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

export default wrapper.withRedux(NodeBird);