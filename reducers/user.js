export const initialState = {
    isLoggedIn: false,
    me:null,
    signUpData: {},
    loginData: {},
}

// 비동기적인 action creater가 redux-thunk를 통해 사용되어졌다
export const loginAction = (data) => {
    return(dispatch, getState) => {
        const state = getState();
        dispatch(loginRequestAction());
        // 요청 할 주소에 대해서 설정
        axios.post('/api/login')
            .then((res) => {
                dispatch(loginSuccessAction(res.data));
            })
            .catch((err) => {
                dispatch(loginFailureAction(err));
            })
    }
}


//기존 액션 객체에서 thunk를 붙여 준다. 성공, 실패, 액션 이렇게 세가지 다발로 정해져 있다.
//액션 크리에이터를 활용하여, 로그인 액션을 만들어 준다
export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

export const loginSuccessAction = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

export const loginFailureAction = (data) => {
    return {
        type: 'LOG_IN_FAILURE',
        data,
    }
}


//기존 액션 객체에서 thunk를 붙여 준다.
//액션 크리에이터를 활용하여, 로그인 액션을 만들어 준다
export const logoutRequestAction = () => {
    return {
        type: 'LOG_OUT_REQUEST',
    }
}

export const logoutRequestSuccess = () => {
    return {
        type: 'LOG_OUT_SUCCESS',
    }
}

export const logoutRequestFailure = () => {
    return {
        type: 'LOG_OUT_FAILURE',
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            // 새로운 객체를 리턴해준다. 이는 기록을 남기도록 하기 위해서!
            return {
                ...state,
                isLoggedIn: true,
                me : action.data,
            };
        case 'LOG_OUT':
            // 새로운 객체를 리턴해준다. 이는 기록을 남기도록 하기 위해서!
            return {
                ...state,
                isLoggedIn: false,
                me:null,
            };        
        default:
            return state;
    }
};

export default reducer;