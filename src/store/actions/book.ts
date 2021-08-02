import { CREATE_BOOK_PENDING, CREATE_BOOK_SUCCESS, CREATE_BOOK_ERROR, GET_BOOK_PENDING, GET_BOOK_SUCCESS, GET_BOOK_ERROR } from '../constants';
import request from '@/request';
import { Dispatch } from 'redux';


export const getBooks = () => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: GET_BOOK_PENDING });
        const res = await request({
            url: '/api/admin/book',
            method: 'GET',
        }).catch(error => {
            dispatch({ type: GET_BOOK_ERROR, error });
        });
        if (res) {
            dispatch({ type: GET_BOOK_SUCCESS, books: res });
        }
    };
};

export interface CreateBookParams {
    name: string;
}

export const createBook = (data: CreateBookParams) => {
    return async (dispatch: Dispatch) => {
        dispatch({ type: CREATE_BOOK_PENDING });
        const res = await request({
            url: '/api/admin/book',
            method: 'POST',
            data
        }).catch(error => {
            dispatch({ type: CREATE_BOOK_ERROR, error });
        });
        if (res) {
            dispatch({ type: CREATE_BOOK_SUCCESS, books: res });
        }
    };
};

