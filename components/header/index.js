/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import classBind from 'classnames/bind';
import { getLoginInfo, getDLSLink } from 'services/base';
import customConfigs from 'custom.config';
import styles from './styles.module.scss';

const cx = classBind.bind(styles);

export default function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [dlsLink, setDlsLink] = useState('');
    const [logoutUrl, setLogoutUrl] = useState('');
    // 显示登录弹框
    function gotoLogin() {
        // eslint-disable-next-line no-undef
        $.miniLogin({ f: 'pc_s_daohang_index_gh' });
    }
    // 渲染登录用户信息
    function renderUserInfo() {
        // 设置测试 login domain
        customConfigs.loginDomain && (document.domain = customConfigs.loginDomain);
        getLoginInfo().then((oUserInfo) => {
            if (oUserInfo) {
                // 退出URL不同 根据env环境决定
                setLogoutUrl(`${customConfigs.logoutUrl}${encodeURIComponent(window.location.href)}`);
                setIsLogin(true);
                setUserInfo(oUserInfo);
            }
        });
    }
    // 渲染代理商入口链接
    function renderDLSLink() {
        getDLSLink().then((data) => {
            if (data) {
                setDlsLink(data);
            }
        });
    }

    function userIsLogin() {
        // eslint-disable-next-line no-undef
        const status = ($.cookie('sso.ssoId') && $.cookie('sso.ssoId').length > 10) || ($.cookie('sid') && $.cookie('sid').length > 10);
        return status;
    }

    useEffect(() => {
        renderUserInfo();
        renderDLSLink();
    }, []);

    useEffect(() => {
        // eslint-disable-next-line no-undef
        !userIsLogin() && $.miniLogin({ f: 'daxueforce' });
    }, []);

    return (
        <div className={cx('header-wrap', { 'login-status': isLogin })}>
            <div className={cx('header')}>
                <a
                    className={cx('logo-link')}
                    href="https://daxue.koolearn.com"
                >
                    <img
                        className={cx('logo')}
                        src="https://daxueui-oss.koocdn.com/images/fe_upload/2020/12/2020-12-30-1609298219519.png"
                    />
                </a>
                <form
                    action="/query"
                    method="get"
                    target="_blank"
                    className={cx('search-wrap')}
                >
                    <input
                        type="text"
                        className={cx('search-input')}
                        placeholder="搜索课程或者老师名称"
                        name="keyword"
                    />
                    <button
                        type="submit"
                        className={cx('search-btn')}
                    >搜索
                    </button>
                </form>
                <ul className={cx('menus-list')}>
                    <li className={cx('menus-item')}>
                        <a
                            href="https://teacher.koolearn.com/fen/home"
                            target="_blank"
                        >师资团队
                        </a>
                    </li>
                    <li className={cx('menus-item')}>
                        <a
                            href="https://help.koolearn.com/"
                            target="_blank"
                        >服务与帮助
                        </a>
                    </li>
                    <li className={cx('menus-item')}>
                        <a
                            href="https://app.koolearn.com/zhuanti/app/?channel_2"
                            target="_blank"
                        >客户端下载
                        </a>
                    </li>
                    <li className={cx('menus-item', 'highlight')}>
                        <a
                            href="https://study.koolearn.com/my"
                            target="_blank"
                        >我的课堂
                        </a>
                    </li>
                    <li className={cx('menus-item', 'login-wrap')}>
                        {isLogin ?
                            <div className={cx('login-info-wrap')}>
                                <img
                                    className={cx('user-avatar')}
                                    src={userInfo.headImg}
                                />
                                <div className={cx('user-info')}>
                                    <span
                                        className={cx('user-name')}
                                        title={userInfo.userName}
                                    >{userInfo.userName}
                                    </span>
                                    <ul className={cx('tools-list', { 'add-dls': dlsLink })}>
                                        <li className={cx('tools-item')}>
                                            <a
                                                href="https://study.koolearn.com/my"
                                                target="_blank"
                                            >我的课程
                                            </a>
                                        </li>
                                        <li className={cx('tools-item')}>
                                            <a
                                                href="https://i.koolearn.com/account/user_info"
                                                target="_blank"
                                            >个人中心
                                            </a>
                                        </li>
                                        <li className={cx('tools-item')}>
                                            <a
                                                href="https://order.koolearn.com/ordercenter/user_order/index?_f=interface"
                                                target="_blank"
                                            >我的订单
                                            </a>
                                        </li>
                                        <li className={cx('tools-item', { hidden: !dlsLink })}>
                                            <a
                                                href={dlsLink}
                                                target="_blank"
                                            >代理商后台
                                            </a>
                                        </li>
                                        <li className={cx('tools-item')}>
                                            <a
                                                href={logoutUrl}
                                                target="_blank"
                                            >退出登录
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            :
                            <div
                                className={cx('login-btn')}
                                onClick={gotoLogin}
                            >登录/注册
                            </div>
                        }
                    </li>
                </ul>
            </div>
        </div>
    );
}
