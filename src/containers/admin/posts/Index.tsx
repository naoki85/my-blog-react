import React from "react";
import { connect } from "react-redux";
import AdminPostsIndexComponent from '../../../components/admin/posts/Index';

class AdminPostsIndex extends React.Component {
  render() {
    return <AdminPostsIndexComponent />;
  }
}

export default connect(
  // mapStateToProps,
  // mapDispatchToProps
)(AdminPostsIndex);
