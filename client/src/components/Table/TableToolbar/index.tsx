import React from 'react';
import clsx from 'clsx';
import MUIToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from './styles';


const TableToolbar = ({ text }: Record<string, any>) => {
  const classes = useStyles();

  return (
    <MUIToolbar
      className={classes.root}
    >
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {text}
      </Typography>
      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </MUIToolbar>
  );
};

export default TableToolbar;
