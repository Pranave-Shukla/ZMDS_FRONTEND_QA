import React from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from 'common/store'
import de from 'date-fns/locale/de'
import { updateSearchState } from 'views/CustomersList/CustomersList.types'

import { updateFilter } from '../../Grid/redux/gridSlice'
import './dateFilter.module.scss'

type DateFilterProps = {
  fieldName: string
  gridName: string
  updateSearchState: updateSearchState
}

registerLocale('de', de)

const DateFilter = ({ fieldName, gridName, updateSearchState }: DateFilterProps) => {
  const startDate = useSelector(
    (state: RootState) => state.grid[gridName].filters[fieldName],
  ) as string
  const dispatch = useDispatch()

  const updateDate = (date: Date) => {
    const isoDate = date
      ? new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
      : null

    dispatch(
      updateFilter({
        filterName: fieldName,
        gridName: gridName,
        value: isoDate,
      }),
    )
    updateSearchState()
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DatePicker
        dateFormat="dd.MM.yyyy"
        locale="de"
        onChange={updateDate}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            updateSearchState()
          }
        }}
        selected={startDate ? new Date(Date.parse(startDate)) : null}
      />
    </div>
  )
}

export { DateFilter }
