import { FC, createElement, memo, useEffect, useState } from 'react'
import { NotificationManager } from 'react-notifications'

import { useFormik } from 'formik'
import { CustomerDetailsResponse, CustomerLookup, CustomerPartial } from 'sdk'

import { CustomersDetailsApi } from './api/CustomerDetailsApi'
import { customerLookupApi } from './api/customerLookupApi'
import { CustomerDetailsPartial, CustomerDetailsProps } from './CustomerDetails.types'
import { CustomerDetailsComponent } from './CustomerDetails.component'

const CustomerDetailsFC: FC<CustomerDetailsProps> = ({ dictionaries, location, match }) => {
  const [customerData, setCustomerData] = useState<CustomerDetailsResponse>({})
  const [customerLookup, setCustomerLookup] = useState<CustomerLookup>({})

  const formik = useFormik<CustomerDetailsPartial>({
    initialValues: {
      freeText: customerData?.customer?.freeText,
      nativeStatus: customerData?.customer?.nativeStatus,
      rejectionReason: customerData?.customer?.rejectionReason,
    },
    onSubmit: () => {
      updateCustomerDetails()
    },
    validate: (values) => {
      const errors: { freeText?: string } = {}

      if (values.freeText && values?.freeText?.length > 127) {
        errors.freeText = 'Eingabe darf 127 Zeichen nicht überschreiten'
      }

      return errors
    },
  })

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const customerDetails = await CustomersDetailsApi.getCustomerDetails({
        id: match.params.customerId,
      })

      if (customerDetails.customer) {
        setCustomerData(customerDetails)

        formik.setFieldValue('nativeStatus', customerDetails?.customer?.nativeStatus)
        formik.setFieldValue('rejectionReason', customerDetails?.customer?.rejectionReason)
        formik.setFieldValue('freeText', customerDetails.customer.freeText)
      }
    }
    const fetchCustomerLookup = async () => {
      const params = new URLSearchParams(location.search)
      const erpId = params.get('erpId')
      const customerLookup = await customerLookupApi.getCustomerLookup({
        id: erpId ? erpId : '',
      })

      if (customerLookup.customerLookup) {
        setCustomerLookup(customerLookup.customerLookup)
      }
    }

    fetchCustomerDetails()
    fetchCustomerLookup()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateCustomerDetails = async () => {
    if (formik.errors.freeText) {
      NotificationManager.warning(formik.errors.freeText)

      return
    }

    const { freeText, nativeStatus, rejectionReason } = formik.values
    const customerPartial: CustomerPartial = {}

    freeText && (customerPartial.freeText = freeText)
    nativeStatus && (customerPartial.nativeStatus = nativeStatus)
    rejectionReason && (customerPartial.rejectionReason = rejectionReason)

    await CustomersDetailsApi.updateCustomer({
      customerPartialRequest: {
        customerPartial: customerPartial,
      },
      id: match.params.customerId,
    })

    history.back()
  }

  return customerData.customer?.id
    ? createElement(CustomerDetailsComponent, {
        customerData,
        customerLookup,
        dictionaries,
        formik,
      })
    : null
}

export const CustomerDetails = memo(CustomerDetailsFC)
