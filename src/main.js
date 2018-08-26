import "babel-polyfill";
import "./assets/index.scss";
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import App from "./containers/App/index";
import Login from "./containers/Login";

function requireAuth(nextState, replace, next) {
  // check user here
  next();
}

render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={App} onEnter={requireAuth} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);