/* eslint-disable operator-linebreak */
import PropTypes from 'prop-types';
import React from 'react';
// import Image from 'next/image';
import classBind from 'classnames/bind';
import { subString } from 'utils';
import styles from './styles.module.scss';

const cx = classBind.bind(styles);
// 1:'公开课', 2: '热门课程'
// const classNames = {1:'public-class-item', 2: 'hot-course-item'};
const otherInfoKey = { 1: 'nearLiveTime', 2: 'sellingPointIntro' };
const defaultTeacherPhotoUrl = 'https://daxueui-cos.koocdn.com/images/fe_upload/2022/6/2022-6-6-1654495928122.png?imageMogr2/format/jpg';

function CourseCard({
    item, type, className
}) {
    const otherInfo = item[otherInfoKey[type]] || '';
    const teacherList = (item.teacherList || []).slice(0, 4);

    return (
        <a
            className={cx('course-card', className)}
            href={item.jumpUrl}
            target="_blank"
        >
            <div className={cx('course-flag')}>{item.productLineName}</div>
            <div className={cx('course-info-wrap')}>
                <div
                    className={cx('course-name')}
                    title={item.productName}
                >{subString(item.productName, 52, true)}
                </div>
                <div
                    className={cx('course-other-info')}
                    title={otherInfo}
                >{otherInfo}
                </div>
            </div>
            <div className={cx('teacher-list')}>
                {teacherList.map((teacher, index) => (
                    <div
                        className={cx('teacher-item')}
                        key={index}
                    >
                        {teacher.photoUrl &&
                            <img
                                className={cx('teacher-avatar')}
                                data-type="avatar"
                                data-src={`${teacher.photoUrl}?imageMogr2/strip/crop/72x72`}
                                src={defaultTeacherPhotoUrl}
                            />
                        }
                        <div
                            className={cx('teacher-name')}
                            title={teacher.teacherName}
                        >{teacher.teacherName}
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('footer-wrap')}>
                {item.buyNumber > 0
                    && <span className={cx('buy-info')}>已有{item.buyNumber}人购买</span>
                }
                {item.promotionPrice > 0
                    ? <span className={cx('price', 'fs22')}><span className={cx('unit')}>¥</span>{item.promotionPrice}</span>
                    : <span className={cx('price')}>免费</span>
                }
                {item.originalPrice > 0 && <span className={cx('origin-price')}>¥{item.originalPrice}</span>}
                {item.promotionInfo && <span className={cx('youHu-flag')}>{item.promotionInfo}</span>}
            </div>
        </a>
    );
}

CourseCard.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.number.isRequired,
    className: PropTypes.string
};

export default CourseCard;
