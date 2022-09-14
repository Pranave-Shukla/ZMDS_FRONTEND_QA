import React, { ReactElement, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MultiSelect } from 'react-multi-select-component'

import { RootState } from 'common/store'

import { updateFilter } from '../../Grid/redux/gridSlice'
import S from './selectFilter.module.scss'
import { Option } from '../HeaderFilter.types'

type SelectFilterProps = {
  fieldName: string
  gridName: string
  options?: Option[]
  updateSearchState: () => void
}

const SelectFilter = ({
  fieldName,
  gridName,
  options,
  updateSearchState,
  ...restProps
}: SelectFilterProps): ReactElement<any, any> => {
  const selected = useSelector((state: RootState) => state.grid[gridName].filters[fieldName]) as
    | []
    | undefined
  const dispatch = useDispatch()

  const onChange = (value: string) => {
    dispatch(
      updateFilter({
        filterName: fieldName,
        gridName: gridName,
        value: value,
      }),
    )

    updateSearchState()
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as any)) {
          setIsOpen(false)
        }
      }}
      onClick={(e) => {
        e.stopPropagation()
        setIsOpen(true)
      }}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === 'Escape') {
          setIsOpen(false)
        }
      }}
    >
      <MultiSelect
        className={S.multiSelect}
        debounceDuration={300}
        disableSearch={true}
        isOpen={isOpen}
        labelledBy={fieldName}
        onChange={onChange}
        options={options ? options : []}
        value={selected || []}
        {...restProps}
      />
    </div>
  )
}

export { SelectFilter }
