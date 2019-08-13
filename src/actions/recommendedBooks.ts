import axios from 'axios';
import { RecommendedBook } from '../types/state';
import { ActionsUnion, createAction } from './types';
import { Dispatch, AnyAction } from 'redux';

export enum TypeKeys {
  FETCH_RECOMMENDED_BOOKS = 'FETCH_RECOMMENDED_BOOKS',
  FETCH_RECOMMENDED_BOOKS_SUCCESS = 'FETCH_RECOMMENDED_BOOKS_SUCCESS',
  FETCH_RECOMMENDED_BOOKS_FAIL = 'FETCH_RECOMMENDED_BOOKS_FAIL',
}

declare let process: {
  env: {
    REACT_APP_API_URL: string;
  };
};

const apiURL = process.env.REACT_APP_API_URL;

const fetchRecommendedBooksStart = () => createAction(TypeKeys.FETCH_RECOMMENDED_BOOKS, {});

const fetchRecommendedBooksSuccess = (data: RecommendedBook[]) =>
  createAction(TypeKeys.FETCH_RECOMMENDED_BOOKS_SUCCESS, {
    data,
  });

const fetchRecommendedBooksFail = (error: Error) =>
  createAction(TypeKeys.FETCH_RECOMMENDED_BOOKS_FAIL, { message: error.message });

const fetchRecommendedBooks = () => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchRecommendedBooksStart());
    try {
      const response = await axios.get(`${apiURL}/recommended_books`);
      const resBody = (apiURL === 'http://localhost:4000' ? response.data.body : response.data);
      dispatch(fetchRecommendedBooksSuccess(resBody.RecommendedBooks));
    } catch (e) {
      dispatch(fetchRecommendedBooksFail(e));
    }
  };
};

export const DispatchActions = {
  fetchRecommendedBooksSuccess,
  fetchRecommendedBooksFail,
};
export const RecommendedBooksActions = {
  ...DispatchActions,
  fetchRecommendedBooks,
};
export type RecommendedBooksActions = ActionsUnion<typeof DispatchActions>;
