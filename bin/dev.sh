#!/bin/bash
cd `dirname $0`
#获取启动参数
. ./get-run-configs.sh
cd ../
node ./bin/server.js