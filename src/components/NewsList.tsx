import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { fetchNewsData } from '../services/api';
import NewsItem from './NewsItem';
import styled from 'styled-components';

const NewsList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('news', fetchNewsData, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
  });
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const currentRef = observerRef.current;

    if (!currentRef) return;

    observer.observe(currentRef);

    return () => {
      observer.unobserve(currentRef);
    };
  }, [fetchNextPage, status, observerRef.current]);

  if (status === 'error')
    return <ErrorMessage>Error loading news</ErrorMessage>;

  return (
    <Container>
      {(isFetching || status === 'loading') && (
        <LoadingMessage>Loading...</LoadingMessage>
      )}
      {status === 'success' && (
        <>
          <Button onClick={() => refetch()}>Обновить новости</Button>
          <ul>
            {data?.pages.flat().map((item) => {
              return <NewsItem key={item.id} item={item} />;
            })}
          </ul>
          {hasNextPage && !isFetchingNextPage && <div ref={observerRef}></div>}
          {isFetchingNextPage && (
            <LoadingMessage>Loading more...</LoadingMessage>
          )}
        </>
      )}
    </Container>
  );
};

export default NewsList;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Button = styled.button`
  display: block;
  margin: 20px auto;
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

const LoadingMessage = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 18px;
  color: red;
`;
