export const initialState = {
    //모의 데이터를 만들어 준다
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: '주수호',
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [{
            src: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'
        },{
            src: 'https://images.unsplash.com/photo-1601280474119-ebf63ea97d3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=980&q=80'
        },{
            src: 'https://images.unsplash.com/photo-1603482011932-089d2b06ab18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=670&q=80'
        }],
        Comments: [{
            User: {
                nickname: 'nero'
            },
            content: 'nodejs 와 react 최신스택'
        },{
            User: {
                nickname: 'nero'
            },
            content: 'nodejs 와 react 최신스택'
        }]
    }],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// 동적 액션 크리에이터
/* export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
}); */

export const addCommnet = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
});


const dummyPost = {
    id: 1,
    User: {
        id: 2,
        nickname: '더미',
    },
    content: '더미 포스팅~',
    Images:[],
    Comments:[],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            console.log("TEST : ADD_POST IS REQUESTED")
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            };
                
        case ADD_POST_SUCCESS:
            console.log("TEST : ADD_POST IS SUCCESS")
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            };

        case ADD_POST_FAILURE:
            return {
                ... state,
                addPostLoading: false,
                addPostError: action.error,
            };

        // COMMENT ACTION
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            };
                
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: true,
            };

        case ADD_COMMENT_FAILURE:
            return {
                ... state,
                addCommentLoading: false,
                addCommentError: action.error,
            };
        default:
            return state;
    }
};

export default reducer;