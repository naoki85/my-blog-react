import { RecommendedBooksActions, TypeKeys } from '../actions/recommendedBooks';
import { RecommendedBook } from '../types/state';

export const initialState: RecommendedBook[] = [];

export default (state = initialState, action: RecommendedBooksActions) => {
  switch (action.type) {
    case TypeKeys.FETCH_RECOMMENDED_BOOKS_SUCCESS: {
      return action.payload.data;
    }
    default: {
      return state;
    }
  }
};

