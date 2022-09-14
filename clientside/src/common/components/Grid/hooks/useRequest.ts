import { useState } from 'react'

import { store } from 'common/store'
import { Language, SortDirection } from 'sdk'

interface filtersDict {
  [key: string]: {
    field: string
    operation: string
  }
}

function useRequest(
  requestContentType: string,
  defaultSortColumnKey: string,
  filtersDict: filtersDict,
  gridName: string,
  defaultRequestFilter?: [],
  pageSize?: number,
) {
  const [request, setRequest] = useState<any>({})

  const buildRequest = () => {
    const storeState = store.getState()
    const { filters, pageNumber, sortBy, sortDirection } = storeState.grid[gridName]

    const requestPayload: {
      filters?: {
        field: string
        operation: string
        values: (string | number | Date)[]
      }[]
      language: string
      pageNumber: number
      pageSize?: number
      sortBy: string
      sortDirection: string
    } = {
      filters: defaultRequestFilter,
      language: Language.DE,
      pageNumber: pageNumber,
      pageSize: pageSize || 10,
      sortBy: sortBy && filtersDict[sortBy] ? filtersDict[sortBy].field : defaultSortColumnKey,
      sortDirection: sortDirection || SortDirection.ASC,
    }

    const freshFilters: {
      field: string
      operation: string
      values: any[]
    }[] = []

    for (const filterName in filters) {
      const filterValue = filters[filterName]

      if (
        (Array.isArray(filterValue) && filterValue.length > 0) ||
        (!Array.isArray(filterValue) && filterValue)
      ) {
        freshFilters.push({
          field: filtersDict[filterName].field,
          operation: filtersDict[filterName].operation,
          values: Array.isArray(filterValue)
            ? filterValue.map((option: { label: string; value: string }) => option.value)
            : [filterValue],
        })
      }
    }
    requestPayload.filters = freshFilters

    setRequest({
      [requestContentType]: requestPayload,
    })
  }

  return {
    buildRequest,
    request,
  }
}

export { useRequest }
