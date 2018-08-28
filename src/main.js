import "babel-polyfill";
import "./assets/index.scss";
import "ant-design-pro/dist/ant-design-pro.min.css";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { LocaleProvider } from 'antd';

import App from "./containers/App/index";
import Login from "./containers/Login";
import LoginPro from "./containers/LoginPro";

function requireAuth(nextState, replace, next) {
  // check user here
  next();
}

render(
  <LocaleProvider locale={zhCN}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/loginpro" component={LoginPro} />
        <Route path="/" component={App} onEnter={requireAuth} />
      </Switch>
    </BrowserRouter>
  </LocaleProvider>,
  document.getElementById("root")
);