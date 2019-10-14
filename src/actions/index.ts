import axios from 'axios';
import { Post } from '../types/state';
import { ActionsUnion, createAction } from './types';
import { Dispatch, AnyAction } from 'redux';
import { apiURL, localStorageItemName } from '../config/const';
import {history} from "../index";

export enum TypeKeys {
  FETCH_POSTS = 'FETCH_POSTS',
  FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL',
  FETCH_POST = 'FETCH_POST',
  FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS',
  FETCH_POST_FAIL = 'FETCH_POST_FAIL',
  CREATE_POST = 'CREATE_POST',
  CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS',
  CREATE_POST_FAIL = 'CREATE_POST_FAIL',
}

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
const createPostStart = () => createAction(TypeKeys.CREATE_POST, {});

const fetchPostsSuccess = (data: FetchPostsResponse) =>
  createAction(TypeKeys.FETCH_POSTS_SUCCESS, {
    data,
  });
const fetchPostSuccess = (data: FetchPostsResponse) =>
  createAction(TypeKeys.FETCH_POST_SUCCESS, {
    data,
  });
const createPostSuccess = (data: { status: 'success' | 'error'; message: string }) =>
  createAction(TypeKeys.CREATE_POST_SUCCESS, { data });

const fetchPostsFail = (error: Error) =>
  createAction(TypeKeys.FETCH_POSTS_FAIL, { message: error.message });
const fetchPostFail = (error: Error) =>
  createAction(TypeKeys.FETCH_POST_FAIL, { message: error.message });
const createPostFail = (data: { status: 'success' | 'error'; message: string }) =>
  createAction(TypeKeys.CREATE_POST_FAIL, { data });

const fetchPosts = (page: number, all: boolean) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchPostsStart());
    let headers = {};
    try {
      if (all) {
        const token = localStorage.getItem(localStorageItemName);
        const mergedHeader = Object.assign({}, defaultRequestHeaders);
        headers = Object.assign(mergedHeader, {
          Authorization: 'Bearer ' + token,
        });
      } else {
        headers = defaultRequestHeaders;
      }
      const query = `?page=${page}`;
      const response = await axios.get(`${apiURL}/posts${query}`, {
        headers,
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

interface CreatePostValue {
  title?: string;
  content?: string;
  publishedAt?: string;
  category?: string;
  imagUrl?: File;
}

const createPost = (values: CreatePostValue) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(createPostStart());
    let mergedBody = Object.assign({}, defaultRequestBody);
    mergedBody = Object.assign(mergedBody, values);
    const token = localStorage.getItem(localStorageItemName);
    let mergedHeader = Object.assign({}, defaultRequestHeaders);
    mergedHeader = Object.assign(mergedHeader, {
      Authorization: 'Bearer ' + token,
    });

    try {
      await axios.post(`${apiURL}/posts`,
        JSON.stringify(mergedBody),
        { headers: mergedHeader });
      dispatch(createPostSuccess({
        status: 'success',
        message: 'success to create post',
      }));
    } catch (e) {
      if (e.response.status === 401) {
        // eslint-disable-next-line no-console
        console.log('logout action');
        localStorage.setItem(localStorageItemName, '');
        history.push('/admin/login');
      } else {
        dispatch(createPostFail(e));
      }
    }
  };
};

export const DispatchActions = {
  fetchPostsSuccess,
  fetchPostsFail,
  fetchPostSuccess,
  fetchPostFail,
  createPostSuccess,
  createPostFail,
  fetchPostsStart,
  fetchPostStart,
  createPostStart,
};
export const Actions = {
  ...DispatchActions,
  fetchPosts,
  fetchPost,
  createPost,
};
export type Actions = ActionsUnion<typeof DispatchActions>;
