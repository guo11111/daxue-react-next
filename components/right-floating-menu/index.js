import React, { useEffect, useState, useRef } from 'react';
import classBind from 'classnames/bind';
import PubSub from 'pubsub-js';
import { getBodyScrollTop } from 'utils';
import styles from './styles.module.scss';

const cx = classBind.bind(styles);
const defaultBottom = 34;

export default function RightFloatingMenu() {
    const oRefStyles = useRef({ right: '3px', bottom: `${defaultBottom}px`, opacity: 0 });
    const [oStyles, setStyles] = useState(oRefStyles.current);
    const ST = useRef(null);
    const footerDom = useRef(0);
    const bannerDom = useRef(0);
    const rightFloatMenuDom = useRef(0);
    // const [showQRCode, setShowQRCode] = useState(true);
    const qrcodeRefStyles = useRef({ left: 0 });
    const [qStyles, setQStyles] = useState(qrcodeRefStyles.current);

    function getFooterTop() {
        footerDom.current = footerDom.current || document.getElementById('jp-page-footer');
        return footerDom.current.offsetTop;
    }

    function getBannerTop() {
        bannerDom.current = bannerDom.current || document.getElementById('jp-page-banner-wrap');
        return bannerDom.current.offsetTop;
    }

    function getRightFloatMenuOffset() {
        rightFloatMenuDom.current = rightFloatMenuDom.current || document.getElementById('jp-page-right-float-menus');
        return { top: rightFloatMenuDom.current.offsetTop, height: rightFloatMenuDom.current.offsetHeight };
    }

    function resetRightNow() {
        const winW = window.innerWidth || window.outerWidth;
        // console.log('resize', window.innerWidth, window.outerWidth);
        const otherW = winW - 1360;
        const oStyle = { ...oRefStyles.current };
        if (otherW > 2) {
            oStyle.right = `${otherW / 2}px`;
            oStyle.opacity = 1;
        } else {
            oStyle.right = '3px';
        }
        oRefStyles.current = oStyle;
        setStyles(oStyle);
        // 免登录加微二维码位置调整
        const qStyle = {};
        if (winW > 1512) {
            qStyle.left = '0';
        } else {
            qStyle.right = '20px';
        }
        qrcodeRefStyles.current = qStyle;
        setQStyles(qStyle);
    }

    function resetPositionSleep(time = 5) {
        clearTimeout(ST.current);
        ST.current = setTimeout(() => {
            clearTimeout(ST.current);
            resetRightNow();
            resetBottom();
        }, time);
    }
    function resetBottom() {
        const bannerTop = getBannerTop();
        const floatMenuOffset = getRightFloatMenuOffset();
        const footerTop = getFooterTop();
        const bodyTop = getBodyScrollTop();
        const screenH = document.body.offsetHeight;
        let oStyle = { ...oRefStyles.current };
        const temp = bodyTop + screenH - footerTop;
        const temp2 = bannerTop + floatMenuOffset.height;
        const temp3 = screenH + bodyTop;
        // console.log('bodyTop:', bodyTop, 'temp2:', temp2, 'floatMenuOffset:',
        // floatMenuOffset.height, ',', floatMenuOffset.top, 'screenH:', screenH, 'bannerTop:', bannerTop);
        // 不能遮挡顶部活动模块
        if (temp2 > screenH && temp2 + defaultBottom > temp3) {
            oStyle.bottom = temp3 - temp2;
        } else if (temp > 0) {
            // 不能遮挡footer
            const bottom = temp + defaultBottom;
            oStyle.bottom = `${bottom}px`;
        } else {
            oStyle.bottom = `${defaultBottom}px`;
        }
        oStyle.opacity = 1;
        oRefStyles.current = oStyle;
        setStyles(oStyle);
    }

    useEffect(() => {
        resetRightNow();
        resetBottom();
        window.addEventListener('resize', resetPositionSleep, false);
        window.addEventListener('scroll', resetPositionSleep, false);
        const TKPS = PubSub.subscribe('toggleTopHd', () => {
            resetPositionSleep(250);
        });
        return () => {
            window.removeEventListener('resize', resetPositionSleep, false);
            window.removeEventListener('scroll', resetPositionSleep, false);
            PubSub.unsubscribe(TKPS);
        };
    }, []);

    return (
        <ul
            id="jp-page-right-float-menus"
            className={cx('list')}
            style={oStyles}
        >
            {/* {
                // 免登录加微二维码
                showQRCode && (
                    <div
                        className={cx('teacher-qrcode')}
                        style={qStyles}
                    >
                        <p className={cx('teacher-qrcode__title')}>扫码咨询领福利</p>
                        <img
                            className={cx('teacher-qrcode__img')}
                            src={'//daxueui-cos.koocdn.com/images/fe_upload/2022/10/2022-10-8-1665221933581.png'}
                            alt=''
                        />
                        <div
                            className={cx('teacher-qrcode__close-btn')}
                            onClick={() => setShowQRCode(false)}
                        >
                            <img
                                src={'//daxueui-cos.koocdn.com/images/fe_upload/2022/10/2022-10-8-1665222152818.png'}
                                alt=''
                            />
                        </div>
                        <img
                            className={cx('teacher-qrcode__bg')}
                            src={'//daxueui-cos.koocdn.com/images/fe_upload/2022/10/2022-10-8-1665222155781.png'}
                            alt=''
                        />
                    </div>
                )
            } */}
            <li className={cx('item', 'hot-tel')}>
                电话<br/>咨询
                <div className={cx('tip', 'tel-tip')}>
                    <div className={cx('tel-tip-item')}>
                        <p className={cx('tel-tip-item-num')}>
                            国内大学课程咨询热线<br />
                            400-699-7576
                        </p>
                        <p className={cx('tel-tip-item-time')}>9:00-23:00 (节假日无休)</p>
                    </div>
                    <div className={cx('tel-tip-item')}>
                        <p className={cx('tel-tip-item-num')}>
                            出国留学课程咨询热线<br />
                            400-658-6305
                        </p>
                        <p className={cx('tel-tip-item-time')}>9:00-23:00 (节假日无休)</p>
                    </div>
                    <div className={cx('tel-tip-item')}>
                        <p className={cx('tel-tip-item-num')}>
                            小语种课程咨询热线<br />
                            400-660-7550
                        </p>
                        <p className={cx('tel-tip-item-time')}>9:00-21:00 (节假日无休)</p>
                    </div>
                </div>
            </li>
            <li className={cx('item', 'download-app')}>
                下载<br/>APP
                <div className={cx('tip', 'img-tip')}>
                    <img
                        className={cx('img')}
                        src="https://daxueui-oss.koocdn.com/images/fe_upload/2020/12/2020-12-30-1609298248229.png"
                    />
                    <p className={cx('text')}>扫码下载APP</p>
                </div>
            </li>
            <li className={cx('item', 'wx-fwh')}>
                微信<br/>服务号
                <div className={cx('tip', 'img-tip')}>
                    <img
                        className={cx('img')}
                        src="https://daxueui-oss.koocdn.com/images/fe_upload/2020/12/2020-12-30-1609298254594.png"
                    />
                    <p className={cx('text')}>扫码关注微信服务号</p>
                </div>
            </li>
        </ul>
    );
}
