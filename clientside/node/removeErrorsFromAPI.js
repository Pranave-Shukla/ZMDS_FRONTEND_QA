const fs = require('fs')

const apiSpec = fs.readFileSync('../api/frontend-api.yaml').toString()

const API_FIELD_DATA_ERRORS_REGEX =
  /errors:(\s*)type: array(\s*)items:(\s*)\$ref: '#\/components\/schemas\/FieldDataError'/gm
const API_LIST_FIELD_DATA_ERRORS_REGEX =
  /errors:(\s*)type: array(\s*)items:(\s*)\$ref: '#\/components\/schemas\/ListFieldDataError'/gm
const API_SIMPLE_ERRORS_REGEX = /errors:(\s*)type: string/gm
const API_LOGIN_INSTITUTION_MANAGER_ID_REGEX =
  /institutionManagerId:(\s*)type: integer(\s*)format: int64(\s*)example: 1(\s*)description: PZIF ID/gm

fs.mkdir('mock', { recursive: true }, (err) => {
  if (err) throw err
})

fs.writeFileSync(
  'mock/errorless-frontend-api.yaml',
  apiSpec
    .replace(API_FIELD_DATA_ERRORS_REGEX, '')
    .replace(API_LIST_FIELD_DATA_ERRORS_REGEX, '')
    .replace(API_SIMPLE_ERRORS_REGEX, '')
    .replace(API_LOGIN_INSTITUTION_MANAGER_ID_REGEX, ''),
)
