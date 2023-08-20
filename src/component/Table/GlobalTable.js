import React, { useState } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
  } from '@mui/material';
  
  import {
    TextField,
    Checkbox,
    IconButton,
  } from '@mui/material';

const GlobalTable = ({ data, pageSize = 10 }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [searchText, setSearchText] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    setPage(0);
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <div>
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearch}
        InputProps={{
          startAdornment: <p></p>,
        }}
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.slice(startIndex, endIndex).map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                {/* Add more table cells for other columns */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={() => (
          <div>
            <IconButton
              onClick={() => handleChangePage(null, page - 1)}
              disabled={page === 0}
            >
              <p>NavigateBefore</p>
            </IconButton>
            <IconButton
              onClick={() => handleChangePage(null, page + 1)}
              disabled={endIndex >= filteredData.length}
            >
            <p>NavigateNext</p>
            </IconButton>
          </div>
        )}
      />
    </div>
  );
};

export default GlobalTable;
