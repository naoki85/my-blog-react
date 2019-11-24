import React, { FC } from 'react';
import {createStyles, makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

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

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
      marginTop: '20px',
    },
  })
);

const RecommendedBooksComponent: FC<RecommendedBooksProps> = (props) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4">
        Recently read
      </Typography>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={6}>
            <Grid container spacing={3}>
              {props.recommendedBooks.map(book => {
                return (
                  <Grid key={book.Id} item xs={3}>
                    <a target={'_blank'} href={book.Link} rel={'noopener noreferrer'}>
                      <img
                        src={book.ImageUrl}
                        alt={''}
                        width={'100%'}
                      />
                    </a>
                    <img
                      src={book.ButtonUrl}
                      alt={''}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default RecommendedBooksComponent;
