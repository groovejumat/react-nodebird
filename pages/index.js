import React from 'react';
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import {useSelector} from 'react-redux';


const Home = () => {
    // store에서 구현한 리덕스를 불러와 사용한다
    const { isLoggedIn } = useSelector((state) => state.user);
    // 이런식으로 구조에 대한 분해작업없이, 직접 참조하는 것 또한 가능하다
    const mainPosts = useSelector((state) => state.post.mainPosts);
    return (
        // 감싸진 div태그의 요소가 AppLayout의 children이 된다
        <AppLayout>
            {/* 임의로 자신이 컴포넌트 이름을 지정해 주고, 이렇게 맞게 만들어 준다. */}
            {isLoggedIn && <PostForm />}
            {/* 지워질 가능성이 있는 객체에 대해서는 index를 key값으로써 사용하면 안된다. 반복문의 내용이 바뀌는 경우는 절대 index를 키로 쓰지말 것 */}
            {mainPosts.map((post) => <PostCard key={post.id}  post={post} />)}
        </AppLayout>
    );
}

export default Home;