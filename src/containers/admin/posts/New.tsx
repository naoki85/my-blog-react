import React from "react";
import { connect } from "react-redux";
import AdminPostsNewComponent, {AdminPostsNewProps} from '../../../components/admin/posts/New';
import {StoreState} from "../../../types/state";
import {Action, Dispatch} from "redux";
import {DateToString, Now} from "../../../utils/Time";

const mapStateToProps = function(state: StoreState) {
  return {
    status: state.posts.status,
    message: state.posts.message,
    loading: state.posts.loading,
    filename: state.imageUpload.filename,
    imageLoading: state.imageUpload.loading,
    post: {
      Id: 0,
      Category: 'other',
      Title: '-',
      Content: '-',
      ImageUrl: '-',
      PublishedAt: DateToString(Now()),
    }
  }
};

const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>): {
  dispatch: Dispatch<Action<{}>>;
} => {
  return {
    dispatch,
  };
};

class AdminPostsNew extends React.Component<AdminPostsNewProps & { dispatch: Dispatch }> {
  render() {
    return <AdminPostsNewComponent {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPostsNew);
