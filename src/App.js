import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const { app } = window.require('electron').remote;

class App extends Component {
  state = {
    someData: ''
  };

  constructor() {
    super();
    app.emit('dvk*get-some-data', (someData) => this.setState({ someData }));
  }

  render() {
    console.log(app);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React + Electron = <span role="img" aria-label="love">😍</span></h2>
        </div>
        <p>-{this.state.someData}-</p>
        <p className="App-intro">
          <b> Release 0.2.7 </b>
          Version: {app.getVersion()}
        </p>
      </div>
    );
  }
}

export default App;
