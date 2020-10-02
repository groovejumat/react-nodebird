import AppLayout from "../components/AppLayout";

const Home = () => {
    return (
        // 감싸진 div태그의 요소가 AppLayout의 children이 된다
        <AppLayout>
            <div>Hello, Next!</div>
        </AppLayout>
    );
}

export default Home;