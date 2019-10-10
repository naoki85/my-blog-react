import axios from 'axios';
import { RecommendedBook } from '../types/state';
import { ActionsUnion, createAction } from './types';
import { Dispatch, AnyAction } from 'redux';
import { apiURL, localStorageItemName } from '../config/const';
import { history } from '../index';

export enum TypeKeys {
  FETCH_RECOMMENDED_BOOKS = 'FETCH_RECOMMENDED_BOOKS',
  FETCH_RECOMMENDED_BOOKS_SUCCESS = 'FETCH_RECOMMENDED_BOOKS_SUCCESS',
  FETCH_RECOMMENDED_BOOKS_FAIL = 'FETCH_RECOMMENDED_BOOKS_FAIL',
  CREATE_RECOMMENDED_BOOKS = 'CREATE_RECOMMENDED_BOOKS',
  CREATE_RECOMMENDED_BOOKS_SUCCESS = 'CREATE_RECOMMENDED_BOOKS_SUCCESS',
  CREATE_RECOMMENDED_BOOKS_FAIL = 'CREATE_RECOMMENDED_BOOKS_FAIL',
}

const defaultRequestHeaders = {
  "Content-Type": "application/json"
};
const defaultRequestBody = {};

const fetchRecommendedBooksStart = () => createAction(TypeKeys.FETCH_RECOMMENDED_BOOKS, {});
const createRecommendedBooksStart = () => createAction(TypeKeys.CREATE_RECOMMENDED_BOOKS, {});

const fetchRecommendedBooksSuccess = (data: RecommendedBook[]) =>
  createAction(TypeKeys.FETCH_RECOMMENDED_BOOKS_SUCCESS, {
    Books: data,
  });
const createRecommendedBooksSuccess = () =>
  createAction(TypeKeys.CREATE_RECOMMENDED_BOOKS_SUCCESS, {});

const fetchRecommendedBooksFail = (error: Error) =>
  createAction(TypeKeys.FETCH_RECOMMENDED_BOOKS_FAIL, { message: error.message });
const createRecommendedBooksFail = (error: Error) =>
  createAction(TypeKeys.CREATE_RECOMMENDED_BOOKS_FAIL, { message: error.message });

const fetchRecommendedBooks = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchRecommendedBooksStart());
    try {
      const response = await axios.get(`${apiURL}/recommended_books`, {
        headers: defaultRequestHeaders,
        data: defaultRequestBody
      });
      const resBody = (apiURL === 'http://localhost:4000' ? response.data.body : response.data);
      dispatch(fetchRecommendedBooksSuccess(resBody.RecommendedBooks));
    } catch (e) {
      dispatch(fetchRecommendedBooksFail(e));
    }
  };
};
const createRecommendedBooks = (link: string, imageUrl: string, buttonUrl: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(createRecommendedBooksStart());
    let mergedBody = Object.assign({}, defaultRequestBody);
    mergedBody = Object.assign(mergedBody, {
      Link: link, ImageUrl: imageUrl, ButtonUrl: buttonUrl});
    const token = localStorage.getItem(localStorageItemName);
    let mergedHeader = Object.assign({}, defaultRequestHeaders);
    mergedHeader = Object.assign(mergedHeader, {
      Authorization: 'Bearer ' + token,
    });

    try {
      await axios.post(`${apiURL}/recommended_books`,
        JSON.stringify(mergedBody),
        { headers: mergedHeader });
      dispatch(createRecommendedBooksSuccess());
    } catch (e) {
      if (e.response.status === 401) {
        // eslint-disable-next-line no-console
        console.log('logout action');
        localStorage.setItem(localStorageItemName, '');
        history.push('/admin/login');
      } else {
        dispatch(createRecommendedBooksFail(e));
      }
    }
  };
};

export const DispatchActions = {
  fetchRecommendedBooksSuccess,
  fetchRecommendedBooksFail,
  createRecommendedBooksSuccess,
  createRecommendedBooksFail,
  fetchRecommendedBooksStart,
  createRecommendedBooksStart,
};
export const RecommendedBooksActions = {
  ...DispatchActions,
  fetchRecommendedBooks,
  createRecommendedBooks,
};
export type RecommendedBooksActions = ActionsUnion<typeof DispatchActions>;
