import React, { useCallback } from 'react';
import { Card,Avatar,Button } from 'antd'; //리엑트에서 나온 카드 컴포넌트
import { useDispatch } from 'react-redux';

import { logoutAction } from '../reducers';

const UserProfile = () => {
    const dispatch = useDispatch();

    const onLogOut = useCallback(() => {
        dispatch(logoutAction());
    }, []);
    return (
        <Card
        // 리엑트에서 JSX에서 배열을 사용해야 하는경우에는 key지정이 필요하다.
            actions={[
                <div key="twit">브라움<br />0</div>,
                <div key="followers">브라움<br />0</div>,
                <div key="follower">브라움<br />0</div>,
            ]}
        >
            <Card.Meta 
                avatar={<Avatar>ZC</Avatar>}
                title = "OHUS"
            
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;