import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd'; // 리엑트에서 나온 카드 컴포넌트
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
        // 리엑트에서 JSX에서 배열을 사용해야 하는경우에는 key지정이 필요하다.
      actions={[
        <div key="twit">post<br />{me.Posts.length}</div>,
        <div key="followers">following<br />{me.Followings.length}</div>,
        <div key="follower">follower<br />{me.Followers.length}</div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;
