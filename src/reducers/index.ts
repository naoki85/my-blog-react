import { Actions, TypeKeys } from '../actions';
import { PostsState } from '../types/state';

export const initialState: PostsState = {
  Posts: [],
  Page: 0,
  MaxPage: 0,
};

export default (state = initialState, action: Actions) => {
  switch (action.type) {
    case TypeKeys.FETCH_POSTS_SUCCESS:
    case TypeKeys.FETCH_POST_SUCCESS: {
      return action.payload.data;
    }
    default: {
      return state;
    }
  }
};
