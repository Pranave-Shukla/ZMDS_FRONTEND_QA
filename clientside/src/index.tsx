import React from 'react'
import { render } from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from 'common/store'
import 'bootstrap/dist/css/bootstrap.css'

import './index.scss'

// import * as Sentry from '@sentry/browser';
// import { Integrations } from '@sentry/tracing';
// import { history } from 'constans/history'

// Sentry.init({
//   dsn: 'https://27fd3fdb17fb481b9ba3e644cf11af68@o1034318.ingest.sentry.io/6000878',
//   integrations: [new Integrations.BrowserTracing()],
//   tracesSampleRate: 1.0,
// });

const root = document.getElementById('root')

let renderApp = () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Wrapper = require('./views/wrapper/wrapper').Wrapper

  render(
    <Provider store={store}>
      <HashRouter>
        <Wrapper />
      </HashRouter>
    </Provider>,
    root,
  )
}

if (process.env.NODE_ENV !== 'production' && module.hot) {
  const hotRender = renderApp

  renderApp = () => {
    // try {
    hotRender()
    // } catch (error) {
    //   alert(error)
    // }
  }

  module.hot.accept(['./views/wrapper/wrapper.tsx'], () => {
    setTimeout(renderApp)
  })
}

renderApp()
