import React, { FC } from 'react';
import Helmet from 'react-helmet';
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
      <Helmet>
        <meta name={'description'} content={'本ブログは naoki85 によりメンテナンスされているサイトです。主に本の紹介や勉強したことをブログにまとめていきます。'} />
        <meta name={'og:url'} content={'https://blog.naoki85.me'} />
        <meta name={'og:title'} content={'ブログ一覧'} />
        <meta name={'og:description'} content={'本ブログは naoki85 によりメンテナンスされているサイトです。主に本の紹介や勉強したことをブログにまとめていきます。'} />
        <meta name={'og:image'} content={'/ogp.png'} />
        <meta name={'twitter:card'} content={'summary_large_image'} />
      </Helmet>

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
