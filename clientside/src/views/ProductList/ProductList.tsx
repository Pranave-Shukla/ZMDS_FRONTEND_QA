import React, { ReactElement, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Toggle from 'react-toggle'

import { dequal as deepEqual } from 'dequal'
import {
  DictionariesResponse,
  NullableBooleanValue,
  ProductPartial,
  SourceSystemsResponse,
} from 'sdk'
import { Grid, S, usePrevious, useRequest } from 'common/components/Grid'
import { HeaderFilter } from 'common/components/HeaderFilter/HeaderFilter'
import { productsApi } from 'views/ProductDetails/api/productsApi'

import { productApi } from './api/productApi'
import {
  FILTERS_DICT,
  booleanDictValue,
  booleanValueOptions,
  productAvailabilityDictValue,
  productAvailabilityOptions,
  sourceSystemsOptions,
} from './ProductList.utils'
import { DataInterface } from './ProductList.types'

export function ProductList({
  dictionaries,
  sourceSystems,
}: {
  dictionaries: DictionariesResponse
  sourceSystems: SourceSystemsResponse
}): ReactElement {
  const { buildRequest, request } = useRequest(
    'productsRequest',
    'PRODUCT_ID',
    FILTERS_DICT,
    'products',
    undefined,
    20,
  )

  const [rows, setRows] = useState<any>([])
  const [pageInfo, setPageInfo] = useState<any>()
  const previousRequest: typeof request = usePrevious(request)

  useEffect(() => {
    buildRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleIsVisibleChange = async (row, req, e) => {
    if (row.isVisible !== e.target.checked) {
      const productPartial: ProductPartial = {}

      productPartial.isVisible = e.target.checked
        ? NullableBooleanValue.TRUE
        : NullableBooleanValue.FALSE

      await productsApi.updateProduct({
        id: row.id,
        productPartialRequest: {
          productPartial,
        },
        statusId: row.statusId,
      })

      if (dictionaries && sourceSystems) {
        productApi.getProducts({ ...req }).then((resp) => {
          if (resp) {
            setPageInfo(resp.pageInfo)
            setRows(resp.products)
          }
        })
      }
    }
  }

  const columns = () => [
    {
      formatter({ row }: DataInterface) {
        if (dictionaries && dictionaries.localizedBooleanValues) {
          return (
            <div className={S.toggleWrapper}>
              <Toggle
                defaultChecked={
                  (row.isVisible as unknown as NullableBooleanValue) === NullableBooleanValue.TRUE
                    ? true
                    : false
                }
                onChange={(e) => handleIsVisibleChange(row, request, e)}
              />
            </div>
          )
        }

        return row.isVisible
      },
      headerCellClass: S.gridColumnHeader,
      headerRenderer: ({ ...props }) => (
        <HeaderFilter
          fieldName="isVisible"
          filterType="select"
          gridName="products"
          name="Anzeige Webshop"
          // @ts-ignore - w typach z sdk wartści słownikowe mają niesłusznie typ undefined?
          options={
            dictionaries && dictionaries.localizedBooleanValues
              ? booleanValueOptions(dictionaries.localizedBooleanValues)
              : []
          }
          updateSearchState={buildRequest}
          {...props}
        />
      ),
      key: 'isVisible',
      name: 'Anzeige Webshop',
      width: 134,
    },
    {
      formatter({ row }: DataInterface) {
        if (dictionaries && dictionaries.localizedProductAvailabilities) {
          return productAvailabilityDictValue(
            dictionaries.localizedProductAvailabilities,
            row.availability,
          )
        }

        return row.availability
      },
      headerCellClass: S.gridColumnHeader,
      headerRenderer: ({ ...props }) => (
        <HeaderFilter
          fieldName={'availability'}
          filterType="select"
          gridName="products"
          name="Verfügbarkeit"
          // @ts-ignore - w typach z sdk wartści słownikowe mają niesłusznie typ undefined?
          options={productAvailabilityOptions(
            dictionaries && dictionaries.localizedProductAvailabilities
              ? dictionaries.localizedProductAvailabilities
              : [],
          )}
          updateSearchState={buildRequest}
          {...props}
        />
      ),
      key: 'availability',
      name: 'Verfügbarkeit',
      width: 320,
    },
    {
      headerCellClass: S.gridColumnHeader,
      headerRenderer: ({ ...props }) => (
        <HeaderFilter
          fieldName={'id'}
          gridName="products"
          name="Artikelnummer"
          updateSearchState={buildRequest}
          {...props}
        />
      ),
      key: 'id',
      name: 'Artikelnummer',
      width: 115,
    },
    {
      headerCellClass: S.gridColumnHeader,
      headerRenderer: ({ ...props }) => (
        <HeaderFilter
          fieldName={'description'}
          gridName="products"
          name="Artikelbeschreibung"
          updateSearchState={buildRequest}
          {...props}
        />
      ),
      key: 'description',
      name: 'Artikelbeschreibung',
    },
    {
      headerCellClass: S.gridColumnHeader,
      headerRenderer: ({ ...props }) => (
        <HeaderFilter
          fieldName="minimumOrderQuantity"
          filterType="select"
          gridName="products"
          name="Min. Menge"
          // @ts-ignore - w typach z sdk wartści słownikowe mają niesłusznie typ undefined?
          options={booleanValueOptions(
            dictionaries && dictionaries.localizedBooleanValues
              ? dictionaries.localizedBooleanValues
              : [],
          )}
          updateSearchState={buildRequest}
          {...props}
        />
      ),
      key: 'minimumOrderQuantity',
      name: 'Min. Menge',
      width: 129,
    },
    {
      headerCellClass: S.gridColumnHeader,
      headerRenderer: ({ ...props }) => (
        <HeaderFilter
          fieldName="maximumOrderQuantity"
          filterType="select"
          gridName="products"
          name="Max. Menge"
          // @ts-ignore - w typach z sdk wartści słownikowe mają niesłusznie typ undefined?
          options={booleanValueOptions(
            dictionaries && dictionaries.localizedBooleanValues
              ? dictionaries.localizedBooleanValues
              : [],
          )}
          updateSearchState={buildRequest}
          {...props}
        />
      ),
      key: 'maximumOrderQuantity',
      name: 'Max. Menge',
      width: 128,
    },
    {
      formatter({ row }: DataInterface) {
        if (dictionaries && dictionaries.localizedBooleanValues) {
          return booleanDictValue(dictionaries.localizedBooleanValues, row.hasMedia)
        }

        return row.availability
      },
      headerCellClass: S.gridColumnHeader,
      headerRenderer: ({ ...props }) => (
        <HeaderFilter
          fieldName="hasMedia"
          filterType="select"
          gridName="products"
          name="Packshots"
          // @ts-ignore - w typach z sdk wartści słownikowe mają niesłusznie typ undefined?
          options={booleanValueOptions(
            dictionaries && dictionaries.localizedBooleanValues
              ? dictionaries.localizedBooleanValues
              : [],
          )}
          updateSearchState={buildRequest}
          {...props}
        />
      ),
      key: 'hasMedia',
      name: 'Packshots',
      width: 80,
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
          gridName="products"
          name="Plattform"
          options={sourceSystemsOptions(
            sourceSystems && sourceSystems.sourceSystems ? sourceSystems.sourceSystems : [],
          )}
          updateSearchState={buildRequest}
          {...props}
        />
      ),
      key: 'sourceSystem',
      name: 'plattform',
      width: 100,
    },
    {
      cellClass: S.gridFixedWidthColumn,
      formatter({ row }: DataInterface) {
        return (
          <Link
            className={`btn btn-outline-primary btn-sm ${S.detailsButton}`}
            to={`/main/product/${row.id}/details/${row.statusId}`}
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
  ]

  useEffect(() => {
    if (Object.keys(request).length && !deepEqual(request, previousRequest)) {
      if (dictionaries && sourceSystems) {
        productApi.getProducts({ ...request }).then((resp) => {
          if (resp) {
            setPageInfo(resp.pageInfo)
            setRows(resp.products)
          }
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request])

  return (
    <Grid
      buildRequest={buildRequest}
      columns={columns()}
      defaultSortColumnKey="isVisible"
      gridName="products"
      pageInfo={pageInfo}
      rows={rows}
      setRows={setRows}
    />
  )
}
