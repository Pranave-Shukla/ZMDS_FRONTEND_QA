import React from 'react'
import { SortableHeaderCell } from 'react-data-grid'

import { SelectFilter } from './selectFilter/selectFilter'
import { DateFilter } from './dateFilter/dateFilter'
import { TextFilter } from './textFilter/textFilter'
import { HeaderFilterProps } from './HeaderFilter.types'
import S from './HeaderFilter.module.scss'
// import { SortableHeaderCell } from 'react-data-grid'

const HeaderFilter = ({
  fieldName,
  filterType = 'text',
  gridName,
  isCellSelected,
  name,
  onSort,
  options,
  priority,
  sortDirection,
  updateSearchState,
}: HeaderFilterProps) => {
  return (
    <div className={S.gridColumnHeaderWrapper}>
      {/* <div>{name}</div> */}

      {/* <SortableHeaderCell></SortableHeaderCell> */}

      <SortableHeaderCell
        isCellSelected={isCellSelected || false}
        onSort={onSort}
        priority={priority}
        sortDirection={sortDirection}
      >
        {name}
      </SortableHeaderCell>

      {filterType === 'select' ? (
        <SelectFilter
          fieldName={fieldName}
          gridName={gridName}
          options={options}
          updateSearchState={updateSearchState}
        />
      ) : filterType === 'date' ? (
        <DateFilter
          fieldName={fieldName}
          gridName={gridName}
          updateSearchState={updateSearchState}
        />
      ) : (
        <TextFilter
          fieldName={fieldName}
          gridName={gridName}
          updateSearchState={updateSearchState}
        />
      )}
    </div>
  )
}

export { HeaderFilter }
