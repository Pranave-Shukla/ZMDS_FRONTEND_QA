import { Configuration } from 'sdk'

export const apiConfiguration = new Configuration({
  basePath: process.env.SDK_BASE_PATH,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  fetchApi: require('whatwg-fetch').fetch,
})
