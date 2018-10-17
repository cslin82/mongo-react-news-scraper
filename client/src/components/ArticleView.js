import React, { Component } from 'react';
import Moment from 'react-moment';
import CommentList from './CommentList';

import API from '../Utils/API';

import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardFooter,
  Badge,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';

class ArticleView extends Component {
  state = {
    noteText: ''
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.noteText) {
      API.echo({
        // API.postNote({
        noteText: this.state.noteText,
        articleId: this.props.article._id
      })
        .then(res => {
          console.log(res.data);
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Card className="mb-3">
        <CardBody>
          <CardTitle>
            <a href={this.props.article.url}>{this.props.article.title}</a>
            <span className="float-right">
              {this.props.article.saved ? <Badge color="danger">Unsave</Badge> : <Badge color="primary">Save</Badge>}
            </span>
          </CardTitle>

          <CardSubtitle>by {this.props.article.author}</CardSubtitle>
          <CardText>{this.props.article.summary}</CardText>
          {this.props.article.saved &&
            this.props.article.notes.length > 0 && (
              <CardText>
                <CommentList notes={this.props.article.notes} />
              </CardText>
            )}
          {this.props.saved && (
            <Form onSubmit={this.handleFormSubmit}>
              <FormGroup>
                <Label for={'note-text-' + this.props.article._id}>New note</Label>
                <Input
                  name="noteText"
                  id={'comment-' + this.props.article._id}
                  onChange={this.handleInputChange}
                  value={this.state.noteText}
                />
              </FormGroup>
            </Form>
          )}
        </CardBody>
        <CardFooter>
          Posted on <Moment format="LL" date={this.props.article.publishDate} />
        </CardFooter>
      </Card>
    );
  }
}

export default ArticleView;
