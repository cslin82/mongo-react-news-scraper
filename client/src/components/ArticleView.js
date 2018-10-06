import React, { Component } from 'react';
import Moment from 'react-moment';

import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, CardFooter, Button } from 'reactstrap';

const ArticleView = props => {
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <a href={props.article.url}>{props.article.title}</a>
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
