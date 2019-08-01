import { Post } from '../types/state';

export enum TypeKeys {
  FETCH_POSTS = 'FETCH_POSTS',
}

export interface PostsAction {
  type: TypeKeys;
  posts: Post[];
}

export const fetchPosts = (): PostsAction => ({
  posts: [],
  type: TypeKeys.FETCH_POSTS
});
