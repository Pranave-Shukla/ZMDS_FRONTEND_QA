import React, { FC, memo } from 'react'

import { Input } from '../../common/components/Input/Input'
import styles from './CustomerDetails.module.scss'
import { Select } from '../../common/components/Select/Select'
import { DetailsButtons } from '../../common/components/DetailsButtons/DetailsButtons'
import { TextArea } from './components/TextArea'
import { CustomerDetailsComponentProps } from './CustomerDetails.types'
import { CUSTOMER_DETAILS_LABELS } from './constants'
import { LookupRow } from './components/LookupRow'
import { LookupField } from './components/LookupField'

const CustomerDetailsComponentFC: FC<CustomerDetailsComponentProps> = ({
  customerData,
  customerLookup,
  dictionaries,
  formik,
}) => {
  const customerLookupNames = [
    customerData?.customer?.companyName,
    customerData?.customer?.title,
    customerData?.customer?.firstName,
    customerData?.customer?.lastName,
  ]

  const customerDetailsHeader = [
    ...customerLookupNames,
    customerData?.customer?.streetAddress,
    customerData?.customer?.city,
    customerData?.customer?.postalCode,
  ]

  let headerTitle = ''

  customerDetailsHeader.map((data) => {
    if (data) {
      headerTitle = headerTitle.concat(`${data} `)
    }
  })

  return (
    <>
      <h2 className={styles.CustomerDetailsHeader}>{headerTitle}</h2>
      <div className={styles.CustomerDetails}>
        <div
          className={`${styles.CustomerDetailsFrame} ${
            Object.keys(customerLookup).length > 0 && styles.CustomerDetailsWithLookup
          }`}
          style={{ width: customerLookup ? 'auto' : '100%' }}
        >
          <LookupRow>
            <Input
              textContent={
                customerData?.customer?.sourceSystem ? customerData.customer.sourceSystem.name : ''
              }
              title={CUSTOMER_DETAILS_LABELS.SOURCE_SYSTEM}
            />
          </LookupRow>
          <LookupRow>
            <Select
              name={'nativeStatus'}
              options={dictionaries?.localizedCustomerNativeStatuses?.map(
                (localizedCustomerNativeStatus) => ({
                  label: localizedCustomerNativeStatus.localizedNativeStatus,
                  value: localizedCustomerNativeStatus.nativeStatus,
                }),
              )}
              selectedValue={formik.values.nativeStatus}
              setSelectedValue={formik.handleChange}
              title={CUSTOMER_DETAILS_LABELS.NATIVE_STATUS}
            />
          </LookupRow>
          <LookupRow>
            <Select
              name={'rejectionReason'}
              options={([{ label: '', value: undefined }] as any).concat(
                dictionaries?.localizedRejectionReasons?.map((localizedRejectionReason) => ({
                  label: localizedRejectionReason.localizedRejectionReason,
                  value: localizedRejectionReason.rejectionReason,
                })),
              )}
              selectedValue={formik.values.rejectionReason}
              setSelectedValue={formik.handleChange}
              title={CUSTOMER_DETAILS_LABELS.REJECTION_REASON}
            />
          </LookupRow>
          <LookupRow>
            <Input
              textContent={customerData?.customer?.erpId}
              title={CUSTOMER_DETAILS_LABELS.ERP_ID}
            />
            <LookupField
              compareTo={customerData?.customer?.erpId}
              fieldValue={customerLookup.erpId}
            />
          </LookupRow>
          <LookupRow>
            <Input
              textContent={customerData?.customer?.nativeId}
              title={CUSTOMER_DETAILS_LABELS.NATIVE_ID}
            />
          </LookupRow>
          <LookupRow>
            <Input
              textContent={customerData?.customer?.type}
              title={CUSTOMER_DETAILS_LABELS.TYPE}
            />
            <LookupField
              compareTo={customerData?.customer?.type}
              fieldValue={customerLookup.type}
            />
          </LookupRow>
          <LookupRow group>
            <div className={styles.CustomerDetailsRowGroup}>
              <Input
                textContent={customerData?.customer?.companyName}
                title={CUSTOMER_DETAILS_LABELS.COMPANY_NAME}
              />
              <Input
                textContent={customerData?.customer?.title}
                title={CUSTOMER_DETAILS_LABELS.TITLE}
              />
              <Input
                textContent={customerData?.customer?.firstName}
                title={CUSTOMER_DETAILS_LABELS.FIRST_NAME}
              />
              <Input
                textContent={customerData?.customer?.lastName}
                title={CUSTOMER_DETAILS_LABELS.LAST_NAME}
              />
            </div>
            <div className={styles.CustomerDetailsRowGroup}>
              <LookupField compareTo={customerLookupNames} fieldValue={customerLookup.name1} />
              <LookupField compareTo={customerLookupNames} fieldValue={customerLookup.name2} />
              <LookupField compareTo={customerLookupNames} fieldValue={customerLookup.name3} />
              <LookupField compareTo={customerLookupNames} fieldValue={customerLookup.name4} />
            </div>
          </LookupRow>
          <LookupRow>
            <Input
              textContent={customerData?.customer?.streetAddress}
              title={CUSTOMER_DETAILS_LABELS.STREET_ADDRESS}
            />
            <LookupField
              compareTo={customerData?.customer?.streetAddress}
              fieldValue={customerLookup.streetAddress}
            />
          </LookupRow>
          <LookupRow>
            <Input
              textContent={customerData?.customer?.city}
              title={CUSTOMER_DETAILS_LABELS.CITY}
            />
            <LookupField
              compareTo={customerData?.customer?.city}
              fieldValue={customerLookup.city}
            />
          </LookupRow>
          <LookupRow>
            <Input
              textContent={customerData?.customer?.postalCode}
              title={CUSTOMER_DETAILS_LABELS.POSTAL_CODE}
            />
            <LookupField
              compareTo={customerData?.customer?.postalCode}
              fieldValue={customerLookup.postalCode}
            />
          </LookupRow>
          <LookupRow>
            <Input
              textContent={customerData?.customer?.countryCode}
              title={CUSTOMER_DETAILS_LABELS.COUNTRY_CODE}
            />
            <LookupField
              compareTo={customerData?.customer?.countryCode}
              fieldValue={customerLookup.countryCode}
            />
          </LookupRow>
          <LookupRow>
            <Input
              textContent={
                customerData?.customer?.state
                  ? dictionaries?.localizedCustomerStates?.find(
                      (localizedCustomerState) =>
                        localizedCustomerState.state === customerData.customer?.state,
                    )?.localizedState
                  : undefined
              }
              title={CUSTOMER_DETAILS_LABELS.STATE}
            />
          </LookupRow>
          <LookupRow>
            <Input
              textContent={customerData?.customer?.nativeCreatedDate?.toLocaleDateString()}
              title={CUSTOMER_DETAILS_LABELS.NATIVE_CREATED_DATE}
            />
          </LookupRow>
          <LookupRow>
            <div className={styles.CustomerDetailsTextAreaWrapper}>
              <TextArea
                error={formik.errors.freeText}
                name={'freeText'}
                setTextAreaValue={formik.handleChange}
                textAreaValue={formik.values.freeText}
                title={CUSTOMER_DETAILS_LABELS.FREE_TEXT}
              />
            </div>
          </LookupRow>
          <DetailsButtons
            additionalClassName={styles.CustomerDetailsButtons}
            saveAction={formik.handleSubmit}
          />
        </div>
      </div>
    </>
  )
}

export const CustomerDetailsComponent = memo(CustomerDetailsComponentFC)
