#!/bin/bash
# 读取默认配置
. ./bin/get-run-configs.sh

# 项目构建
echo "node 版本"
node -v
if [ "${is_install}" == "yes" ];then
    yarn install --force
fi

echo "build配置,如下:"
echo "env: ${env}"
# build
APP_ENV=${env} yarn _build

# 创建同步资源目录
echo "开始copy静态资源从 build/static 到 dist/statics/${APP_NAME}/_next/static/"

mkdir -p dist/statics/${APP_NAME}/_next/static/ && cp -af build/static dist/statics/${APP_NAME}/_next/

if [[ $? -eq 0 ]]; then
	echo "copy成功"
else
	echo "copy失败";
fi

# copy公共样式
echo "开始copy公共样式 banner-menus-children.css 到 public/banner-menus-children_copy.css 目录，供后台预览使用"

cp -fp styles/banner-menus-children.css public/banner-menus-children_copy.css

if [[ $? -eq 0 ]]; then
	echo "copy成功"
else
	echo "copy失败";
fi
# 本地启动neibu环境打包命令
# env=neibu yarn build
