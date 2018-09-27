import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Container, Grid, Segment, Header } from 'semantic-ui-react';

import Home from './Pages/Home';
import Saved from './Pages/Saved';
import Help from './Pages/Help';

class App extends Component {
  render() {
    return (
      <Container>
        <Router>
          <Switch>
            <Route exact path="/saved" component={Saved} />
            <Route exact path="/help"component={Help}  />
            <Route exact path="/" component={Home} />
            {/* <Route /> */}

            <header className="App-header">
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </Switch>
        </Router>
      </Container>
    );
  }
}

export default App;
