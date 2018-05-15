import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

class Navigation extends Component {
  constructor (props) {
    super(props);
  }

  render() {
    const { history } = this.props;

    return(
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={ e => this.props.history.push(`/${e.key}`) }>

        <Menu.Item key="me" >
          <Icon type="user" />
          <span className="nav-text">个人中心</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="tags-o" />
          <span className="nav-text">标注管理</span>
        </Menu.Item>
        <Menu.Item key="data">
          <Icon type="database" />
          <span className="nav-text">数据中心</span>
        </Menu.Item>
        <Menu.Item key="4">
          <Icon type="bar-chart" />
          <span className="nav-text">nav 4</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Icon type="cloud-o" />
          <span className="nav-text">nav 5</span>
        </Menu.Item>
        <Menu.Item key="6">
          <Icon type="appstore-o" />
          <span className="nav-text">nav 6</span>
        </Menu.Item>
        <Menu.Item key="7">
          <Icon type="team" />
          <span className="nav-text">nav 7</span>
        </Menu.Item>
        <Menu.Item key="setting">
          <Icon type="setting" />
          <span className="nav-text">系统设置</span>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Navigation);