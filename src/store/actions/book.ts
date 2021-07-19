import { CREATE_BOOK_PENDING, CREATE_BOOK_SUCCESS, CREATE_BOOK_ERROR } from '../constants';

export const createBookPending = () => {
    return {
        type: CREATE_BOOK_PENDING
    }
}

export const createBookSuccess = () => {
    return {
        type: CREATE_BOOK_SUCCESS
    }
}

export const createBookError = () => {
    return {
        type: CREATE_BOOK_ERROR
    }
}