import { NotificationManager } from 'react-notifications'

import { Configuration, LocalizedErrorCode } from 'sdk'
import { BarLoaderState } from 'generic/components/BarLoader'
import { store } from 'common/store'

const reqCounter = {
  count: 0,
  decrease: function () {
    this.count--
    if (this.count <= 0) {
      BarLoaderState.loading = false
    }
  },
  increase: function () {
    this.count++
    if (this.count === 1) {
      BarLoaderState.loading = true
    }
  },
}

const errorDictValue = (localizedArr?: LocalizedErrorCode[], value?: string) => {
  if (value === null) {
    return null
  }
  const element = localizedArr?.find((v) => value === v.errorCode)

  return element ? element.localizedErrorCode : null
}

export const apiConfiguration = new Configuration({
  basePath: process.env.SDK_BASE_PATH,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  fetchApi: require('whatwg-fetch').fetch,
  middleware: [
    {
      post: ({ response }) => {
        console.log(response)
        if (response.url.includes('authenticate/ad')) {
          window.location.replace(response.url)
        }

        return new Promise((resolve) => {
          resolve(response)
          reqCounter.decrease()
          if (response.status >= 400) {
            const { dictionaries } = store.getState()
            const locErrors = dictionaries.localizedErrorCodes

            response.json().then((body) => {
              NotificationManager.error(errorDictValue(locErrors, body.code), 'Error', 4000)
            })
          }
        })
      },
      pre: (fetchParams) => {
        reqCounter.increase()

        return new Promise((resolve) => {
          resolve(fetchParams)
        })
      },
    },
  ],
})
