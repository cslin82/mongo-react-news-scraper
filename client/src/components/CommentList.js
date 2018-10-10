import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const CommentList = props => {
  return (
    <ListGroup>
      {props.notes.map(note => (
        <ListGroupItem key>{note.noteText}</ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CommentList;
