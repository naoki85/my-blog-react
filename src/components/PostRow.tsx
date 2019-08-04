import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

export interface Post {
  Id: number;
  Title: string;
  PublishedAt: string;
  ImageUrl: string;
}

interface PostRowStateProps {
  post: Post;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
    },
    cardDetails: {
      flex: 1,
    },
    cardMedia: {
      width: 160,
    },
  })
);

interface PostRowProps extends PostRowStateProps {}
const PostRow: FC<PostRowProps> = (props: PostRowProps) => {
  const classes = useStyles();

  return (
    <Grid item key={props.post.Id} xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {props.post.Title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {props.post.PublishedAt}
              </Typography>
              {/*<Typography variant="subtitle1" paragraph>*/}
              {/*  {post.description}*/}
              {/*</Typography>*/}
              {/*<Typography variant="subtitle1" color="primary">*/}
              {/*    Continue reading...*/}
              {/*</Typography>*/}
            </CardContent>
          </div>
          <Hidden xsDown>
            <CardMedia
              className={classes.cardMedia}
              image={props.post.ImageUrl}
              title={props.post.Title}
            />
          </Hidden>
        </Card>
      </CardActionArea>
    </Grid>
  )
};

export default PostRow;
