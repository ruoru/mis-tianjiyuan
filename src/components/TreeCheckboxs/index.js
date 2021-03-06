import "./index.scss";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Checkbox } from "antd";

class TreeCheckboxs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gutter: 24
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(value)
    }
  }

  renderCheckboxTree(data, dataMap, offset = 0) {
    const { gutter } = this.state
    const checkboxTree = [];
    for (let item of data) {
      if (Array.isArray(item[dataMap.children])) {
        const arr = this.renderCheckboxTree(item[dataMap.children], dataMap, offset + 1);
        if (arr.length > 0) {
          checkboxTree.push(<>
            <Row gutter={gutter}>
              <Col offset={offset}>
                <Checkbox value={item[dataMap.value]}>{item[dataMap.text]}</Checkbox>
              </Col>
            </Row>
            {arr}
          </>);
        }
      } else {
        checkboxTree.push(<Row gutter={gutter}>
          <Col offset={offset}>
            <Checkbox value={item[dataMap.value]}>{item[dataMap.text]}</Checkbox>
          </Col>
        </Row>);
      }
    }
    return checkboxTree;
  }

  render() {
    const { values, data, dataMap } = this.props;
    return (
      <Checkbox.Group style={{ width: "100%" }} value={values} onChange={this.onChange}>
        {this.renderCheckboxTree(data, dataMap)}
      </Checkbox.Group>
    );
  }
}

TreeCheckboxs.propTypes = {
  values: PropTypes.array,
  data: PropTypes.array.isRequired,
  dataMap: PropTypes.object,
  onChange: PropTypes.func
};

TreeCheckboxs.defaultProps = {
  values: [],
  data: [],
  dataMap: {
    value: "value",
    text: "text",
    children: "children"
  }
};

export default TreeCheckboxs;
