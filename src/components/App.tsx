import React, { FC } from 'react';
import PostRow from './PostRow'
import { Post } from '../types/state'
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export interface AppStateProps {
  posts: Post[];
}

interface AppProps extends AppStateProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardGrid: {
      marginTop: theme.spacing(3),
    },
  })
);

const AppComponent: FC<AppProps> = (props: AppProps) => {
  const classes = useStyles();

  return (
    <Grid container spacing={4} className={classes.cardGrid}>
      {props.posts.map(post => {
        return (
          <PostRow
            key={post.Id}
            post={post}
          />
        )
      })}
    </Grid>
  );
};

export default AppComponent;
