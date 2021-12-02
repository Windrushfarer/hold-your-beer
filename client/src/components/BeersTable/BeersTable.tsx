import { FC, useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import { useTable, Column, useSortBy, HeaderGroup } from 'react-table'
import { api } from '../../api'
import { Beer } from '../../shared/types/domain'
import { Pagination } from '../Pagination'
import { TableHeading, TableRow } from '../Table'
import styles from './BeersTable.module.css'

export const BeersTable: FC = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isPreviousData } = useQuery(['beers', page], () => {
    return api.fetchBeers({
      page,
      rows: 20
    })
  }, {
    keepPreviousData: true
  })

  const columns: Column<Beer>[] = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Abv',
      accessor: 'abv',
    },
    {
      Header: 'Size',
      accessor: 'ounces',
    },
    {
      Header: 'Type',
      accessor: 'style',
      disableSortBy: true,
    },
  ], [])
  const tableData = useMemo(() => data ? data.items : [], [data])

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
        Showed {((page - 1) * 20) + 1} – {(page * 20)} of {data?.count}
      </div>

      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableHeading
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isSortActive={column.isSorted}
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
                <TableRow
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
          hasNext={data?.left !== 0 && !isLoading}
          onPrevClick={() => {
            setPage(page - 1)
          }}
          onNextClick={() => {
            setPage(page + 1)
          }}
        />
      </div>
    </div>
  )
}
