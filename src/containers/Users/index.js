import "./index.scss";
import React, { Component } from "react";
import {
  Layout,
  Icon,
  Search,
  Button,
  Table,
  Modal,
  Input,
  Select,
  Switch
} from "antd";
import Header from "../../components/Header";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      confirmLoading: false,
      types: []
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onStyleChange = this.onStyleChange.bind(this);
  }

  handleOk() {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  }

  handleCancel() {
    this.setState({
      visible: false
    });
  }

  onStyleChange(value) {
    value = value ? "dark" : "light";
    localStorage.setItem("systemTheme", value);
    location.reload();
  }

  render() {
    const { visible, confirmLoading, types, columns } = this.state;
    const systemTheme = localStorage.getItem("systemTheme");

    return (
      <div className="system">
        <Header />
        <Layout.Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div style={{ padding: 24, background: "#fff", textAlign: "center" }}>
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
      </div>
    );
  }
}

export default Users;
