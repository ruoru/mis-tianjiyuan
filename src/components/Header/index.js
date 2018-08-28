import './index.scss';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Avatar, Popover } from 'antd';
import gateway from '../../utils/getGateway';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  async logout() {
    try {
      const result = await gateway.formRequest('GET', `/datamanage/manage/logout`);
      localStorage.clear();
      location.href = `/login`;
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { title, component } = this.props;
    return (
      <Layout.Header className="header">
        <div className="title">{title}</div>
        {component}
        <div className="right">
          <Popover
            content={
              <div>
                <Button onClick={this.logout}>退出</Button>
              </div>
            }
            title={localStorage.getItem('userName')}
            trigger="click"
            placement="bottom"
          >
            <Avatar style={{ color: '#f56a00', backgroundColor: '#1890ff', cursor: 'pointer' }} src={localStorage.getItem('userAvatar')}>
              {localStorage.getItem('userName')}
            </Avatar>
          </Popover>
        </div>
      </Layout.Header>
    );
  }
}

export default Header;