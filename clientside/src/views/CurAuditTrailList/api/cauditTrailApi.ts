import { CauditsApi } from 'sdk'

import { apiConfiguration } from '../../../common/sdkConfiguration'

const auditApi = new CauditsApi(apiConfiguration)

export { auditApi }
