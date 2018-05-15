import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import SideLayout from '../layouts/SideLayout';
import SandwichLayout from '../layouts/SandwichLayout';

class App extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/home" component={SandwichLayout} />
          <Route path="/" component={SideLayout} />
        </Switch>
        {
          // location.pathname.split('/')[1] === 'home'
          //   ? <SandwichLayout />
          //   : <SideLayout />
        }
      </div>
    );
  }
}

App.propTypes = {

}

export default connect()(App)