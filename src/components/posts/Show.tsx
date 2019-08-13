import React, { FC } from 'react';
import Helmet from 'react-helmet';
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {convertToHtml} from "../../utils/Markdown";
import '../../styles/markdown.scss';
import TweetButton from './TweetButton';
import HatebuButton from './HatebuButton'
import RecommendedBooksComponent, {RecommendedBooksProps} from './RecommendedBooks';

export interface Post {
  Id: number;
  Title: string;
  Content?: string;
  PublishedAt: string;
  ImageUrl: string;
}

interface PostShowStateProps {
  post: Post;
}

export interface PostProps extends PostShowStateProps, RecommendedBooksProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postArea: {
      marginTop: theme.spacing(3),
    },
  })
);

const PostShowComponent: FC<PostProps> = (props) => {
  const classes = useStyles();
  const getDescription = () => {
    const content = props.post.Content as string;

    return content.substr(0, 160);
  };

  return (
    <>
      <Helmet>
        <meta name={'description'} content={getDescription()} />
        <meta name={'og:url'} content={`https://blog.naoki85.me/posts/${props.post.Id}`} />
        <meta name={'og:title'} content={props.post.Title} />
        <meta name={'og:description'} content={getDescription()} />
        <meta name={'og:image'} content={props.post.ImageUrl} />
        <meta name={'twitter:card'} content={'summary'} />
      </Helmet>

      <div className={classes.postArea}>
        <Typography variant="h4">
          {props.post.Title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {props.post.PublishedAt}
        </Typography>
        <TweetButton
          id={props.post.Id}
          title={props.post.Title}
        />
        <HatebuButton
          id={props.post.Id}
          title={props.post.Title}
        />
        <Typography
          paragraph
          className={'preview-area'}
          dangerouslySetInnerHTML={{__html: convertToHtml(props.post.Content)}}
        />
        <RecommendedBooksComponent recommendedBooks={props.recommendedBooks}/>
      </div>
    </>
  );
};

export default PostShowComponent;
