import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import styles from "./tb.module.css"
function Table({ columns, data, placeholder }) {
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
    );

    const { globalFilter, pageIndex } = state;

    const handleChange = e => {
        setGlobalFilter(e.target.value || undefined);
    };

    const paginationOptions = useMemo(
        () =>
            Array.from({ length: pageOptions.length }, (_, i) => (
                <option key={i} value={i}>
                    {i + 1}
                </option>
            )),
        [pageOptions.length],
    );

    return (
        <div attr="tables" className={styles.tableFull}>
            <div className={styles.tableDiv}>
                <input placeholder={placeholder} value={globalFilter || ''} onChange={handleChange} />
            </div>
            <div className="globaltable">
            <table {...getTableProps()} border="0"  >
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
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
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
         </div>
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
        </div>
    );
}

export default Table;
