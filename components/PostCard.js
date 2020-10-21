import React, { useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import { Card, Popover, Button, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import { useSelector } from 'react-redux';


import PostImages from './PostImages';
import CommentForm from './CommentForm';


const PostCard = ({ post }) => {
    // 원래라면 상태에 대해서 백엔드 서버와 통신을 하여야 하지만, useState로 해당 부분을 임시로 구현하는 것 또한 가능하다.
    const [liked, setLiked] = useState(false);
    const [CommentFormOpened, setCommentFormOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        // prev : 이전 데이터를 기반으로 다음 데이터를 만들어 줍니다.
        setLiked((prev) => !prev);
    }, []);

    const onToggleCommet = useCallback(()=>{
        setCommentFormOpened((prev) => !prev)
    },[])
    const { me } = useSelector((state) => state.user);
    // optional chaning
    const id = me?.id;
    return (
        <div style={{ marginBottom: 20}}>
            {/* 개략적인 컴포넌트의 기획 */}
            <Card
            //이미지가 1개 이상을 가질 때, PostImages 컴포넌트를 렌더링 한다
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" />,
                    liked
                        ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike}/>
                        : <HeartOutlined key="heart" onClick={onToggleLike} />,
                    <MessageOutlined key="comment" onClick={onToggleCommet}/>,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id
                            ? (
                                <>
                                    <Button>수정</Button>
                                    <Button type="danger">삭제</Button>                                    
                                </>
                            ) : <Button>신고</Button>}
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>,

                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            {CommentFormOpened && (
                <div>
                    {/* 댓글 부분 */}
                    <CommentForm post={post}/>
                    <List 
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>
            )}
            {/* <CommentForm />
            <Comments /> */}
        </div>
    );
};

//가지고 오는 proptypes의 검사 및 정의
PostCard.PropTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comments: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    })
};

export default PostCard;

