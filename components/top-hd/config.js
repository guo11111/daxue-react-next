// !!! 注意：上一个结束时间和下一个开始时间需是同一个，不然过渡时有断层
export const hdTimes = [
    // { startTime: formtStamp('2022/10/24 00:00:00'), endTime: formtStamp('2022/10/30 23:59:59') },
    // { startTime: formtStamp('2022/10/30 23:59:59'), endTime: formtStamp('2022/11/13 23:59:59') },
    { startTime: formtStamp('2022/11/25 00:00:00'), endTime: formtStamp('2022/12/01 00:00:00') },
    { startTime: formtStamp('2022/12/01 00:00:00'), endTime: formtStamp('2022/12/12 23:59:59') }
];

function formtStamp(time) {
    return new Date(time).getTime();
}

const list1 = [
    {
        title: '考研考博',
        // coupon: '<span>11.11预售提前开抢</span>',
        coupon: '惊喜秒杀 全场直降',
        flag: '',
        couponUrl: '//www.koolearn.com/ke/kaoyan3/',
        links: [
            { name: '23考研', url: '//www.koolearn.com/ke/kaoyan/' },
            { name: '24考研', url: '//www.koolearn.com/ke/kaoyan3/', hot: true },
            { name: '伴学抢跑全程班', url: '//www.koolearn.com/ke/kaoyan3/#jumppageid=1674', hot: true },
            { name: '零基础起步直通车', url: '//www.koolearn.com/ke/kaoyan3/#jumppageid=1674', hot: true },
            { name: '专业课', url: '//www.koolearn.com/ke/kaoyan3/#jumppageid=1631' },
            { name: '管综', url: '//www.koolearn.com/ke/kaoyan3/#jumppageid=1627' },
            { name: '无忧计划', url: '//www.koolearn.com/ke/kaoyan3/#jumppageid=1674', hot: true },
            { name: '在职考研', url: '//kaoyan.koolearn.com/zhuanti/0117zzky_pc/', hot: true }
        ]
    },
    {
        title: '国内考试',
        // coupon: '<span >11.11抢神券</span>',
        coupon: '限时抄底 好礼频出',
        flag: '',
        couponUrl: '//cet4.koolearn.com/zhuanti/cet/',
        links: [
            { name: '四级', url: '//cet4.koolearn.com/zhuanti/cet/?from=shouye_ce4', hot: true },
            { name: '六级', url: '//cet4.koolearn.com/zhuanti/cet/?from=shouye_ce6', hot: true },
            { name: '新概念英语', url: '//www.koolearn.com/ke/xingainian/', hot: true },
            { name: '初级会计', url: '//caikuai.koolearn.com/zhuanti/caikuaipc/', hot: true },
            { name: 'CPA', url: '//caikuai.koolearn.com/zhuanti/caikuaipc/', hot: true },
            { name: '教师资格证', url: 'https://jiaoshi.koolearn.com/zhuanti/jiaoshi/?pc_hash=vEnA9X', hot: true },
            { name: 'CATTI', url: '//www.koolearn.com/ke/fanyi' },
            { name: '专四专八', url: '//www.koolearn.com/ke/tem', hot: true },
            { name: '专升本', url: '//www.koolearn.com/ke/shengben/', hot: true },
            { name: '同等学力', url: '//www.koolearn.com/ke/sameedu', hot: true },
            { name: '考博', url: '//www.koolearn.com/ke/kaobo/', hot: true }
        ]
    },
    {
        title: '英联邦留学',
        // coupon: '<span>11.11预先放价</span><span>英联邦好课88折</span>',
        coupon: '钜惠提前享',
        flag: '',
        couponUrl: '//www.koolearn.com/ke/ielts/?scene=CG_hlwcp_hdzt_34549',
        links: [
            { name: '雅思', url: '//www.koolearn.com/ke/ielts/?scene=CG_gw_qt_91917', hot: true },
            { name: '雅思1对1', url: '//www.koolearn.com/ke/ielts/?catalogId=1723#nav4&scene=CG_hlwcp_hdzt_39790' },
            { name: 'A Level', url: '//www.koolearn.com/ke/alevel/?scene=CG_hlwcp_hdzt_39090', hot: true },
            { name: 'IGCSE', url: '//www.koolearn.com/ke/alevel/?catalogId=1914&scene=CG_hlwcp_hdzt_86961' },
            { name: 'BEC商务英语', url: '//www.koolearn.com/ke/bec?scene=CG_hlwcp_hdzt_08001', hot: true },
            { name: 'PTE', url: '//ielts.koolearn.com/zhuanti/pte/?scene=CG_hlwcp_hdzt_33543' },
            // { name: '国际竞赛', url: '//www.koolearn.com/zhuanti/jingsai_beimei_pc/', hot: true },
            { name: '剑桥国际英语', url: '//www.koolearn.com/zhuanti/interchange_pc/?scene=CG_hlwcp_hdzt_61602', hot: true }
        ]
    },
    {
        title: '北美留学',
        // coupon: '<span >11.11预热</span><span>托福付定享钜惠</span>',
        coupon: '盛惠优先购',
        flag: '',
        couponUrl: '//www.koolearn.com/ke/toefl?scene=CG_hlwcp_hdzt_14299',
        links: [
            { name: '大学生托福', url: '//www.koolearn.com/ke/toefl?scene=CG_hlwcp_hdzt_14299', hot: true },
            { name: '中学生托福', url: '//www.koolearn.com/ke/toefl_zx/?catalogId=1772&scene=CG_hlwcp_hdzt_06124' },
            { name: '托福1对1', url: '//www.koolearn.com/ke/toefl/?catalogId=1682&scene=CG_hlwcp_hdzt_05380' },
            { name: 'GRE', url: '//www.koolearn.com/ke/gre/?scene=CG_hlwcp_hdzt_11930', hot: true },
            { name: 'GMAT', url: '//www.koolearn.com/ke/gmat/?scene=CG_hlwcp_hdzt_48338' },
            { name: 'SAT', url: '//www.koolearn.com/ke/sat/?scene=CG_hlwcp_hdzt_66105', hot: true },
            { name: '小托福', url: '//www.koolearn.com/ke/toefl_zx/?catalogId=1836#tab5&scene=CG_hlwcp_hdzt_02500', hot: true },
            { name: 'AP', url: '//www.koolearn.com/ke/sat/?catalogId=1902&scene=CG_hlwcp_hdzt_99197' },
            { name: 'ACT', url: '//www.koolearn.com/ke/sat/?catalogId=1897&scene=CG_hlwcp_hdzt_13389' },
            { name: '多邻国', url: '//www.koolearn.com/zhuanti/duolingo/?scene=CG_hlwcp_hdzt_55805' },
            { name: '托业', url: '//www.koolearn.com/zhuanti/toeic_pc?scene=CG_hlwcp_hdzt_78461' },
            { name: 'SSAT', url: '//www.koolearn.com/ke/sat/?catalogId=1906#tab4&scene=CG_hlwcp_hdzt_90885' }
        ]
    },
    {
        title: '英语学习',
        // coupon: '<span >11.11预售提前开抢</span>',
        coupon: '12.12 "折"学盛典',
        flag: '',
        couponUrl: '//www.koolearn.com/ke/xingainian/',
        links: [
            { name: '新概念英语', url: '//www.koolearn.com/ke/xingainian/', hot: true },
            { name: '零基础入门', url: '//www.koolearn.com/ke/xingainian/' },
            { name: '流利听说', url: '//english.koolearn.com/zhuanti/english_test/', hot: true },
            { name: '词汇语法', url: '//english.koolearn.com/zhuanti/english_test/' },
            { name: '语音重塑', url: '//english.koolearn.com/zhuanti/english_test/' },
            { name: '口语', url: '//english.koolearn.com/zhuanti/english_test/' },
            { name: '英语1对1', url: '//www.koolearn.com/ke/xingainian/' },
            { name: '专四专八', url: '//www.koolearn.com/ke/tem', hot: true }
        ]
    },
    {
        title: '小语种',
        // coupon: '<span >决战11.11  多语大狂欢</span>',
        coupon: '12.12狂欢不打烊 多语好课High学不停',
        flag: '',
        couponUrl: 'https://koolearn.com/oyzhuanti/sy/?=freepb18',
        links: [
            { name: '日语能力考', url: '//www.koolearn.com/ke/jp?=freepb1', hot: true },
            { name: '日语完全教程', url: '//www.koolearn.com/ke/jp?=freepb2', hot: true },
            { name: '韩语TOPIK', url: '//www.koolearn.com/ke/kr/?=freepb3', hot: true },
            { name: '德语考试班', url: '//www.koolearn.com/ke/de?=freepb4', hot: true },
            { name: '法语全阶段', url: '//www.koolearn.com/ke/french?=freepb5' },
            { name: '西语全阶段', url: '//www.koolearn.com/ke/xy?=freepb6' },
            { name: '意语直播班', url: 'https://daxue.koolearn.com/query?keyword=意大利语?=freepb7' },
            { name: '俄语直播班', url: 'https://daxue.koolearn.com/query?keyword=俄语?=freepb8' }
        ]
    }
];

const list2 = [
    {
        title: '考研考博',
        // coupon: '<span>全年最美价8折</span>',
        coupon: '秒杀+好礼 惊喜加倍',
        flag: '',
        couponUrl: '//www.koolearn.com/ke/kaoyan3/',
        links: [
            { name: '23考研', url: '//www.koolearn.com/ke/kaoyan/' },
            { name: '24考研', url: '//www.koolearn.com/ke/kaoyan3/', hot: true },
            { name: '伴学抢跑全程班', url: '//www.koolearn.com/ke/kaoyan3/#jumppageid=1674', hot: true },
            { name: '零基础起步直通车', url: '//www.koolearn.com/ke/kaoyan3/#jumppageid=1674', hot: true },
            { name: '专业课', url: '//www.koolearn.com/ke/kaoyan3/#jumppageid=1631' },
            { name: '管综', url: '//www.koolearn.com/ke/kaoyan3/#jumppageid=1627' },
            { name: '无忧计划', url: '//www.koolearn.com/ke/kaoyan3/#jumppageid=1674', hot: true },
            { name: '在职考研', url: '//kaoyan.koolearn.com/zhuanti/0117zzky_pc/', hot: true }
        ]
    },
    {
        title: '国内考试',
        // coupon: '<span >11.11抢神券</span>',
        coupon: '限时抄底 好礼频出',
        flag: '',
        couponUrl: '//cet4.koolearn.com/zhuanti/cet/',
        links: [
            { name: '四级', url: '//cet4.koolearn.com/zhuanti/cet/?from=shouye_ce4', hot: true },
            { name: '六级', url: '//cet4.koolearn.com/zhuanti/cet/?from=shouye_ce6', hot: true },
            { name: '新概念英语', url: '//www.koolearn.com/ke/xingainian/', hot: true },
            { name: '初级会计', url: '//caikuai.koolearn.com/zhuanti/caikuaipc/', hot: true },
            { name: 'CPA', url: '//caikuai.koolearn.com/zhuanti/caikuaipc/', hot: true },
            { name: '教师资格证', url: 'https://jiaoshi.koolearn.com/zhuanti/jiaoshi/?pc_hash=vEnA9X', hot: true },
            { name: 'CATTI', url: '//www.koolearn.com/ke/fanyi' },
            { name: '专四专八', url: '//www.koolearn.com/ke/tem', hot: true },
            { name: '专升本', url: '//www.koolearn.com/ke/shengben/', hot: true },
            { name: '同等学力', url: '//www.koolearn.com/ke/sameedu', hot: true },
            { name: '考博', url: '//www.koolearn.com/ke/kaobo/', hot: true }
        ]
    },
    {
        title: '英联邦留学',
        // coupon: '<span>11.11“课”不容缓</span><span>好课双倍惠</span>',
        coupon: '英联邦86折超值购',
        flag: '',
        couponUrl: '//www.koolearn.com/ke/ielts/?scene=CG_hlwcp_hdzt_34549',
        links: [
            { name: '雅思', url: '//www.koolearn.com/ke/ielts/?scene=CG_gw_qt_91917', hot: true },
            { name: '雅思1对1', url: '//www.koolearn.com/ke/ielts/?catalogId=1723#nav4&scene=CG_hlwcp_hdzt_39790' },
            { name: 'A Level', url: '//www.koolearn.com/ke/alevel/?scene=CG_hlwcp_hdzt_39090', hot: true },
            { name: 'IGCSE', url: '//www.koolearn.com/ke/alevel/?catalogId=1914&scene=CG_hlwcp_hdzt_86961' },
            { name: 'BEC商务英语', url: '//www.koolearn.com/ke/bec?scene=CG_hlwcp_hdzt_08001', hot: true },
            { name: 'PTE', url: '//ielts.koolearn.com/zhuanti/pte/?scene=CG_hlwcp_hdzt_33543' },
            // { name: '国际竞赛', url: '//www.koolearn.com/zhuanti/jingsai_beimei_pc/', hot: true },
            { name: '剑桥国际英语', url: '//www.koolearn.com/zhuanti/interchange_pc/?scene=CG_hlwcp_hdzt_61602', hot: true }
        ]
    },
    {
        title: '北美留学',
        // coupon: '<span >11.11学习狂欢节</span><span>特“惠”买</span>',
        coupon: '托福86折“惠”学到底',
        flag: '',
        couponUrl: '//www.koolearn.com/ke/toefl?scene=CG_hlwcp_hdzt_14299',
        links: [
            { name: '大学生托福', url: '//www.koolearn.com/ke/toefl?scene=CG_hlwcp_hdzt_14299', hot: true },
            { name: '中学生托福', url: '//www.koolearn.com/ke/toefl_zx/?catalogId=1772&scene=CG_hlwcp_hdzt_06124' },
            { name: '托福1对1', url: '//www.koolearn.com/ke/toefl/?catalogId=1682&scene=CG_hlwcp_hdzt_05380' },
            { name: 'GRE', url: '//www.koolearn.com/ke/gre/?scene=CG_hlwcp_hdzt_11930', hot: true },
            { name: 'GMAT', url: '//www.koolearn.com/ke/gmat/?scene=CG_hlwcp_hdzt_48338' },
            { name: 'SAT', url: '//www.koolearn.com/ke/sat/?scene=CG_hlwcp_hdzt_66105', hot: true },
            { name: '小托福', url: '//www.koolearn.com/ke/toefl_zx/?catalogId=1836#tab5&scene=CG_hlwcp_hdzt_02500', hot: true },
            { name: 'AP', url: '//www.koolearn.com/ke/sat/?catalogId=1902&scene=CG_hlwcp_hdzt_99197' },
            { name: 'ACT', url: '//www.koolearn.com/ke/sat/?catalogId=1897&scene=CG_hlwcp_hdzt_13389' },
            { name: '多邻国', url: '//www.koolearn.com/zhuanti/duolingo/?scene=CG_hlwcp_hdzt_55805' },
            { name: '托业', url: '//www.koolearn.com/zhuanti/toeic_pc?scene=CG_hlwcp_hdzt_78461' },
            { name: 'SSAT', url: '//www.koolearn.com/ke/sat/?catalogId=1906#tab4&scene=CG_hlwcp_hdzt_90885' }
        ]
    },
    {
        title: '英语学习',
        // coupon: '<span >抄底好课</span>',
        coupon: '12.12 "折"学盛典',
        flag: '',
        couponUrl: '//www.koolearn.com/ke/xingainian/',
        links: [
            { name: '新概念英语', url: '//www.koolearn.com/ke/xingainian/', hot: true },
            { name: '零基础入门', url: '//www.koolearn.com/ke/xingainian/' },
            { name: '流利听说', url: '//english.koolearn.com/zhuanti/english_test/', hot: true },
            { name: '词汇语法', url: '//english.koolearn.com/zhuanti/english_test/' },
            { name: '语音重塑', url: '//english.koolearn.com/zhuanti/english_test/' },
            { name: '口语', url: '//english.koolearn.com/zhuanti/english_test/' },
            { name: '英语1对1', url: '//www.koolearn.com/ke/xingainian/' },
            { name: '专四专八', url: '//www.koolearn.com/ke/tem', hot: true }
        ]
    },
    {
        title: '小语种',
        // coupon: '<span >决战11.11  多语大狂欢</span>',
        coupon: '多语低价学',
        flag: '',
        couponUrl: 'https://koolearn.com/oyzhuanti/sy/?=freepb18',
        links: [
            { name: '日语能力考', url: '//www.koolearn.com/ke/jp?=freepb1', hot: true },
            { name: '日语完全教程', url: '//www.koolearn.com/ke/jp?=freepb2', hot: true },
            { name: '韩语TOPIK', url: '//www.koolearn.com/ke/kr/?=freepb3', hot: true },
            { name: '德语考试班', url: '//www.koolearn.com/ke/de?=freepb4', hot: true },
            { name: '法语全阶段', url: '//www.koolearn.com/ke/french?=freepb5' },
            { name: '西语全阶段', url: '//www.koolearn.com/ke/xy?=freepb6' },
            { name: '意语直播班', url: 'https://daxue.koolearn.com/query?keyword=意大利语?=freepb7' },
            { name: '俄语直播班', url: 'https://daxue.koolearn.com/query?keyword=俄语?=freepb8' }
        ]
    }
];

export const lists = [list1, list2];

const rules1 = `
<span>出国考试 12.12年终盛典活动</span><br />
① 早班车活动时间：11月25日-11月30日。<br />
② 出国部分课程参与“折扣直减”活动，享受班课产品&直通车&班课联报1对1类产品最低可享88折，纯一对一产品92折。其中雅思、托福、美研、美本满4000元以上班课或满40小时一对一课程可享优惠券，详情咨询在线客服。<br />
<br />
<span>国内考试 12.12年终盛典活动</span><br />
<span>一、定金膨胀活动</span><br />
① 活动时间：11月25日-11月30日。<br />
② 定金膨胀适用于考研品线。<br />
③ 膨胀金预付5元抵50元，实付满1000元可用。<br />
④ 膨胀金用于单笔订单抵现，购买和使用有效期为11月25日-11月30日，每个账户仅限预付膨胀金一次，同一笔订单仅限选择一个膨胀金抵现，多个膨胀金无法叠加使用。<br />
⑤ 11月30日后已购未使用的膨胀金，将按照预付金额自动退还到原支付账户。<br />
⑥ 使用膨胀金购课后若发生退课，仅退还课程费用和定金，膨胀金不予退还。<br />
<br />
<span>二、秒杀好课活动</span><br />
① 活动时间：2022年11月25日-2022年11月30日<br />
② 活动期间，全天均可参与秒杀；开放秒杀课程为24考研英语直通车、24考研英语全程班和24考研政治全程班。<br />
③ 购买与退换：每个秒杀课程，每个用户仅可购买一次；不同课程类型退换规则不同，详情退规换则可查看对应课程详情页。<br />
<br />
<span>三、满赠随单礼</span><br />
实付金额满足对应订单金额即可获得相应礼品，一个用户仅可获得一份礼品不可叠加（图片仅供参考，颜色、型号以实物为准），收货地址会于活动结束后短信收集，礼品会于1月16日前发货，由于疫情原因个别地区物流会受影响敬请谅解<br />
<br />
<span>· 注意事项</span><br />
① 在参与活动过程中，如果用户出现违规行为（如作弊购买、恶意套现、虚假交易等），将取消违规用户的获取资格，并有权撤销违规交易，收回参与活动获得的全部优惠券（如涉及、含已使用的及未使用的），必要时追究法律责任。<br />
② 如出现不可抗力或情势变更的情况（包括但不限与重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），则活动方可依相关法律法规的规定主张免责。<br />
③ 活动方可根据活动举办的实际情况，在法律允许的范围内，对本活动说明进行变动或调整，相关变动或调整将分布在活动页面上。<br />
④ 本次活动最终解释权归新东方在线所有。
`;

const rules2 = `
<span>出国考试 12.12年终盛典活动</span><br />
① 活动正式期：12月1日-12月12日。<br />
② 出国部分课程参与“折扣直减”活动。享受班课产品&直通车&班课联报1对1类产品最低可享86折，纯一对一产品9折。其中雅思、托福、美研、美本满4000元以上班课或满40小时一对一课程可享优惠券，详情咨询在线客服。<br />
<br />
<span>国内考试 12.12年终盛典活动</span><br />
<span>一、定金膨胀活动</span><br />
① 活动时间：12月1日-12月12日。<br />
② 定金膨胀适用于考研品线。<br />
③ 膨胀金活动机制：<br />
12月1日-12月4日，膨胀金预付5元抵50元，实付满1000元可用（购买和使用有效期为12月1日-12月4日）；<br />
12月5日-12月8日，膨胀金预付5元抵30元，实付满1000元可用（购买和使用有效期为12月5日-12月8日）；<br />
12月9日-12月12日，膨胀金预付5元抵20元，实付满1000元可用（购买和使用有效期为12月9日-12月13日）。<br />
④ 膨胀金用于单笔订单抵现，每个账户仅限预付膨胀金一次，同一笔订单仅限选择一个膨胀金抵现，多个膨胀金无法叠加使用。<br />
⑤ 12月13日后已购未使用的膨胀金，将按照预付金额自动退还到原支付账户。<br />
⑥ 使用膨胀金购课后若发生退课，仅退还课程费用和定金，膨胀金不予退还。<br />
<br />
<span>二、秒杀好课活动：</span><br />
① 活动时间：2022年12月1日-2022年12月12日<br />
② 活动期间，全天均可参与秒杀；开放秒杀课程为24考研英语直通车、24考研英语全程班和24考研政治全程班。<br />
③ 购买与退换：每个秒杀课程，每个用户仅可购买一次；不同课程类型退换规则不同，详情退规换则可查看对应课程详情页。<br />
<br />
<span>三、满赠随单礼</span><br />
实付金额满足对应订单金额即可获得相应礼品，一个用户仅可获得一份礼品不可叠加（图片仅供参考，颜色、型号以实物为准），收货地址会于活动结束后短信收集，礼品会于1月16日前发货，由于疫情原因个别地区物流会受影响敬请谅解<br />
<br />
<span>· 注意事项<span><br />
① 在参与活动过程中，如果用户出现违规行为（如作弊购买、恶意套现、虚假交易等），将取消违规用户的获取资格，并有权撤销违规交易，收回参与活动获得的全部优惠券（如涉及、含已使用的及未使用的），必要时追究法律责任。<br />
② 如出现不可抗力或情势变更的情况（包括但不限与重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），则活动方可依相关法律法规的规定主张免责。<br />
③ 活动方可根据活动举办的实际情况，在法律允许的范围内，对本活动说明进行变动或调整，相关变动或调整将分布在活动页面上。<br />
④ 本次活动最终解释权归新东方在线所有。
`;

export const rules = [rules1, rules2];
