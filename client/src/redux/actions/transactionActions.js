import axios from "axios";

import {
  GET_DEPOSITS,
  GET_WITHDRAWAL,
  CLEAR_CURRENT_TRANSACTIONS,
  GET_ERRORS,
  GET_BALANCE,
  FUND_ACCOUNT,
  POST_DEPOSIT,
  POST_WITHDRAWAL,
  GET_TRANSACTIONS,
  TRANSACTIONS_LOADING,
} from "../actions/types";

// Get current account
export const getCurrentAccount = () => (dispatch) => {
  dispatch(setTransactionsLoading());
  axios
    .get("/api/transactions/account")
    .then((res) =>
      dispatch({
        type: GET_BALANCE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// fund account

export const fundAccount = () => (dispatch) => {
  console.log("called");
  dispatch(setTransactionsLoading());
  axios
    .post("/api/transactions/account")
    .then((res) =>
      // this is when the data.message returns a 200 ok res, instead of creating another state val
      dispatch({
        type: GET_ERRORS,
        payload: res.data,
      })
    )

    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// get deposits

export const getDeposits = () => (dispatch) => {
  dispatch(setTransactionsLoading());
  axios
    .get("/api/transactions/deposits")
    .then((res) =>
      dispatch({
        type: GET_DEPOSITS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// get withdrawals

export const getWithdrawals = () => (dispatch) => {
  dispatch(setTransactionsLoading());
  axios
    .get("/api/transactions/withdrawals")
    .then((res) =>
      dispatch({
        type: GET_WITHDRAWAL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// get transactions

export const getTransactions = () => (dispatch) => {
  dispatch(setTransactionsLoading());
  axios
    .get("/api/transactions/transactions")
    .then((res) =>
      dispatch({
        type: GET_TRANSACTIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//deposit
export const depositAmount = (amountData) => (dispatch) => {
  axios
    .post("/api/transactions/deposit", amountData)
    .then((res) => window.location.reload())
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//withdrawal
export const withdrawAmount = (amount) => (dispatch) => {
  axios
    .post("/api/transactions/withdraw", amount)
    .then((res) => window.location.reload())
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Profile loading
export const setTransactionsLoading = () => {
  return {
    type: TRANSACTIONS_LOADING,
  };
};

// Clear profile

export const clearCurrentTransactions = () => {
  return {
    type: CLEAR_CURRENT_TRANSACTIONS,
  };
};
