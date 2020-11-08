import React from 'react'; // 해도 되고 안해두 된다. 알아서 처리해 줌.
import Head from 'next/head'

import { useSelector } from 'react-redux';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
    const { me } = useSelector((state) => state.user);

    return (
      <>
            <Head>
                <meta charSet="utf-8"/>
                <title>profile | NodeBird</title>
            </Head>
            <AppLayout>
              {/* 내부적으로 컴포넌트 코딩을 진행하는 경우에는, 가장의 컴포넌트로   시작하는 것이 좋다.
              1. 크게 크게 컴포넌트들을 설계한다. prop이름까지 임의로 담아준다.
              2. 그리고 그에 맞는 새로운 컴포넌트들을 만들어 준다. */}
              <NicknameEditForm/>
              <FollowList header="팔로잉하고 있는 유저들" data={me.Followings}/>
              <FollowList header="팔로로 검색" data={me.Followers}/>
            </AppLayout>
      </>  
    );
};

export default Profile;