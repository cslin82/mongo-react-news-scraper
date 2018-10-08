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
              <Nav navbar>
                <NavItem>
                  {/* TODO fix a tag nesting */}
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
            <div className="container">
              <Jumbotron>
                <h1 className="display-4">Mozilla Blog article scraper</h1>
                <p className="lead">
                  This Node.js-Express-MongoDB-Mongoose app scrapes blog posts from Mozilla into a Mongo database. It
                  lets you save and make notes on them.
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

            <footer className="container py-5">
              <div className="row">
                <div className="col-md">
                  <hr />
                  <p className="d-block bg-secondary mb-3 p-1 text-light text-center rounded">All caught up!</p>
                  <p className="d-block mb-3 text-center">
                    <i className="fab fa-github" />
                    <a href="https://github.com/cslin82/mongo-react-news-scraper"> @cslin82/mongo-react-news-scraper</a> on GitHub
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
