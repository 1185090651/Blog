import { combineReducers } from 'redux';
import { user, UserState } from './user';
import { books, BookState } from './book';

export interface IState {
    user: UserState,
    books: BookState
}

export default combineReducers({
    user, books
});
