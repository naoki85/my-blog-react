// https://material-ui.com/components/menus/#customized-menus
import React from 'react';
import {
  withStyles,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {AuthActions} from '../../actions/auth';
import {Dispatch, AnyAction, Action} from 'redux';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {StoreState} from '../../types/state';
import Button from '@material-ui/core/Button';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootDiv: {
      marginTop: theme.spacing(2),
    },
    menuItemLink: {
      color: "rgba(0, 0, 0, 0.87)",
      textDecoration: "none"
    },
  })
);

const mapDispatchToProps = (dispatch: Dispatch<Action<{}>>): {
  dispatch: Dispatch<Action<{}>>;
} => {
  return {
    dispatch,
  };
};

const CustomizedMenus: React.FC<{ dispatch: Dispatch }> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const dispatch = props.dispatch as (
      thunk: (
        dispatch: Dispatch<AnyAction>,
        getState: () => StoreState
      ) => Promise<void>
    ) => void | Dispatch;
    dispatch(AuthActions.tryLogout());
  };

  return (
    <div className={classes.rootDiv}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Menu
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <Link to={'/admin/posts'} className={classes.menuItemLink}>
            <ListItemText primary="Posts" />
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <Link to={'/admin/recommended_books'} className={classes.menuItemLink}>
            <ListItemText primary="Recommended books" />
          </Link>
        </StyledMenuItem>
        <StyledMenuItem onClick={handleLogout}>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

export default connect(
  // mapStateToProps,
  mapDispatchToProps
)(CustomizedMenus);
