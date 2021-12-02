import { useMemo } from 'react'
import { useTable, Column, useSortBy } from 'react-table'
import { Pagination } from '../Pagination'
import { TableHeading, TableRow } from './'

import styles from './Table.module.css'

type Props<T extends object> = {
  columns: Column<T>[]
  items: T[]
  page: number
  itemsCount: number
  itemsLeft: number
  isLoading: boolean
  onPrevPageClick: () => void,
  onNextPageClick: () => void,
}

export function Table<ItemT extends object>(props: Props<ItemT>) {
  const {
    columns,
    items,
    page,
    itemsCount,
    itemsLeft,
    isLoading,
    onPrevPageClick,
    onNextPageClick,
  } = props
  const tableData = useMemo(() => items, [items])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: tableData,
      disableMultiSort: true,
    },
    useSortBy,
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.results}>
        Showed {((page - 1) * 20) + 1} – {(page * 20)} of {itemsCount}
      </div>

      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableHeading
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isSortActive={column.isSorted}
                  isSortable={column.canSort}
                  sortDirection={column.isSortedDesc ? 'desc' : 'asc'}
                >
                  {column.render('Header')}
                </TableHeading>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className={styles.body}>
          {rows.map(
            (row) => {
              prepareRow(row);

              return (
                <TableRow<ItemT>
                  {...row.getRowProps()}
                  cells={row.cells}
                />
              )
            }
          )}
        </tbody>
      </table>

      <div className={styles.controls}>
        <Pagination
          hasPrev={page > 1 && !isLoading}
          hasNext={itemsLeft !== 0 && !isLoading}
          onPrevClick={onPrevPageClick}
          onNextClick={onNextPageClick}
        />
      </div>
    </div>
  )
}
