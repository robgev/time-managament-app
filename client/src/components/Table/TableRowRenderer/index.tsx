import React, { useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Done from '@material-ui/icons/Done';

import { userStore } from 'contexts/CurrentUser';
import TextField from 'components/TextField';

import useStyles from './styles';

const TableRowHead = ({ hasHeader, date, total }: any) => hasHeader
? (
  <TableRow>
    <TableCell colSpan={4}>
      Date: {date}
    </TableCell>
    <TableCell>
      Total Hours: {total}
    </TableCell>
  </TableRow>
)
: null

const TableRowRenderer = ({ 
  row, 
  index,
  number,
  totals,
  editData,
  hasHeader,
  onEditClick,
  onEditChange,
  onDeleteClick,
  toggleEditMode,
}: any) => {
  const classes = useStyles();
  const { preferredWorkingHoursPerDay } = useContext<any>(userStore);
  const isEditing = row.id === editData.id;
  const total = totals[row.workedWhen];

  if (isEditing) {
    return (
      <>
        <TableRowHead
          hasHeader={hasHeader}
          date={row.workedWhen}
          total={total}
        />
        <TableRow
          hover
          tabIndex={-1}
          key={row.id}
        >
          <TableCell>
            {number}
          </TableCell>
          <TableCell>
            <TextField
              type="text"
              label="Description"
              value={editData.workedOn}
              onChange={onEditChange('workedOn')}
            />
          </TableCell>
          <TableCell>
            <TextField
              type="text"
              label="Date"
              value={editData.workedWhen}
              onChange={onEditChange('workedWhen')}
            />
          </TableCell>
          <TableCell>
            <TextField
              type="number"
              label="Date"
              value={editData.duration}
              onChange={onEditChange('duration')}
            />
          </TableCell>
          <TableCell>
            <IconButton onClick={onEditClick}>
              <Done />
            </IconButton>
          </TableCell>
        </TableRow>
      </>
    )
  }

  return (
    <>
      <TableRowHead
        hasHeader={hasHeader}
        date={row.workedWhen}
        total={total}
      />
      <TableRow
        hover
        tabIndex={-1}
        key={row.id}
        className={total > preferredWorkingHoursPerDay ? classes.successful : classes.fail}
      >
        <TableCell>
          {number}
        </TableCell>
        <TableCell>{row.workedOn}</TableCell>
        <TableCell>{row.workedWhen}</TableCell>
        <TableCell>{row.duration}</TableCell>
        <TableCell>
          <IconButton onClick={toggleEditMode(row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={onDeleteClick(row.id)}>
            <DeleteForever />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

export default TableRowRenderer;
