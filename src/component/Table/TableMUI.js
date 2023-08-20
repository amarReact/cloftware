
import styles from "./tb.module.css"
import React, { useState, useEffect } from 'react';
import {BiSearchAlt} from "react-icons/bi"
import {MdArrowCircleRight, MdArrowCircleLeft} from "react-icons/md"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  IconButton,
  TextField,
  Button,
} from '@mui/material';

const TableMUI = ({ data = [], columns = [], actions = [], onSelectionChange }) => {
  console.log("data", data)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handleCheckboxChange = row => {
    const selectedIndex = selectedRows.indexOf(row);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, row);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedRows);
    }
  }, [selectedRows, onSelectionChange]);

  const handleSelectAll = event => {
    if (event.target.checked) {
      setSelectedRows(data);
    } else {
      setSelectedRows([]);
    }
  };

  const filteredData = data.filter(row =>
    columns.some(column =>
      row[column.id]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const rows = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  console.log("filteredData", filteredData.length)

  return (
    <div  attr="tablesMui" className={styles.tableFull}>
      <div 
      // style={{ marginBottom: '16px' }}
       className={styles.tableFullIn}>
        <TextField
          variant="outlined"
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <BiSearchAlt /> 
              </IconButton>
            ),
          }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {onSelectionChange && <TableCell>
                <Checkbox
                  indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                  checked={selectedRows.length === rows.length && rows.length > 0}
                  onChange={handleSelectAll}
                />
              </TableCell>}
              {columns.map(column => (
                <TableCell hide={column?.hide && "none"} key={column.id}>{column.label}</TableCell>
              ))}
              {actions.length > 0 && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
               {onSelectionChange && <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(row)}
                    onChange={() => handleCheckboxChange(row)}
                  />
                </TableCell>}
                {columns.map((column, ind) => (
                  <TableCell isNumber={column?.number && "isNumber"} hide={column?.hide && "none"} width={column?.width && column.width} attr-data={row[column.id]} key={column.id}>
                      <cite>{column?.label}</cite>
                      <b attr-data={row[column.id]}>
                        {column?.format ? column?.format(row[column?.id]) : row[column?.id]}
                      </b>
                    </TableCell>
                ))}

                {actions.length > 0 && (
                  <TableCell width="140px">
                    {actions.map((action, index) => (
                      <Button
                        key={index}
                        variant="contained"
                        color="primary"
                        onClick={() => action.onClick(row)}
                      >
                        {action.label} 
                      </Button>
                    ))}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        attr-data="tablePagination"
        rowsPerPageOptions={[10, 30, 50, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        ActionsComponent={({ onPageChange }) => (
          <div attr-data="paginationBtn">
            <button onClick={() => onPageChange(page - 1)} disabled={page === 0}>
                 Prev
            </button>
            <button onClick={() => onPageChange(page + 1)} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>
              Next
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default TableMUI;
