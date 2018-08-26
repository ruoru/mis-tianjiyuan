import './index.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { title, component } = this.props;
    return (
      <Layout.Header className="header">
        <div className="title">{title}</div>
        {component}
      </Layout.Header>
    );
  }
}

export default Header;