import { GET_BOOK_PENDING, GET_BOOK_SUCCESS, GET_BOOK_ERROR } from '../constants';


const initialState: BookState = {
    books: [],
    loading: false,
    error: null,
    isLogin: false
};

interface Book {
    _id: string;
    articles: [any];
    createdAt: string;
    updatedAt: string;
    userId: string;
    name: string;
    description: string;
}

export interface BookState {
    books: [Book?],
    loading: boolean,
    error: string|null,
    isLogin: Boolean
}

export const books = (state = initialState, action: any): BookState => {
    switch (action.type) {
        case GET_BOOK_PENDING:
            return {
                ...state, loading: true
            };
        case GET_BOOK_SUCCESS:
            return {
                ...state, books: action.books, loading: false, isLogin: true
            };
        case GET_BOOK_ERROR:
            return {
                ...state, error: action.error, loading: false
            };
        default:
            return state;
    }
};
