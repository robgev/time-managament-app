import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton'
import Edit from '@material-ui/icons/Edit';
import DeleteForever from '@material-ui/icons/DeleteForever';
import Done from '@material-ui/icons/Done';

import TextField from 'components/TextField';

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
  const labelId = `enhanced-table-checkbox-${index}`;
  const isEditing = row.id === editData.id;
  if (isEditing) {
    return (
      <>
        <TableRowHead
          hasHeader={hasHeader}
          date={row.workedWhen}
          total={totals[row.workedWhen]}
        />
        <TableRow
          hover
          tabIndex={-1}
          key={row.id}
        >
          <TableCell id={labelId}>
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
        total={totals[row.workedWhen]}
      />
      <TableRow
        hover
        tabIndex={-1}
        key={row.id}
      >
        <TableCell id={labelId}>
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
