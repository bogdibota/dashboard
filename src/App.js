import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

const mapStateToProps = ({ command: { commands } }) => ({
  commands
});

class App extends Component {
  render() {
    const { commands } = this.props;
    return (
      <div className="App">
        {JSON.stringify(commands)}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
