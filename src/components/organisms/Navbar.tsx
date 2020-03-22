import React, {FC, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import theme from '../../styles/theme';
import {IconButton} from "@material-ui/core";
import clsx from "clsx";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import {localStorageItemName} from "../../config/const";
import {User} from "../../models/user";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  navbarLogo: {
    color: theme.palette.primary.contrastText,
  },
  sideMenuItem: {
    color: 'inherit',
    textDecoration: 'none',
  }
}));

const Navbar: FC = () => {
  const classes = useStyles(theme);
  const [open, setOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    const user = new User();
    user.Logout();
  };

  useEffect(() => {
    if (localStorage.getItem(localStorageItemName)) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.navbarLogo}>
            naoki85.me
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List>
          <Link to={'/'} className={classes.sideMenuItem}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Top" />
            </ListItem>
          </Link>
        </List>
        {(loggedIn) && (
          <>
            <Divider/>
            <List>
              <ListSubheader inset>Login action</ListSubheader>
              <Link to={'/admin/posts'} className={classes.sideMenuItem}>
                <ListItem button>
                  <ListItemIcon>
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Posts" />
                </ListItem>
              </Link>
              <Link to={'/admin/recommended_books'} className={classes.sideMenuItem}>
                <ListItem button>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText primary="Books" />
                </ListItem>
              </Link>
              <Link to={'/admin/categories'} className={classes.sideMenuItem}>
                <ListItem button>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText primary="Categories" />
                </ListItem>
              </Link>
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </>
        )}
      </Drawer>
    </>
  );
};

export default Navbar;
