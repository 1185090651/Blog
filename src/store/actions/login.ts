import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants'

export const loginPending = () => {
    return {
        type: LOGIN_PENDING
    }
}

export const loginSuccess = (user: any) => {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

export const loginError = (error: string) => {
    return {
        type: LOGIN_ERROR,
        error
    }
}
