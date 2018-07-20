import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import App from './containers/App';

function requireAuth(nextState, replace, next) {
  // check user here
  next();
}

render(
  <BrowserRouter>
    <Switch>
      <Route path='/home' component={App}/>
      <Route path='/' component={App} onEnter={requireAuth}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
