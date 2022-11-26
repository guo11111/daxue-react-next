/* eslint-disable react/prop-types */
/* eslint-disable operator-linebreak */
import React, { useState, useEffect, useRef } from 'react';
import classBind from 'classnames/bind';
import styles from './styles.module.scss';

const cx = classBind.bind(styles);

export default function ImageSwiper({
    stepTime = 3500, isShowBtn = false, imageList = [], webpSupport,
    imgClassName, linkClassName, indexListClassName, indexClassName, indexSelectedClassName
}) {
    const [ST, setST] = useState(null);
    const [ST2, setST2] = useState(null);
    const curSelIndexRef = useRef(0);
    const [curSelectedIndex, setCurSelectedIndex] = useState(curSelIndexRef.current);
    const isMoreImgs = imageList.length > 1;

    function changeIndex(curSelIndex) {
        if (curSelIndex === -1 || curSelIndex >= imageList.length) {
            curSelIndex = 0;
        }
        curSelIndexRef.current = curSelIndex;
        setCurSelectedIndex(curSelIndexRef.current);
    }

    function swiperAuto() {
        // console.log('auto start');
        stopSwiper();
        setST(setInterval(() => {
            // console.log('cur2', curSelIndexRef.current);
            changeIndex(curSelIndexRef.current + 1);
        }, stepTime));
    }
    function stopSwiper() {
        // console.log('stop auto');
        clearInterval(ST);
        clearTimeout(ST2);
    }

    function changeCurSelIndex(index) {
        stopSwiper();
        setST2(setTimeout(() => {
            changeIndex(index);
        }, 250));
    }

    function showPrevImg() {
        stopSwiper();
        const newIndex = curSelectedIndex - 1;
        if (newIndex >= 0) {
            changeIndex(newIndex);
        } else {
            changeIndex(imageList.length - 1);
        }
    }
    function showNextImg() {
        stopSwiper();
        // console.log(curSelectedIndex)
        const newIndex = curSelectedIndex + 1;
        if (newIndex < imageList.length) {
            changeIndex(newIndex);
        } else {
            changeIndex(0);
        }
    }

    useEffect(() => {
        imageList.length > 1 && swiperAuto();
        return () => {
            stopSwiper();
        };
    }, []);

    return (
        <>
            <div
                className={cx('imgs-list')}
                onMouseEnter={stopSwiper}
                onMouseLeave={swiperAuto}
            >
                {imageList.map((item, index) => (
                    <a
                        key={index}
                        className={cx('imgs-item', { selected: index === curSelectedIndex }, linkClassName)}
                        href={item.link}
                        target="_blank"
                    >
                        {
                            webpSupport != -1 &&
                            <img
                                className={cx('image', imgClassName)}
                                src={webpSupport ? `${item.imgUrl}?imageMogr2/format/webp` : `${item.imgUrl}?imageMogr2/format/jpg`}
                            />
                        }
                    </a>
                ))}
                {isShowBtn && isMoreImgs &&
                    <span
                        className={cx('icon-btn', 'prev-btn')}
                        onClick={showPrevImg}
                    >
                    </span>
                }
                {isShowBtn && isMoreImgs &&
                    <span
                        className={cx('icon-btn', 'next-btn')}
                        onClick={showNextImg}
                    >
                    </span>
                }
            </div>
            {isMoreImgs &&
                <ul className={cx('index-list', indexListClassName)}>
                    {imageList.map((item, index) => (
                        <li
                            key={index}
                            className={cx('index-item', { selected: index === curSelectedIndex }, { [indexSelectedClassName]: index === curSelectedIndex }, indexClassName)}
                            onMouseEnter={() => { changeCurSelIndex(index); }}
                            onMouseLeave={swiperAuto}
                        >
                        </li>
                    ))}
                </ul>
            }
        </>
    );
}
