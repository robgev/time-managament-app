import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navBar: {
    flexGrow: 1,
    paddingLeft: 20,
  },
  navLink: {
    marginRight: 20,
  },
}));

export default useStyles;
