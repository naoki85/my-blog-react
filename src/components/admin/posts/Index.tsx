import React from 'react';
import { Post } from "../../../types/state";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CircularProgress from "@material-ui/core/CircularProgress";

interface PostStateProps {
  posts: Post[];
  page: number;
  maxPage: number;
  loading: boolean;
}

export interface PostsProps extends PostStateProps {}

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
    progress: {
      margin: theme.spacing(3),
    },
    progressArea: {
      textAlign: 'center',
    },
  }),
);

const AdminPostsIndex: React.FC<PostsProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      {(props.loading) && (
        <div className={classes.progressArea}>
          <CircularProgress className={classes.progress} />
        </div>
      )}
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.posts.map(post => (
              <TableRow key={post.Id}>
                <TableCell component="th" scope="row">
                  {post.Id}
                </TableCell>
                <TableCell align="center">
                  {post.Category}
                </TableCell>
                <TableCell align="center">
                  <img src={post.ImageUrl} alt={post.ImageUrl} width={'100%'} />
                </TableCell>
                <TableCell align="center">
                  {post.Title}
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

export default AdminPostsIndex;
