import React from 'react';
import { Dispatch, AnyAction } from "redux";
import { StoreState } from "../../../types/state";
import { RecommendedBooksActions } from "../../../actions/recommendedBooks";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';

export interface RecommendedBook {
  Id: number;
  Link: string;
  ImageUrl: string;
  ButtonUrl: string;
}

interface RecommendedBooksStateProps {
  recommendedBooks: RecommendedBook[];
  loading: boolean;
}

export interface RecommendedBooksProps extends RecommendedBooksStateProps {}

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
    paper: {
      position: 'absolute',
      width: 800,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
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
  }),
);

const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const AdminRecommendedBooksIndex: React.FC<RecommendedBooksProps & { dispatch: Dispatch }> = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [link, setLink] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const [buttonUrl, setButtonUrl] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitCreateingBook = () => {
    const dispatch = props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    dispatch(RecommendedBooksActions.createRecommendedBooks(link, imageUrl, buttonUrl));
    dispatch(RecommendedBooksActions.fetchRecommendedBooks());
  };

  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Create
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Create a book link</h2>
          <TextField
            id="outlined-link-input"
            label="Link"
            className={classes.textField}
            type="text"
            name="Link"
            margin="normal"
            variant="outlined"
            onChange={(e) => setLink(e.target.value)}
          />
          <TextField
            id="outlined-image-url-input"
            label="Image URL"
            className={classes.textField}
            type="text"
            name="ImageUrl"
            margin="normal"
            variant="outlined"
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <TextField
            id="outlined-email-input"
            label="Button URL"
            className={classes.textField}
            type="text"
            name="ButtonUrl"
            margin="normal"
            variant="outlined"
            onChange={(e) => setButtonUrl(e.target.value)}
          />
          <div>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={submitCreateingBook}
            >
              Submit
            </Button>
            {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </div>
      </Modal>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.recommendedBooks.map(book => (
              <TableRow key={book.Id}>
                <TableCell component="th" scope="row">
                  {book.Id}
                </TableCell>
                <TableCell align="center">
                  <img src={book.ImageUrl} alt={book.ImageUrl} width={'100%'} />
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default AdminRecommendedBooksIndex;
