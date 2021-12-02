import { FC, useState, useMemo } from 'react'
import { useQuery } from 'react-query'
import { Column } from 'react-table'
import { Brewery } from '../../shared/types/domain'
import { api } from '../../api'
import { Table } from '../Table'

export const BreweriesTable: FC = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useQuery(['breweries', page], () => {
    return api.fetchBreweries({
      page,
      rows: 20
    })
  }, {
    keepPreviousData: true
  })

  const columns: Column<Brewery>[] = useMemo(() => [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'State',
      accessor: 'state',
      disableSortBy: true
    }
  ], [])
  const tableData = useMemo(() => data ? data.items : [], [data])

  return (
    <Table<Brewery>
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
