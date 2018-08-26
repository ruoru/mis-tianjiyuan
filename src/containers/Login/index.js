import "./index.scss";
import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { message, Tabs, Input, Icon, Checkbox, Button } from "antd";
import Nav from "../../components/Nav";
import getGateway from "../../utils/getGateway";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginType: "account",
      account: "",
      password: "",
      phone: "",
      smscode: ""
    };

    this.onLogin = this.onLogin.bind(this);
  }

  async onLogin() {
    const { loginType, account, password, phone, smscode } = this.state;

    let status = false;
    try {
      if (loginType === "account") {
        await getGateway.middleware('POST', `/asd/asd`, {
          data: {
            account,
            password,
          }
        })
      } else {
        await getGateway.middleware('POST', `/asd/asd`, {
          data: {
            phone,
            smscode,
          }
        })
      }

      if(status) {
        location.push(`/`);
      } else {
        message.error('账号或密码不匹配');
      }
    } catch (error) {
      message.error('网络异常');
    }
  }

  render() {
    const { loginType, account, password, phone, smscode } = this.state;

    return (
      <div className="login">
        <div className="login-wrap">
          <div className="title">
            <div className="logo-wrap">
              <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
              <h1>Ant Design Pro</h1>
            </div>
            <div className="description">
              <p>Ant Design Pro 是东半球最具影响力的 Web 设计规范</p>
            </div>
          </div>

          <Tabs
            activeKey={loginType}
            onChange={value => this.setState({ loginType: value })}
          >
            <Tabs.TabPane key="account" tab="账号密码登录" className="form">
              <div>
                <Input
                  value={account}
                  placeholder="账 号"
                  prefix={<Icon type="user" className="input-color" />}
                  onChange={e => this.setState({ account: e.target.value })}
                />
              </div>
              <div>
                <Input
                  value={password}
                  placeholder="密 码"
                  prefix={<Icon type="lock" className="input-color" />}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane key="phone" tab="手机验证码登录" className="form">
              <div>
                <Input
                  value={phone}
                  placeholder="手机号"
                  prefix={<Icon type="mobile" className="input-color" />}
                  onChange={e => this.setState({ phone: e.target.value })}
                />
              </div>
              <div className="smscode-wrap">
                <Input
                  value={smscode}
                  placeholder="验证码"
                  prefix={<Icon type="mail" className="input-color" />}
                  onChange={e => this.setState({ smscode: e.target.value })}
                />
                <Button>获取验证码</Button>
              </div>
            </Tabs.TabPane>
          </Tabs>

          <div className="login-help">
            <div>
              <Checkbox>自动登录</Checkbox>
            </div>
            <div>
              <a>忘记密码</a>
            </div>
          </div>

          <div className="">
            <Button type="primary" className="w100p btn-login" onClick={this.onLogin}>
              登 录
            </Button>
          </div>

          <div className="other-help">
            <div>
              <span>其他登录方式</span>
            </div>
            <div>
              <a>注册账户</a>
            </div>
          </div>
        </div>

        <div className="footer">
          <div className="description">
            <a>帮助</a>
            <a>隐私</a>
            <a>条款</a>
          </div>
          <div>
            <p>
              TianJiYuan&nbsp;
              <Icon type="copyright" />
              &nbsp;2017
            </p>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Login;
