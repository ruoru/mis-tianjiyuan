import React from "react";
import { render } from "react-dom";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import DevTools from "mobx-react-devtools";

class AppState {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  @action.bound
  reset() {
    this.timer = 0;
  }

  async getData () {
    
  }
}

const TimerView = observer(({ appState }) => (
  <button onClick={appState.reset}>Seconds passed: {appState.timer}</button>
));

render(
  <div>
    <TimerView appState={new AppState()} />
    <DevTools />
  </div>,
  document.getElementById("root")
);



// import React, { Component, PropTypes } from 'react';
// import { Switch, Route } from 'react-router-dom';

// class App extends Component {

//   constructor (props) {
//     super(props);
//   }

//   render() {
//     return (
//       <div className="app">
//         <Switch>
//           <Route exact path="/home" component={SandwichLayout} />
//           <Route path="/" component={SideLayout} />
//         </Switch>
//       </div>
//     );
//   }
// }

// App.propTypes = {

// }

// export default connect()(App)