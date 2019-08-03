import { TypeKeys, Actions } from '../actions';
import { Post } from '../types/state';

export const initialState: Post[] = [];

export default (state = initialState, action: Actions) => {
  switch (action.type) {
    case TypeKeys.FETCH_POSTS_SUCCESS: {
      return action.payload.data;
    }
    default: {
      return state;
    }
  }
};
