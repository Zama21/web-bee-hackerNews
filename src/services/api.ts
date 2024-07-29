import axios from 'axios';
import { INewsItem, INewsItemWithComment } from '../types/newsTypes';

const API_URL = 'https://api.hnpwa.com/v0';

export const fetchNewsData = async ({
  pageParam = 1,
}: { pageParam?: number } = {}) => {
  const { data } = await axios.get<INewsItem[]>(
    `${API_URL}/news/${pageParam}.json`
  );
  return data;
};

export const fetchNewsItem = async (id: string) => {
  const { data } = await axios.get<INewsItemWithComment>(
    `${API_URL}/item/${id}.json`
  );
  return data;
};
