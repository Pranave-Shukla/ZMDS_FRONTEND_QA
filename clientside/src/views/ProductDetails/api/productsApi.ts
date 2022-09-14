import { DictionaryApi, ProductApi } from 'sdk'

import { apiConfiguration } from '../../../common/sdkConfiguration'

const dictionaryApi = new DictionaryApi(apiConfiguration)
const productsApi = new ProductApi(apiConfiguration)

export { dictionaryApi, productsApi }
