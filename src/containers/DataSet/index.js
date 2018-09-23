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
  Select
} from "antd";
import Header from "../../components/Header";
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
          dataIndex: "key",
          key: "key"
        },
        {
          title: "标题",
          dataIndex: "title",
          key: "title"
        },
        {
          title: "类型",
          dataIndex: "typeName",
          key: "typeName"
        },
        {
          title: "标签",
          dataIndex: "tags",
          key: "tags"
        },
        {
          title: "所属领域",
          dataIndex: "domain",
          key: "domain"
        },
        {
          title: "数据集来源官网",
          dataIndex: "homePage",
          key: "homePage"
        },
        {
          title: "上传者",
          dataIndex: "author",
          key: "author"
        },
        {
          title: "操作",
          key: "operation",
          render: item => (
            <a
              href="javascript:;"
              onClick={e =>
                this.setState({
                  visible: true,
                  info: Object.assign({}, item)
                })
              }
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
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    this.setState({ isLoading: true });
    const { current, pageSize, searchText } = this.state;
    let data = [],
      total = 0;

    try {
      const resp = await gateway.formRequest(
        "GET",
        `/datamanage/manage/busi/agent/list`,
        {
          where: {
            keyWord: searchText,
            pageNum: current,
            pageSize
          }
        }
      );

      total = resp.count;

      data = resp.data.map((item, i) => {
        item.key = i + 1;
        item.typeName =
          (item.type == 0 && "普通agent") ||
          (item.type == 1 && "endpoint") ||
          (item.type == 2 && "个人数据集");
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
    this.delaySearch = setTimeout(this.getData, 500);
  }

  onPageChange(value) {
    this.setState({ current: value }, this.getData);
  }

  async handleOk(itemInfo) {
    this.setState({ confirmLoading: true });

    itemInfo.roName = itemInfo.name;

    // if (!itemInfo.roName) {
    //   message.warning(`名称不得为空`);
    //   return;
    // }

    try {
      if (itemInfo.id) {
        const resp = await gateway.formRequest(
          "POST",
          `/datamanage/manage/busi/agent/modify`,
          {
            data: {
              id: itemInfo.id,
              title: itemInfo.title,
              type: itemInfo.type,
              tags: itemInfo.tags,
              homePage: itemInfo.homePage,
              briefIntro: itemInfo.briefIntro
            }
          }
        );
      } else {
        const resp = await gateway.formRequest(
          "POST",
          `/datamanage/manage/busi/agent/add`,
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
    this.getData();
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
                height: "calc(100% - 55px)",
                overflow: "auto",
                paddingBottom: 53
              }}
            >
              <div>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item label="名称">
                      <Input
                        className="w100p"
                        value={info.title}
                        onChange={e => {
                          info.title = e.target.value;
                          this.setState({ info });
                        }}
                        placeholder="请输入名称"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item label="数据集来源官网">
                      <Input
                        className="w100p"
                        value={info.homePage}
                        onChange={e => {
                          info.homePage = e.target.value;
                          this.setState({ info });
                        }}
                        placeholder="请输入名称"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item label="类型">
                      <Select
                        value={info.type}
                        style={{ width: 120 }}
                        onChange={value => {
                          info.type = value;
                          this.setState({ info });
                        }}
                      >
                        <Select.Option value={0}>普通agent</Select.Option>
                        <Select.Option value={1}>endpoint</Select.Option>
                        <Select.Option value={2}>个人数据集</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item label="所属领域">
                      <Input
                        className="w100p"
                        value={info.domain}
                        onChange={e => {
                          info.domain = e.target.value;
                          this.setState({ info });
                        }}
                        placeholder="请输入名称"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item label="简介">
                      <Input.TextArea
                        className="w100p"
                        value={info.briefIntro}
                        onChange={e => {
                          info.briefIntro = e.target.value;
                          this.setState({ info });
                        }}
                        placeholder="请输入名称"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  borderTop: "1px solid #e8e8e8",
                  padding: "10px 16px",
                  textAlign: "right",
                  left: 0,
                  background: "#fff",
                  borderRadius: "0 0 4px 4px"
                }}
              >
                <Button
                  style={{
                    marginRight: 8
                  }}
                  onClick={this.handleCancel}
                >
                  取消
                </Button>
                <Button
                  loading={confirmLoading}
                  onClick={e => this.handleOk(info)}
                  type="primary"
                >
                  确定
                </Button>
              </div>
            </Drawer>
          </div>
        </Layout.Content>
      </div>
    );
  }
}

export default Roles;
