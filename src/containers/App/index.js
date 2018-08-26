import "./index.scss";
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { Layout, Icon } from "antd";
import Nav from "../../components/Nav";

import Users from '../Users';

import getGateway from '../../utils/getGateway';
import navigations from '../../../config/navigations.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      toggle: false,
      myNavigations: [],
    };
  }

  componentDidMount () {
    this.getAuths();
  }

  async getAuths () {
    let resp = [];
    try {
      resp = await getGateway.middleware('GET', '/menu/?format=json', {});
      if(resp.location) {
        location.href = resp.location;
      }
    } catch (error) {
      console.error(error);
    }

    const myNavigationsTitle = resp.map(item => item.title);
    //this.setState({myNavigations: getMyNavigations(navigations)});
    this.setState({myNavigations: navigations});

    function getMyNavigations (allNavigations) {
      const myNavigations = [];
      for(let i in allNavigations) {
        const item = allNavigations[i];
        if(item.children) {
          item.children = getMyNavigations(item.children);
          if(item.children.length > 0) {
            myNavigations.push(item)
          }
        } else if (myNavigationsTitle.includes(item.name)) {
          myNavigations.push(item)
        }
      }
      return myNavigations;
    }
  }

  render() {
    const { collapsed } = this.state;

    return (
      <Layout className="app">
        <Layout.Sider
          className="layout-sider"
          collapsed={collapsed}
        >
          <div className="logo" />
          <Icon
            className="trigger menu-collapsed"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={e => this.setState({ collapsed: !collapsed })}
          />

          <Nav />
        </Layout.Sider>
        <Layout style={{ marginLeft: `${collapsed ? 64 : 200}px` }}>
          <Switch>
            <Route path="/users/:id" component={Users}/>
            <Route path="/users" component={Users}/>
          </Switch>
        </Layout>
      </Layout>
    );
  }
}

App.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default App;