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
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Transactions from "views/examples/Transactions.js";
import Deposits from "views/examples/Deposits.js";
import Withdrawals from "views/examples/Withdrawals.js";
import Icons from "views/examples/Icons.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/transactions",
    name: "Transactions",
    icon: "ni ni-planet text-blue",
    component: Transactions,
    layout: "/admin",
  },
  {
    path: "/deposits",
    name: "Deposits",
    icon: "ni ni-pin-3 text-orange",
    component: Deposits,
    layout: "/admin",
  },
  {
    path: "/withdrawals",
    name: "Withdrawals",
    icon: "ni ni-single-02 text-yellow",
    component: Withdrawals,
    layout: "/admin",
  }
  
];
export default routes;
