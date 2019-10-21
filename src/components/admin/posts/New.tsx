import React from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import {Dispatch} from "redux";
import AdminPostsForm, {AdminPostsFormStateProps} from "./Form";
import AdminSnackbar, {AdminSnackbarProps} from "../Snackbar";

export interface AdminPostsNewProps extends AdminPostsFormStateProps, AdminSnackbarProps {}

const AdminPostsNew: React.FC<AdminPostsNewProps & { dispatch: Dispatch }> = (props) => {
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

export default AdminPostsNew;
