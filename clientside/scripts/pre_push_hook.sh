#!/bin/bash

SHIELD_ADMIN_SRC_HEAD_CHANGED_FILES=$(git diff --name-only HEAD HEAD~1 | grep clientside/src/)

if [ -z "$SHIELD_ADMIN_SRC_HEAD_CHANGED_FILES" ] ; then
  echo -e '\033[0;32mnothing to test in clientside/src/ moving on...\033[0m'
else
  npm run test
fi
