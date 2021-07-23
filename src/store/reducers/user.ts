import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants';


const initialState: UserState = {
    user: {},
    loading: false,
    error: null,
    isLogin: false
};

interface User{
    username?: string
    token?: string
}

export interface UserState {
    user: User,
    loading: Boolean,
    error: string|null,
    isLogin: Boolean
}

export const user = (state = initialState, action: any): any => {
    switch (action.type) {
        case LOGIN_PENDING:
            return {
                ...state, loading: true
            };
        case LOGIN_SUCCESS:
            return {
                ...state, user: action.user, loading: false, isLogin: true
            };
        case LOGIN_ERROR:
            return {
                ...state, error: action.error, loading: false
            };
        default:
            return state;
    }
};
