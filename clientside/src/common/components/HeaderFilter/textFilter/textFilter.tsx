import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'common/store'
import { updateSearchState } from 'views/CustomersList/CustomersList.types'

import { updateFilter } from '../../Grid/redux/gridSlice'
import S from './textFilter.module.scss'

type TextFilterProps = {
  fieldName: string
  gridName: string
  updateSearchState: updateSearchState
}

const TextFilter = ({ fieldName, gridName, updateSearchState }: TextFilterProps) => {
  const value = useSelector((state: RootState) => state.grid[gridName].filters[fieldName]) as
    | string
    | number
  const dispatch = useDispatch()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateFilter({
        filterName: fieldName,
        gridName: gridName,
        value: e.target.value,
      }),
    )
  }

  return (
    <input
      className={S.filterInput}
      onBlur={() => updateSearchState()}
      onChange={onChange}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          updateSearchState()
        }
      }}
      type="text"
      value={value || ''}
    />
  )
}

export { TextFilter }
