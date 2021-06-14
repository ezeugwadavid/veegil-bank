import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import transactionsReducer from './transactionsReducer';


export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    transactions: transactionsReducer,

});