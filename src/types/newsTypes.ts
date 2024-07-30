export interface INewsItem {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
}
export interface INewsItemWithComment extends INewsItem {
  comments: IComment[];
}

export interface IComment {
  id: number;
  user: string;
  time: number;
  time_ago: string;
  type: string;
  content: string;
  comments: IComment[];
  comments_count: number;
  level: number;
  url: string;
}
