import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';

class SystemSettings extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { navToggle, navToggleAction } = this.props;

    return (
      <div>
        shezhi
      </div>
    );
  }
}

SystemSettings.propTypes = {
  navToggle: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
}

export default SystemSettings;