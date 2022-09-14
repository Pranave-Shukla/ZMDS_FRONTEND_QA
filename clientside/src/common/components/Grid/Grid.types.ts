import { Dispatch } from 'react'
import { PageInfo } from 'sdk'

type Column = {
  formatter?: ({ row }: any) => void
  headerCellClass: string
  headerRenderer?: ({ ...props }) => JSX.Element
  key: string
  name: string
}

export type GridProps = {
  buildRequest: () => void
  columns: Column[]
  defaultSortColumnKey: string
  gridName: string
  pageInfo: PageInfo
  rows: []
  setRows: Dispatch<any>
}
