import '../index.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import Nav from '../../../components/Nav';

class CoreLayout extends React.Component {

  constructor(props) {
    super(props);
  }



  render() {
    const { dispatch, collapsed, toggle } = this.props;

    return (
      <Layout>
        <Layout.Sider style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }} collapsed={collapsed} >
          <div className="logo" />
          <Icon
              className="trigger menu-collapsed"
              type={collapsed? 'menu-unfold': 'menu-fold'}
              onClick={e => dispatch(toggle())}
          />

          <Nav />

        </Layout.Sider>
        <Layout style={{ marginLeft: `${collapsed? 64: 200}px` }}>
          <Layout.Header style={{ background: '#fff', padding: 0 }} />
          <Layout.Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
              ...
              <br />
              Really
              <br />...<br />...<br />...<br />
              long
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />...
              <br />...<br />...<br />...<br />...<br />...<br />
              Layout.Content
            </div>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: 'center' }}>
            TianJiYuan ©2017
          </Layout.Footer>
        </Layout>
      </Layout>
    );
  }
}

CoreLayout.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default CoreLayout;