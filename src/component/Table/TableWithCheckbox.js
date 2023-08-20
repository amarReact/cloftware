import React, { useMemo } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';
import { Checkbox } from '@mui/material';

const TableWithCheckbox = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Checkbox',
        accessor: 'checkbox',
        Cell: ({ row }) => (
          <Checkbox {...row.getToggleRowSelectedProps()} />
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      // Add more columns as needed
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    selectedFlatRows,
    gotoPage,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageCount },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <Checkbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
      ]);
    }
  );

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={previousPage} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={nextPage} disabled={!canNextPage}>
          {'>'}
        </button>
        <div>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>
        </div>
      </div>
      <div>
        Selected rows: {selectedFlatRows.length}
      </div>
    </div>
  );
};

export default TableWithCheckbox;
