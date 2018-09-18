import "./index.scss";
import React, { Component } from "react";
import {
  message,
  Layout,
  Icon,
  Button,
  Table,
  Input,
  Drawer,
  Row,
  Col,
  Form,
} from "antd";
import Header from "../../components/Header";
import TreeCheckboxs from "../../components/TreeCheckboxs";
import gateway from "../../utils/getGateway";

class Roles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      visible: false,
      confirmLoading: false,
      authOptions: [],
      searchText: "",
      data: [],
      current: 1,
      pageSize: 10,
      total: 0,
      info: {},
      columns: [
        {
          title: "序号",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "名称",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "操作",
          key: "operation",
          render: item => (
            <a
              href="javascript:;"
              onClick={e => this.setState({ visible: true, info: { id: item.roId, name: item.name, authIds: item.authIds }, })}
            >
              编辑
            </a>
          )
        }
      ]
    };

    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.getRoles = this.getRoles.bind(this);
  }

  componentDidMount() {
    this.getAuths();
    this.getRoles();
  }

  async getAuths() {
    try {
      const resp = (await gateway.formRequest(
        "GET",
        `/datamanage/manage/sys/authority/roleAuth`,
        {
          where: {
            roId: 1
          }
        }
      )).data;

      this.setState({ authOptions: resp });
    } catch (error) {
      message.error(`读取权限配置失败`);
    }
  }

  async getRoles() {
    this.setState({ isLoading: true });
    const { current, pageSize, searchText } = this.state;
    let data = [],
      total = 0;

    try {
      const resp = await gateway.formRequest(
        "GET",
        `/datamanage/manage/sys/role/list`,
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
        item.key = item.roId;
        item.id = item.roId;
        item.name = item.roName;
        item.authIds = item.menuIds.split(',').map(item => parseInt(item));
        return item;
      });
    } catch (error) {
      message.error(`读取权限列表失败`);
    }

    this.setState({ data, total, isLoading: false });
  }

  onSearch(event) {
    this.setState({ searchText: event.target.value.replace(/^\s+|\s+$/g, "") });

    if (this.delaySearch) {
      clearTimeout(this.delaySearch);
    }
    this.delaySearch = setTimeout(this.getRoles, 500);
  }

  onPageChange(value) {
    this.setState({ current: value }, this.getRoles);
  }

  async handleOk(itemInfo) {
    this.setState({ confirmLoading: true });

    itemInfo.roName = itemInfo.name;

    if (!itemInfo.roName) {
      message.warning(`名称不得为空`);
      return;
    }

    try {
      if (itemInfo.id) {
        itemInfo.roId = itemInfo.id;
        const resp = await gateway.formRequest(
          "POST",
          `/datamanage/manage/sys/role/modify`,
          {
            data: itemInfo
          }
        );
      } else {
        const resp = await gateway.formRequest(
          "POST",
          `/datamanage/manage/sys/role/add`,
          {
            data: itemInfo
          }
        );
        itemInfo.id = resp.data;
      }

      const respAuths = await gateway.formRequest(
        "POST",
        `/datamanage/manage/sys/authority/saveAuth`,
        {
          data: {
            roId: itemInfo.id,
            menuIds: itemInfo.authIds.join(','),
          }
        }
      );

      this.setState({ visible: false });
    } catch (error) {
      message.error(`提交失败`);
    }

    this.setState({ confirmLoading: false });
    this.getRoles();
  }

  handleCancel() {
    this.setState({
      visible: false,
      info: {}
    });
  }

  render() {
    const {
      isLoading,
      visible,
      confirmLoading,
      authOptions,
      searchText,
      data,
      info,
      columns,
      current,
      pageSize,
      total
    } = this.state;

    return (
      <div className="roles">
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
                    info: {}
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

            <Drawer
              title="权限管理"
              width={400}
              placement="right"
              onClose={this.handleCancel}
              visible={visible}
              confirmLoading={confirmLoading}
              style={{
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: 53,
              }}
            >
              <div>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item label="名称">
                      <Input
                        className="w100p"
                        value={info.name}
                        onChange={e => {
                          info.name = e.target.value;
                          this.setState({ info });
                        }}
                        placeholder="请输入名称"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item label="权限列表">
                      <TreeCheckboxs
                        value={info.authIds}
                        data={authOptions}
                        dataMap={{ text: 'meName', value: 'meId', children: 'nodes' }}
                        onChange={value => {
                          info.authIds = value;
                          this.setState({ info });
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  borderTop: '1px solid #e8e8e8',
                  padding: '10px 16px',
                  textAlign: 'right',
                  left: 0,
                  background: '#fff',
                  borderRadius: '0 0 4px 4px',
                }}
              >
                <Button
                  style={{
                    marginRight: 8,
                  }}
                  onClick={this.handleCancel}
                >
                  取消
                </Button>
                <Button onClick={e => this.handleOk(info)} type="primary">确定</Button>
              </div>
            </Drawer>

          </div>
        </Layout.Content>
      </div >
    );
  }
}

export default Roles;
