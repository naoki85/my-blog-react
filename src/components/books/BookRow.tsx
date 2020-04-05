import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import {Book} from "../../entities/book";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
      minHeight: 160,
      backgroundSize: 'auto'
    },
    cardLink: {
      textDecoration: 'none',
    },
  })
);

interface BookRowProps {
  book: Book;
}

export const BookRow: FC<BookRowProps> = (props) => {
  const classes = useStyles();

  return (
    <Grid item key={props.book.title} xs={12} md={6}>
      <a
        className={classes.cardLink}
        href={props.book.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {props.book.title}
              </Typography>
              {/*<Typography variant="subtitle1" color="textSecondary">*/}
              {/*  {ParseDate(props.post.PublishedAt)}*/}
              {/*</Typography>*/}
            </CardContent>
          </div>
          <Hidden>
            <CardMedia
              className={classes.cardMedia}
              image={props.book.imageUrl}
              title={props.book.title}
            />
          </Hidden>
        </Card>
      </a>
    </Grid>
  )
};
