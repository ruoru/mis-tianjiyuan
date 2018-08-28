import "./index.scss";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.renderMenuList = this.renderMenuList.bind(this);
  }

  renderMenuList(menus) {
    return menus.map(
      item =>
        Array.isArray(item.children) ? (
          <Menu.SubMenu
            key={item.key}
            title={
              <span>
                {item.icontype && <Icon type={item.icontype} />}
                <span>{item.name}</span>
              </span>
            }
          >
            {this.renderMenuList(item.children)}
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            key={item.key}
          >
            {item.icontype && <Icon type={item.icontype} />}
            <span className="nav-text">{item.name}</span>
          </Menu.Item>
        )
    );
  }

  render() {
    const { data } = this.props;
    return (
      <Menu
        className="navigation"
        theme={localStorage.getItem("systemThem") || "dark"}
        mode="inline"
        defaultSelectedKeys={[data && data[0] && data[0].key]}
        onClick={(item, key, keyPath) => {
          this.props.history.push(`/${item.key}`);
        }}
      >
        {this.renderMenuList(data)}
      </Menu>
    );
  }
}

export default withRouter(Navigation);
