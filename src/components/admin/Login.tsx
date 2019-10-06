import React, { FC, useState, useEffect } from 'react';
import { AuthActions } from "../../actions/auth";
import { Dispatch, AnyAction } from "redux";
import { StoreState, Auth } from "../../types/state";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green, red } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
// import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

export interface AdminLoginProps {
  auth: Auth;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    close: {
      padding: theme.spacing(0.5),
    },
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: red[600],
    }
  })
);

const AdminLoginComponent: FC<AdminLoginProps & { dispatch: Dispatch }> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitLogin, setSubmitLogin] = useState(false);
  const [displaySnackBar, setDisplaySnackBar] = useState(false);

  const onSubmit = () => {
    setSubmitLogin(true);
    const dispatch = props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    dispatch(AuthActions.tryLogin(email, password));
  }

  useEffect(() => {
    if (props.auth && props.auth.Status) {
      setDisplaySnackBar(true);
    }
  }, [props])
  const onSnackbarClose = () => setDisplaySnackBar(false)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={classes.wrapper}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={submitLogin}
            className={classes.submit}
            onClick={() => onSubmit()}
          >
            Sign In
          </Button>
          {submitLogin && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={displaySnackBar}
        autoHideDuration={6000}
        onClose={onSnackbarClose}
      >
        <SnackbarContent
          className={classes[props.auth.Status || 'success']}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar">
              {props.auth.Message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={onSnackbarClose}
            >
              ×
            </IconButton>,
          ]}
        />
      </Snackbar>
    </Container>
  );
};

export default AdminLoginComponent;
