/* eslint-disable operator-linebreak */
/* eslint-disable no-return-await */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Banner from 'components/banner';
import PublicClass from 'components/public-class';
import HotCourse from 'components/hot-course';
import PageFooter from 'components/page-footer';
import RightFloatingMenu from 'components/right-floating-menu';
import TopHD from 'components/top-hd';
import {
    getHeaderMenusData, getBannersData, getTypesData, getPublicClassData, getHotCourseData, getAdvertCurrent
} from 'services/base';
import styles from 'styles/Home.module.scss';
import Header from '@/components/header';
import { canUseWebp } from '../utils';

function Home({
    menus, banners, publicClassTypes, publicClasses, hotCourses, hotCourseTypes, advertising
}) {
    const isProduction = process.env.CLIENT_ENV === 'product';
    const [webpSupport, setWebpSupport] = useState(-1);

    const handleLazyLoadImages = (images) => {
        images.forEach((img) => {
            const imgTop = img.getBoundingClientRect().top;// 距离dom顶部距离
            const dataSrc = img.getAttribute('data-src');
            const imgSrc = img.getAttribute('src');

            if (imgTop < window.innerHeight && dataSrc != imgSrc) {
                img.setAttribute('src', dataSrc);
            }
        });
    };

    useEffect(() => {
        window.addEventListener('load', () => {
            let timer = null;
            setWebpSupport(+canUseWebp());
            const images = document.querySelectorAll('img[data-type="avatar"]');

            // 保证在半屏刷新的时候展示正常;
            handleLazyLoadImages(images);

            window.addEventListener('scroll', () => {
                if (timer) { return; }
                timer = setTimeout(() => {
                    clearTimeout(timer);
                    timer = null;
                    handleLazyLoadImages(images);
                }, 300);
            });
        });
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>新东方大学考试官网_考研/英语/雅思/托福/四六级/日语/韩语/教资在线网课官网</title>
                <meta
                    name="keywords"
                    content="新东方大学,新东方大学考试,新东方考研在线网课,新东方雅思,新东方英语在线网课"
                />
                <meta
                    name="description"
                    content="新东方大学考试官网是由新东方集团全资创办官方网校，依托强大的新东方师资力量与教学资源，为大学生提供考研考博、英语提升、四六级、雅思、托福、日语、韩语、教资在线网课。"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
                >
                </meta>
                {isProduction &&
                <>
                    <script dangerouslySetInnerHTML={{
                        __html: `
    !function(e,t,n,g,i){e[i]=e[i]||function(){(e[i].q=e[i].q||[]).push(arguments)},n=t.createElement("script"),tag=t.getElementsByTagName("script")[0],n.async=1,n.src=('https:'==document.location.protocol?'https://':'http://')+g,tag.parentNode.insertBefore(n,tag)}(window,document,"script","assets.giocdn.com/2.1/gio.js","gio");
    gio('init','9dee9d3e36a527e1', {});
    gio('send');
                        `
                    }}
                    />
                    <script dangerouslySetInnerHTML={{
                        __html: `
    var _hmt = _hmt || [];
    (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?5023f5fc98cfb5712c364bb50b12e50e";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
    })();
                    `
                    }}
                    />
                </>
                }
            </Head>
            <TopHD />
            <Header />
            <Banner
                menus={menus}
                banners={banners}
                webpSupport={webpSupport}
                advertising={advertising}
            />
            <PublicClass
                types={publicClassTypes}
                publicClasses={publicClasses}
            />
            <HotCourse
                webpSupport={webpSupport}
                types={hotCourseTypes}
                hotCourses={hotCourses}
            />
            <PageFooter />
            <RightFloatingMenu />
        </div>
    );
}

export async function getStaticProps() {
    // console.log('----------------previewType:1');
    console.log('rebuild start');
    const menus = await getHeaderMenusData({ type: 1 }); // 1:正式，2:预览
    const banners = await getBannersData();
    const advertising = await getAdvertCurrent();
    const types = await getTypesData();
    // 公开课过滤小语种
    // 需求变更，又不过滤了，先注释
    const publicClassesFilterType = [];
    types.forEach((item) => {
        // if (item.typeCode === 'xyz') return;
        publicClassesFilterType.push(item);
    });
    const publicClassTypes = [{ typeCode: 'jqkk', typeName: '近期公开课' }, ...publicClassesFilterType];
    const publicClasses = await Promise.all(publicClassTypes.slice(0).map(async (item) => {
        return await getPublicClassData({ typeCode: item.typeCode });
    }));
    // 删除无数据的公开课
    const aShowPublicClassTypes = [];
    const aShowPublicClasses = publicClasses.filter((item, index) => {
        let isTrue = false;
        if (item && item.length > 0) {
            aShowPublicClassTypes.push(publicClassTypes[index]);
            isTrue = true;
        }
        return isTrue;
    });
    // console.log('============publicClasses:', aShowPublicClassTypes, aShowPublicClasses);
    // 热门课程过滤专四专八/同等学力/专升本、国际英语/职场进阶
    // 需求变更，又不过滤了，先注释
    const hotCoursesFilterTypes = [];
    // const filterArray = ['zsb', 'gjyy'];
    types.forEach((item) => {
        // if (filterArray.includes(item.typeCode)) return;
        hotCoursesFilterTypes.push(item);
    });
    const hotCourses = await Promise.all(hotCoursesFilterTypes.map(async (item) => {
        return await getHotCourseData({ typeCode: item.typeCode });
    }));
    // 删除无数的的热门课程
    const aShowHotCourseTypes = [];
    const aShowHotCourses = hotCourses.filter((item, index) => {
        let isTrue = false;
        if (item && (
            (item.entryList && item.entryList.length > 0)
        || (item.bannerList && item.bannerList.length > 0)
        || (item.productList && item.productList.length > 0)
        )) {
            aShowHotCourseTypes.push(hotCoursesFilterTypes[index]);
            isTrue = true;
        }
        return isTrue;
    });
    // console.log('_-_-_-_-_-_-_-hotCourses:', aShowHotCourseTypes, aShowHotCourses);
    console.log('rebuild end');
    return {
        props: {
            menus,
            banners,
            publicClassTypes: aShowPublicClassTypes,
            publicClasses: aShowPublicClasses,
            hotCourseTypes: aShowHotCourseTypes,
            hotCourses: aShowHotCourses,
            advertising
        },
        // 重新生成静态页面时间间隔
        revalidate: 60
    };
}

Home.propTypes = {
    menus: PropTypes.array.isRequired,
    publicClassTypes: PropTypes.array.isRequired,
    publicClasses: PropTypes.array.isRequired,
    hotCourses: PropTypes.array.isRequired,
    hotCourseTypes: PropTypes.array.isRequired,
    banners: PropTypes.array.isRequired,
    advertising: PropTypes.array.isRequired
};

export default Home;
