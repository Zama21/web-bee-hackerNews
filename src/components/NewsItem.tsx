import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { INewsItem } from '../types/newsTypes';

interface NewsItemProps {
  item: INewsItem;
}

const NewsItem: React.FC<NewsItemProps> = ({ item }) => {
  return (
    <NewsItemContainer>
      <StyledLink to={`/news/${item.id}`}>
        <Title>{item.title}</Title>
        <Info>Автор: {item.user}</Info>
        <Info>Рейтинг: {item.points}</Info>
        <Info>Дата: {new Date(item.time).toLocaleString()}</Info>
      </StyledLink>
    </NewsItemContainer>
  );
};

export default NewsItem;

const NewsItemContainer = styled.li`
  list-style: none;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover h3 {
    color: #007bff;
  }
`;

const Title = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.5em;
`;

const Info = styled.p`
  margin: 5px 0;
  font-size: 0.9em;
  color: #666;
`;
