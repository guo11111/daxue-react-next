// 获取客户端是否是预发环境，根据location判断
function getClientTestEnv() {
    let env = '';
    if (typeof window !== 'undefined' && window.location) {
        const aHost = window.location.hostname.split('.');
        env = aHost[0].indexOf('test') > 0 ? 'test' : '';
    }
    return env;
}

const appName = process.env.APP_NAME || process.env.CLIENT_APP_NAME;
const port = process.env.APP_PORT || process.env.CLIENT_PORT;
// 只有预发环境（node环境）有process.env.KOO_ENVIRONMENT
const env = getClientTestEnv() || process.env.KOO_ENVIRONMENT || process.env.APP_ENV || process.env.CLIENT_ENV || 'product';
const envObj = { env, appName, port };
let config = {};
// console.log('process.env.APP_PORT:', process.env.APP_PORT, process.env.CLIENT_PORT);
// console.log('process.env.APP_NAME:', process.env.APP_NAME, process.env.CLIENT_APP_NAME);

if (env === 'local') {
    config = {
        // node端fetch请求的url需时带url域名
        apiPrefix: `http://local.neibu.koolearn.com:${port}`,
        // apiPrefix: `http://localhost:${port}`,
        logoutUrl: 'https://login.neibu.koolearn.com/sso/logout.do?next_page=',
        assetPrefix: '',
        loginUrl: 'https://i.neibu.koolearn.com/logininfo',
        loginDomain: 'neibu.koolearn.com',
        // static2项目中的登录模块js，css使用(trunk环境只支持http协议)
        staticCdnPrefix: 'http://ui.neibu.koolearn.com/neibu_sharks',
        // 获取代理商入口链接
        getDlsLinkUrl: 'https://sc.neibu.koolearn.com/agent-login'
    };
} else if (env === 'test') { // 预发环境
    config = {
        apiPrefix: 'https://cmstest.koolearn.com',
        logoutUrl: 'https://login.koolearn.com/sso/logout.do?next_page=',
        assetPrefix: `https://h5.koocdn.com/${appName}`,
        loginUrl: 'https://i.koolearn.com/logininfo',
        loginDomain: 'koolearn.com',
        staticCdnPrefix: 'https://static.koocdn.com',
        // 获取代理商入口链接
        getDlsLinkUrl: 'https://sc.koolearn.com/agent-login'
    };
} else if (env === 'product') {
    config = {
        apiPrefix: 'https://cms.koolearn.com',
        logoutUrl: 'https://login.koolearn.com/sso/logout.do?next_page=',
        assetPrefix: `https://h5.koocdn.com/${appName}`,
        loginUrl: 'https://i.koolearn.com/logininfo',
        loginDomain: 'koolearn.com',
        staticCdnPrefix: 'https://static.koocdn.com',
        // 获取代理商入口链接
        getDlsLinkUrl: 'https://sc.koolearn.com/agent-login'
    };
} else {
    config = {
        apiPrefix: `https://cms.${env}.koolearn.com`,
        logoutUrl: `https://login.${env}.koolearn.com/sso/logout.do?next_page=`,
        assetPrefix: `https://cdn-h5.${env}.koolearn.com/${appName}`,
        loginUrl: `https://i.${env}.koolearn.com/logininfo`,
        loginDomain: `${env}.koolearn.com`,
        staticCdnPrefix: `https://ui.${env}.koolearn.com/${env}_sharks`,
        // 获取代理商入口链接
        getDlsLinkUrl: `https://sc.${env}.koolearn.com/agent-login`
    };
}

module.exports = { ...envObj, ...config };
