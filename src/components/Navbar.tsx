import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import theme from '../styles/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    navbarLogoLink: {
      textDecoration: 'none',
    },
    navbarLogo: {
      color: theme.palette.primary.contrastText,
    }
  })
);

const Navbar: FC = () => {
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Link to={'/'} className={classes.navbarLogoLink}>
            <Typography variant="h6" className={classes.navbarLogo}>
              naoki85.me
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
};

export default Navbar;
