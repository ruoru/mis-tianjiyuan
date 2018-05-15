import '../index.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../../../components/Navigation';

import Me from '../../../routes/Me';
import Data from '../../../routes/Data';
import SystemSettings from '../../../routes/SystemSettings';

class SideLayoutComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { navToggle, navToggleAction } = this.props;

    return (
      <Layout>
        <Layout.Sider className="sider" collapsed={navToggle} >
          <Icon
            className="trigger menu-collapsed"
            type={navToggle? 'menu-unfold': 'menu-fold'}
            onClick={e => navToggleAction(navToggle)}
          />
          <div className="logo" />
          <Navigation />
        </Layout.Sider>
        <Layout style={{ marginLeft: `${navToggle? 80: 200}px` }}>
          <Layout.Header className="header" />
          <Layout.Content className="content">
            <Switch>
              <Route path='/me' component={ Me } />
              <Route path='/data' component={ Data } />
              <Route path='/setting' component={ SystemSettings } />
            </Switch>
          </Layout.Content>
          <Layout.Footer className="footer">
            Gowild ©2017
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

SideLayoutComponent.propTypes = {
  navToggle: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default SideLayoutComponent;