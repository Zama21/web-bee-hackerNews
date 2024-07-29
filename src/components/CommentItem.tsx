import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { IComment } from '../types/newsTypes';

interface CommentItemProps {
  comment: IComment;
  level?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, level = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <CommentContainer $level={level}>
      <p>
        <strong>Автор:</strong> {comment.user}
      </p>
      <p>
        <strong>Дата:</strong> {new Date(comment.time * 1000).toLocaleString()}
      </p>
      <p dangerouslySetInnerHTML={{ __html: comment.content }} />
      {comment.comments.length > 0 && (
        <ReplyButton onClick={() => setShowReplies(!showReplies)}>
          {showReplies ? 'Скрыть ответы' : 'Показать ответы'}
        </ReplyButton>
      )}
      {showReplies && comment.comments.length > 0 && (
        <RepliesList>
          {comment.comments.map((reply) => (
            <CommentItem key={reply.id} comment={reply} level={level + 1} />
          ))}
        </RepliesList>
      )}
    </CommentContainer>
  );
};

export default CommentItem;

const primaryCommentStyle = css`
  background-color: #e1e1e1;
`;

const CommentContainer = styled.li<{ $level: number }>`
  padding: 10px;
  border-bottom: 1px solid #000;
  background-color: #ffffff;

  ${(props) => props.$level % 2 == 0 && primaryCommentStyle}
`;

const ReplyButton = styled.button`
  display: block;
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const RepliesList = styled.ul`
  margin-top: 10px;
  padding-left: 20px;
  list-style-type: none;
`;
