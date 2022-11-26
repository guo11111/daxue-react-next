/*
 * @Author: ran
 * @Date: 2022-01-10 11:37:08
 * @LastEditors: ran
 * @LastEditTime: 2022-03-07 16:26:39
 */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import classBind from 'classnames/bind';
import CourseCard from 'components/course-card';
import styles from './styles.module.scss';

const cx = classBind.bind(styles);

function PublicClass({ types, publicClasses }) {
    // console.log(types, publicClasses);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [ST, setST] = useState(null);
    function changeSelectedIndex(index) {
        clearTimeout(ST);
        setST(setTimeout(() => {
            clearTimeout(ST);
            setSelectedIndex(index);
        }, 250));
    }
    // console.log('12345678', types);
    // { typeCode: 'zsb', typeName: '专四专八/同等学力/专升本' }
    // { typeCode: 'gjyy', typeName: '国际英语/职场进阶' },
    // 公开课过滤小语种
    const filterType = [];
    types.forEach((item) => {
        // if (item.typeCode === 'xyz') return;
        filterType.push(item);
    });
    return (
        <div className={cx('public-class-wrap')}>
            <div className={cx('title-wrap')}>
                <span className={cx('title')}>公开课</span>
                <div className={cx('sub-titles-wrap')}>
                    {filterType.map((item, index) => (
                        <span
                            className={cx('link', { selected: index === selectedIndex })}
                            onMouseEnter={() => { changeSelectedIndex(index); }}
                            key={index}
                        >{item.typeName}
                        </span>
                    ))}
                </div>
                {/* <a className={cx('more-link')} href="" target="_blank">查看更多》</a> */}
            </div>
            {publicClasses.map((aItem, key) => (
                <div
                    className={cx('course-card-list', { selected: selectedIndex === key })}
                    key={key}
                >
                    {aItem.map((item, index) => (
                        <CourseCard
                            className={cx('course-card-item')}
                            type={1}
                            item={item}
                            key={index}
                        />
                    ))}
                </div>
            ))}
            {/* <div className={cx('course-card-list',{selected: selectedIndex === 1})}>
                {coursesList2.map((item, index)=>
                    <CourseCard className={cx('course-card-item')} type={1} item={item} key={index} />
                )}
            </div> */}
        </div>
    );
}

PublicClass.propTypes = {
    types: PropTypes.array.isRequired,
    publicClasses: PropTypes.array.isRequired
};

export default PublicClass;
