#!/bin/bash

APP_NAME='koo-daxue-node-home'
APP_ENV='local'
APP_PORT='30106'

while getopts "n:e:p:s:" arg
do
    case $arg in
        n)
            APP_NAME=$OPTARG
            ;;
        e)
            APP_ENV=$OPTARG
            ;;
        p)
            APP_PORT=$OPTARG
            ;;
        ?)
            echo "unknown argument"
    esac
done

echo "默认配置或传入参数如下："
echo "project name: ${APP_NAME}";
echo "env: ${APP_ENV}";
echo "port: ${APP_PORT}";

if [ -x $APP_NAME ];then
    echo  "App name(-n) parameter not found";
    exit 1;
fi

export APP_NAME
export APP_ENV
export APP_PORT

