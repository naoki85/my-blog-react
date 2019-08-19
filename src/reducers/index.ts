import { Actions, TypeKeys } from '../actions';
import { PostsState } from '../types/state';

export const initialState: PostsState & { loading: boolean } = {
  Posts: [],
  Page: 0,
  MaxPage: 0,
  loading: false,
};

export default (state = initialState, action: Actions) => {
  switch (action.type) {
    case TypeKeys.FETCH_POSTS:
    case TypeKeys.FETCH_POST: {
      return { ...state, loading: true }
    }
    case TypeKeys.FETCH_POSTS_SUCCESS:
    case TypeKeys.FETCH_POST_SUCCESS: {
      return { ...action.payload.data, loading: false };
    }
    default: {
      return state;
    }
  }
};
