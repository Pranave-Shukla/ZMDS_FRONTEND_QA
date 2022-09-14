import { Dispatch } from 'react'

export type InputProps = {
  disabled?: boolean
  inputValue?: string | number
  isDigits?: boolean
  setInputValue?: Dispatch<any>
  textContent?: number | string
  title: string
}
