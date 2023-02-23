import React, { ReactElement, useEffect, useMemo, useState } from 'react'

import { dequal as deepEqual } from 'dequal'
import { AuditsResponse, DictionariesResponse, SourceSystemsResponse } from 'sdk'
import { Grid, S, usePrevious, useRequest } from 'common/components/Grid'
import { HeaderFilter } from 'common/components/HeaderFilter/HeaderFilter'
import CSS from 'csstype'

import { auditApi } from './api/cauditTrailApi'
import { FILTERS_DICT } from './AuditTrailList.utils'
import { DataInterface } from './AuditTrailList.types'

export function CauditTrailList({
  dictionaries,
  sourceSystems,
}: {
  dictionaries: DictionariesResponse
  sourceSystems: SourceSystemsResponse
}): ReactElement {
  const GRID_NAME = 'audits'
  const { buildRequest, request } = useRequest('auditsRequest', 'DATE', FILTERS_DICT, GRID_NAME)

  const columns = useMemo(
    () => [
      {
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName="dataSet"
            filterType="select"
            gridName={GRID_NAME}
            name="Data set"
            options={[
              { label: 'Product', value: 'PRODUCT' },
              { label: 'Customer', value: 'CUSTOMER' },
            ]}
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'dataSet',
        name: 'Data set',
        width: 100,
      },
      {
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName={'header'}
            gridName={GRID_NAME}
            name="Header"
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'header',
        name: 'Header',
      },
      {
        formatter({ row }: DataInterface) {
          let formatted = row.message

          if (row.message?.includes('\n')) {
            formatted = row.message?.substr(0, row.message?.indexOf('\n'))
            formatted += '...'
          }

          return (
            <div className="rdg-cell-inner" title={row.message}>
              {formatted}
            </div>
          )
        },
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName={'message'}
            gridName={GRID_NAME}
            name="Message"
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'message',
        name: 'Message',
      },
      {
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName="initiator"
            gridName={GRID_NAME}
            name="User"
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'initiator',
        name: 'User',
        width: 230,
      },
      {
        formatter({ row }: DataInterface) {
          return row.date?.toLocaleString('de-DE', {
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            month: '2-digit',
            second: '2-digit',
            year: 'numeric',
          })
        },
        headerCellClass: S.gridColumnHeader,
        headerRenderer: ({ ...props }) => (
          <HeaderFilter
            fieldName={'date'}
            filterType="date"
            gridName={GRID_NAME}
            name="Timestamp"
            updateSearchState={buildRequest}
            {...props}
          />
        ),
        key: 'date',
        name: 'Timestamp',
        width: 148,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [rows, setRows] = useState<any>([])
  const [pageInfo, setPageInfo] = useState<any>()
  const previousRequest = usePrevious(request)

  const getLatestDateInfo = (arr) => {
    const res = {}

    arr.forEach((item) => {
      const date_str = item.date.split('T')[0]

      res[date_str] ??= { ...item }
      if (new Date(item.date) > new Date(res[date_str].date)) {
        res[date_str].date = item.date
      }
    })

    return Object.values(res)
  }

  useEffect(() => {
    buildRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (Object.keys(request).length && !deepEqual(request, previousRequest)) {
      if (dictionaries && sourceSystems) {
        auditApi.ngetAudits({ ...request } as any).then((resp: AuditsResponse) => {
          if (resp) {
            setPageInfo(resp.pageInfo)
            setRows(resp.audits)
          }
        })
      }
    }
  }, [request])

  return (
    <>
      <Grid
        buildRequest={buildRequest}
        columns={columns}
        defaultSortColumnKey="DATE"
        gridName={GRID_NAME}
        pageInfo={pageInfo}
        rows={rows}
        setRows={setRows}
      />
    </>
  )
}
