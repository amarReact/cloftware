// import React, { useMemo } from 'react';
// import { useTable, useGlobalFilter, usePagination } from 'react-table';
// import styles from "./tb.module.css"
// import {useState} from "react"
// function Table({ columns, data, placeholder, navigation, selectedRows, handleSelectedRows }) {


//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         page,
//         nextPage,
//         previousPage,
//         canNextPage,
//         canPreviousPage,
//         pageOptions,
//         state,
//         setGlobalFilter,
//         state: { selectedRowIds },
//         prepareRow,
//     } = useTable(
//         {
//             columns,
//             data,
//             initialState: { pageIndex: 0 },
//         },
//         useGlobalFilter,
//         usePagination,
//     );

//     const { globalFilter, pageIndex } = state;

//     const handleChange = e => {
//         setGlobalFilter(e.target.value || undefined);
//     };

//     const paginationOptions = useMemo(
//         () =>
//             Array.from({ length: pageOptions.length }, (_, i) => (
//                 <option key={i} value={i}>
//                     {i + 1}
//                 </option>
//             )),
//         [pageOptions.length],
//     );

//     const toggleSelectAll = (data) => {
//       const selectAll = selectedRows.length !== data.length;
//       setSelectedRows(selectAll ? [...data] : []);
//   };
  
//   const toggleSelect = (row, data) => {
//       const index = selectedRows.findIndex((r) => r.id === row.id);
//       if (index > -1) {
//           setSelectedRows((prevRows) => {
//               const updatedRows = [...prevRows];
//               updatedRows.splice(index, 1);
//               return updatedRows;
//           });
//       } else {
//           setSelectedRows((prevRows) => [...prevRows, row]);
//       }
//   };
  

//     return (
//         <div attr="tables" className={styles.tableFull}>
//             <div className={styles.tableDiv}>
//                 <input placeholder={placeholder} value={globalFilter || ''} onChange={handleChange} />
//             </div>
//             <div className="globaltable">

//             {page.length === 0 ? (
//             <div className={styles.dfn}>Data Not Found...</div>
//       ) : (

//             <table {...getTableProps()} border="0"  >
//                 <thead>
//                     {headerGroups.map(headerGroup => (
//                         <tr {...headerGroup.getHeaderGroupProps()}>
//                           <th>
//                             <input type="checkbox" onChange={() => toggleSelectAll(data)} />
//                         </th>
//                             {headerGroup.headers.map(column => (
//                                 <th {...column.getHeaderProps()}>{column.render('Header')}</th>
//                             ))}
//                         </tr>
//                     ))}
//                 </thead>
//                 <tbody {...getTableBodyProps()}>
//                     {page.map(row => {
//                         prepareRow(row);
//                         return (
//                             <tr {...row.getRowProps()}>
//                               <td>
//                               <input
//                                   type="checkbox"
//                                   checked={isSelected(row)}
//                                   onChange={() => toggleSelect(row, data)}
//                               />
//                           </td>
//                                 {row.cells.map(cell => {
//                                     return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
//                                 })}
//                             </tr>
//                         );
//                     })}
//                 </tbody>
//             </table>)}
//          </div>

//           {!navigation &&   <div className={styles.tableBottom}>
//                 <section>
//                     <button onClick={() => previousPage()} disabled={!canPreviousPage}>
//                         Previous
//                     </button>{' '}
//                     <button onClick={() => nextPage()} disabled={!canNextPage}>
//                         Next
//                     </button>{' '}
//                 </section>

//                 <aside>
//                     <span>
//                         Page{' '}
//                         <strong>
//                             {pageIndex + 1} of {pageOptions.length}
//                         </strong>{' '}
//                     </span>
//                 </aside>

//             </div>}

//         </div>
//     );
// }

// export default Table;


import React, { useMemo, useEffect, useState } from 'react';
import { useTable, useGlobalFilter, usePagination, useRowSelect } from 'react-table';
import styles from "./tb.module.css"

function Table({ columns, data, placeholder, navigation, handleSelectedRows }) {
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    setGlobalFilter,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: () => {
            // Select all checkbox header
            return (
              <input type="checkbox" {...hooks.allColumns[0].getToggleAllRowsSelectedProps()} />
            );
          },
          Cell: ({ row }) => {
            // Select all checkbox cell
            return <input type="checkbox" {...row.getToggleRowSelectedProps()} />;
          },
        },
        ...columns,
      ]);
    }

    // useRowSelect, // Enable row selection
    // hooks => {
    //   if (handleSelectedRows) {
    //     hooks.visibleColumns.push(columns => [
    //       {
    //         // Add a column for checkboxes
    //         id: 'selection',
    //         Header: ({ getToggleAllRowsSelectedProps }) => (
    //           <input className='checkboxContainer' type="checkbox" {...getToggleAllRowsSelectedProps()} />
    //         ),
    //         Cell: ({ row }) => (
    //           <input className='checkboxContainer' type="checkbox" {...row.getToggleRowSelectedProps()} />
    //         ),
    //       },
    //       ...columns,
    //     ]);
    //   }
    // }
  );

  const { globalFilter, pageIndex, selectedRowIds } = state;

  const handleChange = e => {
    setGlobalFilter(e.target.value || undefined);
  };

  // useEffect(() => {
  //   setSelectedRows(page.filter(row => selectedRowIds[row.id]));
  // }, [selectedRowIds, page]);

  // React.useEffect(() => {
  //   handleSelectedRows(page.filter(row => selectedRowIds[row.id]));
  // }, [selectedRowIds]);

  // React.useEffect(() => {
  //   handleSelectedRows(page.filter((row) => selectedRowIds[row.id]));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedRowIds]);

  // React.useEffect(() => {
  //   handleSelectedRows(page.filter((row) => selectedRowIds[row.id]));
  // }, [page, selectedRowIds]);

  // React.useEffect(() => {
  //   handleSelectedRows(page.filter((row) => selectedRowIds[row.id]));
  // }, [selectedRowIds]);
  
  
  

// console.log("efwee")

  // useEffect(() => {
  //   if(handleSelectedRows){
  //     handleSelectedRows(selectedRows);
  //   }
 
  // }, [selectedRows, handleSelectedRows]);

  return (
    <div attr="tables" className={styles.tableFull}>
      <div className={styles.tableDiv}>
        <input type="search" placeholder={placeholder} value={globalFilter || ''} onChange={handleChange} />
      </div>
      <div className="globaltable">
        {page.length === 0 ? (
          <div className={styles.dfn}>Data Not Found...</div>
        ) : (
          <table {...getTableProps()} border="0">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {/* <th>
                    <input type="checkbox" onChange={toggleSelectAll} checked={selectedRows.length === data.length} />
                  </th> */}
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {/* <td>
                      <input
                        type="checkbox"
                        checked={isSelected(row)}
                        onChange={() => toggleSelect(row)}
                      />
                    </td> */}
                    {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {!navigation && (
        <div className={styles.tableBottom}>
          <section>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>{' '}
          </section>

          <aside>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
          </aside>
        </div>
      )}
    </div>
  );
}


export default Table;


// import React, { useState, useEffect } from 'react';

// function Table({ columns, data, placeholder, navigation, handleSelectedRows }) {
//   const [selectedRows, setSelectedRows] = useState([]);

//   const toggleSelectAll = () => {
//     const selectAll = selectedRows.length !== data.length;
//     setSelectedRows(selectAll ? [...data] : []);
//   };

//   const isSelected = (row) => selectedRows.some((r) => r.id === row.id);

//   const toggleSelect = (row) => {
//     const index = selectedRows.findIndex((r) => r.id === row.id);
//     if (index > -1) {
//       setSelectedRows((prevRows) => {
//         const updatedRows = [...prevRows];
//         updatedRows.splice(index, 1);
//         return updatedRows;
//       });
//     } else {
//       setSelectedRows((prevRows) => [...prevRows, row]);
//     }
//   };

//   useEffect(() => {
//     handleSelectedRows(selectedRows);
//   }, [selectedRows, handleSelectedRows]);

//   // Call this function when you want to check a particular checkbox
//   const checkSpecificRow = (rowId) => {
//     const rowToCheck = data.find((row) => row.id === rowId);
//     if (rowToCheck) {
//       toggleSelect(rowToCheck);
//     }
//   };
  
//   return (
//     <div>
//       {/* Render your table here */}
//       <table>
//         <thead>
//           <tr>
//            {handleSelectedRows && <th>
//               <input type="checkbox" onChange={() => toggleSelectAll()} />
//             </th>}
//             {columns.map((column) => (
//               <th key={column.Header}>{column.Header}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row) => (
//             <tr key={row.id}>
//                    {handleSelectedRows && <td>
//                 <input
//                   type="checkbox"
//                   checked={isSelected(row)}
//                   onChange={() => toggleSelect(row)}
//                 />
//               </td>}
//               {columns.map((column) => (
//                 <td key={column.accessor}>{row[column.accessor]}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Table;
