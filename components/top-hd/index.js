/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
import React, { useState, useEffect, useRef } from 'react';
import classBind from 'classnames/bind';
import PubSub from 'pubsub-js';
import { getServiceTime, getBuyInfo } from 'services/top-hd';
import { xdfLog } from 'utils';
import { lists, hdTimes, rules } from './config';
import styles from './styles.module.scss';

const cx = classBind.bind(styles);
const EVENT_ID = 'home_activity';
// 监控返回顶部埋点事件添加次数
let gobackTopEvBind = 0;

// eslint-disable-next-line react/prop-types
function Countdown({ time }) {
    const totalS = Math.floor(time / 1000);
    const s = totalS % 60;
    const d = Math.floor((totalS - s) / 86400);
    const h = Math.floor((totalS - s - d * 86400) / 3600);
    const m = (totalS - s - d * 86400 - h * 3600) / 60;
    // console.log('now time:', time, totalS, d, h, m, s);
    return (
        <>{d > 0 && <><span className={cx('number')}>{d}</span>天</>}<span className={cx('number')}>{h}</span>时<span className={cx('number')}>{m}</span>分<span className={cx('number')}>{s}</span>秒</>
    );
}

// eslint-disable-next-line react/prop-types
function RuleContent({ hdIndex }) {
    const content = rules[hdIndex] || '';
    return (
        <div
            className={cx('dialog-body')}
            dangerouslySetInnerHTML={{ __html: content }}
        >
        </div>
    );
}

export default function TopHD() {
    const [isShowHD, setIsShowHD] = useState(false);
    const [hdTimeIndex, setHdTimeIndex] = useState(-1); // 当前匹配到的活动时间段index
    const [isSlideDown, setIsSlideDown] = useState(true);
    const [buyInfo, setBuyInfo] = useState({});
    const [nowHDTime, setNowHDTime] = useState(0);
    const [isShowRule, setIsShowRule] = useState(false);
    const ST = useRef(null);
    const [showCountDown, setShowCountDown] = useState(false);

    // 双十二的规则拆解，现在没用了，可以删除
    const CountTimer = setInterval(() => {
        if (Date.now() > new Date('2021/12/10 00:00:00').getTime()) {
            setShowCountDown(true);
            clearInterval(CountTimer);
        }
    }, 1000);
    // 点击上报
    function clickCoupon(e, coupon, x) {
        // const text = coupon.coupon.replace(/<[^>]+>/g, '');
        const text = coupon.coupon;
        reportLog({
            elem: e.target, xyId: `xl-${x + 1}-0`, url: coupon.couponUrl, content: text
        });
    }
    // 点击上报
    function clickLink(e, link, x, y) {
        reportLog({
            elem: e.target, xyId: `xl-${x + 1}-${y + 1}`, url: link.url, content: link.name
        });
    }
    // xdf上报
    function reportLog(params) {
        const data = {
            elem: params.elem || '',
            event_id: EVENT_ID,
            interaction_id: params.xyId || '',
            interaction_type: 'click',
            position: params.position || 'xl',
            jump_url: params.url || '',
            interaction_content: params.content
        };
        xdfLog(data);
    }

    // 收起
    function slideUpHD(e) {
        setIsSlideDown(false);
        reportLog({ elem: e.target, xyId: 'close', content: '关闭下拉' });
    }
    // 展开
    function slideDownHD(e) {
        setIsSlideDown(true);
        reportLog({ elem: e.target, xyId: 'xl', content: '下拉' });
    }
    // 显示活动规则弹框
    function showRuleDialog() {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';
        setIsShowRule(true);
    }
    // 关闭活动规则弹框
    function hideRuleDialog() {
        document.getElementsByTagName('html')[0].style.overflow = 'visible';
        setIsShowRule(false);
    }

    // 判断是否有匹配的活动
    function getMatchedTime(currentTime) {
        let index = -1;
        const isFind = hdTimes.some(({ startTime, endTime }, i) => {
            let isTrue = false;
            if (currentTime >= startTime && currentTime < endTime) {
                index = i;
                isTrue = true;
            }
            return isTrue;
        });
        // 返回顶部加埋点
        isFind && toTopBindEv();
        const oTimes = isFind ? hdTimes[index] : {};
        return { index, times: oTimes };
    }
    // 返回顶部加埋点
    function toTopBindEv() {
        let goBackTop = document.getElementById('gobackTop');
        if (goBackTop && gobackTopEvBind >= 1) {
            return;
        }
        gobackTopEvBind += 1;
        goBackTop.addEventListener('click', (e) => {
            reportLog({
                elem: e.target, xyId: 'xd', content: '双十二回到顶部', position: 'xd'
            });
        });
    }

    // 渲染活动
    function renderHD({ jetLag, index, times: { startTime, endTime } }) {
        const now1 = +new Date() + jetLag;
        if (now1 >= startTime && now1 < endTime) {
            // 先渲染出当前倒计时
            setNowHDTime(endTime - now1);
            setHdTimeIndex(index);
            setIsShowHD(true);
            // setTimeout(()=>{
            // let img = new Image();
            // img.src = 'https://cdn-h5.neibu.koolearn.com/koo-daxue-node-home/_next/static/images/down-bg1-98c513908faabed38e24a0339a7fc14a.png';
            // img.onload = () => {
            //     setTimeout(() => {
            //         setBodyScrollTop(0);
            //     }, 60);
            // };
            // },500)
            // 倒计时显示
            ST.current = setInterval(() => {
                const now = +new Date() + jetLag;
                if (now >= startTime && now < endTime) {
                    setNowHDTime(endTime - now);
                    // 设置匹配到的index
                    setHdTimeIndex(index);
                    setIsShowHD(true);
                } else {
                    // debugger;
                    clearInterval(ST.current);
                    // 关闭上一个规则弹框
                    hideRuleDialog();
                    // 判断是否还有匹配的时间
                    const oItem = getMatchedTime(now);
                    if (oItem.index === -1) {
                        setIsShowHD(false);
                        // 设置匹配到的index
                        setHdTimeIndex(-1);
                    } else {
                        renderHD({ jetLag, ...oItem });
                    }
                }
            }, 1000);
        }
    }

    // 设置活动显示的有效倒计时
    async function setHdCountdownTime() {
        // 判断是否在活动时间段内
        const { serviceTime = 0, jetLag = 0 } = await getServiceTime() || {};
        if (serviceTime > 0) {
            const now = +new Date() + jetLag;
            const oItem = getMatchedTime(now);
            if (oItem.index !== -1) {
                renderHD({ jetLag, ...oItem });
            }
        }
    }
    // 设置显示的购买信息
    async function setBuyInfoData() {
        // 购买人数
        const res = await getBuyInfo({
            productLines: '',
            withOutProductLines: '1,3,24,25,49,60,61,66,67,68,69,70,90'
        });
        setBuyInfo(res);
    }

    useEffect(() => {
        PubSub.publish('toggleTopHd');
    }, [isSlideDown, isShowHD]);

    useEffect(() => {
        PubSub.publish('changeTopHdIndex', hdTimeIndex);
    }, [hdTimeIndex]);

    useEffect(() => {
        setHdCountdownTime();
        setBuyInfoData();
        return () => {
            setIsShowHD(false);
            hideRuleDialog();
            clearInterval(ST.current);
        };
    }, []);

    function getBg() {
        const bgs = ['bg1', 'bg2'];
        return [bgs[hdTimeIndex] || ''];
    }

    function getSubTitle() {
        const subTitles = ['sub-title1', 'sub-title2', 'sub-title3'];
        return [subTitles[hdTimeIndex] || ''];
    }

    function getButtonColor() {
        const colors = ['color1', 'color2', 'color3'];
        return [colors[hdTimeIndex] || ''];
    }
    function getListArrow() {
        const arrows = ['arrow1', 'arrow2', 'arrow3'];
        return [arrows[hdTimeIndex] || ''];
    }

    function getColor() {
        const colors = ['color0', 'color1'];
        return [colors[hdTimeIndex] || ''];
    }

    // function getDialogBg() {
    //     const dialogBgs = ['dialog_bg1', 'dialog_bg2', 'dialog_bg3'];
    //     return [dialogBgs[hdTimeIndex] || ''];
    // }
    /**
     * @description: 根据不同的名字定制特殊样式
     * @param {String} title
     * @return {String}
     */
    function listsWidth(title) {
        return title === '北美留学' ? 'sub-title-width' : '';
    }
    /**
     * @description: 根据不同的名字定制特殊样式
     * @param {String} title
     * @return {String}
     */
    function listsTop(title) {
        return title === '英联邦留学' ? 'links-item-wrap-top' : '';
    }
    /**
     * @description: 根据不同的名字定制特殊样式
     * @param {String} title
     * @return {String}
     */
    function afterTop(title) {
        const conformList = ['北美留学', '英联邦留学'];
        return conformList.includes(title) ? 'title-wrap-top' : '';
    }
    return (
        <div className={cx('top-hd-wrap', { hidden: !isShowHD })}>
            {
                showCountDown && <div className={cx('countdown-wrap', { lh30: !isSlideDown })}>距优惠结束仅剩：<Countdown time={nowHDTime}/></div>
            }
            <div className={cx('slide-down-wrap', getBg(), { show: isSlideDown })}>
                <div className={cx('hd-content')}>
                    <span
                        className={cx('close-btn')}
                        onClick={slideUpHD}
                    >
                    </span>
                    <div
                        // className={cx(`view-rule-btn rule-btn-color${hdTimeIndex}`)}
                        className={cx('view-rule-btn', getColor())}
                        onClick={showRuleDialog}
                    >
                        {'活动规则 >'}
                    </div>
                    <div className={cx('info-wrap')}>
                        {/* <div className={cx('buy-info')}><span className={cx('count')}>{buyInfo.totalCount}</span>人已购课  累计优惠<span className={cx('count')}>{buyInfo.promoteAfterAmountTotal}</span>元</div> */}
                        {/* <div
                            className={cx('view-rule-btn')}
                            onClick={showRuleDialog}
                        >
                        </div> */}
                        <div className={cx('view-rule-btn-line')}></div>
                    </div>
                    <ul className={cx('links-list-wrap')}>
                        {hdTimeIndex !== -1 && lists[hdTimeIndex].map((item, index) => (
                            <li
                                className={cx('links-item-wrap', `links-stage-${hdTimeIndex}`, listsTop(item.title))}
                                key={index}
                            >
                                <div className={cx('title-wrap', getListArrow(), afterTop(item.title))}>
                                    <p className={cx('title')}>{item.title}
                                        {/* <span className={cx('flag')}>{item.flag}</span> */}
                                    </p>
                                    <a
                                        href={item.couponUrl}
                                        className={cx('coupon', getBg(), `coupon${hdTimeIndex}${index}`, { coupon_lines: index == 2 || index == 3 })}
                                        onClick={(e) => clickCoupon(e, item, index)}
                                        target="_blank"
                                        // dangerouslySetInnerHTML={{ __html: item.coupon }}
                                    >
                                    </a>
                                </div>
                                <div className={cx('sub-title-wrap', listsWidth(item.title), { 'sub-title_lines': index == 2 || index == 3 })}>
                                    {item.links.map((link, key) => (
                                        <a
                                            href={link.url}

                                            key={key}
                                            onClick={(e) => clickLink(e, link, index, key)}
                                            target="_blank"
                                        >
                                            <div className={cx(getSubTitle(), getButtonColor())}>
                                                <span className={cx('sub-title-wrap-left')}></span>
                                                <span className={cx('sub-title-wrap-content')}>
                                                    {link.name}{link.hot && <span className={cx('hot-icon')}></span>}{link.new && <span className={cx('new-icon')}></span>}
                                                </span>
                                                <span className={cx('sub-title-wrap-right')}></span>
                                            </div>

                                        </a>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div
                className={cx('slide-up-wrap', getBg(), { show: !isSlideDown })}
                onClick={slideDownHD}
            >
                <div className={cx('slide-up-wrap-icon')}>
                    <div />
                </div>
            </div>
            { isShowRule &&
            <div className={cx('hd-rule-wrap')}>
                {/* <div className={cx('hd-rule-dialog', getDialogBg())}>
                    <div className={cx('title')}>{'活动规则'}</div>
                    <span
                        className={cx('close-btn')}
                        onClick={hideRuleDialog}
                    >
                    </span>
                    <RuleContent hdIndex={hdTimeIndex}></RuleContent>
                </div> */}
                <div className={cx('hd-rule-dialog')}>
                    <span
                        className={cx('close-btn')}
                        onClick={hideRuleDialog}
                    >
                    </span>
                    <RuleContent hdIndex={hdTimeIndex}></RuleContent>
                </div>
            </div>}
        </div>
    );
}
