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

export interface PostsState {
  Posts: Post[];
  Page: number;
  MaxPage: number;
  loading: boolean;
}

export interface StoreState {
  type: string;
  dispatch: Dispatch;
  posts: PostsState;
  recommendedBooks: RecommendedBook[];
  auth: Auth;
}

export interface Match {
  params: { [key: string]: string };
}

export interface Location {
  pathname: string;
}

export interface RecommendedBook {
  Id: number;
  Link: string;
  ImageUrl: string;
  ButtonUrl: string;
}

type AuthenticationStatus = "success" | "error";
export interface Auth {
  Status?: AuthenticationStatus;
  Message?: string;
}
