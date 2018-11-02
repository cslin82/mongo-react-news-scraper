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
  Button,
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
      // API.echo({
      API.postNote({
        noteText: this.state.noteText,
        articleId: this.props.article._id
      })
        .then(res => {
          this.props.updateArticle(this.props.article._id, res.data);
          console.log(res.data);
        })
        .catch(err => console.log(err));
    }
  };

  handleSave = (id, event) => {
    event.preventDefault();
    console.log('handleSave clicked', id);

    API.toggleStory(id).then(res => {
      this.props.updateArticle(id, res.data);
    });
  };

  handleDelete = (id, event) => {
    event.preventDefault();
    console.log('handleDelete clicked', id);
// this is calling with id of the note, need to figure out way to call getOnePost with the article ID
    API.deleteNote(id).then(() => API.getOnePost(id).then(res => this.props.updateArticle(id, res.data)));
  };

  render() {
    return (
      <Card className="mb-3">
        <CardBody>
          <CardTitle>
            <a href={this.props.article.url}>{this.props.article.title}</a>
            <span className="float-right">
              {this.props.article.saved ? (
                <Button
                  color="danger"
                  size="sm"
                  value={this.props.article._id}
                  onClick={event => this.handleSave(this.props.article._id, event)}
                >
                  Unsave
                </Button>
              ) : (
                <Button
                  color="primary"
                  size="sm"
                  value={this.props.article._id}
                  onClick={event => this.handleSave(this.props.article._id, event)}
                >
                  Save
                </Button>
              )}
            </span>
          </CardTitle>

          <CardSubtitle>by {this.props.article.author}</CardSubtitle>
          <CardText>{this.props.article.summary}</CardText>
          {this.props.article.saved &&
            this.props.article.notes.length > 0 && (
              <CardText tag="div">
                <CommentList notes={this.props.article.notes} handleDelete={this.handleDelete} />
                {/* add temporary view of new notes here? */}
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
