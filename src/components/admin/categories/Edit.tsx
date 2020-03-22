import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import AdminCategoriesForm from "./Form";
import {CategoryRepository} from "../../../repositories/category_repository";
import {Category} from "../../../entities/category";
import {Match} from "../../../types/state";
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {loadingCommonStyles} from "../../../styles/theme";

const useStyles = makeStyles(() => ({
  ...loadingCommonStyles(),
}));

const AdminCategoriesEdit: React.FC<{ match: Match }> = (props) => {
  const classes = useStyles();
  const [category, setCategory] = useState<Category | undefined>();
  const identifier = props.match.params.identifier;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CategoryRepository.FindByIdentifier(identifier);
        setCategory(result);
      }catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [identifier]);

  if (!category) {
    return (
      <Container component="main">
        <CssBaseline />
        <div className={classes.progressArea}>
          <CircularProgress className={classes.progress} />
        </div>
      </Container>
    )
  }

  return (
    <Container component="main">
      <CssBaseline />
      <AdminCategoriesForm category={category} />
    </Container>
  );
};

export default AdminCategoriesEdit;
