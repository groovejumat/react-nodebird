export const initialState = {
  // 액션인지, 혹은 상태값인지 체크를 하기가 힘들기 때문에, success failure로 잡아주는 것은 지양한다
  // 로그인 상태
  logInLoading: false,
  logInDone: false,
  logInError: null,

  // 로그아웃 상태
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,

  // 닉네임 변경
  changeNickLoading: false, // 닉네임 변경 시도중 (api 콜)
  changeNickDone: false, 
  changeNickError : null,

  // 회원가입 상태
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,

  me: null,
  signUpData: {},
  loginData: {},
};

// 액션으로 사용되어질 공용 변수
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

const dummyUser = (data) => ({
  ...data,
  nickname: 'suho',
  id: 1,
  // sequalizer에서 합쳐준다.
  Posts: [],
  Followings: [],
  Followers: [],
});
// 비동기적인 action creater가 redux-thunk를 통해 사용되어졌다 [thunk의 사용 예시]
/* export const loginAction = (data) => {
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
 */

// 기존 액션 객체에서 thunk를 붙여 준다. 성공, 실패, 액션 이렇게 세가지 다발로 정해져 있다.
// 액션 크리에이터를 활용하여, 로그인 액션을 만들어 준다
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

/* ! SUCCESS 와 FAILURE에 대한 액션을 이제 saga에서 처리해 줌으로써 해당 액션을 직접 구현해 줄 필요가 없어졌다
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
} */

// 기존 액션 객체에서 thunk를 붙여 준다.
// 액션 크리에이터를 활용하여, 로그인 액션을 만들어 준다
export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const logoutRequestSuccess = () => {
  return {
    type: LOG_OUT_SUCCESS,
  };
};

export const logoutRequestFailure = () => {
  return {
    type: LOG_OUT_FAILURE,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // 하나의 액션에 3가지 (요청, 성공, 실패)가 남는다
    case LOG_IN_REQUEST:
      console.log('로그인 request 동작');
      return {
        ...state,
        logInLoading: true,
        logInDone: false,
        logInError: null,
      };
    case LOG_IN_SUCCESS:
      console.log('로그인 성공 request 동작');
      console.log(state);
      return {
        ...state,
        logInLoading: false,
        logInDone: true,
        me: dummyUser(action.data),
      };

    case LOG_IN_FAILURE:
      return {
        ...state,
        logInLoading: false,
        logInError: action.error,
      };

      // 로그 아웃 액션 처리
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      console.log('로그아웃이 성공됨');
      return {
        ...state,
        logOutLoading: false,
        logOutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };

    // SignUp
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };


    // NickName Action
    //////////////////
    case CHANGE_NICKNAME_REQUEST:
        return {
          ...state,
          changeNicknameLoading: true,
          changeNicknameDone: false,
          changeNicknameError: null,
        };
    case CHANGE_NICKNAME_SUCCESS:
        return {
          ...state,
          changeNicknameLoading: false,
          changeNicknameDone: true,
        };
    case CHANGE_NICKNAME_FAILURE:
        return {
          ...state,
          changeNicknameLoading: false,
          changeNicknameError: action.error,
        };
    default:
      return state;
  }
};

export default reducer;
