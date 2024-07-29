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
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('news', fetchNewsData, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length === 0) return undefined;
      return pages.length + 1;
    },
    staleTime: 60000,
    refetchInterval: 60000,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    let currentRef = observerRef.current;

    setTimeout(() => {
      currentRef = observerRef.current;
      if (currentRef) {
        observer.observe(currentRef);
      }
    }, 100);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage]);

  if (status === 'loading') return <LoadingMessage>Loading...</LoadingMessage>;
  if (status === 'error')
    return <ErrorMessage>Error loading news</ErrorMessage>;

  return (
    <Container>
      <Button onClick={() => refetch()}>Обновить новости</Button>
      <ul>
        {data?.pages.flat().map((item) => {
          return <NewsItem key={item.id} item={item} />;
        })}
      </ul>
      <div ref={observerRef}></div>
      {isFetchingNextPage && <LoadingMessage>Loading more...</LoadingMessage>}
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
