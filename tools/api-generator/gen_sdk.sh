#!/bin/bash

ROOT_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 && pwd )"

cd $ROOT_DIR

TMP_CLIENTSIDE_DIR="clientSide"
TMP_CLIENTSIDE_SDK_DIR="sdk"

is_my_os_linux() {
  local is_linux=false

  if [ "$OSTYPE" == "linux-gnu" ] ; then
    is_linux=true
  fi

  echo "$is_linux"
}

to_unix_eol() {
  if [ "$(is_my_os_linux)" == "false" ] ; then
    find $1 -not -path "*/node_modules/*" -type f | xargs realpath | xargs dos2unix
  fi
}

cs_sdk_gen() {
  DESTINATION_PATH=./tmp/$TMP_CLIENTSIDE_DIR/$TMP_CLIENTSIDE_SDK_DIR

  rm -rf $DESTINATION_PATH
  mkdir -p $DESTINATION_PATH

  java -jar node_modules/\@openapitools/openapi-generator-cli/bin/openapi-generator.jar \
  generate \
  -i ../../api/frontend-api.yaml \
  -g typescript-fetch \
  -c ./openapi-generator-cs-sdk-config.json \
  -o $DESTINATION_PATH
  cd $DESTINATION_PATH
  npm install
  npm run build
  cd -
}
cs_sdk_gen

cs_sdk_apply () {
  DESTINATION_PATH="../../clientside/sdk"

  rm -rf $DESTINATION_PATH
  mkdir -p $DESTINATION_PATH

  cp -r tmp/$TMP_CLIENTSIDE_DIR/$TMP_CLIENTSIDE_SDK_DIR/dist/. $DESTINATION_PATH/
  cp ./overrides/clientSide/sdk/package.json $DESTINATION_PATH

  to_unix_eol ./$DESTINATION_PATH
}
cs_sdk_apply

cd -
