/* eslint-disable no-return-await */
import queryString from 'querystring';
import customConfigs from 'custom.config';

export function xdfLog(params) {
    const { eventType = 'click', elem = '', ...otherParam } = params;
    console.log({
        elem,
        params: otherParam
    });
    window.xdflog && window.xdflog.kooEventLog(eventType, {
        elem,
        params: otherParam
    });
}

export function canUseWebp() {
    try {
        return +document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } catch (err) {
        return +false;
    }
}

export function formatTimeNumber(n) {
    n = n.toString();
    return n[1] ? n : `0${n}`;
}

// 截断字符串（中文按2个字符处理）
export function subString(str, len, hasDot) {
    let newLength = 0;
    let newStr = '';
    // eslint-disable-next-line no-control-regex
    let chineseRegex = /[^\x00-\xff]/g;
    let singleChar = '';
    str = str.substr(0, len);
    let strLength = str.replace(chineseRegex, '**').length;
    for (let i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        } else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }

    if (hasDot && strLength > len) {
        newStr += '...';
    }
    return newStr;
}

// 获取页面的ScrollTop,已滚动的高度
export function getBodyScrollTop() {
    return window.pageYOffset || window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
// 设置页面的ScrollTop
export function setBodyScrollTop(top) {
    document.body.scrollTop = top;
    document.documentElement.scrollTop = top;
}

export function addUrlProtocol(url) {
    let newUrl = url;
    if (!(url.indexOf('http://') === 0 || url.indexOf('https://') === 0)) {
        newUrl = `https:${url.indexOf('//') === 0 ? '' : '//'}${url}`;
    }
    return newUrl;
}
/**
 * 构造url
 * @param {*} url
 * @param {*} params
 */
export function getUrl(url, params) {
    const paramStr = queryString.stringify(params);
    if (paramStr.length > 0) {
        const splitChar = url.indexOf('?') === -1 ? '?' : '&';
        return url + splitChar + paramStr;
    }
    return url;
}

export async function GET(url, params = {}, options = {}) {
    const newUrl = getUrl(url, params);
    // console.log('-------------',newUrl);
    let oRes = {};
    try {
        oRes = await fetch(newUrl, { ...{ method: 'GET' }, ...options })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 0) {
                // console.log('+++++++', newUrl, res.data);
                    return res.data;
                }
                throw res;
            });
        // .catch(e => {
        //     console.log('utils/index:', e);
        // });
    } catch (e) {
        // TODO 服务端上报错误
        console.log('----------require error:', newUrl, e);
        throw e;
    }
    return oRes;
}
// TODO 待完善
export async function POST(url, data = {}, options = {}) {
    return await fetch(url, {
        ...{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        },
        ...options
    });
}

export async function serverGet(url, params = {}, options = {}) {
    const newUrl = (url.indexOf('http://') === 0 || url.indexOf('https://') === 0) ? url : `${customConfigs.apiPrefix}${url}`;
    // console.log('requestUrl', newUrl);
    let ret = await GET(newUrl, params, options);
    // console.log('requestUrlEnd', newUrl);
    return ret;
}

export function getTestEnv() {
    let isTest = process.env.APP_ENV || process.env.CLIENT_ENV || '';
    // 本地使用neibu环境
    isTest = isTest === 'local' ? 'neibu' : isTest;
    // 只有测试环境或正式环境
    isTest = ['trunk', 'neibu', 'release'].includes(isTest) ? isTest : '';
    return isTest;
}

/**
* gio事件处理
*/
export const gioEmit = (eventName, data) => {
    const { gio } = window;
    const callback = () => {
        try {
            gio('track', eventName, data);
        } catch (e) {
            console.log(e);
        }
    };
    if (gio) {
        callback();
    }
};
