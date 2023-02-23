import React, { ReactElement } from 'react'
import { NavLink, matchPath, useLocation } from 'react-router-dom'

import { routes } from 'routes'

import Logo from '../../assets/images/logo.png'
import styles from './nav.module.scss'
import secondStylesheet from '../nav/nav.module.scss'
import { NAV_LABELS } from './constants'

const MainNav = ({ user }: any): ReactElement<any, any> => {
  const { pathname } = useLocation()

  return (
    <nav className={`${styles.mainNav}`}>
      <div>
        <div className={`${styles.imageWrapper} d-inline`}>
          <img alt="logo" className={`${styles.logo}`} src={Logo} />
        </div>
        <div className={'d-inline'}>
          <NavLink
            activeClassName={styles.navLinkActive}
            className={`col ${secondStylesheet.navLink}`}
            isActive={() => {
              const match = matchPath(pathname, {
                exact: true,
                path: routes.CUSTOMER_DETAILS,
                strict: true,
              })

              return [routes.CUSTOMER_LIST, match?.url].includes(pathname)
            }}
            to={routes.CUSTOMER_LIST}
          >
            KUNDEN
          </NavLink>
          <NavLink
            activeClassName={styles.navLinkActive}
            className={`col ${secondStylesheet.navLink}`}
            isActive={() => {
              const match = matchPath(pathname, {
                exact: true,
                path: routes.PRODUCT_DETAILS,
                strict: true,
              })

              return [routes.PRODUCT_LIST, match?.url].includes(pathname)
            }}
            to={routes.PRODUCT_LIST}
          >
            PRODUKTE
          </NavLink>
          <NavLink
            activeClassName={styles.navLinkActive}
            className={`col ${secondStylesheet.navLink}`}
            isActive={() => {
              const match = matchPath(pathname, {
                exact: true,
                path: routes.CurAUDIT_TRAIL_LIST,
                strict: true,
              })

              return [routes.CurAUDIT_TRAIL_LIST, match?.url].includes(pathname)
            }}
            to={routes.CurAUDIT_TRAIL_LIST}
          >
            AUDIT LOG
          </NavLink>

          <NavLink
            activeClassName="active"
            className={`col ${secondStylesheet.navLink}`}
            isActive={() => {
              const match = matchPath(pathname, {
                exact: true,
                path: routes.AUDIT_TRAIL_LIST,
                strict: true,
              })

              return [routes.AUDIT_TRAIL_LIST, match?.url].includes(pathname)
            }}
            to={routes.AUDIT_TRAIL_LIST}
          >
            AUDIT HISTORY
          </NavLink>
        </div>
      </div>
      {user ? (
        <div title={user.emailAddress}>
          {NAV_LABELS.HALLO} {user.firstName} {user.lastName}
        </div>
      ) : null}
    </nav>
  )
}

export { MainNav }
