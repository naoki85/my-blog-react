import axios from 'axios';
import { Post } from '../types/state';
import { ActionsUnion, createAction } from './types';
import { Dispatch, AnyAction } from 'redux';

export enum TypeKeys {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL',
}

declare let process: {
  env: {
    REACT_APP_API_URL: string;
  };
};

const apiURL = process.env.REACT_APP_API_URL;

const fetchPostsStart = () => createAction(TypeKeys.FETCH_POSTS, {});

const fetchPostsSuccess = (data: Post[]) =>
  createAction(TypeKeys.FETCH_POSTS_SUCCESS, {
    data,
  });

const fetchPostsFail = (error: Error) =>
  createAction(TypeKeys.FETCH_POSTS_FAIL, { message: error.message });

const fetchPosts = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchPostsStart());
    try {
      const response = await axios.get(`${apiURL}/posts`);
      dispatch(fetchPostsSuccess(response.data.body.Posts));
    } catch (e) {
      dispatch(fetchPostsFail(e));
    }
  };
};

export const DispatchActions = {
  fetchPostsSuccess,
  fetchPostsFail,
};
export const Actions = {
  ...DispatchActions,
  fetchPosts,
};
export type Actions = ActionsUnion<typeof DispatchActions>;
