import { Customer } from 'sdk'

interface Row {
  address: string
  comment: string | null
  companyName: string
  erpId: number | null
  headerCellClass?: any
  id: number
  nativeCreatedDate: Date | null
  nativeStatus: string | null
  rejectionReason: string | null
  sourceSystem: { name: string }
  state: string | null
  type: string | null
}

interface Column {
  frozen: boolean
  headerCellClass: string
  idx: number
  isLastFrozenColumn: boolean
  key: string
  name: string
  resizable: boolean
  rowGroup: boolean
  sortable: boolean
}

interface DataInterface {
  column: Column
  row: Customer
}

interface Filter {
  address: any
  companyName: any
  erpId: any
  nativeCreatedDate: any
  nativeStatus: any
  rejectionReason: any
  source: any
  state: any
  type: any
}

type updateSearchState = () => void

export { DataInterface, Filter, Row, updateSearchState }
