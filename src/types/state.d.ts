import { Dispatch } from 'react';

export interface Post {
  id: number;
  postCategoryId: number;
  title: string;
  imageUrl: string;
  publishedAt: string;
  postCategory: PostCategory;
}

export interface PostCategory {
  id: number;
  name: string;
  color: string;
}

export interface StoreState {
  type: string;
  dispatch: Dispatch;
  posts: Post[];
}
