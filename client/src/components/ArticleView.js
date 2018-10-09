import React, { Component } from 'react';
import Moment from 'react-moment';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardFooter, Badge } from 'reactstrap';

const ArticleView = props => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <a href={props.article.url}>{props.article.title}</a>
          <span className="float-right">
            {props.article.saved ? <Badge color="danger">Unsave</Badge> : <Badge color="primary">Save</Badge>}
          </span>
        </CardTitle>

        <CardSubtitle>by {props.article.author}</CardSubtitle>
        <CardText>{props.article.summary}</CardText>
      </CardBody>
      <CardFooter>
        Posted on <Moment format="LL" date={props.article.publishDate} />
      </CardFooter>
    </Card>
  );
};

export default ArticleView;
