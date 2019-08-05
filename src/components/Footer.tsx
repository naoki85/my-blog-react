import React, { FC } from 'react';
import clsx from 'clsx';
// @ts-ignore
import { loadCSS } from 'fg-loadcss';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import theme from '../styles/theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      margin: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      fontSize: '36px',
    },
    footer: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginTop: theme.spacing(8),
      padding: theme.spacing(3, 0),
    },
    bottomFooter: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(2, 0),
    }
  })
);

const Footer: FC = () => {
  const classes = useStyles(theme);

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
    <footer>
      <div className={classes.footer}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={9}>
              <Typography variant="subtitle1" align="left" component="p">
                This blog is maintained by naoki85.<br />
                I would be glad if you could give me an opinion on Twitter etc.
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <a href={'https://twitter.com/naoki85_201612'} target={'_blank'} rel={'noopener noreferrer'}>
                <Icon className={clsx(classes.icon, 'fab fa-twitter')} color="action" />
              </a>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Typography variant="subtitle1" align="center" component="p" className={classes.bottomFooter}>
        &copy;2019 — <strong>naoki85</strong> — All Rights Reserved.
      </Typography>
    </footer>
  )
};

export default Footer;
