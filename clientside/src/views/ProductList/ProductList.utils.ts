import {
  LocalizedBooleanValue,
  LocalizedCustomerType,
  LocalizedProductAvailability,
  LocalizedRejectionReason,
  SearchByOperation,
  SearchProductsByField,
  SourceSystem,
} from 'sdk'

export const FILTERS_DICT = {
  availability: {
    field: SearchProductsByField.AVAILABILITY,
    operation: SearchByOperation.IN,
  },
  description: {
    field: SearchProductsByField.DESCRIPTION,
    operation: SearchByOperation.LIKE,
  },
  hasMedia: {
    field: SearchProductsByField.HASMEDIA,
    operation: SearchByOperation.IN,
  },
  id: {
    field: SearchProductsByField.PRODUCTID,
    operation: SearchByOperation.LIKE,
  },
  isVisible: {
    field: SearchProductsByField.ISVISIBLE,
    operation: SearchByOperation.IN,
  },
  maximumOrderQuantity: {
    field: SearchProductsByField.MAXIMUMORDERQUANTITY,
    operation: SearchByOperation.IN,
  },
  minimumOrderQuantity: {
    field: SearchProductsByField.MINIMUMORDERQUANTITY,
    operation: SearchByOperation.IN,
  },
  sourceSystem: {
    field: SearchProductsByField.SOURCE,
    operation: SearchByOperation.IN,
  },
}

export const booleanValueOptions = (localizedArr: LocalizedBooleanValue[]) =>
  localizedArr?.map((v) => ({ label: v.localizedValue, value: v.value }))

export const productAvailabilityOptions = (localizedArr: LocalizedProductAvailability[]) =>
  localizedArr?.map((v) => ({ label: v.localizedAvailability, value: v.availability }))

export const rejectionReasonsOptions = (localizedArr: LocalizedRejectionReason[]) =>
  localizedArr?.map((v) => ({ label: v.localizedRejectionReason, value: v.rejectionReason }))

export const customerTypesOptions = (localizedArr: LocalizedCustomerType[]) =>
  localizedArr?.map((v) => ({ label: v.localizedType, value: v.type }))

export const sourceSystemsOptions = (localizedArr: SourceSystem[]) =>
  localizedArr?.map((v) => ({ label: v.name, value: v.name }))

export const booleanDictValue = (localizedArr: LocalizedBooleanValue[], value?: string) => {
  if (value === null) {
    return null
  }
  const element = localizedArr?.find((v) => value === v.value)

  return element ? element.localizedValue : null
}

export const productAvailabilityDictValue = (
  localizedArr: LocalizedProductAvailability[],
  value?: string,
) => {
  if (value === null) {
    return null
  }
  const element = localizedArr?.find((v) => value === v.availability)

  return element ? element.localizedAvailability : null
}

export const customerTypesDictValue = (localizedArr: LocalizedCustomerType[], value: string) => {
  if (value === null) {
    return null
  }
  const element = localizedArr?.find((v) => value === v.type)

  return element ? element.localizedType : null
}
