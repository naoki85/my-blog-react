import React, { FC } from 'react';
import PostRow from './PostRow'
import { Post } from '../types/state'
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paginate from "./Paginate";
import CircularProgress from '@material-ui/core/CircularProgress';

export interface AppStateProps {
  posts: Post[];
  page: number;
  maxPage: number;
  loading: boolean;
}
export interface AppDispatchProps {
  fetchPosts: (page: number) => void;
}

export interface AppProps extends AppStateProps, AppDispatchProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardGrid: {
      marginTop: theme.spacing(3),
    },
    progress: {
      margin: theme.spacing(3),
    },
    progressArea: {
      textAlign: 'center',
    },
  })
);

const AppComponent: FC<AppProps> = (props: AppProps) => {
  const classes = useStyles();

  return (
    <>
      {(props.loading) && (
        <div className={classes.progressArea}>
          <CircularProgress className={classes.progress} />
        </div>
      )}
      {(props.maxPage > 1) && (
        <Paginate
          page={props.page}
          maxPage={props.maxPage}
          fetchPosts={(page: number) => props.fetchPosts(page)}
        />
      )}
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
    </>
  );
};

export default AppComponent;
