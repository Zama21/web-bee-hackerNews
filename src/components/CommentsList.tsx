import React from 'react';
import CommentItem from './CommentItem';
import styled from 'styled-components';
import { IComment } from '../types/newsTypes';

interface CommentsListProps {
  comments: IComment[];
}

const CommentsList: React.FC<CommentsListProps> = ({ comments }) => {
  return (
    <CommentsContainer>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </CommentsContainer>
  );
};

export default CommentsList;

const CommentsContainer = styled.ul`
  margin-top: 20px;
  padding: 0;
  list-style-type: none;
`;
