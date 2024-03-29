import React, { useState } from 'react';
import { format } from 'date-fns';
import MUITable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add';

import { isSameDate } from 'utils/dates';
import TextField from 'components/TextField';
import { ITask } from 'types/Task';
import TableToolbar from './TableToolbar'
import TableHead from './TableHead';
import useStyles from './styles';
import TableRowRenderer from './TableRowRenderer'

const headCells = [
  { id: 'number', label: 'Task N' },
  { id: 'description', label: 'Description' },
  { id: 'date', label: 'Date' },
  { id: 'duration', label: 'Duration' },
  { id: 'actions', label: 'Actions' },
];

const Table = ({ 
  rows, 
  count,
  onAdd,
  totals,
  onEdit,
  onDelete,
  onFilter,
  onExport,
  loadMore,
  toolbarText,
  rowRenderer: Row,
}: any) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [editData, setEditData] = useState({ id: 0 });
  const [addData, setAddData] = useState({
    workedOn: '',
    workedWhen: new Date().toISOString(),
    duration: '',
  });
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onEditChange = (key: string) => (e: any) => {
    setEditData({ ...editData, [key]: e.target.value })
  }

  const onAddChange = (key: string) => (e: any) => {
    setAddData({ ...addData, [key]: e.target.value });
  }

  const handleChangePage = async (event: any, newPage: any) => {
    setPage(newPage);
    // If we have one page left till the end of all
    // items loaded, load another batch
    // items are 0 indexed, so we need + 1 + 1
    if ((newPage + 2) * rowsPerPage >= rows.length) {
      // We load in batch of 20s, so 
      // we need to calculate the real page
      const page = ((newPage + 2) * rowsPerPage) / 20;
      await (loadMore(page))
    }
  };

  const handleChangeRowsPerPage = async (event: any) => {
    const newRows = parseInt(event.target.value, 10);
    setRowsPerPage(newRows);
    setPage(0);
    // If one page fits all loaded items,
    if (newRows >= rows.length) {
      await (loadMore(1))
    }
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
      workedOn: '',
      workedWhen: new Date().toISOString(),
      duration: '',
    })
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableToolbar 
          text={toolbarText} 
          onFilter={onFilter}
          onExport={onExport}
        />
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
                    type="text"
                    label="Description"
                    value={addData.workedOn}
                    onChange={onAddChange('workedOn')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Date"
                    type="date"
                    value={format(new Date(addData.workedWhen), "yyyy-MM-dd")}
                    onChange={onAddChange('workedWhen')}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    label="Duration"
                    value={addData.duration}
                    onChange={onAddChange('duration')}
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
                .map((row: any, index: number, array: ITask[]) => {
                  const hasHeader = index === 0 
                    ? true 
                    : !isSameDate(array[index - 1].workedWhen, row.workedWhen)
                  return (
                    <TableRowRenderer
                      row={row}
                      key={row.id}
                      index={index}
                      totals={totals}
                      editData={editData}
                      onEditClick={onEditClick}
                      onEditChange={onEditChange}
                      onDeleteClick={onDeleteClick}
                      toggleEditMode={toggleEditMode}
                      number={page * rowsPerPage + index + 1}
                      hasHeader={hasHeader}
                    />
                  )
                })
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
          rowsPerPageOptions={[5, 10, 20]}
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
