//import '../index.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon } from 'antd';
import { Switch, Route } from 'react-router-dom';


class DataComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { navToggle, navToggleAction } = this.props;

    return (
      <div>
        asd
      </div>
    );
  }
}

DataComponent.propTypes = {
  navToggle: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default DataComponent;
