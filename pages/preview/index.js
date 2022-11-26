/* eslint-disable no-return-await */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Banner from 'components/banner';
import PublicClass from 'components/public-class';
import HotCourse from 'components/hot-course';
import PageFooter from 'components/page-footer';
import RightFloatingMenu from 'components/right-floating-menu';
import {
    getHeaderMenusData, getBannersData, getTypesData, getPublicClassData, getHotCourseData, getAdvertCurrent
} from 'services/base';
import styles from 'styles/Home.module.scss';

function Notice() {
    return (
        <div style={{ textAlign: 'center', fontSize: '30px', background: 'yellow' }}>此页面为预览页面，不能用于投放或正式使用</div>
    );
}

export default function Home() {
    const [menus, setMenus] = useState([]);
    const [banners, setBanners] = useState([]);
    const [publicClassTypes, setPublicClassTypes] = useState([]);
    const [publicClasses, setPublicClasses] = useState([]);
    const [hotCourses, setHotCourses] = useState([]);
    const [hotCourseTypes, setHotCourseTypes] = useState([]);
    const [advertising, setAdvertising] = useState([]);

    useEffect(async () => {
        const { props } = await getProps();
        // console.log('3456789', props.hotCourseTypes);
        setMenus(props.menus);
        setBanners(props.banners);
        setPublicClassTypes(props.publicClassTypes);
        setPublicClasses(props.publicClasses);
        setHotCourseTypes(props.hotCourseTypes);
        setHotCourses(props.hotCourses);
        setAdvertising(props.advertising);
    }, []);
    return (
        <div className={styles.container}>
            <Head>
                <title>预览页面-官网首页</title>
            </Head>
            <Notice />
            <Header />
            <Banner
                menus={menus}
                banners={banners}
                advertising={advertising}
            />
            <PublicClass
                types={publicClassTypes}
                publicClasses={publicClasses}
            />
            <HotCourse
                types={hotCourseTypes}
                hotCourses={hotCourses}
            />
            <PageFooter />
            <RightFloatingMenu />
        </div>
    );
}

async function getProps() {
    // console.log('----------------previewType:2');
    const menus = await getHeaderMenusData({ type: 2 }); // 1:正式，2:预览
    const banners = await getBannersData();
    const types = await getTypesData();
    const advertising = await getAdvertCurrent();
    // 公开课过滤小语种
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
    const hotCoursesFilterTypes = [];
    // const filterArray = ['zsb', 'gjyy'];
    types.forEach((item) => {
        // if (filterArray.includes(item.typeCode)) return;
        hotCoursesFilterTypes.push(item);
    });
    // console.log('1234567890987654323456----->', types, publicClassesFilterType, hotCoursesFilterTypes);
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
    // console.log('345678', aShowHotCourses, hotCoursesFilterTypes);
    // console.log('_-_-_-_-_-_-_-hotCourses:', aShowHotCourseTypes, aShowHotCourses);

    return {
        props: {
            menus,
            banners,
            publicClassTypes: aShowPublicClassTypes,
            publicClasses: aShowPublicClasses,
            hotCourseTypes: aShowHotCourseTypes,
            hotCourses: aShowHotCourses,
            advertising
        }
    };
}
