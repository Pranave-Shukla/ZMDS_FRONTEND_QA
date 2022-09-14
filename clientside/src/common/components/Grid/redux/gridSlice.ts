import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Option } from 'common/components/HeaderFilter/HeaderFilter.types'

export interface GridState {
  [key: string]: {
    filters: {
      [key: string]: string | number | Date | Option[] | null
    }
    pageNumber: number
    sortBy: string
    sortDirection: string
  }
}

const initialState: GridState = {
  audits: {
    filters: {},
    pageNumber: 0,
    sortBy: '',
    sortDirection: 'DESC',
  },
  customers: {
    filters: { nativeStatus: [{ label: 'Review', value: 'IN_REVIEW' }] },
    pageNumber: 0,
    sortBy: '',
    sortDirection: '',
  },
  products: {
    filters: {},
    pageNumber: 0,
    sortBy: '',
    sortDirection: '',
  },
}

export const gridSlice = createSlice({
  initialState,
  name: 'counter',
  reducers: {
    updateFilter: (
      state,
      action: PayloadAction<{
        filterName: string
        gridName: string
        value: string | number | null
      }>,
    ) => {
      const { filterName, gridName, value } = action.payload

      state[gridName] = state[gridName] || {}
      state[gridName].filters = state[gridName].filters || {}
      state[gridName].filters[filterName] = value
    },
    updatePaginate: (state, action: PayloadAction<{ gridName: string; pageNumber: number }>) => {
      const { gridName, pageNumber } = action.payload

      state[gridName] = state[gridName] || {}
      state[gridName].pageNumber = pageNumber
    },
    updateSort: (
      state,
      action: PayloadAction<{ gridName: string; sortBy: string; sortDirection: string }>,
    ) => {
      const { gridName, sortBy, sortDirection } = action.payload

      state[gridName] = state[gridName] || {}
      state[gridName].sortBy = sortBy
      state[gridName].sortDirection = sortDirection
    },
  },
})

export const { updateFilter, updatePaginate, updateSort } = gridSlice.actions

const gridReducer = gridSlice.reducer

export { gridReducer }
