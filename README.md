# 启动本地开发

1. yarn install 安装依赖
2. yarn dev 启动本地

    ！！！ 默认接口代理到neibu环境，`bin/server.js`中可修改

    a. 开启mock（默认关闭）： isMock=true yarn dev

    b. 设置env环境或端口：sh ./bin/dev.sh -n 项目名称 -e 环境 -p 端口 （参数参考启动服务）

3. dev.neibu.koolearn.com 绑定到本地ip（登录模块需要使用到koolearn域名）
4. 访问： dev.neibu.koolearn.com:30106

# 本地打包
neibu环境打包： env=neibu yarn build

env参数取值: trunk, neibu, release, product（生成环境）

# 启动服务
1. 本地已安装pm2
2. sh ./bin/start.sh -n 项目名称 -e 环境 -p 端口

n,e,p参数非必填（默认值：n: koo-daxue-node-home, e: local, p:30106),默认值在./bin/get-run-configs.js中配置

# 发布到内部
- [jenkins](https://jenkins.neibu.koolearn.com/job/koo-daxue-node-home/)
- DONE

# 预发测试
- 合并代码到 master
- 创建 tag
- [jenkins](http://jenkins.koolearn-inc.com/job/koo-daxue-node-home/)
- 然后去 kook 上线 pub-ui-h5，依次执行 '单台发布 - 只同步' + '状态管理 - 应用上线' 操作
- DONE

# 发布到上线
- 发布到预发
- 然后去 kook 上线 koo-daxue-node-home，依次执行 '单台发布 - 同步+重启' + '状态管理 - 应用上线' 操作
- DONE

# 访问地址：
测试： daxue.{env}.koolearn.com

预发： daxuetest.koolearn.com

线上： daxue.koolearn.com

# 目录结构
koo-daxue-node-home
├── bin                     shell脚本（项目启动，打包）
│   ├── get-run-configs.sh  默认配置
│   └── server.js           启动项目脚本
├── build                   build后生成的文件夹
├── components              组件
├── custom.config.js        各个环境的域名或登录相关的url配置
├── dist                    build后，从build目录中copy出来的静态资源
├── ecosystem.config.js     pm2启动配置
├── jsconfig.json
├── mock                    mock数据
├── next.config.js
├── pages
│   ├── index.js            首页
│   └── preview             预览页面
├── public                  公共静态资源
├── services                fetch请求
├── styles                  公共样式
└── utils                   公共函数或方法


# 注意⚠️

1. `styles/banner-menus-children.css`是banner模块的左侧菜单的展开浮层样式，`yarn build`时会copy一份到`public/banner-menus-children_copy.css`供首页管理后台展开浮层 *预览* 使用


## TODO
1. 添加接口请求 --ok
1. 修改模块props render --ok
2. 添加生成静态页面功能（接口错误，终止生成） --ok
3. 配置环境变量 --ok
3. 预览模式 --ok
5. 添加 api proxy --ok
7. eslint --ok
4. 图片优化 --doing
6. 部署neibu 和 线上 --doing（trunk-ok）
4. 添加接口错误上报
7. 兼容-polyfill
# daxue-react-next
# daxue-react-next
