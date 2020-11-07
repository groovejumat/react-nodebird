import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => (// 첫 번째 게시글 #해시태그 #익스프레스
    <div>
        {/* 정규 표현식을 활용하여 text splitting하기 */}
        {postData.split(/(#[^\s#]+)/g).map((v, i) => {
            if (v.match(/(#[^\s#]+)/)) {
            return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>
            }
            return v;
        })}
    </div>
);

PostCardContent.propTypes = { postData: PropTypes.string.isRequired };

export default PostCardContent