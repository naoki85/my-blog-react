import axios from 'axios';
import { Post } from '../types/state';
import { ActionsUnion, createAction } from './types';
import { Dispatch, AnyAction } from 'redux';

export enum TypeKeys {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL',
  FETCH_POST = 'FETCH_POST',
  FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS',
  FETCH_POST_FAIL = 'FETCH_POST_FAIL',
}

declare let process: {
  env: {
    REACT_APP_API_URL: string;
  };
};

const apiURL = process.env.REACT_APP_API_URL;
const defaultRequestHeaders = {
  "content-type": "application/json"
};
const defaultRequestBody = {};

interface FetchPostsResponse {
  Posts: Post[];
  MaxPage: number;
  Page: number;
}

const fetchPostsStart = () => createAction(TypeKeys.FETCH_POSTS, {});
const fetchPostStart = () => createAction(TypeKeys.FETCH_POST, {});

const fetchPostsSuccess = (data: FetchPostsResponse) =>
  createAction(TypeKeys.FETCH_POSTS_SUCCESS, {
    data,
  });
const fetchPostSuccess = (data: FetchPostsResponse) =>
  createAction(TypeKeys.FETCH_POST_SUCCESS, {
    data,
  });

const fetchPostsFail = (error: Error) =>
  createAction(TypeKeys.FETCH_POSTS_FAIL, { message: error.message });
const fetchPostFail = (error: Error) =>
  createAction(TypeKeys.FETCH_POST_FAIL, { message: error.message });

const fetchPosts = (page: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchPostsStart());
    try {
      const query = `?page=${page}`;
      const response = await axios.get(`${apiURL}/posts${query}`, {
        headers: defaultRequestHeaders,
        data: defaultRequestBody
      });
      const resBody = (apiURL === 'http://localhost:4000' ? response.data.body : response.data);
      const payload = {
        Posts: resBody.Posts,
        MaxPage: resBody.TotalPage,
        Page: page,
      };
      dispatch(fetchPostsSuccess(payload));
    } catch (e) {
      dispatch(fetchPostsFail(e));
      window.location.href = '/not_found';
    }
  };
};
const fetchPost = (id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchPostStart());
    try {
      const response = await axios.get(`${apiURL}/posts/${String(id)}`, {
        headers: defaultRequestHeaders,
        data: defaultRequestBody
      });
      const post = (apiURL === 'http://localhost:4000' ? response.data.body : response.data);
      const payload = {
        Posts: [post],
        MaxPage: 1,
        Page: 1,
      };
      dispatch(fetchPostSuccess(payload));
    } catch (e) {
      dispatch(fetchPostFail(e));
      window.location.href = '/not_found';
    }
  };
};

export const DispatchActions = {
  fetchPostsSuccess,
  fetchPostsFail,
  fetchPostSuccess,
  fetchPostFail,
  fetchPostsStart,
  fetchPostStart,
};
export const Actions = {
  ...DispatchActions,
  fetchPosts,
  fetchPost,
};
export type Actions = ActionsUnion<typeof DispatchActions>;
