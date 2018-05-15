#!/bin/sh 
echo 'Choose a environment of the gateway api(local/dev/test/staging/prod):'
read env
case $env in
  local/dev/test/staging/prod) npm run copyFilesInWindows && webpack --config ./build/webpack.config.js --env.env=$env --progress --profile --colors && webpack-dev-server --config ./build/webpack.config.js --env.env=$env
  ;;
  *) echo 'Your input value does not exist.'
  ;;
esac


## "start": "sh ./script/start-windows.sh",