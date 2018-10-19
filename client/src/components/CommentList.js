import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

const CommentList = props => {
  return (
    <ListGroup>
      {props.notes.map(note => (
        <ListGroupItem key>
          <Button color="danger" className="mr-2" size="sm" onClick={event => props.handleDelete(note._id, event)}>
            Delete Note
          </Button>
          {note.noteText}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default CommentList;
