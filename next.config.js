const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const configs = require('./custom.config');

console.log('env configs:', configs);

const nextConfigs = {
    // 将环境变量添加到JavaScript
    env: {
        // 只给浏览器端用的环境变量
        CLIENT_ENV: configs.env,
        // APP_ENV: configs.env
        CLIENT_PORT: configs.port,
        CLIENT_APP_NAME: configs.appName
    },
    // cdn
    assetPrefix: configs.assetPrefix,
    // gzip压缩
    compress: false,
    // 构建目录
    distDir: 'build',
    // 严格模式
    reactStrictMode: true,
    webpack(cfg) {
        const originalEntry = cfg.entry;
        cfg.entry = async () => {
            const entries = await originalEntry();

            if (
                entries['main.js']
                    && !entries['main.js'].includes('./client/polyfills.js')
            ) {
                // console.log('-------------------------polyfills');
                entries['main.js'].unshift('./client/polyfills.js');
            }

            return entries;
        };

        return cfg;
    }
};

module.exports = withPlugins([
    [optimizedImages, {
        // inlineImageLimit: 8192,
        optimizeImages: false
    }]
],
nextConfigs);
