import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loginWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(7),
    width: theme.spacing(50),
  },
  loginButton: {
    marginBottom: 10,
  }
}));

export default useStyles;
