import './index.scss';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { message, Alert, Tabs, Input, Icon, Checkbox, Button } from 'antd';
import gateway from '../../utils/getGateway';
import environments from '../../../config/environments';
const environment = environments[process.env.NODE_ENV];

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginType: 'account',
      account: '',
      password: '',
      phone: '',
      smscode: '',
      isLoginFail: false,
      isLoging: false,
      nextSmscodeSeconds: -1,
    };

    this.onLogin = this.onLogin.bind(this);
    this.getSMSCode = this.getSMSCode.bind(this);
  }

  componentDidMount() {
    this.renderSMSCodeSeconds = (seconds) => {
      if (seconds > 0) {
        setTimeout(() => {
          this.setState({ nextSmscodeSeconds: seconds - 1 });
          this.renderSMSCodeSeconds(seconds - 1);
        }, 1000);
      } else {
        this.setState({ nextSmscodeSeconds: -1 });
      }
    }
  }

  async getSMSCode() {
    const { phone, smscode } = this.state;
    try {
      const response = await gateway.formRequest('GET', ``, {}, true);

      this.setState({ nextSmscodeSeconds: 60 });
      this.renderSMSCodeSeconds(10);
    } catch (error) {
      message.error(`发送失败，请刷新后重试。`)
    }
  }

  async onLogin() {
    const { history } = this.props;
    const { loginType, account, password, phone, smscode } = this.state;

    this.setState({ isLoginFail: false, isLoging: true });

    try {
      let response = {};

      if (loginType === 'account') {
        response = await gateway.formRequest('POST', `/datamanage/manage/login`, {
          data: {
            userName: account,
            password,
          }
        }, true);
      } else {
        response = await gateway.formRequest('POST', `/datamanage/manage/smslogin`, {
          data: {
            phone,
            smscode,
          }
        }, true);
      }

      if (response.data) {
        localStorage.setItem('jwToken', response.data);
        const userInfo = (await gateway.formRequest('GET', `/datamanage/manage/index/userInfo`)).data;
        localStorage.setItem('userName', userInfo.maName);
        localStorage.setItem('userAvatar', userInfo.maAvatar);

        history.push(`/`);
      } else {
        this.setState({ isLoginFail: true });
      }
    } catch (error) {
      message.error("网络异常");
    }

    this.setState({ isLoging: false });
  }

  render() {
    const { loginType, account, password, phone, smscode, isLoginFail, nextSmscodeSeconds, isLoging } = this.state;

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
                {isLoginFail ? <Alert message="账号与密码不匹配" type="error" /> : ''}
              </div>
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
                  type="password"
                  value={password}
                  placeholder="密 码"
                  prefix={<Icon type="lock" className="input-color" />}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane key="phone" tab="手机验证码登录" className="form">
              <div>
                {isLoginFail ? <Alert message="账号与密码不匹配" type="error" /> : ''}
              </div>
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
                <Button
                  onClick={this.getSMSCode}
                  disabled={nextSmscodeSeconds > 0}
                >
                  {nextSmscodeSeconds > 0 ? `${nextSmscodeSeconds} s` : '获取验证码'}
                </Button>
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
            <Button
              type="primary"
              className="w100p btn-login"
              loading={isLoging}
              onClick={this.onLogin}
            >
              登 录
            </Button>
          </div>

          <div className="other-help">
            <div>
              <span>其他登录方式</span>
              <div className="login-type">
                <Icon type="wechat" theme="outlined" />
                <Icon type="qq" theme="outlined" />
                <Icon type="weibo" theme="outlined" />
              </div>
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

export default withRouter(Login);
