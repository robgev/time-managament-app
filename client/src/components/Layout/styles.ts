import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    height: 'inherit',
    backgroundImage: 'url("/bg.png")',
    backgroundSize: 'cover',
    flexDirection: 'column',
  }
}));

export default useStyles;
