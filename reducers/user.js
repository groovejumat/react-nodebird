export const initialState = {
    isLoggedIn: false,
    user:null,
    signUpData: {},
    loginData: {},
}

//액션 크리에이터를 활용하여, 로그인 액션을 만들어 준다
export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

//액션 크리에이터를 활용하여, 로그인 액션을 만들어 준다
export const logoutAction = () => {
    return {
        type: 'LOG_OUT',
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            // 새로운 객체를 리턴해준다. 이는 기록을 남기도록 하기 위해서!
            return {
                ...state,
                isLoggedIn: true,
                user : action.data,
            };
        case 'LOG_OUT':
            // 새로운 객체를 리턴해준다. 이는 기록을 남기도록 하기 위해서!
            return {
                ...state,
            };        
        default:
            return state;
    }
};

export default reducer;