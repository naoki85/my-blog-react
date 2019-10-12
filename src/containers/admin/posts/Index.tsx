import React from "react";
import { Dispatch, Action, AnyAction } from "redux";
import { connect } from "react-redux";
import { Actions } from "../../../actions/index";
import { StoreState } from "../../../types/state";
import AdminPostsIndexComponent, { PostsProps  } from '../../../components/admin/posts/Index';

const mapStateToProps = function(state: StoreState) {
  return {
    posts: state.posts.Posts,
    page: state.posts.Page,
    maxPage: state.posts.MaxPage,
    loading: state.posts.loading
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>): {
  dispatch: Dispatch<Action<{}>>;
} => {
  return {
    dispatch,
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
    return <AdminPostsIndexComponent
      posts={this.props.posts}
      page={this.props.page}
      maxPage={this.props.maxPage}
      loading={this.props.loading}
    />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPostsIndex);
