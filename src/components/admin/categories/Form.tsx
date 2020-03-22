import React, {useState} from 'react';
import {CircularProgress, Grid} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import '../../../styles/markdown.scss';
import 'highlight.js/styles/monokai.css';
import {Category} from "../../../entities/category";
import {CategoryRepository} from "../../../repositories/category_repository";
import {history} from "../../../index";
import AdminSnackbar from "../Snackbar";
import {AuthenticationStatus} from "../../../types/state";
import {loadingCommonStyles} from "../../../styles/theme";

export interface AdminCategoriesFormProps {
  category?: Category;
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  ...loadingCommonStyles(),
}));

const AdminCategoriesForm: React.FC<AdminCategoriesFormProps> = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    identifier: props.category?.identifier ?? '',
    jpName: props.category?.jpName ?? '',
    color: props.category?.color ?? ''
  });
  const [errors, setErrors] = useState({
    status: '',
    message: '',
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const isUpdate = () => {
    return !!props.category;
  };

  const submitNewCategory = async () => {
    const createValue = {
      ...values
    };
    setLoading(true);
    let result;
    if (isUpdate()) {
      result = await CategoryRepository.Update(createValue);
    } else {
      result = await CategoryRepository.Save(createValue);
    }
    setLoading(false);
    if (result) {
      setTimeout(() => history.push('/admin/categories'), 2000);
    } else {
      setErrors({status: 'error', message: 'Fail to create category'})
    }
  };

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    event.persist();
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value,
    }));
  };

  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Category
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            {!isUpdate() && <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="identifier"
                variant="outlined"
                required
                fullWidth
                id="identifier"
                label="Identifier"
                autoFocus
                value={values.identifier}
                onChange={handleChange}
              />
            </Grid>}
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="jpName"
                variant="outlined"
                required
                fullWidth
                id="jpName"
                label="Name"
                autoFocus
                value={values.jpName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="color"
                variant="outlined"
                required
                fullWidth
                id="color"
                label="Color"
                autoFocus
                value={values.color}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitNewCategory}
          >
            Submit
          </Button>
          {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
          <AdminSnackbar
            message={errors.message}
            status={(errors.status === '') ? undefined : errors.status as AuthenticationStatus}
          />
        </form>
      </div>
    </>
  );
};

export default AdminCategoriesForm;
