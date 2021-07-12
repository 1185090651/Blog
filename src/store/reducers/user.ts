import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants';

const initialState = {
    user: {},
    loading: false,
    error: null
}

interface User{
    username?: string
    token?: string
}

export interface UserState {
    user: User,
    loading: Boolean,
    error: string|null
}

export const user = (state = initialState, action: any) => {
    switch(action.type) {
        case LOGIN_PENDING:
            return {
                ...state, loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state, user: action.user, loading: false
            }
        case LOGIN_ERROR:
            return {
                ...state, error: action.error, loading: false
            }
        default:
            return state
    }
}
