import React, { FC } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blueGrey from '@material-ui/core/colors/blueGrey';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textArea: {
      marginTop: theme.spacing(4),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      backgroundColor: blueGrey[50],
    },
  })
);

const ScrapboxUrl = 'https://scrapbox.io/naoki85/';

const LinkToScrapbox: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.textArea}>
      <Typography variant="subtitle1" gutterBottom align="center">
        現在、 Scrapbox にてブログを書いています。こちらもご覧ください。
        <Link href={`${ScrapboxUrl}`}>
          {ScrapboxUrl}
        </Link>
      </Typography>
    </div>
  )
};

export default LinkToScrapbox;
