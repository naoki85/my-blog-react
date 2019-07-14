import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

import './App.css';

interface AppProps {
  timeLeft: number;
  reset: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      maxWidth: 275,
    },
  }),
);

const AppComponent: FC<AppProps> = ({ timeLeft, reset }) => {
  const classes = useStyles();

  return (
    <>
      <div className="container">
        <header>
          <h1>タイマー</h1>
        </header>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5" component="h2">time</Typography>
            <Typography variant="h5" component="h2">{timeLeft}</Typography>
          </CardContent>
          <CardActions>
            <Button color="primary" onClick={reset}>
              <Icon>redo</Icon>
              Reset
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
};

export default AppComponent;
