import { Dispatch } from 'react';

export interface Post {
  Id: number;
  PostCategoryId: number;
  Title: string;
  Content?: string;
  ImageUrl: string;
  PublishedAt: string;
  PostCategory: PostCategory;
}

export interface PostCategory {
  Id: number;
  Name: string;
  Color: string;
}

export interface StoreState {
  type: string;
  dispatch: Dispatch;
  posts: Post[];
}

export interface Match {
  params: { [key: string]: string };
}
