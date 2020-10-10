import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'; //링크테그, 링크목적의 컴포넌트
import { Menu, Input, Row, Col } from 'antd'; //반응형 -> 컴포넌트가 화면에 따라 리사이징 되어지는 것을 antd에서 지원해 준다 Row:가로, Col:칼럼

// antd 라이브러리에서 가지고 온 component들의 css스타일을 조정하고 싶다면?
import styled from 'styled-components';

// component요소에서 폼을 추가한다
import UserProfile from '../components/Userprofile';
import LoginForm from '../components/LoginForm';

// react-redux를 활용하기 위해서 import
import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`;

const AppLayout = ({children}) => {
    //이제 리덕스가 중앙관리소 역할로써 데이터를 쥐고 있기 때문에, 모든 컴포넌트에서 usestate를 활용을 하지않아도 된다
    //리덕스를 사용하기위해서 initialState를 만들었고 이를 컴포넌트에서 사용할 수 있다
    //const [isloggedIn, setIsLoggedIn] = useState(false);
    //redux를 활용
    const isloggedIn = useSelector((state)=> state.user.isLoggedIn);

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>node bird</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>profile</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{ verticalAlign: 'middle'}}/>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>sign up</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                {/* 가로 24칸 xs에 대해서 md가 차지하는 범위 */}
                <Col xs={24} md={6}>
                    setIsLoggedIn usestate를 LoginForm으로 던져준다
                    {/* {isloggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>} */}
                    {isloggedIn ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    {/* referrer opener (유저의 출저관련되어진 정보를 제한한다.) */}
                    <a href="https://www.naver.com" target="_blank" rel="noreferrer noopener">Made by Ohus</a> 
                </Col>
            </Row>
        </div>
    );
};

// props에 대한 지정 
AppLayout.propTypes={
    // react화면으로 나타내는 node가 필요하다고 지정한다.
    children: PropTypes.node.isRequired,
};

export default AppLayout;