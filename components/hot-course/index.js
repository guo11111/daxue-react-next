/*
 * @Author: ran
 * @Date: 2022-01-10 11:37:08
 * @LastEditors: ran
 * @LastEditTime: 2022-03-07 16:26:33
 */
import PropTypes from 'prop-types';
import React from 'react';
import classBind from 'classnames/bind';
import CourseCard from 'components/course-card';
import ImageSwiper from 'components/images-swiper';
import LeftFloatingMenu from 'components/left-floating-menu';
import styles from './styles.module.scss';

const cx = classBind.bind(styles);

function HotCourse({ types, hotCourses, webpSupport }) {
    // console.log('热门课程----》', hotCourses);
    // 热门课程过滤专四专八/同等学力/专升本、国际英语/职场进阶
    const filterTypes = [];
    // const filterArray = ['zsb', 'gjyy'];
    types.forEach((item) => {
        // if (filterArray.includes(item.typeCode)) return;
        filterTypes.push(item);
    });
    // console.log('filterTypes', types, filterTypes);
    // 8: {typeCode: 'xyz', typeName: '小语种'}
    function getImagesList(aList) {
        let aNewList = [];
        if (aList && aList.length) {
            aNewList = aList.map((item) => ({ link: item.jumpUrl || '', imgUrl: item.bannerUrl || '' }));
        }
        return aNewList;
    }
    return (
        <div
            className={cx('wrap')}
            id="jc-hot-list-wrap"
        >
            <div className={cx('hot-course-wrap')}>
                {hotCourses.map((oneData, index) => (
                    <div
                        className={cx('hot-course-content')}
                        list-type="hot"
                        key={index}
                        id={`hot-course-list_${index}`}
                    >
                        <div className={cx('title-wrap')}>
                            <span className={cx('title')}>{types[index].typeName}</span>
                            <div className={cx('sub-title-wrap')}>
                                {oneData.entryList && oneData.entryList.map((item, i) => (
                                    <a
                                        className={cx('link')}
                                        href={item.jumpUrl}
                                        target="_blank"
                                        key={i}
                                    >{item.entryName}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className={cx('course-list')}>
                            <div className={cx('swiper-imgs-wrap')}>
                                <ImageSwiper
                                    stepTime={3000}
                                    webpSupport={webpSupport}
                                    indexListClassName={cx('index-list')}
                                    indexClassName={cx('index-item')}
                                    indexSelectedClassName={cx('selected')}
                                    imgClassName={cx('image')}
                                    imageList={getImagesList(oneData.bannerList)}
                                />
                            </div>
                            {oneData.productList && oneData.productList.map((item, key) => (
                                <CourseCard
                                    className={cx('course-item')}
                                    type={2}
                                    key={key}
                                    item={item}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <LeftFloatingMenu types={filterTypes} />
        </div>
    );
}

HotCourse.propTypes = {
    types: PropTypes.array.isRequired,
    hotCourses: PropTypes.array.isRequired,
    webpSupport: PropTypes.number
};

export default HotCourse;
