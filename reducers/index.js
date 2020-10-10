import { HYDRATE } from 'next-redux-wrapper';

//빈상태를 만들어 두고 이를 action creater를 통해서 상황에 따라 바꾸어 컴포넌트 들에게 뿌려줄 수 있도록 합니다
const initialState = {
    user: {
        isLoggedIn: false,
        user:null,
        signUpData: {},
        loginData: {},
    },
    post: {
        mainPosts: [],
    }
};


//액션 크리에이터를 활용하여, 로그인 액션을 만들어 준다
export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

//액션 크리에이터를 활용하여, 로그인 액션을 만들어 준다
export const logoutAction = (data) => {
    return {
        type: 'LOG_OUT',
        data,
    }
}

//위처럼 매번 만들게 되면 너무나 코드가 비효율적이기 때문에 "액션 크리에이터 함수"를 만들어 준다.
const  changeNickname = () => {
    return {
        type: 'CHANGE_NICKNAME',
        // 데이터를 동적으로 사용자로부터 받아서 처리해주도록 해준다
    }
};

//그리고 비동기적으로 action크리에이터처리를 해주는 함수 또한 만들어 준다




//reducer : 차원축소
//데이터에 대한 처리를 해주는 "액션"을 처리 해주는 reducer
//이전 상태와 액션을 활용하여 -> 다음상태를 만들어주는 역할을 해준다
const rootReducer = (state=initialState, action) => {
    switch(action.type){
        case HYDRATE:
            console.log('HYDRATE',action);
            return { ...state, ...action.payload};
        case 'LOG_IN':
            // 새로운 객체를 리턴해준다. 이는 기록을 남기도록 하기 위해서!
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: true,
                    user : action.data,
                },
            };
        case 'LOG_OUT':
            // 새로운 객체를 리턴해준다. 이는 기록을 남기도록 하기 위해서!
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: false,
                    user : null,
                },
            };
        default:
            return state;
    }

};

export default rootReducer;