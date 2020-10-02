import React, { useCallback, useState } from 'react'; // 해도 되고 안해두 된다. 알아서 처리해 줌.
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
    color: red;
`;

const Signup = () => {
    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck]= useState('');
    const [passwordError, setPasswordError]= useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value);
        setPasswordError(e.target.value !== password);
    }, [password]);

    const [term, setTerm]= useState('');
    const [termError, setTermError]= useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    }, []);

    // 폼을 제출할때는 onfinish이벤트가 호출되어 집니다. e.preventdefault를 할 필요는 없다
    // 사용자 인풋은 여러번 체크하는 것이 좋다. submit버튼을 눌렀을 때에 최종 확인 시작
    const onSubmit = useCallback(()=>{
        if (password !== passwordCheck) {
            return setPasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        console.log(id, nickname, password)
    }, [password,passwordCheck,term]);
    return (
        <AppLayout>
              <Head>
                  <meta charSet="utf-8"/>
                  <title>signup | NodeBird</title>
              </Head>
              <Form onFinish={onSubmit}>
                  <div> 
                      <label htmlFor="user-id">id</label>
                      <br />
                      <Input name="user-id" value={id} required onChange={onChangeId} />
                  </div>
                  <div>
                      <label htmlFor="user-nick">nick</label>
                      <br />
                      <Input name="user-nick" value={nickname} required onChange={onChangeNickname} />
                  </div>
                  <div>
                      <label htmlFor="user-password">password</label>
                      <br />
                      <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                  </div>
                  <div>
                      <label htmlFor="user-password-check">check-password</label>
                      <br />
                      <Input 
                        name="user-password-check" 
                        type="password" 
                        value={passwordCheck} 
                        required 
                        onChange={onChangePasswordCheck} 
                      />
                      {passwordError && <ErrorMessage>password is invalid</ErrorMessage>}
                  </div>
                  <div>
                      <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>I agree for this.</Checkbox>
                      {termError && <ErrorMessage>I have to agree.</ErrorMessage>}
                  </div>
                  <div style={{ marginTop:10}}>
                    <Button type="primary" htmlType="submit">sign up</Button>
                  </div>
              </Form>
        </AppLayout>  
      );
};

export default Signup;