import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

import { Nav, NavBar, NavItem, Jumbotron, Navbar } from 'reactstrap';

import Home from './Pages/Home';
import Saved from './Pages/Saved';
import Help from './Pages/Help';

import API from './Utils/API';

class App extends Component {
  state = {
    articles: [],
    scrapePage: 1
  };
  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getPosts().then(res => {
      this.setState({ articles: res.data });
    });
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar color="light" light expand="md">
              <Nav>
                <NavItem>
                  <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/saved">Saved</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/help">Help</NavLink>
                </NavItem>{' '}
              </Nav>
            </Navbar>
            <Jumbotron>
              <h1 className="display-4">Mozilla Blog article scraper</h1>
              <p className="lead">
                This Node.js-Express-MongoDB-Mongoose app scrapes blog posts from Mozilla into a Mongo database. It lets
                you save and make notes on them.
              </p>
              <a className="btn btn-primary btn-block action-scrape" href="/scrape" role="button">
                Scrape new stories
              </a>
            </Jumbotron>
            <Switch>
              <Route exact path="/saved" component={Saved} />
              <Route exact path="/help" component={Help} />
              <Route exact path="/" render={props => <Home {...props} articles={this.state.articles} />} />
            </Switch>{' '}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
