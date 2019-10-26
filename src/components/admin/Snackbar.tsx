import React, {useEffect, useState} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {green, red} from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";

export interface AdminSnackbarProps {
  status?: "success" | "error";
  message?: string;
}

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5),
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[600],
  },
}));

const AdminSnackbar: React.FC<AdminSnackbarProps> = (props) => {
  const classes = useStyles();
  const [displaySnackBar, setDisplaySnackBar] = useState(false);
  const onSnackbarClose = () => setDisplaySnackBar(false);

  useEffect(() => {
    if (props.status) {
      setDisplaySnackBar(true);
    }
  }, [props]);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={displaySnackBar}
      autoHideDuration={6000}
      onClose={onSnackbarClose}
    >
      <SnackbarContent
        className={classes[props.status || 'success']}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar">
            {props.message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={onSnackbarClose}
          >
            ×
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default AdminSnackbar;
