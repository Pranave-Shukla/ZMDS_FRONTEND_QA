import {
  CustomerDetailsResponse,
  CustomerLookup,
  CustomerNativeStatus,
  DictionariesResponse,
  RejectionReason,
  SourceSystemsResponse,
} from 'sdk'
import { FormikProps } from 'formik'

export interface CustomerDetailsPartial {
  freeText?: string
  nativeStatus?: CustomerNativeStatus
  rejectionReason?: RejectionReason
}
export interface CustomerDetailsComponentProps {
  readonly customerData?: CustomerDetailsResponse
  readonly customerLookup: CustomerLookup
  dictionaries?: DictionariesResponse
  formik: FormikProps<CustomerDetailsPartial>
  sourceSystems?: SourceSystemsResponse
}

export interface CustomerDetailsProps {
  dictionaries?: DictionariesResponse
  readonly location: any
  readonly match: any
  sourceSystems?: SourceSystemsResponse
}
