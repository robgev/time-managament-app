import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  successful: {
    backgroundColor: '#4caf50',
    '&:hover': {
      backgroundColor: '#00e676 !important'
    }
  },
  fail: {
    backgroundColor: '#f44336',
    '&:hover': {
      backgroundColor: '#e53935 !important'
    }
  }
}));

export default useStyles;
