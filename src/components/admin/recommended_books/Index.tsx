import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export interface RecommendedBook {
  Id: number;
  Link: string;
  ImageUrl: string;
  ButtonUrl: string;
}

interface RecommendedBooksStateProps {
  recommendedBooks: RecommendedBook[];
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
  }),
);

const AdminRecommendedBooksIndex: React.FC<RecommendedBooksProps> = (props) => {
  const classes = useStyles();

  return (
    <>
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
                <TableCell align="center">{book.ImageUrl}</TableCell>
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
