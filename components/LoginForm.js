import React, { useState, useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link'; //라우터 역할
import styled from 'styled-components';
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';

// reducer에서 만든 로그인 액션 크리에이터를 불러와서 dispatch해준다
import { loginRequestAction } from '../reducers/user';

// div컴포넌트이면서, ``태그안의 css가 적용되어진, Buttonwrapper라는 컴포넌트를 만든다.
const ButtonWrapper = styled.div`
    margin-top : 10px;
`;

// FormWrapper이라는 커스텀 컴포넌트를 만들어 준다.
const FormWrapper = styled(Form)`
    padding: 10px;
`;


const LoginForm = () => {
    const dispatch = useDispatch();
    const { logInLoading } = useSelector((state) => state.user);
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch(loginRequestAction({ email, password }));
    }, [email, password]);

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            {/* 스타일에 객체를 넣어주면 안된다 */}
            <ButtonWrapper>
                {/* isLoggingIn 상태이면 loading이 뜬다 (요청 중인 상태) */}
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    );
}


export default LoginForm;