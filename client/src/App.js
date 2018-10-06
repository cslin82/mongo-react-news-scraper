import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink as RRNavLink } from 'react-router-dom';

import { Nav, NavItem, Jumbotron, Navbar, NavLink } from 'reactstrap';

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
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink>
                    <RRNavLink to="/">Home</RRNavLink>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <RRNavLink to="/saved">Saved</RRNavLink>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>
                    <RRNavLink to="/help">Help</RRNavLink>
                  </NavLink>
                </NavItem>
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
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
