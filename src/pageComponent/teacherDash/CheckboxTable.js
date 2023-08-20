import React, { useState } from 'react';
import { useTable } from 'react-table';

const CheckboxTable = () => {
  // Sample data
  const data = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Bob Johnson', age: 40 },
    // Add more data as needed
  ];

  // Define columns for the table
  const columns = [
    {
      Header: 'Select',
      accessor: 'id', // Assuming 'id' is a unique identifier for each row
      Cell: ({ row }) => {
        return (
          <input
            type="checkbox"
            checked={row.isSelected}
            onChange={() => handleCheckboxChange(row)}
          />
        );
      },
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
  ];

  // Use the useTable hook to create the table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
    },
    // Add the useRowSelect plugin to enable row selection with checkboxes
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Add an additional column for checkboxes in the header
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <input
              type="checkbox"
              {...row.getToggleRowSelectedProps()}
            />
          ),
        },
        ...columns,
      ]);
    }
  );

  // State to store selected rows
  const [selectedRows, setSelectedRows] = useState([]);

  // Function to handle checkbox change
  const handleCheckboxChange = row => {
    row.toggleRowSelected();
  };

  // Update the state with the selected rows whenever the selection changes
  useEffect(() => {
    setSelectedRows(selectedFlatRows.map(row => row.original));
  }, [selectedFlatRows]);

  return (
    <div>
      <table {...getTableProps()} style={{ border: '1px solid black' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <h4>Selected Rows:</h4>
        <ul>
          {selectedRows.map(row => (
            <li key={row.id}>{row.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CheckboxTable;
