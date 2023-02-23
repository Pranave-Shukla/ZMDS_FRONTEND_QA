import {
  LocalizedCustomerNativeStatus,
  LocalizedCustomerState,
  LocalizedCustomerType,
  LocalizedRejectionReason,
  SearchByOperation,
  SearchCustomersByField,
  SourceSystem,
} from 'sdk'

export const FILTERS_DICT = {
  address: {
    field: SearchCustomersByField.ADDRESS,
    operation: SearchByOperation.LIKE,
  },
  companyName: {
    field: SearchCustomersByField.COMPANYNAME,
    operation: SearchByOperation.LIKE,
  },
  erpId: {
    field: SearchCustomersByField.ERPID,
    operation: SearchByOperation.LIKE,
  },
  nativeCreatedDate: {
    field: SearchCustomersByField.NATIVECREATEDDATE,
    operation: SearchByOperation.LIKE,
  },
  nativeStatus: {
    field: SearchCustomersByField.NATIVESTATUS,
    operation: SearchByOperation.IN,
  },
  rejectionReason: {
    field: SearchCustomersByField.REJECTIONREASON,
    operation: SearchByOperation.LIKE,
  },
  sourceSystem: {
    field: SearchCustomersByField.SOURCE,
    operation: SearchByOperation.IN,
  },
  state: {
    field: SearchCustomersByField.STATE,
    operation: SearchByOperation.IN,
  },
  type: {
    field: SearchCustomersByField.TYPE,
    operation: SearchByOperation.IN,
  },
}

export const customerNativeStatusesOptions = (localizedArr: LocalizedCustomerNativeStatus[]) =>
  localizedArr?.map((v) => ({ label: v.localizedNativeStatus, value: v.nativeStatus }))

export const customerStatesOptions = (localizedArr: LocalizedCustomerState[]) =>
  localizedArr?.map((v) => ({ label: v.localizedState, value: v.state }))

export const rejectionReasonsOptions = (localizedArr: LocalizedRejectionReason[]) =>
  localizedArr?.map((v) => ({ label: v.localizedRejectionReason, value: v.rejectionReason }))

export const customerTypesOptions = (localizedArr: LocalizedCustomerType[]) =>
  localizedArr?.map((v) => ({ label: v.localizedType, value: v.type }))

export const sourceSystemsOptions = (localizedArr: SourceSystem[]) =>
  localizedArr?.map((v) => ({ label: v.name, value: v.name }))

export const customerNativeStatusesDictValue = (
  localizedArr: LocalizedCustomerNativeStatus[],
  value?: string | null,
) => {
  if (value === null) {
    return null
  }
  const element = localizedArr?.find((v) => value === v.nativeStatus)

  return element ? element.localizedNativeStatus : null
}

export const customerStatesDictValue = (
  localizedArr: LocalizedCustomerState[],
  value?: string | null,
) => {
  if (value === null) {
    return null
  }
  const element = localizedArr?.find((v) => value === v.state)

  return element ? element.localizedState : null
}

export const customerRejectionReasonDictValue = (
  localizedArr: LocalizedRejectionReason[],
  value?: string | null,
) => {
  if (value === null) {
    return null
  }
  const element = localizedArr?.find((v) => value === v.rejectionReason)

  return element ? element.localizedRejectionReason : null
}

export const customerTypesDictValue = (
  localizedArr: LocalizedCustomerType[],
  value?: string | null,
) => {
  if (value === null) {
    return null
  }
  const element = localizedArr?.find((v) => value === v.type)

  return element ? element.localizedType : null
}
