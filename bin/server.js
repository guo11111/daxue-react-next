/*
 * @Author: ran
 * @Date: 2022-01-10 16:36:49
 * @LastEditors: ran
 * @LastEditTime: 2022-01-13 18:51:08
 */
const express = require('express');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apiMocker = require('mocker-api');
const { parse } = require('url');

const devProxy = {
    '/api/home': {
        target: 'http://cms.neibu.koolearn.com', // 端口自己配置合适的
        // pathRewrite: {
        //     '^/api': '/'
        // },
        changeOrigin: true
    },
    // 有一个接口不符合上述规则，但是也需要代理
    '/api/front/home/advert/current': {
        target: 'http://cms.neibu.koolearn.com', // 端口自己配置合适的
        // pathRewrite: {
        //     '^/api': '/'
        // },
        changeOrigin: true
    }
};

const appName = process.env.APP_NAME;
const port = process.env.APP_PORT;
const dev = process.env.APP_ENV === 'local';
const isMock = process.env.isMock === 'true';
const app = next({
    dev
});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        if (isMock && dev) {
            apiMocker(server, require.resolve('../mock/index'));
        }

        if (dev && devProxy) {
            Object.keys(devProxy).forEach(function (context) {
                server.use(createProxyMiddleware(context, devProxy[context]));
            });
        }

        server.all('*', (req, res) => {
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;
            // console.log('-------------------', pathname);
            if (pathname === '/t-s.jsp' || pathname === '/t-s.html') {
                res.send(`${appName || 'home'} node is ok!`);
            }
            handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on http://local.neibu.koolearn.com:${port}`);
            // console.log(`> Ready on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.log('An error occurred, unable to start the server');
        console.log('发生错误，无法启动服务器');
        console.log(err);
    });
