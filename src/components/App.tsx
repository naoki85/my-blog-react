import React, { FC } from 'react';
import PostRow from './PostRow'
import { Post } from '../types/state'
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paginate from "./Paginate";

export interface AppStateProps {
  posts: Post[];
  page: number;
  maxPage: number;
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
  })
);

const AppComponent: FC<AppProps> = (props: AppProps) => {
  const classes = useStyles();

  return (
    <>
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
