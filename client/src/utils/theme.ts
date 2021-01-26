import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    primary: {
      main: '#669ACC',
      light: '#80B4E6',
      dark: '#4D81B3',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00E676',
      light: '#69F0AE',
      dark: '#00C853',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#1D3041',
      secondary: '#36495A',
      disabled: '#506374',
      hint: '#D0D0D0',
    }
  },
});
