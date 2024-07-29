import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchNewsItem } from '../services/api';
import CommentsList from './CommentsList';
import styled from 'styled-components';

const NewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: newsItem,
    isLoading,
    refetch: refetchNews,
  } = useQuery(['newsItem', id], () => fetchNewsItem(id), {
    staleTime: 60000,
    refetchInterval: 60000,
  });

  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Container>
      {isLoading && <LoadingMessage>Загрузка...</LoadingMessage>}

      {!isLoading && newsItem !== undefined && (
        <>
          <NewsButton onClick={handleBack}>Назад к списку новостей</NewsButton>
          <p>Заголовок: {newsItem.title}</p>
          <p>Автор: {newsItem.user}</p>
          <p>Дата: {new Date(newsItem.time).toLocaleString()}</p>
          <p>
            Ссылка на новость:
            <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
              {newsItem.url}
            </a>
          </p>
          <p>Количество комментариев: {newsItem.comments.length}</p>
          <NewsButton onClick={() => refetchNews()}>Обновить</NewsButton>
          <CommentsList comments={newsItem.comments} />
        </>
      )}
    </Container>
  );
};

export default NewsPage;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const LoadingMessage = styled.p`
  text-align: center;
  margin: 20px 0;
  font-size: 18px;
  color: #666;
`;

const NewsButton = styled.button`
  display: block;
  margin: 20px 0;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;
