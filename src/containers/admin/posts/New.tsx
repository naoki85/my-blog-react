import React from "react";
import { connect } from "react-redux";
import AdminPostsNewComponent from '../../../components/admin/posts/New';

class AdminPostsNew extends React.Component {
  render() {
    return <AdminPostsNewComponent />;
  }
}

export default connect(
)(AdminPostsNew);
