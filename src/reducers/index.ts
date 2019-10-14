import {Actions, TypeKeys} from '../actions';
import {PostsState} from '../types/state';

export const initialState: PostsState = {
  Posts: [],
  Page: 0,
  MaxPage: 0,
  loading: false,
};

export default (state = initialState, action: Actions) => {
  switch (action.type) {
    case TypeKeys.FETCH_POSTS:
    case TypeKeys.CREATE_POST:
    case TypeKeys.FETCH_POST: {
      return { ...state, loading: true }
    }
    case TypeKeys.FETCH_POSTS_SUCCESS:
    case TypeKeys.FETCH_POST_SUCCESS: {
      return { ...action.payload.data, loading: false };
    }
    case TypeKeys.CREATE_POST_SUCCESS:
    case TypeKeys.CREATE_POST_FAIL: {
      return { ...state, ...action.payload.data, loading: false };
    }
    default: {
      return state;
    }
  }
};
