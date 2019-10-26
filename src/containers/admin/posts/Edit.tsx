import React from "react";
import { connect } from "react-redux";
import AdminPostsEditComponent, {AdminPostsEditProps} from '../../../components/admin/posts/Edit';
import {Match, Post, StoreState} from "../../../types/state";
import {AnyAction, Dispatch} from "redux";
import {Actions} from "../../../actions";
import {mapDefaultDispatchToProps} from "../../types";

const mapStateToProps = function(state: StoreState) {
  return {
    status: state.posts.status,
    message: state.posts.message,
    loading: state.posts.loading,
    filename: state.imageUpload.filename,
    imageLoading: state.imageUpload.loading,
    posts: state.posts.Posts,
  }
};

class AdminPostsEdit extends React.Component<AdminPostsEditProps &
{ dispatch: Dispatch; match: Match; posts: Post[] }> {
  componentDidMount() {
    const postId = Number(this.props.match.params.id);
    const dispatch = this.props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    dispatch(Actions.fetchPost(postId));
  }

  render() {
    const postProps = this.props.posts[0];
    if (!postProps) {
      return null;
    }

    return <AdminPostsEditComponent {...this.props} post={postProps} />;
  }
}

export default connect(
  mapStateToProps,
  mapDefaultDispatchToProps
)(AdminPostsEdit);
