import "./index.scss";
import React, { Component } from "react";
import {
  message,
  Layout,
  Icon,
  Button,
  Table,
  Modal,
  Input,
  Select,
  Switch
} from "antd";
import Header from "../../components/Header";
import gateway from "../../utils/getGateway";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      visible: false,
      confirmLoading: false,
      roleOptions: [],
      searchText: "",
      data: [],
      current: 1,
      pageSize: 10,
      total: 0,
      info: {},
      columns: [
        {
          title: "工号",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "姓名",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "登录账号",
          dataIndex: "account",
          key: "account"
        },
        {
          title: "系统角色",
          dataIndex: "roleName",
          key: "roleName"
        },
        {
          title: "操作",
          key: "operation",
          render: item =>
            item.isActive ? (
              <span>
                <a
                  href="javascript:;"
                  onClick={e => this.setState({ info: item, visible: true })}
                >
                  编辑
                </a>
                &nbsp;|&nbsp;
                <a
                  href="javascript:;"
                  onClick={e => this.onUserActiveChange(item)}
                >
                  停用
                </a>
              </span>
            ) : (
                <a
                  href="javascript:;"
                  onClick={e => this.onUserActiveChange(item)}
                >
                  启用
              </a>
              )
        }
      ]
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.onUserActiveChange = this.onUserActiveChange.bind(this);
  }

  componentDidMount() {
    this.getRoles();
    this.getUsers();
  }

  async getRoles() {
    try {
      const roleOptions = (await gateway.formRequest(
        "GET",
        `/datamanage/manage/sys/role/list`
      )).data.map(item => {
        item.value = item.roId;
        item.text = item.roName;
        return item;
      });

      this.setState({ roleOptions });
    } catch (error) {
      message.error(`读取角色配置失败`);
    }
  }

  async getUsers() {
    this.setState({ isLoading: true });
    const { current, pageSize, searchText } = this.state;
    let data = [],
      total = 0;
    try {
      const resp = await gateway.formRequest(
        "GET",
        `/datamanage/manage/sys/master/list`,
        {
          where: {
            keyWord: searchText,
            pageNum: current,
            pageSize
          }
        }
      );

      total = resp.count;

      data = resp.data.map(item => {
        return {
          key: item.maId,
          id: item.maId,
          account: item.username,
          roleId: item.roId,
          roleName: item.roName,
          avatar: item.maAvatar,
          name: item.maName,
          tel: item.maTel,
          birthday: item.maBirthday,
          isActive: item.maState
        };
      });
    } catch (error) {
      message.error(`读取用户信息失败`);
    }

    this.setState({ data, total, isLoading: false });
  }

  onSearch(event) {
    this.setState({ searchText: event.target.value.replace(/^\s+|\s+$/g, "") });

    if (this.delaySearch) {
      clearTimeout(this.delaySearch);
    }
    this.delaySearch = setTimeout(this.getUsers, 500);
  }

  onPageChange(value) {
    this.setState({ current: value }, this.getUsers);
  }

  async handleOk(itemInfo) {
    this.setState({ confirmLoading: true });

    itemInfo.maName = itemInfo.name;
    itemInfo.username = itemInfo.account;
    itemInfo.roId = itemInfo.roleId;
    itemInfo.maState = itemInfo.isActive ? 1 : 0;

    try {
      if (itemInfo.id) {
        itemInfo.maId = itemInfo.id;
        const resp = await gateway.formRequest(
          "POST",
          `/datamanage/manage/sys/master/modify`,
          {
            data: itemInfo
          }
        );
      } else {
        itemInfo.maState = 1;
        itemInfo.password = '123456';
        const resp = await gateway.formRequest(
          "POST",
          `/datamanage/manage/sys/master/add`,
          {
            data: itemInfo
          }
        );
      }
      this.setState({ visible: false });
    } catch (error) {
      message.error(`提交失败`);
    }

    this.setState({ confirmLoading: false });
    this.getUsers();
  }

  handleCancel() {
    this.setState({
      visible: false,
      info: {}
    });
  }

  async onUserActiveChange(dataItem) {
    dataItem.maState = !dataItem.isActive ? 1 : 0;
    dataItem.maId = dataItem.id;
    try {
      await gateway.formRequest(
        "POST",
        `/datamanage/manage/sys/master/modify`,
        {
          data: dataItem
        }
      );
    } catch (error) {
      message.error(`更新失败`);
    }

    this.getUsers();
  }

  render() {
    const {
      isLoading,
      visible,
      confirmLoading,
      roleOptions,
      searchText,
      data,
      info,
      columns,
      current,
      pageSize,
      total
    } = this.state;

    return (
      <div className="users">
        <Header />
        <Layout.Content className="content">
          <div className="content-center">
            <div className="topbar">
              <Input.Search
                className="search"
                placeholder="请输入姓名"
                value={searchText}
                onChange={this.onSearch}
              />
              <Button
                className="button-add"
                onClick={e =>
                  this.setState({
                    visible: true,
                    info: {
                      roleId: roleOptions.length > 0 ? roleOptions[0].value : ""
                    }
                  })
                }
              >
                <Icon type="plus" />
              </Button>
            </div>
            <div className="list">
              <Table
                loading={isLoading}
                columns={columns}
                dataSource={data}
                pagination={{
                  current,
                  pageSize,
                  total,
                  onChange: this.onPageChange
                }}
              />
            </div>
            <Modal
              title="用户信息维护"
              visible={visible}
              confirmLoading={confirmLoading}
              onOk={e => this.handleOk(info)}
              onCancel={this.handleCancel}
              okText="确认"
              cancelText="取消"
            >
              <ul className="users-info-edit">
                <li>
                  <div className="name">登录账号</div>
                  <Input
                    size="small"
                    className="name-value"
                    value={info.account}
                    onChange={e => {
                      info.account = e.target.value;
                      this.setState({ info });
                    }}
                  />
                </li>
                <li>
                  <div className="name">登录密码</div>
                  <Input
                    size="small"
                    className="name-value"
                    type="password"
                    value={info.password}
                    onChange={e => {
                      info.password = e.target.value;
                      this.setState({ info });
                    }}
                  />
                </li>
                <li>
                  <div className="name">姓名</div>
                  <Input
                    size="small"
                    className="name-value"
                    value={info.name}
                    onChange={e => {
                      info.name = e.target.value;
                      this.setState({ info });
                    }}
                  />
                </li>
                <li>
                  <div className="name">角色</div>
                  <Select
                    className="minw120"
                    size="small"
                    placeholder="请选择角色"
                    value={info.roleId}
                    onChange={value => {
                      info.roleId = value;
                      this.setState({ info });
                    }}
                  >
                    {roleOptions.map(item => (
                      <Select.Option value={item.value}>
                        {item.text}
                      </Select.Option>
                    ))}
                  </Select>
                </li>
              </ul>
            </Modal>
          </div>
        </Layout.Content>
      </div>
    );
  }
}

export default Users;
