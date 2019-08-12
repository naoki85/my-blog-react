import React, { FC } from 'react';
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import {convertToHtml} from "../../utils/Markdown";
import '../../styles/markdown.scss';
import TweetButton from './TweetButton';
import HatebuButton from './HatebuButton'

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

export interface PostProps extends PostShowStateProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postArea: {
      marginTop: theme.spacing(3),
    },
  })
);

const PostShowComponent: FC<PostProps> = (props) => {
  const classes = useStyles();

  return (
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
    </div>
  );
};

export default PostShowComponent;
