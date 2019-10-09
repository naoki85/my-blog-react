import { RecommendedBooksActions, TypeKeys } from '../actions/recommendedBooks';
import { RecommendedBooksStore } from '../types/state';

export const initialState: RecommendedBooksStore = {
  Books: [],
  loading: false
};

export default (state = initialState, action: RecommendedBooksActions) => {
  switch (action.type) {
    case TypeKeys.FETCH_RECOMMENDED_BOOKS_SUCCESS: {
      return { ...action.payload, loading: false };
    }
    case TypeKeys.CREATE_RECOMMENDED_BOOKS: {
      return { ...state, loading: true };
    }
    default: {
      return state;
    }
  }
};
