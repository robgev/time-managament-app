import React, { useContext } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Done from '@material-ui/icons/Done';

import { userStore } from 'contexts/CurrentUser';
import { UserRole } from 'types/User.d';
import TextField from 'components/TextField';

const TableRowRenderer = ({ 
  row, 
  index,
  number,
  editData,
  hasHeader,
  onEditClick,
  onEditChange,
  onDeleteClick,
  toggleEditMode,
}: any) => {
  const { role, id } = useContext<any>(userStore);
  const isEditing = row.id === editData.id;

  if (isEditing) {
    return (
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
            label="First Name"
            value={editData.firstName}
            onChange={onEditChange('firstName')}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="text"
            label="Last Name"
            value={editData.lastName}
            onChange={onEditChange('lastName')}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="text"
            label="Username"
            value={editData.username}
            onChange={onEditChange('username')}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="number"
            label="Preferred Hours/Day"
            value={editData.preferredWorkingHoursPerDay}
            onChange={onEditChange('preferredWorkingHoursPerDay')}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="role"
            value={editData.role}
            label="User Role"
            disabled={role === UserRole.MANAGER}
            onChange={
              role === UserRole.MANAGER
              ? undefined
              : onEditChange('role')
            }
          />
        </TableCell>
        <TableCell>
          <IconButton onClick={onEditClick}>
            <Done />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }

  return (
    <TableRow
      hover
      tabIndex={-1}
      key={row.id}
    >
      <TableCell>
        {number}
      </TableCell>
      <TableCell>{row.firstName}</TableCell>
      <TableCell>{row.lastName}</TableCell>
      <TableCell>{row.username}{row.id === id ? ' (You)' : ''}</TableCell>
      <TableCell>{row.preferredWorkingHoursPerDay}</TableCell>
      <TableCell>{row.role}</TableCell>
      <TableCell>
        <IconButton 
          disabled={row.role > role} 
          onClick={toggleEditMode(row)}
        >
          <Edit />
        </IconButton>
        <IconButton 
          disabled={row.role > role || row.id === id} 
          onClick={onDeleteClick(row.id)}
        >
          <DeleteForever />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableRowRenderer;
