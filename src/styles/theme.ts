import { createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
      contrastText: '#fff',
      dark: '#546778',
    },
  },
});

export default theme;
