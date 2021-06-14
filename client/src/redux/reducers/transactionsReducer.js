/* eslint-disable import/no-anonymous-default-export */
import { GET_DEPOSITS, GET_WITHDRAWAL,CLEAR_CURRENT_TRANSACTIONS,  GET_ERRORS,
    GET_BALANCE, FUND_ACCOUNT,  POST_DEPOSIT, 
    POST_WITHDRAWAL, GET_TRANSACTIONS, TRANSACTIONS_LOADING } from '../actions/types';



const initialState = {
    transactions: [],
    deposits: [],
    withdrawals: [],
    account: {},
    errors: {},
    loading: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case TRANSACTIONS_LOADING:
      return {
        ...state,
        loading: true
      }

      case GET_TRANSACTIONS: 
      return {
        ...state,
        transactions: action.payload,
        loading: false
      }

      case GET_DEPOSITS: 
      return {
        ...state,
        deposits: action.payload,
        loading: false
      }
      case GET_WITHDRAWAL: 
      return {
        ...state,
        withdrawals: action.payload,
        loading: false
      }

      case GET_BALANCE: 
      return {
        ...state,
        account: action.payload,
        loading: false
      }
      case FUND_ACCOUNT: 
      return {
        ...state,
        account: action.payload,
        loading: false
      }

      case  GET_ERRORS: 
      return {
        ...state,
        errors: action.payload,
        loading: false
      }

      case  CLEAR_CURRENT_TRANSACTIONS: 
      return {
        ...state,
        transactions: null,
        deposits: null,
        withdrawals: null,
        account: null,
        loading: false
      }

      

      default:
          return state;
  }
}