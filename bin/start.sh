#!/bin/bash
if [ -f /etc/profile ];then
    source /etc/profile
fi

cd `dirname $0`
PROJECT_HOME=`pwd`

#获取启动参数
. ./get-run-configs.sh
cd ..

#创建日志存放目录
echo "PROJECT_HOME : $PROJECT_HOME"
win_system=false
case "`uname`" in
CYGWIN*) win_system=true;;
MINGW64*) win_system=true;;
Darwin*) win_system=true;;
esac
echo "=============$win_system"
if [ $win_system ];then
    logPath="./logs"
    pm2LogPath="./logs/pm2LogFiles"
else
    logPath="${PROJECT_HOME}/logs"
    pm2LogPath="${PROJECT_HOME}/logs/pm2LogFiles"
fi
echo "logPath [$logPath], pm2LogPath=[$pm2LogPath]"
#创建 ./logs
if [ ! -d "$logPath" ];then
    mkdir -p "$logPath"
fi
if [[ $? -eq 0 ]]; then
	echo "创建日志存放目录成功";
else
	echo "创建日志存放目录失败";
fi

#创建 ./logs/pm2LogFiles
if [ ! -d "$pm2LogPath" ];then
    mkdir -p "$pm2LogPath"
fi
if [[ $? -eq 0 ]]; then
	echo "创建pm2日志存放目录pm2LogFiles成功";
else
	echo "创建pm2日志存放目录pm2LogFiles失败";
fi

echo "------启动服务------";
# pm2 start
pm2 start ./ecosystem.config.js

#输出启动结果
if [[ $? -eq 0 ]]; then
	echo "------启动成功------";
else
	echo "------启动失败------";
fi

pm2 show "$APP_NAME"
