import { SortDirection } from 'sdk'

export type Option = {
  label: string
  value: string
}

export type HeaderFilterProps = {
  defaultValue?: string | Option
  fieldName: string
  filterType?: string
  gridName: string
  isCellSelected?: boolean
  name: string
  onSort?: (ctrlClick: boolean) => void
  options?: Option[]
  priority?: number
  sortDirection?: SortDirection
  updateSearchState: () => void
}
