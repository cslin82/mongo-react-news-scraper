import React from 'react';
import Moment from 'react-moment';
import CommentList from './CommentList';

import {
  Card,
  CardImg,
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

const ArticleView = props => {
  return (
    <Card className="mb-3">
      <CardBody>
        <CardTitle>
          <a href={props.article.url}>{props.article.title}</a>
          <span className="float-right">
            {props.article.saved ? <Badge color="danger">Unsave</Badge> : <Badge color="primary">Save</Badge>}
          </span>
        </CardTitle>

        <CardSubtitle>by {props.article.author}</CardSubtitle>
        <CardText>{props.article.summary}</CardText>
        {props.article.saved &&
          props.article.notes.length > 0 && (
            <CardText>
              <CommentList notes={props.article.notes} />
            </CardText>
          )}
        {props.saved && (
          <Form>
            <FormGroup>
              <Label for={'note-text-' + props.article._id}>New note</Label>

              <Input name="comment" id={'comment-' + props.article._id} />
            </FormGroup>
          </Form>
        )}
      </CardBody>
      <CardFooter>
        Posted on <Moment format="LL" date={props.article.publishDate} />
      </CardFooter>
    </Card>
  );
};

export default ArticleView;
