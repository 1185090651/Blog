import { CREATE_BOOK_PENDING, CREATE_BOOK_SUCCESS, CREATE_BOOK_ERROR, GET_BOOK_PENDING, GET_BOOK_SUCCESS, GET_BOOK_ERROR, CREATE_ARTICLE_SUCCESS } from '../constants';
import request from '@/request';
import { Dispatch } from 'redux';
import { message } from 'antd';


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
            message.error(error);
        });
        if (res) {
            dispatch({ type: CREATE_BOOK_SUCCESS, books: res });
            message.success('添加知识库成功');
        }
    };
};

export interface CreateArticleParams {
    title: string;
    bookId: string | undefined;
}

export const createArticleAction = (data: CreateArticleParams) => {
    return async (dispatch: Dispatch) => {
        const res = await request({
            url: '/api/admin/article',
            method: 'POST',
            data
        }).catch(error => {
            message.error(error);
        });
        if (res) {
            dispatch({ type: CREATE_ARTICLE_SUCCESS, ...data });
            message.success('添加成功');
        }
    };
};

