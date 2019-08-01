import { Reducer } from 'redux';
import { TypeKeys, PostsAction } from '../actions';
import { Post } from '../types/state';

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = { posts: [] };

const postReducer: Reducer<PostsState, PostsAction> = (
  state: PostsState = initialState,
  action: PostsAction,
) => {
  switch (action.type) {
    case TypeKeys.FETCH_POSTS: {
      return state;
    }
    default: {
      return state;
    }
  }
};

export default postReducer;
