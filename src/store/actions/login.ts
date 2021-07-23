import { message } from 'antd';
import request from '@/request';
import { LOGIN_PENDING, LOGIN_SUCCESS, LOGIN_ERROR } from '../constants';

export const loginPending = () => {
    return {
        type: LOGIN_PENDING
    };
};

export const loginSuccess = (user: any) => {
    return {
        type: LOGIN_SUCCESS,
        user
    };
};

export const loginError = (error: string) => {
    return {
        type: LOGIN_ERROR,
        error
    };
};

// export const login = (user: any) => {
//     return {
//         type: LOGIN_SUCCESS,
//         user
//     }
// }

export const login = (data: any) => {
    return async (dispatch: any) => {
        dispatch(loginPending());
        const res = await request({
            url: '/api/user/login',
            method: 'POST',
            data,
        }).catch(error => {
            dispatch(loginError(error));
            message.error(error);
        });
        if (res) {
            localStorage.token = res.token;
            dispatch(loginSuccess(res));
            message.success('登录成功!');
            location.href = '#/dashboard';
        }
    };
};
