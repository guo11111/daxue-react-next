/*
 * @Author: ran
 * @Date: 2022-01-10 11:37:08
 * @LastEditors: ran
 * @LastEditTime: 2022-01-14 19:12:29
 */
/* eslint-disable no-return-await */
import fetchJsonp from 'fetch-jsonp';
import { serverGet } from 'utils';
import customConfigs from 'custom.config';

// 获取用户登录信息
export async function getLoginInfo() {
    const res = await fetchJsonp(customConfigs.loginUrl, {})
        .then((response) => response.json())
        .then((json) => {
            // console.log('json:', json);
            if (json.status === 0) {
                return json.data;
            }
            return Promise.reject(json);
        })
        .catch((e) => {
            console.log('error:', e);
        });
    // console.log('getLoginInfo:', res);
    return res;
}

// 获取代理商入口
export async function getDLSLink() {
    try {
        return await serverGet(customConfigs.getDlsLinkUrl, {}, { credentials: 'include' });
    } catch (error) {
        console.log(error);
    }
    return 0;
}

// test
export async function test(params = {}) {
    return await serverGet('http://localhost:3000/api/hello', params);
}
// 获取热门课程
export async function getHotCourseData(params = {}) {
    return await serverGet('/api/home/hot-course', params);
}

// 获取公开课
export async function getPublicClassData(params = {}) {
    return await serverGet('/api/home/open-class', params);
}

// 获取分类
export async function getTypesData(params = {}) {
    return await serverGet('/api/home/type', params);
}

// 获取首焦banner
export async function getBannersData(params = {}) {
    return await serverGet('/api/home/navigate/banner', params);
}

// 获取头部菜单
export async function getHeaderMenusData(params) {
    return await serverGet('/api/home/top/navigate', params);
}
// 获取广告位
export async function getAdvertCurrent() {
    try {
        const res = await serverGet('/api/front/home/advert/current') ?? [];
        return res;
    } catch (error) {
        // console.log(error);
    }
    return [];
}
