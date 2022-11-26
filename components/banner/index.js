import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import classBind from 'classnames/bind';
import ImageSwiper from 'components/images-swiper';
import { gioEmit } from 'utils';
import styles from './styles.module.scss';

const cx = classBind.bind(styles);
let timer;
function Banner({
    menus, banners, advertising, webpSupport
}) {
    const [flag, setFlag] = useState(false);
    // const [advertisingList, setAdvertisingList] = useState([]);
    const defaultAdvertisingImage = '//daxueui-oss.koocdn.com/images/fe_upload/2022/1/2022-1-12-1641969122275.png';
    // console.log('banner:', menus, banners);
    // useEffect(() => {
    let advertisingList1 = advertising?.find((i) => i.advertPosition === 1) ?? { imgUrl: defaultAdvertisingImage };
    let advertisingList2 = advertising?.find((i) => i.advertPosition === 2) ?? { imgUrl: defaultAdvertisingImage };
    // setAdvertisingList([...advertisingList]);
    // }, [advertising]);
    // 格式化banner列表数据
    function formatBannerData(bannerList) {
        return bannerList.map((item) => ({
            link: item.jumpUrl,
            imgUrl: item.bannerUrl
        }));
    }

    // 获取主title组件
    function getItemTitle(oItem) {
        let res = oItem.mainTitle;
        oItem.mainTitleUrl && (res = (
            <a
                className={cx('title-link')}
                href={oItem.mainTitleUrl}
                target="_blank"
            >{res}
            </a>
        ));
        return res;
    }
    // 获取优惠标签组件
    function getItemPromotion(oItem) {
        let res = oItem.promotion && <span className={cx('title-tag')}>{oItem.promotion}</span>;
        oItem.promotionUrl && (res = (
            <a
                href={oItem.promotionUrl}
                target="_blank"
            >{res}
            </a>
        ));
        return res;
    }
    function commitToGio(item) {
        gioEmit('daxueIndexPageNavigation', {
            daxueIndexPageNavigationName: item.mainTitle
        });
        // console.log(item.mainTitle, 'mainTitle');
    }

    /* const domeHtml = `<div class="g-links-wrap">
    <div class="g-links-part-wrap">
        <div class="g-title-wrap">
            <span class="g-title" >托福</span>
            <span class="g-title-flag">满200减100</span>
        </div>
        <div class="g-links-list">
            <label class="g-list-title">中学生托福</label>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风<span class="g-item-link_flag">HOT</span></a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风<span class="g-item-link_flag">HOT</span></a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风<span class="g-item-link_flag">HOT</span></a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
            <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
        </div>
    </div>
    <div class="g-links-part-wrap">
        <div class="g-title-wrap">
            <span class="g-title" >托福</span>
            <span class="g-title-flag">满200减100</span>
        </div>
        <div class="g-links-list2">
            <!---左--->
            <div class="g-list-item">
                <div class="g-links-list">
                    <label class="g-list-title">中学生托福</label>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                </div>
                <div class="g-links-list">
                    <label class="g-list-title">中学生托福</label>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                </div>
                <div class="g-links-list">
                    <label class="g-list-title">中学生托福</label>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                </div>
            </div>
            <!---右--->
            <div class="g-list-item">
                <div class="g-links-list">
                    <label class="g-list-title">中学生托福</label>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                </div>
                <div class="g-links-list">
                    <label class="g-list-title">中学生托福</label>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                    <a class="g-item-link"  href="" target="_blank">是淡粉色的风</a>
                </div>
            </div>
        </div>
    </div>
    <div class="g-cards-list">
        <a class="g-card-item" href="" target="_blank">
            <div class="g-card-title">sdfsdfdsf</div>
            <div class="g-card-info">是的v发生的风是的v发生的风</div>
        </a>
        <div class="g-card-item g-right-card-item">
            <div class="g-card-title">是的v发生的风</div>
            <div class="g-card-info">是的v发生的风是的v发生的风是的v发生的风</div>
        </div>
    </div>
</div>`;
 */
    return (
        <div
            id="jp-page-banner-wrap"
            className={cx('banner-wrap')}
        >
            <div className={cx('left-menus-list')}>
                {/* <div className={cx('left-menus-item')}>
                    <div className={cx('menu-title')}>sdfsdf</div>
                    <div className={cx('sub-titles')}>
                        <a
                            className={cx('sub-title')}
                            href=""
                            target="_blank"
                        >sdfsdfsdf
                        </a>
                    </div>
                    <div
                        className={cx('children-wrap')}
                        dangerouslySetInnerHTML={{ __html: domeHtml }}
                    >
                    </div>
                </div> */}
                {menus.map((item, index) => (
                    <div
                        className={cx('left-menus-item')}
                        key={index}
                        onMouseEnter={() => {
                            timer = setTimeout(() => {
                                setFlag(true);
                            }, 1000);
                        }}
                        onMouseLeave={() => {
                            if (!flag) {
                                clearTimeout(timer);
                                return;
                            }
                            setFlag(false);
                            timer = null;
                            commitToGio(item);
                        }}
                    >
                        <div className={cx('menu-title')}>
                            {getItemTitle(item)}
                            {getItemPromotion(item)}
                        </div>
                        <div className={cx('sub-titles')}>
                            {item.subTitleList && item.subTitleList.map((subTitle, key) => (
                                <a
                                    key={key}
                                    className={cx('sub-title')}
                                    href={subTitle.link}
                                    target="_blank"
                                >{subTitle.title}
                                </a>
                            ))}
                        </div>
                        <div
                            className={cx('children-wrap')}
                            dangerouslySetInnerHTML={{ __html: item.htmlBlock }}
                        >
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('swiper-imgs-wrap')}>
                <ImageSwiper
                    imageList={formatBannerData(banners)}
                    isShowBtn={true}
                    webpSupport={webpSupport}
                />
            </div>
            <div className={cx('advertising_container')}>
                {webpSupport != -1 && (
                    <>
                        <a href={advertisingList1?.redirectUrl || ''}>
                            <div
                                className={cx('advertising-left')}
                                style={{ backgroundImage: webpSupport ? `url(${advertisingList1?.imgUrl}?imageMogr2/format/webp)` : `url(${advertisingList1?.imgUrl}?imageMogr2/format/jpg)` }}
                            >
                            </div>
                        </a>
                        <a href={advertisingList2?.redirectUrl || ''}>
                            <div
                                className={cx('advertising-right')}
                                style={{ backgroundImage: webpSupport ? `url(${advertisingList2?.imgUrl}?imageMogr2/format/webp)` : `url(${advertisingList2?.imgUrl}?imageMogr2/format/jpg)` }}
                            >
                            </div>
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}

Banner.propTypes = {
    menus: PropTypes.array.isRequired,
    banners: PropTypes.array.isRequired,
    advertising: PropTypes.array.isRequired,
    webpSupport: PropTypes.number
};
Banner.defaultProps = {
    advertising: []
};

export default Banner;
