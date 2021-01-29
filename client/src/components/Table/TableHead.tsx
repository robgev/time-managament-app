import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import MUITableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TableHead = (props: Record<string, any>) => {
  const {
    headCells,
  } = props;

  return (
    <MUITableHead>
      <TableRow>
        {headCells.map((headCell: any) => (
          <TableCell
            key={headCell.id}
          >
              {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  );
}

export default TableHead;
