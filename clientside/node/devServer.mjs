import connectHistoryApiFallback from 'connect-history-api-fallback'
import express from 'express'
import fs from 'fs'
import httpProxyMiddleware from 'http-proxy-middleware'
import https from 'https'
import opn from 'opn'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import path from 'path'

import { devConfig } from '../webpack/devConfig.mjs'
import { configuration } from './configuration.mjs'

const compiler = webpack(devConfig)
const server = express()

const getProxyMiddleware = ({ mockServerPort }) =>
  httpProxyMiddleware.createProxyMiddleware(
    configuration.DEVELOPMENT.IS_SERVER_MOCKED
      ? { target: `http://localhost:${mockServerPort}` }
      : {
          logLevel: 'debug',
          target: configuration.DEVELOPMENT.SERVER,
        },
  )

server.use(
  '/api',
  getProxyMiddleware({ mockServerPort: configuration.DEVELOPMENT.LOCALHOST.MOCK_SERVER }),
)

// eslint-disable-next-line no-undef
if (process.argv[2] === 'fromBuildDir') {
  server.use(express.static('build'))
} else {
  server
    .use(webpackDevMiddleware(compiler))
    .use(webpackHotMiddleware(compiler))
    .use('*', (request, response, next) =>
      compiler.outputFileSystem.readFile(
        path.join(compiler.outputPath, 'index.html'),
        (error, result) => {
          if (error) {
            return next(error)
          }
          response.set('content-type', 'text/html')
          response.send(result)
          response.end()

          return null
        },
      ),
    )
    .use(connectHistoryApiFallback())
}

const shouldUseHttps =
  !configuration.DEVELOPMENT.IS_SERVER_MOCKED && configuration.DEVELOPMENT.IS_SERVER_HTTPS

const enhancedServer = shouldUseHttps
  ? https.createServer(
      {
        cert: fs.readFileSync('node/mockCert/server.cert'),
        key: fs.readFileSync('node/mockCert/server.key'),
      },
      server,
    )
  : server

const WEBPACK_SERVER_PORT = configuration.DEVELOPMENT.LOCALHOST.WEBPACK_SERVER

enhancedServer.listen(WEBPACK_SERVER_PORT, () => {
  const protocol = shouldUseHttps ? 'https' : 'http'

  opn(`${protocol}://localhost:${WEBPACK_SERVER_PORT}`)

  console.log(`Dev server available on ${protocol}://localhost:${WEBPACK_SERVER_PORT}\n`)
})
