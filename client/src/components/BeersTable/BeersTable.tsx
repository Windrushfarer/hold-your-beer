import { FC, useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import { Column } from 'react-table'
import { Beer } from '../../shared/types/domain'
import { api } from '../../api'
import { Table } from '../Table'

export const BeersTable: FC = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery(['beers', page], () => {
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

  return (
    <Table<Beer>
      columns={columns}
      items={tableData}
      isLoading={isLoading}
      page={page}
      itemsCount={data ? data.count : 0}
      itemsLeft={data ? data.left : 0}
      onPrevPageClick={() => {
        setPage(page - 1)
      }}
      onNextPageClick={() => {
        setPage(page + 1)
      }}
    />
  )
}
