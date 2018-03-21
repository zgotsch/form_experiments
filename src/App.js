// @flow
import React, { Component } from 'react';
import { graphql, QueryRenderer } from 'react-relay';

import logo from './logo.svg';
import './App.css';

import environment from './relayEnvironment';

class App extends Component<{}> {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query AppHelloQuery {
              hello
            }
          `}
          variables={{}}
          render={({ error, props }) => {
            if (error) {
              return <div>Error!</div>;
            }
            if (!props) {
              return <div>Loading...</div>;
            }
            return <div>{props.hello}</div>;
          }}
        />
      </div>
    );
  }
}

export default App;
