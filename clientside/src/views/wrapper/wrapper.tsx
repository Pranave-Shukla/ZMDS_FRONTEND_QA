import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { NotificationContainer } from 'react-notifications'
import 'react-notifications/lib/notifications.css'
import { useDispatch } from 'react-redux'

import { DictionariesResponse, Language, SourceSystemsResponse } from 'sdk'
import { CauditTrailList } from 'views/CurAuditTrailList/CauditTrailList'
import { AuditTrailList } from 'views/AuditTrailList/AuditTrailList'
import { CustomersList } from 'views/CustomersList/CustomersList'
import { ProductList } from 'views/ProductList/ProductList'
import { history } from 'constans/history'
import { BarLoader } from 'generic/components/BarLoader/BarLoader'
import { setDicts } from 'common/dictSlice'

import { dictionaryApi, sourceSystemApi, userApi } from './api'
import { CustomerDetails } from '../CustomersDetails/CustomerDetails'
import { ProductDetails } from '../ProductDetails/ProductDetails'
import { MainNav } from '../nav/nav'
import { routes } from '../../routes'
import styles from './wrapper.module.scss'

const Wrapper = () => {
  const [dictionaries, setDictionaries] = useState<DictionariesResponse>()
  const [sourceSystems, setSourceSystems] = useState<SourceSystemsResponse>()
  const [user, setUser] = useState<any>()
  const dispatch = useDispatch()

  useEffect(() => {
    history.push(routes.CUSTOMER_LIST)

    userApi.getAuthenticatedUser().then((res: any) => {
      if (res) {
        setUser(res.user)
      }
    })

    dictionaryApi.getDictionaries({ language: Language.DE }).then((res) => {
      if (res) {
        setDictionaries(res)
        dispatch(setDicts(res))
      }
    })

    sourceSystemApi.getSourceSystems().then((res) => {
      if (res) {
        setSourceSystems(res)
      }
    })
  }, [])

  return (
    <main className={`${styles.wrapper}`}>
      <BarLoader id="barLoader" />
      <HashRouter>
        <MainNav user={user} />
        <Switch>
          <Route
            path={routes.CUSTOMER_LIST}
            render={(props) =>
              dictionaries && sourceSystems ? (
                <CustomersList
                  dictionaries={dictionaries}
                  sourceSystems={sourceSystems}
                  {...props}
                  key={Math.random()}
                />
              ) : null
            }
          />
          <Route
            key={Math.random()}
            path={routes.PRODUCT_LIST}
            render={(props) =>
              dictionaries && sourceSystems ? (
                <ProductList
                  dictionaries={dictionaries}
                  sourceSystems={sourceSystems}
                  {...props}
                  key={Math.random()}
                />
              ) : null
            }
          />
          <Route
            path={routes.CUSTOMER_DETAILS}
            render={(props) => (
              <CustomerDetails
                dictionaries={dictionaries}
                sourceSystems={sourceSystems}
                {...props}
              />
            )}
          />
          <Route path={routes.PRODUCT_DETAILS} render={(props) => <ProductDetails {...props} />} />

          <Route
            key={Math.random()}
            path={routes.AUDIT_TRAIL_LIST}
            render={(props) =>
              dictionaries && sourceSystems ? (
                <AuditTrailList
                  dictionaries={dictionaries}
                  sourceSystems={sourceSystems}
                  {...props}
                  key={Math.random()}
                />
              ) : null
            }
          />

          <Route
            key={Math.random()}
            path={routes.CurAUDIT_TRAIL_LIST}
            render={(props) =>
              dictionaries && sourceSystems ? (
                <CauditTrailList
                  dictionaries={dictionaries}
                  sourceSystems={sourceSystems}
                  {...props}
                  key={Math.random()}
                />
              ) : null
            }
          />
        </Switch>

        {/* <Switch>
          <Route
            path={routes.CUSTOMER_LIST}
            render={(props) =>
              dictionaries && sourceSystems ? (
                <CustomersList
                  dictionaries={dictionaries}
                  sourceSystems={sourceSystems}
                  {...props}
                  key={Math.random()}
                />
              ) : null
            }
          />
          <Route
            key={Math.random()}
            path={routes.PRODUCT_LIST}
            render={(props) =>
              dictionaries && sourceSystems ? (
                <ProductList
                  dictionaries={dictionaries}
                  sourceSystems={sourceSystems}
                  {...props}
                  key={Math.random()}
                />
              ) : null
            }
          />
          <Route
            path={routes.CUSTOMER_DETAILS}
            render={(props) => (
              <CustomerDetails
                dictionaries={dictionaries}
                sourceSystems={sourceSystems}
                {...props}
              />
            )}
          />
          <Route path={routes.PRODUCT_DETAILS} render={(props) => <ProductDetails {...props} />} />
          <Route
            key={Math.random()}
            path={routes.AUDIT_TRAIL_LIST}
            render={(props) =>
              dictionaries && sourceSystems ? (
                <AuditTrailList
                  dictionaries={dictionaries}
                  sourceSystems={sourceSystems}
                  {...props}
                  key={Math.random()}
                />
              ) : null
            }
          />
        </Switch> */}
      </HashRouter>
      <NotificationContainer />
    </main>
  )
}

export { Wrapper }
