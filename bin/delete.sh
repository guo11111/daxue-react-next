#!/bin/bash
if [ -f /etc/profile ];then
    source /etc/profile
fi
cd `dirname $0`

#获取启动参数
. ./get-run-configs.sh

# pm2 stop
pm2 delete "$APP_NAME"

#命令是否成功
if [[ $? -eq 0 ]]; then
	echo -e "$APP_NAME 删除成功";
else
	echo -e "$APP_NAME 删除失败";
fi

