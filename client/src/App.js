import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch, NavLink as RRNavLink } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Nav, NavItem, Jumbotron, Navbar, NavLink, Button } from 'reactstrap';

import Home from './Pages/Home';
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

  scrapeArticles = () => {
    API.scrape().then(() => {
      this.loadArticles();
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
                  <NavLink href="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/saved">Saved</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/help">Help</NavLink>
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
                <Button color="primary" block onClick={this.scrapeArticles}>
                  Scrape new stories
                </Button>
              </Jumbotron>
              <Switch>
                <Route exact path="/saved" render={props => <Home {...props} articles={this.state.articles} saved />} />
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
                    <i className="fab fa-github" /> <a href="https://github.com/cslin82/mongo-react-news-scraper">@cslin82/mongo-react-news-scraper</a> on GitHub
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
