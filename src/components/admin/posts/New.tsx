import React from 'react';
import {Grid} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  inputFileBtnHide: {
    opacity: 0,
    position: 'absolute',
    appearance: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AdminPostsNew: React.FC = () => {
  const classes = useStyles();

  return (
    <Container component="main">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Post
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Image</FormLabel>
              <input
                type="file"
                className="inputFileBtnHide"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Category</InputLabel>
                <Select
                  native
                  // value={state.age}
                  // onChange={handleChange('age')}
                  inputProps={{
                    name: 'age',
                    id: 'age-native-simple',
                  }}
                >
                  <option value={"other"}>Other</option>
                  <option value={"vuejs"}>Vue / Nuxt</option>
                  <option value={"ruby"}>Ruby</option>
                  <option value={"aws"}>AWS</option>
                  <option value={"php"}>PHP</option>
                  <option value={"kotlin"}>Kotlin</option>
                  <option value={"Android"}>Android</option>
                  <option value={"web"}>Web 一般</option>
                  <option value={"go"}>Go</option>
                  <option value={"react"}>React</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="Content"
                label="Content"
                multiline
                fullWidth
                // rowsMax="4"
                // value={values.multiline}
                // onChange={handleChange('multiline')}
                // className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AdminPostsNew;
