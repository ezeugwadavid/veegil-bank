/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store.js';
import jwt_decode from 'jwt-decode';
import setAuthToken from './redux/utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/authActions';
import { clearCurrentTransactions } from './redux/actions/transactionActions';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import Login from "views/examples/Login.js";
import Register from "views/examples/Register";



// Check for token 
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    //  Clear Current Profile

    store.dispatch(clearCurrentTransactions())

    // Redirect to login
    window.location.href = '/';

  }
}

ReactDOM.render(
  <Provider store={ store }>
  <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      {/* <Redirect from="/" to="/admin/index" /> */}
    </Switch>
  </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
