import React, {useEffect, useReducer, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import {Reducer, TypeKeys} from "../../../reducers/category";
import {CategoryRepository} from "../../../repositories/category_repository";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {AuthenticationStatus} from "../../../types/state";
import AdminSnackbar from "../Snackbar";
import {loadingCommonStyles} from "../../../styles/theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    buttonWrapper: {
      margin: theme.spacing(3),
    },
    buttonLink: {
      textDecoration: "none"
    },
    buttonWarning: {
      backgroundColor: amber['A400'],
      color: 'white',
    },
    buttonAlert: {
      backgroundColor: red['A400'],
      color: 'white',
    },
    ...loadingCommonStyles(),
  }),
);

const AdminCategoriesIndex: React.FC = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(Reducer, {
    categories: [],
    isLoading: false,
  });
  const [errors, setErrors] = useState({
    status: '',
    message: '',
  });

  const fetchCategory = async () => {
    dispatch({type: TypeKeys.FETCH_CATEGORIES});

    try {
      const result = await CategoryRepository.All();
      dispatch({type: TypeKeys.FETCH_CATEGORIES_SUCCESS, payload: result});
    }catch (error) {
      dispatch({type: TypeKeys.FETCH_CATEGORIES_FAIL});
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategory();
    };

    fetchData();
  }, []);

  const deleteCategory = async (identifier: string) => {
    const ret = window.confirm('Delete Category?');
    if (!ret) { return }
    dispatch({type: TypeKeys.DELETE_CATEGORY});
    const result = await CategoryRepository.Delete(identifier);
    if (result) {
      dispatch({type: TypeKeys.DELETE_CATEGORY_SUCCESS});
      fetchCategory();
    } else {
      dispatch({type: TypeKeys.DELETE_CATEGORY_FAIL});
      setErrors({status: 'error', message: 'Fail to create category'})
    }
  };

  return (
    <>
      <Link to={'/admin/categories/new'} className={classes.buttonLink}>
        <Button
          className={classes.buttonWrapper}
          variant="contained"
          color="secondary"
        >
          Create
        </Button>
      </Link>
      {(state.isLoading) && (
        <div className={classes.progressArea}>
          <CircularProgress className={classes.progress} />
        </div>
      )}
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Identifier</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Color</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(state.categories ?? []).map(c => (
              <TableRow key={c.identifier}>
                <TableCell component="th" scope="row" align="center">
                  {c.identifier}
                </TableCell>
                <TableCell align="center">
                  {c.jpName}
                </TableCell>
                <TableCell align="center">
                  <span style={{color: c.color}}>
                    ■&nbsp;
                    {c.color}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <Link to={'/admin/categories/edit/' + c.identifier} className={classes.buttonLink}>
                    <Button
                      className={classes.buttonWrapper + ' ' + classes.buttonAlert}
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </Link>
                  <Button
                    className={classes.buttonWrapper + ' ' + classes.buttonAlert}
                    variant="contained"
                    onClick={() => deleteCategory(c.identifier)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <AdminSnackbar
        message={errors.message}
        status={(errors.status === '') ? undefined : errors.status as AuthenticationStatus}
      />
    </>
  );
};

export default AdminCategoriesIndex;
