import { createStore, applyMiddleware, Middleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const middleware: Middleware[] = [reduxThunk]

if (process.env.NODE_ENV === 'development') {
    middleware.push(reduxLogger)
}

export default createStore(
    reducers, composeWithDevTools(applyMiddleware())
)