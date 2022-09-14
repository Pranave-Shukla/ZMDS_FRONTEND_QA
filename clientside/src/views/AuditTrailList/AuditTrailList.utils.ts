import { LocalizedBooleanValue, SearchAuditsByField, SearchByOperation } from 'sdk'

export const FILTERS_DICT = {
  dataSet: {
    field: SearchAuditsByField.DATASET,
    operation: SearchByOperation.IN,
  },
  date: {
    field: SearchAuditsByField.DATE,
    operation: SearchByOperation.LIKE,
  },
  header: {
    field: SearchAuditsByField.HEADER,
    operation: SearchByOperation.LIKE,
  },
  initiator: {
    field: SearchAuditsByField.INITIATOR,
    operation: SearchByOperation.LIKE,
  },
  message: {
    field: SearchAuditsByField.MESSAGE,
    operation: SearchByOperation.LIKE,
  },
}

export const booleanValueOptions = (localizedArr: LocalizedBooleanValue[]) =>
  localizedArr?.map((v) => ({ label: v.localizedValue, value: v.value }))

export const booleanDictValue = (localizedArr: LocalizedBooleanValue[], value?: string) => {
  if (value === null) {
    return null
  }
  const element = localizedArr?.find((v) => value === v.value)

  return element ? element.localizedValue : null
}
