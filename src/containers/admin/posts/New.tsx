import React from "react";
import { connect } from "react-redux";
import AdminPostsNewComponent, {CreatePostStateProps} from '../../../components/admin/posts/New';
import {StoreState} from "../../../types/state";
import {Action, Dispatch} from "redux";

const mapStateToProps = function(state: StoreState) {
  return {
    status: state.posts.status,
    message: state.posts.message,
    loading: state.posts.loading,
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>): {
  dispatch: Dispatch<Action<{}>>;
} => {
  return {
    dispatch,
  };
};

class AdminPostsNew extends React.Component<CreatePostStateProps & { dispatch: Dispatch }> {
  render() {
    return <AdminPostsNewComponent {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPostsNew);
