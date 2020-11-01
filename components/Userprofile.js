import React, { useCallback } from 'react';
import { Card,Avatar,Button } from 'antd'; //리엑트에서 나온 카드 컴포넌트
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { me, isLoggingOut } = useSelector((state) => state.user);

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction());
    }, []);
    return (
        <Card
        // 리엑트에서 JSX에서 배열을 사용해야 하는경우에는 key지정이 필요하다.
            actions={[
                <div key="twit">브라움 Q<br />0</div>,
                <div key="followers">브라움 W<br />0</div>,
                <div key="follower">브라움 E<br />0</div>,
            ]}
        >
            <Card.Meta 
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title = {me.nickname}
            
            />
            <Button onClick={onLogOut} loading={isLoggingOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;