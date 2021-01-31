import React, { useContext } from 'react';
import { format } from 'date-fns';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Done from '@material-ui/icons/Done';

import { formatKey } from 'utils/dates';
import { userStore } from 'contexts/CurrentUser';
import { UserRole } from 'types/User.d';
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
  const { userData } = useContext<any>(userStore);
  const { preferredWorkingHoursPerDay, role } = userData;
  const isEditing = row.id === editData.id;
  const workedWhen = formatKey(row.workedWhen);
  const total = totals[workedWhen];

  if (isEditing) {
    return (
      <>
        { role === UserRole.USER && (
          <TableRowHead
            hasHeader={hasHeader}
            date={format(new Date(row.workedWhen), 'MMM dd yyyy')}
            total={total}
          />
        )}
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
              label="Date"
              type="date"
              value={
                format(new Date(editData.workedWhen), "yyyy-MM-dd")
              }
              onChange={onEditChange('workedWhen')}
            />
          </TableCell>
          <TableCell>
            <TextField
              type="number"
              label="Duration"
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
      { role === UserRole.USER && (
        <TableRowHead
          hasHeader={hasHeader}
          date={format(new Date(row.workedWhen), 'MMM dd yyyy')}
          total={total}
        />
      )}
      <TableRow
        hover
        tabIndex={-1}
        key={row.id}
        {...(role === UserRole.USER
          ? {
            className: total > preferredWorkingHoursPerDay ? classes.successful : classes.fail
          }
          : {}
        )}
      >
        <TableCell>
          {number}
        </TableCell>
        <TableCell>{row.workedOn}</TableCell>
        <TableCell>{format(new Date(row.workedWhen), 'MMM dd yyyy')}</TableCell>
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
