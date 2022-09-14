import { Audit } from 'sdk'

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
  row: Audit
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

type updateSearchState = (name: string, value: any) => void

export { DataInterface, Filter, Audit, updateSearchState }
