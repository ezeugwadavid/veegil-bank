import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './redux/reducers';

const logger = createLogger({
    
    collapsed: true,
    diff: true
});

const initialState = {};

const middleware = [thunk]
const store = createStore(rootReducer, initialState,
  composeWithDevTools(applyMiddleware(...middleware, logger))
);

export default store;