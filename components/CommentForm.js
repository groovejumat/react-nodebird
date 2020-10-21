import { Form, Input, Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import PropTypes from 'prop-types';

import useInput from '../hooks/useInput';

const CommentForm = ({ post }) => {
    // 유저가 없는경우에 대해서 useselector 처리 해주어야 한다
    const id = useSelector((state) => state.user.me?.id);
    const [commentText, onChangedCommentText] = useInput('');
    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
    }, [commentText]);
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin:0 }}>
                <Input.TextArea value={commentText} onChange={onChangedCommentText} rows={4}/>
                <Button style={{ position: 'absolute', right: 0, bottom: -40}} type="primary" htmlType="submit">bird</Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.propTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentForm;