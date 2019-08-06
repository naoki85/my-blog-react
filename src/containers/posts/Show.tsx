import React from "react";
import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import PostShowComponent, { PostProps } from '../../components/posts/Show';

const mapDispatchToProps = function(
  dispatch: Dispatch<Action<{}>>
): {
    dispatch: Dispatch<Action<{}>>;
  } {
  return {
    dispatch,
  };
};

class PostShow extends React.Component<PostProps & { dispatch: Dispatch }> {
  render() {
    return <PostShowComponent {...this.props} />;
  }
}

export default connect(
  mapDispatchToProps
)(PostShow);
