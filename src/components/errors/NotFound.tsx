import React, { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing(3),
    },
  })
);

const NotFound: FC = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant='h4' className={classes.title}>
        Not Found
      </Typography>
    </>
  )
};

export default NotFound;
