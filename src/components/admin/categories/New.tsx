import React from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import AdminCategoriesForm from "./Form";

const AdminCategoriesNew: React.FC = () => {
  return (
    <Container component="main">
      <CssBaseline />
      <AdminCategoriesForm />
    </Container>
  );
};

export default AdminCategoriesNew;
