// TODO: Reuse the table component

import React, { useState } from 'react';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add';

import TextField from 'components/TextField';
import { IUser } from 'types/User';
import TableToolbar from './TableToolbar'
import TableHead from './TableHead';
import useStyles from './styles';
import TableRowRenderer from './TableRowRenderer'

const headCells = [
  { id: 'number', label: 'User ID' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'username', label: 'Username' },
  { id: 'preferredWorkingHoursPerDay', label: 'Preferred Hours/Day' },
  { id: 'role', label: 'User Role' },
  { id: 'actions', label: 'Actions' },
];

const Table = ({ 
  rows, 
  count,
  onAdd,
  onEdit,
  onDelete,
  toolbarText,
  rowRenderer: Row,
}: any) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [editData, setEditData] = useState({ id: 0 });
  const [addData, setAddData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onEditChange = (key: string) => (e: any) => {
    setEditData({ ...editData, [key]: e.target.value })
  }

  const onAddChange = (key: string) => (e: any) => {
    setAddData({ ...addData, [key]: e.target.value });
  }

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const onEditClick = () => {
    onEdit(editData.id, editData)
    setEditData({ id: 0 })
  }

  const toggleEditMode = (row: any) => () => {
    setEditData(row);
  }

  const onDeleteClick = (id: number) => (e: any) => {
    onDelete(id)
  }

  const onAddClick = () => {
    onAdd(addData);
    setAddData({
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    })
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar text={toolbarText} />
        <TableContainer>
          <MUITable
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <TableHead
              headCells={headCells}
              classes={classes}
              rowCount={count}
            />
            <TableBody>
              <TableRow hover key="inputs">
                <TableCell>
                  0
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="text"
                    label="First Name"
                    value={addData.firstName}
                    onChange={onAddChange('firstName')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="text"
                    label="Last Name"
                    value={addData.lastName}
                    onChange={onAddChange('lastName')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="text"
                    label="Username"
                    value={addData.username}
                    onChange={onAddChange('username')}
                  />
                </TableCell>
                <TableCell colSpan={2}>
                  <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    value={addData.password}
                    onChange={onAddChange('password')}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={onAddClick}>
                    <Add />
                  </IconButton>
                </TableCell>
              </TableRow>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number, array: IUser[]) => (
                  <TableRowRenderer
                    row={row}
                    key={row.id}
                    index={index}
                    editData={editData}
                    onEditClick={onEditClick}
                    onEditChange={onEditChange}
                    onDeleteClick={onDeleteClick}
                    toggleEditMode={toggleEditMode}
                    number={page * rowsPerPage + index + 1}
                  />
                ))
              }
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </MUITable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default Table;
