import fetchJsonp from 'fetch-jsonp';
import { getUrl, getTestEnv } from 'utils';

// 获取服务时间
export async function getServiceTime(params) {
    const url = getUrl('https://m.koolearn.com/common/acquireTimestamp', params);
    const res = await fetchJsonp(url, { timeout: 30000 })
        .then((response) => response.json())
        .then((time) => {
            if (time && new Date(time) !== 'Invalid Date') {
                // 获取时间差值
                const testEnv = getTestEnv(); // 测试环境
                const isTest = window.location.search.includes('test=tophd'); // 开启测试
                const jetLag = (isTest && testEnv) ? 0 : time - new Date();
                return { serviceTime: time, jetLag };
            }
            return Promise.reject(time);
        })
        .catch((e) => {
            console.log('error:', e);
        });
    return res;
}

// 获取购买信息（人数和金额）
export async function getBuyInfo(params) {
    const testEnv = getTestEnv();
    let url = `https://order.${testEnv ? `${testEnv}.` : ''}koolearn.com/order/statistics`;
    url = getUrl(url, params);
    // console.log(url);

    const res = await fetchJsonp(url, { timeout: 30000 })
        .then((response) => response.json())
        .then((json) => {
            // console.log('buyInfo:', json);
            if (json.status === 0) {
                const totalCount = parseInt(1021 + json.data.totalCount, 10);
                const promoteAfterAmountTotal = parseInt(306300 + json.data.promoteAfterAmountTotal * 1.3, 10);
                return { totalCount, promoteAfterAmountTotal };
            }
            return Promise.reject(json);
        })
        .catch((e) => {
            console.log('error:', e);
        });
    return res;
}
