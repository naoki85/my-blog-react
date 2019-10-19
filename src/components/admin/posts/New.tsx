import React, {useEffect, useState} from 'react';
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {AnyAction, Dispatch} from "redux";
import {StoreState} from "../../../types/state";
import {Actions} from "../../../actions";
import {ImageUploadActions} from "../../../actions/imageUpload";
import CircularProgress from "@material-ui/core/CircularProgress";
import {green, red} from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import Dropzone from 'react-dropzone';

export interface CreatePostStateProps {
  status?: "success" | "error";
  message?: string;
  loading: boolean;
  filename: string;
  imageLoading: boolean;
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
  inputFileBtnHide: {
    opacity: 0,
    position: 'absolute',
    appearance: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  },
  uploadArea: {
    width: 400,
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#666',
    borderStyle: 'solid',
    borderRadius: 5,
    ":hover": {
      opacity: 0.5,
      backgroundColor: '#eee'
    }
  },
}));

const AdminPostsNew: React.FC<CreatePostStateProps & { dispatch: Dispatch }> = (props) => {
  const classes = useStyles();
  const [displaySnackBar, setDisplaySnackBar] = useState(false);
  const [values, setValues] = React.useState({
    title: '-',
    content: '-',
    category: '-',
    publishedAt: '-',
    active: 'published'
  });
  const onSnackbarClose = () => setDisplaySnackBar(false);

  useEffect(() => {
    if (props.status) {
      setDisplaySnackBar(true);
    }
  }, [props]);

  const submitNewPost = () => {
    const createValue = {
      ...values,
      imageUrl: props.filename
    };

    const dispatch = props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    dispatch(Actions.createPost(createValue));
  };

  const handleOnDrop = (files: File[]) => {
    const dispatch = props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    const target = files[0];
    dispatch(ImageUploadActions.uploadImage(target));
  };

  const formatDatetime = (input: string): string => {
    const splitDatetime = input.split('T');

    return splitDatetime[0] + ' ' + splitDatetime[1] + ':00';
  };

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === 'publishedAt') {
      value = formatDatetime(event.target.value as string);
    }
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: value,
    }));
  };

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Post
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Dropzone
                onDrop={handleOnDrop}
                accept="image/*"
              >
                {({getRootProps, getInputProps}) => (
                  <section>
                    <div {...getRootProps()} className={classes.uploadArea}>
                      <input {...getInputProps()} />
                      {props.imageLoading ?
                        <p>Uploading ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      }
                    </div>
                  </section>
                )}
              </Dropzone>
              {props.imageLoading ?
                <div>アップロード中です</div> :
                <div>{props.filename}</div>}
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category-native-simple">Category</InputLabel>
                <Select
                  native
                  onChange={handleChange}
                  inputProps={{
                    name: 'category',
                    id: 'category-native-simple',
                  }}
                >
                  <option value={"other"}>Other</option>
                  <option value={"vuejs"}>Vue / Nuxt</option>
                  <option value={"ruby"}>Ruby</option>
                  <option value={"aws"}>AWS</option>
                  <option value={"php"}>PHP</option>
                  <option value={"kotlin"}>Kotlin</option>
                  <option value={"Android"}>Android</option>
                  <option value={"web"}>Web 一般</option>
                  <option value={"go"}>Go</option>
                  <option value={"react"}>React</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="publishedAt"
                label="publishedAt"
                name="publishedAt"
                type="datetime-local"
                defaultValue="2019-10-01T08:00"
                margin="normal"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="Content"
                label="Content"
                name="content"
                multiline
                fullWidth
                required
                onChange={handleChange}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitNewPost}
          >
            Submit
          </Button>
          {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </form>
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
          className={classes[props.status || 'success']}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar">
              {props.message}
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

export default AdminPostsNew;
