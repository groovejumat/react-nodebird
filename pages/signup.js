import React from 'react'; // 해도 되고 안해두 된다. 알아서 처리해 줌.
import Head from 'next/head';
import AppLayout from '../components/AppLayout';

const Signup = () => {
    return (
        <>
              <Head>
                  <meta charSet="utf-8"/>
                  <title>signup | NodeBird</title>
              </Head>
              <AppLayout>회원가입</AppLayout>
        </>  
      );
};

export default Signup;