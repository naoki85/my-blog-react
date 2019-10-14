import { Dispatch } from 'react';

export interface Post {
  Id: number;
  Category: string;
  Title: string;
  Content?: string;
  ImageUrl: string;
  PublishedAt: string;
}

export interface PostsState {
  Posts: Post[];
  Page: number;
  MaxPage: number;
  loading: boolean;
  status?: AuthenticationStatus;
  message?: string;
}

export interface RecommendedBooksStore {
  Books: RecommendedBook[];
  loading: boolean;
}

export interface StoreState {
  type: string;
  dispatch: Dispatch;
  posts: PostsState;
  recommendedBooks: RecommendedBooksStore;
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
