import React, { useState } from 'react';
import { format } from 'date-fns';
import MUIToolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import GetApp from '@material-ui/icons/GetApp';
import TextField from 'components/TextField';
import useStyles from './styles';


const TableToolbar = ({ 
  text,
  onFilter,
  onExport,
}: Record<string, any>) => {
  const classes = useStyles();
  const [dates, setDates] = useState({
    from: new Date(0).toISOString(),
    to: new Date().toISOString(),
  })

  const onFilterChange = (key: string) => (e: any) => {
    setDates({ ...dates, [key]: e.target.value })
  }

  const onFilterClick = () => {
    onFilter(dates);
  } 

  const onExportClick = () => {
    onExport(dates);
  }

  return (
    <MUIToolbar
      className={classes.root}
    >
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {text}
      </Typography>
      <Typography className={classes.marginRight}>
        Filter by date:
      </Typography>
      <TextField
        margin="dense"
        label="From"
        type="date"
        value={
          format(new Date(dates.from), "yyyy-MM-dd")
        }
        onChange={onFilterChange('from')}
        className={classes.marginRight}
      />
      <TextField
        margin="dense"
        label="To"
        type="date"
        value={
          format(new Date(dates.to), "yyyy-MM-dd")
        }
        onChange={onFilterChange('to')}
        className={classes.marginRight}
      />
      <Tooltip title="Filter list">
        <IconButton 
          onClick={onFilterClick} 
          aria-label="filter list"
        >
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Export filtered">
        <IconButton 
          onClick={onExportClick} 
          aria-label="filter list"
        >
          <GetApp />
        </IconButton>
      </Tooltip>
    </MUIToolbar>
  );
};

export default TableToolbar;
