import React from "react";
import { Dispatch, Action, AnyAction } from "redux";
import { connect } from "react-redux";
import { Actions } from "../../../actions/index";
import { StoreState } from "../../../types/state";
import AdminPostsIndexComponent, { PostsProps, PostDispatchProps  } from '../../../components/admin/posts/Index';

const mapStateToProps = function(state: StoreState) {
  return {
    posts: state.posts.Posts,
    page: state.posts.Page,
    maxPage: state.posts.MaxPage,
    loading: state.posts.loading
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>): PostDispatchProps & {
  dispatch: Dispatch<Action<{}>>;
} => {
  const dispatchOverThunk = dispatch as (
    thunk: (
      dispatch: Dispatch<AnyAction>,
      getState: () => StoreState
    ) => Promise<void>
  ) => void | Dispatch;

  return {
    dispatch,
    fetchPosts: (page: number) => dispatchOverThunk(Actions.fetchPosts(page, true))
  };
};

class AdminPostsIndex extends React.Component<PostsProps & { dispatch: Dispatch }> {
  componentDidMount() {
    const dispatch = this.props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    dispatch(Actions.fetchPosts(1, true));
  }

  render() {
    return <AdminPostsIndexComponent {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPostsIndex);
