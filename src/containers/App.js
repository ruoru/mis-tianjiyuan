import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { navToggle } from '../actions'
import CoreLayout from '../layouts/CoreLayout/components/CoreLayout'

class App extends Component {

  async getTime() {
    await setTimeout(()=>{console.log(1), 1000})
  }


  render() {
    this.getTime()
    // Injected by connect() call:
    const { dispatch, collapsed } = this.props;
    return (
      <div>
        <CoreLayout collapsed={collapsed} dispatch={dispatch} toggle={navToggle} />
      </div>
    )
  }
}

App.propTypes = {
  collapsed: PropTypes.bool.isRequired,
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function select(state) {
  return {
    collapsed: state.funNavToggle,
  }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App)