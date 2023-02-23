import React, { ReactElement } from 'react'
import DataGrid from 'react-data-grid'
import { useDispatch, useSelector } from 'react-redux'

import { SortDirection } from 'sdk'
import { RootState } from 'common/store'

import { updateSort } from './redux/gridSlice'
import { Pagination } from './pagination/pagination'
import { GridProps } from './Grid.types'
import S from './Grid.module.scss'

const Grid = ({
  buildRequest,
  columns,
  defaultSortColumnKey,
  gridName,
  pageInfo,
  rows,
  setRows,
}: GridProps): ReactElement => {
  const dispatch = useDispatch()
  const { sortBy, sortDirection } = useSelector((state: RootState) => state.grid[gridName])

  const setSortColumns = (sortColumns: { columnKey: string; direction: 'ASC' | 'DESC' }[]) => {
    dispatch(
      updateSort({
        gridName: gridName,
        sortBy: sortColumns[0] ? sortColumns[0].columnKey : defaultSortColumnKey,
        sortDirection: sortColumns[0] ? sortColumns[0].direction : SortDirection.ASC,
      }),
    )
    buildRequest()
  }

  return (
    <div className={S.gridRoot}>
      <DataGrid
        className={S.filterContainerClassname}
        //@ts-ignore
        columns={columns}
        //@ts-ignore
        defaultColumnOptions={{
          resizable: false,
          sortable: true,
        }}
        headerRowHeight={70}
        onRowsChange={setRows}
        onSortColumnsChange={setSortColumns}
        rows={rows}
        sortColumns={[
          {
            columnKey: sortBy,
            direction: sortDirection as 'ASC' | 'DESC',
          },
        ]}
      />
      <Pagination getPaginatedPage={buildRequest} gridName={gridName} pageInfo={pageInfo} />
    </div>
  )
}

export { Grid }
