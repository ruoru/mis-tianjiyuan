import "./index.scss";
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Layout, Icon } from "antd";
import Nav from "../../components/Nav";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      toggle: false
    };
  }

  render() {
    const { dispatch, collapsed } = this.state;

    return (
      <Layout>
        <Layout.Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
          collapsed={collapsed}
        >
          <div className="logo" />
          <Icon
            className="trigger menu-collapsed"
            type={collapsed ? "menu-unfold" : "menu-fold"}
            onClick={e => console.log(e)}
          />

          <Nav />
        </Layout.Sider>
        <Layout style={{ marginLeft: `${collapsed ? 64 : 200}px` }}>
          <Layout.Header style={{ background: "#fff", padding: 0 }} />
          <Layout.Content
            style={{ margin: "24px 16px 0", overflow: "initial" }}
          >
            <div
              style={{ padding: 24, background: "#fff", textAlign: "center" }}
            >
              ...
              <br />
              Really
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              long
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              ...
              <br />
              Layout.Content
            </div>
          </Layout.Content>
          <Layout.Footer style={{ textAlign: "center" }}>
            TianJiYuan ©2017
          </Layout.Footer>
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
