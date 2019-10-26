import React from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Dispatch} from "redux";
import AdminPostsForm, {AdminPostsFormStateProps} from "./Form";
import AdminSnackbar, {AdminSnackbarProps} from "../Snackbar";

export interface AdminPostsEditProps extends AdminPostsFormStateProps, AdminSnackbarProps {}

const AdminPostsEdit: React.FC<AdminPostsEditProps & { dispatch: Dispatch }> = (props) => {
  return (
    <Container component="main">
      <CssBaseline />
      <AdminPostsForm
        loading={props.loading}
        filename={props.filename}
        imageLoading={props.imageLoading}
        post={props.post}
        dispatch={props.dispatch}
      />
      <AdminSnackbar message={props.message} status={props.status} />
    </Container>
  );
};

export default AdminPostsEdit;
