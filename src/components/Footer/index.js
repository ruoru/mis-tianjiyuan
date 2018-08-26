import React, { Component } from "react";
import { Layout } from 'antd';

class Footer extends Component {
  render() {
    return (
      <Layout.Footer className="footer">
        <p>
          <span>© , Gowild Digital Co., Ltd. All Rights Reserved.</span>
          <span>深圳狗尾草智能科技有限公司</span>
        </p>
        <p className="case-number">
          <a href="#">深ICP证00000号</a>
          <a href="#" className="police">深公网安备00000000000</a>
        </p>
      </Layout.Footer>
    );
  }
}

export default Footer;
