import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {AnyAction, Dispatch} from "redux";
import {StoreState, Post} from "../../../types/state";
import {Actions} from "../../../actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import ImageUploadModal from "./ImageUploadModal";
import {green} from "@material-ui/core/colors";
import {convertToHtml} from "../../../utils/Markdown";
import '../../../styles/markdown.scss';
import 'highlight.js/styles/monokai.css';
import {FormatDatetime} from "../../../utils/Time";
import CategoriesSelectBox from "./CategoriesSelectBox";
import SelectDateTime from "./SelectDateTime";

export interface AdminPostsFormStateProps {
  loading: boolean;
  filename: string;
  imageLoading: boolean;
  post: Post;
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
  buttonWrapper: {
    margin: theme.spacing(3),
  },
}));

const AdminPostsForm: React.FC<AdminPostsFormStateProps & { dispatch: Dispatch }> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    title: props.post.Title,
    content: props.post.Content,
    category: props.post.Category,
    imageUrl: props.post.ImageUrl,
    publishedAt: props.post.PublishedAt,
    active: 'published'
  });

  const submitNewPost = () => {
    const createValue = {
      ...values
    };

    const dispatch2 = props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    if (props.post.Id === 0) {
      dispatch2(Actions.createPost(createValue));
    } else {
      dispatch2(Actions.updatePost(props.post.Id, createValue));
    }
  };

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    event.persist();
    let value = event.target.value;
    if (event.target.name === 'publishedAt') {
      value = FormatDatetime(event.target.value as string);
    }
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: value,
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Post
        </Typography>
        <Button
          className={classes.buttonWrapper}
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Open image upload modal
        </Button>
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
                value={values.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="imageUrl"
                variant="outlined"
                required
                fullWidth
                id="imageUrl"
                label="imageUrl"
                autoFocus
                value={values.imageUrl}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category-native-simple">Category</InputLabel>
                <CategoriesSelectBox handleChange={handleChange} category={values.category}/>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <SelectDateTime
                handleChange={handleChange}
                name={'publishedAt'}
                label={'publishedAt'}
                value={values.publishedAt}
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                value={values.content}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                paragraph
                className={'preview-area'}
                dangerouslySetInnerHTML={{__html: convertToHtml(values.content)}}
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
      <ImageUploadModal
        filename={props.filename}
        imageLoading={props.imageLoading}
        modalOpen={open}
        onCloseHandler={handleClose}
        dispatch={props.dispatch}
      />
    </>
  );
};

export default AdminPostsForm;
