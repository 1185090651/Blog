import { combineReducers } from 'redux';
import { user, UserState } from './user';

export interface IState {
    user: UserState
}

export default combineReducers({
    user
});
