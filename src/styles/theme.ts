import {createMuiTheme} from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal';
import {green} from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
      contrastText: '#fff',
      dark: '#546778',
    },
  },
});

type Index = "buttonProgress" | "progress" | "progressArea";

export const loadingCommonStyles = (): { [key in Index]: any } => ({
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  progress: {
    margin: theme.spacing(3),
  },
  progressArea: {
    textAlign: 'center',
  },
});

export default theme;
