#!/bin/bash
ROOT_DIR="$( cd "$(dirname "$0")" >/dev/null 2>&1 && pwd )"

cd $ROOT_DIR

REQUIRED_NODE_VERSION="v16.9.1"

perform_env_check() {
  current_node_version="$(node -v)"
  echo "Aktualnie używana wersja Node: $current_node_version"

  if [ $current_node_version != $REQUIRED_NODE_VERSION ] ; then
    echo -e "\e[31mBłąd! Wymagana wersja node to: $REQUIRED_NODE_VERSION"
    exit 1
  fi
}
perform_env_check

clean_dir() {
  npm cache clean -f

  rm -rf ./node_modules
  rm -rf ./tmp
}
clean_dir

npm install

cd -
