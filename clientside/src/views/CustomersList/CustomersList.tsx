import React, { ReactElement, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { dequal as deepEqual } from 'dequal'
import { DictionariesResponse, SourceSystemsResponse } from 'sdk'
import { Grid, S, usePrevious, useRequest } from 'common/components/Grid'
import { HeaderFilter } from 'common/components/HeaderFilter/HeaderFilter'

import { customerApi } from './api/customersListApi'
import {
  FILTERS_DICT,
  customerNativeStatusesDictValue,
  customerNativeStatusesOptions,
  customerRejectionReasonDictValue,
  customerStatesDictValue,
  customerStatesOptions,
  customerTypesDictValue,
  customerTypesOptions,
  rejectionReasonsOptions,
  sourceSystemsOptions,
} from './CustomersList.utils'
import { DataInterface } from './CustomersList.types'

export function CustomersList({
  dictionaries,
  sourceSystems,
}: {
  dictionaries: DictionariesResponse
  sourceSystems: SourceSystemsResponse
}): ReactElement {
  const defaultRequestFilter = [{ field: 'NATIVE_STATUS', operation: 'IN', values: ['IN_REVIEW'] }]
  const { buildRequest, request } = useRequest(
    'customersRequest',
    'NATIVE_CREATED_DATE',
    FILTERS_DICT,
    'customers',
    defaultRequestFilter as any,
  )

  const columns = useMemo(
    () => [
      {
        formatter({ row }: DataInterface) {
          if (dictionaries && dictionaries.localizedCustomerNativeStatuses) {
            return customerNativeStatusesDictValue(
              dictionaries.localizedCustomerNativeStatuses,
              row.nativeStatus,
            )
          }

          return row.nativeStatus
        },
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName={'nativeStatus'}
            filterType="select"
            gridName="customers"
            name="Status"
            // @ts-ignore - w typach z sdk wartści słownikowe mają niesłusznie typ undefined?
            options={customerNativeStatusesOptions(
              dictionaries && dictionaries.localizedCustomerNativeStatuses
                ? dictionaries.localizedCustomerNativeStatuses
                : [],
            )}
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'nativeStatus',
        name: 'Status',
        width: 150,
      },
      {
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName={'erpId'}
            gridName="customers"
            name="Zoetis Kd.-Nr."
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'erpId',
        name: 'Zoetis Kd.-Nr.',
        width: 220,
      },
      {
        formatter({ row }: DataInterface) {
          let formatted = row.companyName

          if (row.companyName?.includes('\n')) {
            formatted = row.companyName?.substr(0, row.companyName?.indexOf('\n'))
            formatted += '...'
          }

          return (
            <div className="rdg-cell-inner" title={row.companyName}>
              {formatted}
            </div>
          )
        },
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName={'companyName'}
            gridName="customers"
            name="Praxisname"
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'companyName',
        name: 'Praxisname',
      },
      {
        formatter({ row }: DataInterface) {
          let formatted = row.address

          if (row.address?.includes('\n')) {
            formatted = row.address?.substr(0, row.address?.indexOf('\n'))
            formatted += '...'
          }

          return (
            <div className="rdg-cell-inner" title={row.address}>
              {formatted}
            </div>
          )
        },
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName={'address'}
            gridName="customers"
            name="Adresse"
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'address',
        name: 'Adresse',
      },
      {
        formatter({ row }: DataInterface) {
          return customerStatesDictValue(
            dictionaries && dictionaries.localizedCustomerStates
              ? dictionaries.localizedCustomerStates
              : [],
            row ? row.state : null,
          )
        },
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName={'state'}
            filterType="select"
            gridName="customers"
            name="Kundenstatus"
            // @ts-ignore - w typach z sdk wartści słownikowe mają niesłusznie typ undefined?
            options={customerStatesOptions(
              dictionaries && dictionaries.localizedCustomerStates
                ? dictionaries.localizedCustomerStates
                : [],
            )}
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'state',
        name: 'Kundenstatus',
        width: 110,
      },
      {
        formatter({ row }: DataInterface) {
          return customerTypesDictValue(
            dictionaries && dictionaries.localizedCustomerTypes
              ? dictionaries.localizedCustomerTypes
              : [],
            row ? row.type : null,
          )
        },
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName={'type'}
            filterType="select"
            gridName="customers"
            name="Abgabe/Praxis"
            // @ts-ignore - w typach z sdk wartści słownikowe mają niesłusznie typ undefined?
            options={customerTypesOptions(
              dictionaries && dictionaries.localizedCustomerTypes
                ? dictionaries.localizedCustomerTypes
                : [],
            )}
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'type',
        name: 'Abgabe/Praxis',
        width: 115,
      },
      {
        formatter({ row }: DataInterface) {
          return row.nativeCreatedDate?.toLocaleDateString('pl-PL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        },
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName={'nativeCreatedDate'}
            filterType="date"
            gridName="customers"
            name="Datum Übermittlung"
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'nativeCreatedDate',
        name: 'Datum Übermittlung',
        width: 166,
      },
      {
        formatter({ row }: DataInterface) {
          return row.sourceSystem?.name
        },
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName="sourceSystem"
            filterType="select"
            gridName="customers"
            name="Plattform"
            options={sourceSystemsOptions(
              sourceSystems && sourceSystems.sourceSystems ? sourceSystems.sourceSystems : [],
            )}
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'sourceSystem',
        name: 'Plattform',
        width: 100,
      },
      {
        formatter({ row }: DataInterface) {
          return customerRejectionReasonDictValue(
            dictionaries && dictionaries.localizedRejectionReasons
              ? dictionaries.localizedRejectionReasons
              : [],
            row ? row.rejectionReason : null,
          )
        },
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName="rejectionReason"
            filterType="select"
            gridName="customers"
            name="Kommentar"
            // @ts-ignore - w typach z sdk wartści słownikowe mają niesłusznie typ undefined?
            options={rejectionReasonsOptions(
              dictionaries && dictionaries.localizedRejectionReasons
                ? dictionaries.localizedRejectionReasons
                : [],
            )}
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'rejectionReason',
        name: 'Kommentar',
        width: 100,
      },
      {
        cellClass: S.gridFixedWidthColumn,
        formatter({ row }: DataInterface) {
          return (
            <Link
              className={`btn btn-outline-primary btn-sm ${S.detailsButton}`}
              to={`/main/customer/${row.id}/details?erpId=${row.erpId}`}
            >
              bearbeiten
            </Link>
          )
        },
        headerCellClass: S.gridColumnHeader,
        key: 'edit',
        name: ' ',
        width: 100,
      },
    ],
    [buildRequest, dictionaries, sourceSystems],
  )

  const [rows, setRows] = useState<any>([])
  const [pageInfo, setPageInfo] = useState<any>()
  const previousRequest = usePrevious(request)

  useEffect(() => {
    buildRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (Object.keys(request).length && !deepEqual(request, previousRequest)) {
      if (dictionaries && sourceSystems) {
        customerApi.getCustomers({ ...request } as any).then((resp) => {
          if (resp) {
            setPageInfo(resp.pageInfo)
            setRows(resp.customers)
          }
        })
      }
    }
  }, [dictionaries, previousRequest, request, sourceSystems])

  return (
    <Grid
      buildRequest={buildRequest}
      columns={columns}
      defaultSortColumnKey="erpkId"
      gridName="customers"
      pageInfo={pageInfo}
      rows={rows}
      setRows={setRows}
    />
  )
}
