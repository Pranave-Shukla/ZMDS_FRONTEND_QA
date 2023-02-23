export type TextAreaProps = {
  defaultValue?: string
  error?: string | null
  name?: string
  setTextAreaValue: (val: string) => void
  textAreaValue?: string
  title: string
}
