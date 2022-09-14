import { Dispatch } from 'react'

export type Option = {
  label: string | undefined
  value: string | undefined
}

export type SelectProps = {
  defaultValue?: string
  name?: string
  options?: Option[]
  selectedValue?: string
  setSelectedValue: Dispatch<any>
  title: string
}
