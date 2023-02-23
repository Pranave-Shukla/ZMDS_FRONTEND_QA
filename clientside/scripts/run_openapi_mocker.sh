#!/bin/bash

ROOT_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 && pwd )"

cd $ROOT_DIR

MOCKER_API_FILE_NAME="errorless-frontend-api.yaml"
SERVICE_API_PATH="../mock/$MOCKER_API_FILE_NAME"
ERRORLESS_SERVICE_API_PATH="../mock/simplified-$MOCKER_API_FILE_NAME"

LIMITATION_UKNOWN_FORMAT_INT="format: int"
LIMITATION_PATTERNS="pattern:"

hotfix_mocker_limitations() {
  cp $SERVICE_API_PATH $ERRORLESS_SERVICE_API_PATH

  sed -i "s/.*$LIMITATION_UKNOWN_FORMAT_INT.*/#unsupported#$LIMITATION_UKNOWN_FORMAT_INT/" $ERRORLESS_SERVICE_API_PATH
  sed -i "s/.*$LIMITATION_PATTERNS.*/#unsupported#$LIMITATION_PATTERNS/" $ERRORLESS_SERVICE_API_PATH
}

hotfix_mocker_limitations

cd - > /dev/null

npm run open-api-mocker -- -s ./mock/simplified-$MOCKER_API_FILE_NAME -p 3010
