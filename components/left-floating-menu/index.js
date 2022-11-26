import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import PubSub from 'pubsub-js';
import classBind from 'classnames/bind';
import { getBodyScrollTop, setBodyScrollTop } from 'utils';
import styles from './styles.module.scss';

const cx = classBind.bind(styles);
const defaultLeftSpace = 20; // 左侧菜单到内容的间距默认20px
function LeftFloatingMenu({ types }) {
    const oStyles = useRef({ left: 0, top: 0, opacity: 0 });
    const [newStyles, setNewStyles] = useState(oStyles.current);
    const [fixedMenu, setFixedMenu] = useState(false);
    const [hdIndex, setHdIndex] = useState(-1);
    const allHotListDom = useRef([]);
    const wrapDom = useRef(0);
    const leftFloatMenuDom = useRef(0);
    const ST = useRef(null);
    const ST2 = useRef(null);
    const ST3 = useRef(null);
    const SIV = useRef(null);
    const SIV2 = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    function getWrapTop() {
        wrapDom.current = wrapDom.current || document.getElementById('jc-hot-list-wrap');
        return wrapDom.current.offsetTop;
    }
    function getLeftFloatMenuDom() {
        leftFloatMenuDom.current = leftFloatMenuDom.current || document.getElementById('jc-left-floating-menu');
        return leftFloatMenuDom.current;
    }
    function getHotListDom() {
        allHotListDom.current = allHotListDom.current.length ? allHotListDom.current : document.querySelectorAll('[list-type="hot"]');
        return allHotListDom.current;
    }
    // 获取热门课程每个模块的Offset
    function getAllListOffset() {
        const aRes = [];
        const wrapTop = getWrapTop();
        getHotListDom().forEach((dom) => aRes.push({ top: wrapTop + dom.offsetTop, height: dom.offsetHeight }));
        return aRes;
    }

    // 重置菜单位置
    // isShowAll 是否显示全部菜单
    function resetPositionNow(isShowAll = false) {
        const winW = window.innerWidth || window.outerWidth;
        const menuDom = getLeftFloatMenuDom();
        const menuW = menuDom.offsetWidth;
        // console.log('w', winW, window.innerWidth, window.outerWidth);
        // 富裕的空间
        const otherW = winW - (1200 + (menuW + defaultLeftSpace) * 2);
        const tempStyles = { ...oStyles.current };
        if (isShowAll) {
            // 吸附在左边,显示全部菜单
            tempStyles.left = otherW > 2 ? `${otherW / 2}px` : 0;
        } else {
            // 永远保证菜单与内容的间距是defaultLeftSpace大小
            tempStyles.left = `${otherW / 2}px`;
        }

        tempStyles.opacity = 1;
        oStyles.current = tempStyles;
        setNewStyles(oStyles.current);
    }
    // 延迟，重置菜单位置
    function resetPositionSleep() {
        clearTimeout(ST.current);
        ST.current = setTimeout(() => {
            clearTimeout(ST.current);
            resetPositionNow();
        }, 50);
    }
    // 页面滚动
    function pageScroll() {
        if (!ST2.current) {
            resetPositionNow(true);
            ST2.current = setTimeout(() => {
                clearTimeout(ST2.current);
                ST2.current = null;
                selectedIndexByScroll();
                // 还原间距
                keepMenuSpacing();
            }, 50);
        }
    }
    // 永远保证菜单与内容的间距是defaultLeftSpace大小
    function keepMenuSpacing() {
        // TODO 1.5s后还原位置
        clearTimeout(ST3.current);
        ST3.current = setTimeout(() => {
            clearTimeout(ST3.current);
            resetPositionNow();
        }, 1000); // 1s后还原菜单定位
    }
    function hoverMenu() {
        resetPositionNow(true);
        clearTimeout(ST3.current);
    }
    // 固定左侧菜单， 当浏览热门课程时
    function setMenuFixed({ allListOffset, bodyScrollTop }) {
        const menuDom = getLeftFloatMenuDom();
        const screenH = document.body.offsetHeight;
        const menuH = menuDom.offsetHeight;
        const halfH = (screenH - menuH) / 2;
        const isFixed = allListOffset.length ? (allListOffset[0].top - halfH <= bodyScrollTop) : false;
        // console.log('fixed:', screenH, menuH, allListOffset[0].top,
        // allListOffset[0].top - halfH, bodyScrollTop, isFixed);
        setFixedMenu(isFixed);
        const tempStyles = { ...oStyles.current };
        tempStyles.top = isFixed ? `${halfH}px` : '0';
        tempStyles.opacity = 1;
        oStyles.current = tempStyles;
        setNewStyles(oStyles.current);
        // console.log(oStyles.current);
    }
    // 选中对应标题，当页面滚动时
    function selectedIndexByScroll() {
        let index = -1;
        const allListOffset = getAllListOffset();
        const bodyScrollTop = getBodyScrollTop();
        allListOffset.some((item, key) => {
            const curItemHeight = item.top + item.height;
            let isTrue = curItemHeight - 35 > bodyScrollTop;
            isTrue && (index = key);
            return isTrue;
        });
        setMenuFixed({ allListOffset, bodyScrollTop });
        setSelectedIndex(index);
    }
    // 置顶
    function gotoTop() {
        clearInterval(SIV.current);
        SIV.current = setInterval(() => {
            const iTop = getBodyScrollTop();
            const iStep = Math.floor(-iTop / 3);
            let iNewTop = iTop + iStep;
            if (iNewTop <= 0) {
                clearInterval(SIV.current);
                iNewTop = 0;
            }
            setBodyScrollTop(iNewTop);
        }, 10);
    }
    // 定位：滚动到对应的热门课程模块
    function scrollToList(index) {
        setSelectedIndex(index);
        // const wrapDomH = wrapDom.current.offsetTop;
        const wrapDomH = getWrapTop();
        // 因为公开课列表个数不固定，需要重新获取当前元素top
        const listDom = document.getElementById(`hot-course-list_${index}`);
        let listOffsetTop = wrapDomH + listDom.offsetTop;
        // 是否超出了页面最大滚动高度
        const pageCanScrollH = document.body.scrollHeight - document.body.offsetHeight;
        listOffsetTop = listOffsetTop - pageCanScrollH > 0 ? pageCanScrollH : listOffsetTop;
        const bodyScrollTop = getBodyScrollTop();
        // console.log('scrollToList:', listOffsetTop, bodyScrollTop, listOffsetTop - bodyScrollTop);
        // 获取页面需要滚动的距离
        const listToTop = listOffsetTop - bodyScrollTop;
        clearInterval(SIV2.current);
        SIV2.current = setInterval(() => {
            const iTop = getBodyScrollTop();
            const iStep = Math.ceil((listOffsetTop - iTop) / 3);
            let iNewTop = iTop + iStep;
            // 移动距离小于3时直接到位
            if (iStep <= 3 && iStep >= -3) {
                iNewTop = listOffsetTop;
            }
            // 边界情况（iStep计算有误差）
            if ((listToTop >= 0 && iNewTop >= listOffsetTop) || (listToTop < 0 && listOffsetTop >= iNewTop)) {
                clearInterval(SIV2.current);
                iNewTop = listOffsetTop;
            }
            // console.log('iNewTop', iNewTop);
            setBodyScrollTop(iNewTop);
        }, 10);
    }

    function clearAllSleep() {
        clearTimeout(ST.current);
        clearTimeout(ST2.current);
        clearTimeout(ST3.current);
        clearInterval(SIV.current);
        clearInterval(SIV2.current);
    }

    useEffect(() => {
        const PS = PubSub.subscribe('changeTopHdIndex', (msg, index) => {
            // console.log(msg, index);
            setHdIndex(index);
        });
        // wrapDom.current = document.getElementById('jc-hot-list-wrap');
        // allHotListDom.current = document.querySelectorAll('[list-type="hot"]');
        resetPositionNow();
        selectedIndexByScroll();
        window.addEventListener('resize', resetPositionSleep, false);
        window.addEventListener('scroll', pageScroll, false);
        // window.addEventListener('mousewheel', clearAllSleep, false);
        return () => {
            PubSub.unsubscribe(PS);
            window.removeEventListener('resize', resetPositionSleep, false);
            window.removeEventListener('scroll', pageScroll, false);
            // window.removeEventListener('mousewheel', clearAllSleep);
            clearAllSleep();
        };
    }, []);

    function getGotoTopBg() {
        const bgs = ['bg1', 'bg2', 'bg3'];
        return [bgs[hdIndex] || ''];
    }

    return (
        <ul
            className={cx('list', { fixed: fixedMenu })}
            style={newStyles}
            id="jc-left-floating-menu"
            onMouseOver={hoverMenu}
            onMouseLeave={keepMenuSpacing}
        >
            {types.map((item, index) => (
                <li
                    key={index}
                    className={cx('item', { selected: selectedIndex === index })}
                    onClick={() => scrollToList(index)}
                ><span className={cx('text')}>{item.typeName}</span>
                </li>
            ))}
            <li
                className={cx('goto-top', getGotoTopBg())}
                id='gobackTop'
                onClick={gotoTop}
            >回到顶部
            </li>
        </ul>
    );
}

LeftFloatingMenu.propTypes = {
    types: PropTypes.array.isRequired
};

export default LeftFloatingMenu;
