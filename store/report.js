import axios from 'axios'
import moment from 'moment'

export const state = {
    datasource: {
        // ------------------------------
        // 全局数据部分
        // ------------------------------
        currentAndLastMonthSaleAmount: { // 月度销售额度
            current: [],
            past: [],
            totalAmount: {
                current: 0,
                past: 0
            }
        },
        currentAndLastYearSaleAmount: { // 年度销售额度
            current: [],
            past: [],
            totalAmount: {
                current: 0,
                past: 0
            }
        },
        newAndOldMembers: {
            new: [],
            old: []
        },
        newMembersByYear: {
            current: [],
            past: []
        },
        currentMonthMemberLevel: [],
        top20BrandsSale: {
            current: [],
            past: []
        },
        top20OutletSale: [],
        currentTotalAmount: 0,
        // ------------------------------
        // 单店数据部分
        // ------------------------------
        currentAndLastYearSaleAmountByOutlet: {
            current: [],
            past: []
        },
        currentAndLastMonthSaleAmountByOutlet: {
            current: [],
            past: []
        },
        newMembersByYearAndOutlet: {
            current: [],
            past: []
        },
        newAndOldMembersByOutlet: {
            new: [],
            old: []
        },
        currentMonthMemberLevelByOutlet: [],
        top20BrandsSaleByOutlet: [],
        // ------------------------------
        // 单人数据部分
        // ------------------------------
        currentAndLastYearSaleAmountByEmp: {
            current: [],
            past: []
        },
        currentAndLastMonthSaleAmountByEmp: {
            current: [],
            past: []
        },
        newMembersByYearAndEmp: {
            current: [],
            past: []
        },
        newAndOldMembersByEmp: {
            new: [],
            old: []
        },
        currentMonthMemberLevelByEmp: [],
        top20BrandsSaleByEmp: [],
        top20GoodsSaleByEmp: [],
        currentAndLastMonthSaleTaskProcessByEmp: {
            current: [],
            past: []
        },
        memberFeatureBySex: [],
        memberFeatureByAge: [],
        memberFeatureByMoney: [],
        memberFeatureByActive: [],
        memberFeatureByTime: [],
        memberReBuy: [],
        sexDetail: [],
        rebuygoods: [],
        rebuytype: [],
        rebuybrand: [],
        memberTotal: [],
        todayNewMember: [],
        monthNewMember: [],
        newMemberStore: [],
        newMemberGuide: [],
        guideDetail: [],
        guideSeries: [],
        saleGuideSeries: [],
        expenseAxis: [],
        singleMoney: [],
        exTime: [],
        transform: [],
        currentMonth: [],
        currentMonthChart: [],
        monthNewTotal: [],
        monthNewDetail: [],
        saleTotal: [],
        saleTotalStore: [],
        saleTotalDim: [],
        saleDimension: [],
        saleDimCompare: [],
        saleDimStore: [],
        saleDimGuide: [],
        saleOrder: [],
        orderAvgamount: [],
        saleOrderGuide: [],
        saleOrderDim: [],
        saleTimes: [],
        saleTimeDim: [],
        operaMain: [],
        operaGuide: [],
        operaDealNum: [],
        operaDealTimes: [],
        operaDealPrice: [],
        memberGeo: [],
        mebmerAxis: [],
        storeList: [],
        guideList: [],
        // 大屏数据中心
        screenSaleroom: [],
        screenSalesingle: [],
        screenRelated: [],
        screenBrand: [],
        topTen: [],
        // tenBynumber: [],
        // tenBymember: [],
        screenTodaySale: [],
        screenTodayTarget: [],
        screenHourSale: [],
        screenSevenSale: [],
        screenSaleSpread: [],
        screenNewtarget: null,
        screenMemberconsum: []
    }
}

export const mutations = {
    setCurrentTotalAmount(state, datas) {
        // state.datasource.currentTotalAmount = datas[0].tot_price
    },
    setCurrentAndLastMonthSaleAmount(state, datas) {
        const currentMonth = parseInt(moment().format('M'), 10)
        const currents = []
        const past = []
            // let currentTotalAmount = 0
        let pastTotalAmount = 0
        datas.forEach((data) => {
            if (data.hemiao_month === currentMonth) {
                currents.push(data)
                    // currentTotalAmount += data.day_price
            } else {
                past.push(data)
                pastTotalAmount += data.day_price
            }
        })
        state.datasource.currentAndLastMonthSaleAmount.current = currents
        state.datasource.currentAndLastMonthSaleAmount.past = past
            // state.datasource.currentAndLastMonthSaleAmount.totalAmount.current = currentTotalAmount
        state.datasource.currentAndLastMonthSaleAmount.totalAmount.past = pastTotalAmount
    },
    setCurrentAndLastYearSaleAmount(state, datas) {
        const currentYear = moment().format('YYYY')
        const currents = []
        const past = []
            // let currentTotalAmount = 0
        let pastTotalAmount = 0
        datas.forEach((data) => {
            if (data.hemiao_year === currentYear) {
                currents.push(data)
                    // currentTotalAmount += data.hemiao_amount
            } else {
                past.push(data)
                pastTotalAmount += data.hemiao_amount
            }
        })
        state.datasource.currentAndLastYearSaleAmount.current = currents
        state.datasource.currentAndLastYearSaleAmount.past = past
            // state.datasource.currentAndLastYearSaleAmount.totalAmount.current = currentTotalAmount
        state.datasource.currentAndLastYearSaleAmount.totalAmount.past = pastTotalAmount
    },
    setCurrentAndLastYearMemberCounts(state, datas) {
        const currentYear = moment().format('YYYY')
        const currents = []
        const past = []
        datas.forEach((data) => {
            if (data.hemiao_year === currentYear) {
                currents.push(data)
            } else {
                past.push(data)
            }
        })
        state.datasource.newMembersByYear.current = currents
        state.datasource.newMembersByYear.past = past
    },
    setOldAndNewMemberCounts(state, datas) {
        const newMembers = []
        const oldMembers = []
        datas.forEach((data) => {
            if (data.operation === 'Count_Member_New') {
                newMembers.push(data)
            } else {
                oldMembers.push(data)
            }
        })
        state.datasource.newAndOldMembers.new = newMembers
        state.datasource.newAndOldMembers.old = oldMembers
    },
    setOldAndNewMemberCountsByOutlet(state, datas) {
        const newMembers = []
        const oldMembers = []
        datas.forEach((data) => {
            if (data.operation === 'Count_Member_New') {
                newMembers.push(data)
            } else {
                oldMembers.push(data)
            }
        })
        state.datasource.newAndOldMembersByOutlet.new = newMembers
        state.datasource.newAndOldMembersByOutlet.old = oldMembers
    },
    setTop20BrandsSales(state, datas) {
        const currentMonth = moment().format('M')
        const currents = []
        const past = []
        datas.forEach((data) => {
            if (data.hemiao_month === currentMonth) {
                currents.push(data)
            } else {
                past.push(data)
            }
        })
        state.datasource.top20BrandsSale.current = currents
        state.datasource.top20BrandsSale.past = past
    },
    setTop20OutletsSales(state, datas) {
        state.datasource.top20OutletSale = datas
    },
    setCurrentMonthMemberLevel(state, datas) {
        state.datasource.currentMonthMemberLevel = datas
    },
    setCurrentAndLastYearSaleAmountByOutlet(state, datas) {
        const currentYear = moment().format('YYYY')
        const currents = []
        const past = []
        datas.forEach((data) => {
            if (data.hemiao_year === currentYear) {
                currents.push(data)
            } else {
                past.push(data)
            }
        })
        state.datasource.currentAndLastYearSaleAmountByOutlet.current = currents
        state.datasource.currentAndLastYearSaleAmountByOutlet.past = past
    },
    setCurrentAndLastMonthSaleAmountByOutlet(state, datas) {
        const currentMonth = moment().format('M')
        const currents = []
        const past = []
        datas.forEach((data) => {
            // console.log(currentMonth)
            if (data.hemiao_month === currentMonth) {
                currents.push(data)
            } else {
                past.push(data)
            }
        })
        state.datasource.currentAndLastMonthSaleAmountByOutlet.current = currents
        state.datasource.currentAndLastMonthSaleAmountByOutlet.past = past
    },
    setNewMembersByYearAndOutlet(state, datas) {
        const currentYear = moment().format('YYYY')
        const currents = []
        const past = []
        datas.forEach((data) => {
            if (data.hemiao_year === currentYear) {
                currents.push(data)
            } else {
                past.push(data)
            }
        })
        state.datasource.newMembersByYearAndOutlet.current = currents
        state.datasource.newMembersByYearAndOutlet.past = past
    },
    setTop20BrandsSalesByOutlet(state, datas) {
        state.datasource.top20BrandsSaleByOutlet = datas
    },
    setCurrentMonthMemberLevelByOutlet(state, datas) {
        state.datasource.currentMonthMemberLevelByOutlet = datas
    },
    setCurrentAndLastMonthSaleAmountByEmp(state, datas) {
        const currentMonth = moment().format('M')
        const currents = []
        const past = []
        datas.forEach((data) => {
            if (data.hemiao_month === currentMonth) {
                currents.push(data)
            } else {
                past.push(data)
            }
        })
        state.datasource.currentAndLastMonthSaleAmountByEmp.current = currents
        state.datasource.currentAndLastMonthSaleAmountByEmp.past = past
    },
    setNewMembersByYearAndEmp(state, datas) {
        const currentYear = moment().format('YYYY')
        const currents = []
        const past = []
        datas.forEach((data) => {
            if (data.hemiao_year === currentYear) {
                currents.push(data)
            } else {
                past.push(data)
            }
        })
        state.datasource.newMembersByYearAndEmp.current = currents
        state.datasource.newMembersByYearAndEmp.past = past
    },
    setCurrentAndLastMonthSaleTaskProcessByEmp(state, datas) {
        const currentYear = moment().format('YYYY')
        const currents = []
        const past = []
        datas.forEach((data) => {
            if (data.hemiao_year === currentYear) {
                currents.push(data)
            } else {
                past.push(data)
            }
        })
        state.datasource.currentAndLastMonthSaleTaskProcessByEmp.current = currents
        state.datasource.currentAndLastMonthSaleTaskProcessByEmp.past = past
    },
    setOldAndNewMemberCountsByEmp(state, datas) {
        const newMembers = []
        const oldMembers = []
        datas.forEach((data) => {
            if (data.operation === 'Count_Member_New') {
                newMembers.push(data)
            } else {
                oldMembers.push(data)
            }
        })
        state.datasource.newAndOldMembersByEmp.new = newMembers
        state.datasource.newAndOldMembersByEmp.old = oldMembers
    },
    setCurrentMonthMemberLevelByEmp(state, datas) {
        state.datasource.currentMonthMemberLevelByEmp = datas
    },
    setTop20BrandsSalesByEmp(state, datas) {
        state.datasource.top20BrandsSaleByEmp = datas
    },
    setTop20GoodsSalesByEmp(state, datas) {
        state.datasource.top20GoodsSaleByEmp = datas
    },

    //每月新增会员
    setMonthNewMember(state, datas) {
        state.datasource.monthNewMember = datas
    },
    //门店新增会员
    setNewMemberByStore(state, datas) {
        state.datasource.newMemberStore = datas
    },

    //导购新增会员
    setNewMemberGuide(state, datas) {
        state.datasource.newMemberGuide = datas
    },
    setTodayNewMember(state, datas) {
        state.datasource.todayNewMember = datas
    },

    setAxis(state, datas) {
        state.datasource.expenseAxis = datas;
    },
    setGuideDetail(state, datas) {
        state.datasource.guideDetail = datas;
    },

    setGuideSeries(state, datas) {
        state.datasource.guideSeries = datas;
    },
    setSaleGuideSeries(state, datas) {
        state.datasource.saleGuideSeries = datas;
    },

    setSingle(state, datas) {
        state.datasource.singleMoney = datas;
    },
    setTime(state, datas) {
        state.datasource.exTime = datas;
    },
    setTransform(state, datas) {
        state.datasource.transform = datas;
    },
    // setTransDetail(state, datas) {
    //     state.datasource.transDetail = datas;
    // },
    getMemberFeatureAll(state, datas) {
        datas.forEach((data) => {
            switch (data.hemiao_type) {
                case 'F1':
                    state.datasource.memberFeatureBySex.push(data)
                    break;
                case 'F2':
                    state.datasource.memberFeatureByAge.push(data)
                    break;
                case 'F3':
                    state.datasource.memberFeatureByMoney.push(data)
                    break;
                case 'F5':
                    state.datasource.memberFeatureByActive.push(data)
                    break;
                case 'F4':
                    state.datasource.memberFeatureByTime.push(data)
                    break;
                default:

            }
        })
    },
    getMemberRebuy(state, datas) {
        state.datasource.memberReBuy = datas;
    },
    setRebuyGoods(state, datas) {
        state.datasource.rebuygoods = datas;
    },
    setRebuyType(state, datas) {
        state.datasource.rebuytype = datas;
    },
    setRebuyBrand(state, datas) {
        state.datasource.rebuybrand = datas;
    },
    getsexDetail(state, datas) {
        state.datasource.sexDetail = datas;
    },
    getTotal(state, datas) {
        state.datasource.memberTotal = datas;
    },
    setCurrentMonth(state, datas) {
        state.datasource.currentMonth = datas;
    },
    setMonthChart(state, datas) {
        state.datasource.currentMonthChart = datas;
    },
    setMonthNew(state, datas) {
        state.datasource.monthNewTotal = datas;
    },
    setMonthNewDetail(state, datas) {
        state.datasource.monthNewDetail = datas;
    },
    //销售统计分析
    setSaleOrder(state, datas) {
        state.datasource.saleOrder = datas;
    },
    //客户订单分析-平均客单价-Avgamount
    setOrderAvgamount(state, datas) {
        state.datasource.orderAvgamount = datas;
    },
    //客户订单分析-平均客单价-导购数据
    setSaleOrderGuide(state, datas) {
        state.datasource.saleOrderGuide = datas;
    },
    //总销售数据分析
    setSaleTotal(state, datas) {
        state.datasource.saleTotal = datas;
    },
    //总销售数据对比
    setSaleTotalDim(state, datas) {
        state.datasource.saleTotalDim = datas;
    },
    //总销售数据门店详情
    setSaleTotalStore(state, datas) {
        state.datasource.saleTotalStore = datas;
    },
    //多维度销售数据
    setSaleDimension(state, datas) {
        state.datasource.saleDimension = datas;
    },
    //多维度对比数据
    setSaleDimCompare(state, datas) {
        state.datasource.saleDimCompare = datas;
    },
    //多维度销售数据-门店
    setSaleDimStore(state, datas) {
        state.datasource.saleDimStore = datas;
    },
    setSaleDimGuide(state, datas) {
        state.datasource.saleDimGuide = datas;
    },
    //销售对比数据
    setSaleOrderDim(state, datas) {
        state.datasource.saleOrderDim = datas;
    },
    setStoreList(state, datas) {
        state.datasource.storeList = datas;
    },
    setGuideList(state, datas) {
        state.datasource.guideList = datas;
    },
    //销售消费次数
    setSaleTimes(state, datas) {
        state.datasource.saleTimes = datas;
    },
    setSaleTimeDim(state, datas) {
        state.datasource.saleTimeDim = datas;
    },
    //运营统计分析，首页
    setOperaMain(state, datas) {
        state.datasource.operaMain = datas;
    },
    setOperaGuide(state, datas) {
        state.datasource.operaGuide = datas;
    },
    //维护交易购买人数
    setOperaDealNum(state, datas) {
        state.datasource.operaDealNum = datas;
    },
    setOperaDealTimes(state, datas) {
        state.datasource.operaDealTimes = datas;
    },
    //维护交易购买单价
    setOperaDealPrice(state, datas) {
        state.datasource.operaDealPrice = datas;
    },
    //会员地理分布
    setMemberGeo(state, datas) {
        state.datasource.memberGeo = datas;
    },
    //会员生理轴分布
    setMemberAxis(state, datas) {
        state.datasource.mebmerAxis = datas;
    },
    // 大屏数据中心
    setScreenSaleRoom(state, datas) {
        const data = [];
        datas.forEach(e => {
            data.push(e['amount'] ? e['amount'].toFixed(2) : 0)
        })
        data.unshift('销售额');
        state.datasource.screenSaleroom = data;
    },
    setScreenSaleSingle(state, datas) {
        const data = [];
        datas.forEach(e => {
            e['kedanjia'] ? data.push(e['kedanjia'].toFixed(2)) : data.push(0)
        })
        data.unshift('客单价');
        state.datasource.screenSalesingle = data;
    },
    setScreenRelated(state, datas) {
        const data = [];
        datas.forEach(e => {
            e['apr'] ? data.push(e['apr']) : data.push(0);
        })
        data.unshift('连带率');
        state.datasource.screenRelated = data;
    },
    setScreenBrand(state, datas) {
        const data = [];
        datas.forEach(e => {
            data.push({
                value: e['amount'],
                name: e['top_category_offline_name'] ? e['top_category_offline_name'] : '未知'
            })
        })
        state.datasource.screenBrand = data;
    },
    setTopTen(state, datas) {
        const data = [];
        datas.forEach((e, i) => {
            data.push({
                index: i + 1,
                brandName: e['offline_name'],
                saleroom: e['amount'],
                salevolume: e['num'],
                member: e['user_num']
            })
        });
        state.datasource.topTen = data;
    },
    setTenBynumber(state, datas) {
        const data = [];
        datas.forEach((e, i) => {
            data.push({
                index: i + 1,
                brandName: e['offline_name'],
                saleroom: e['amount'] ? e['amount'].toFixed(2) : 0,
                salevolume: e['num'],
                member: e['user_num']
            })
        });
        state.datasource.tenBynumber = data;
    },
    setTenBymember(state, datas) {
        const data = [];
        datas.forEach((e, i) => {
            data.push({
                index: i + 1,
                brandName: e['offline_name'],
                saleroom: e['amount'],
                salevolume: e['num'],
                member: e['user_num']
            })
        });
        state.datasource.tenBymember = data;
    },
    setScreenTodaysale(state, datas) {
        const data = [];
        datas.forEach(e => {
            data.push(e['all_amount']);
        })
        state.datasource.screenTodaySale = data;
    },
    setScreenTodaytarget(state, datas) {
        const data = [];
        datas.forEach(e => {
            data.push(e['day_target_value']);
        })
        state.datasource.screenTodayTarget = data;
    },
    setScreenHourSale(state, datas) {
        const data = [
            [],
            []
        ];
        datas.forEach(e => {
            data[0].push(e['hour_amount']);
            data[1].push(e['hour'] + ':00');
        })
        state.datasource.screenHourSale = data;
    },
    setScreenSevensale(state, datas) {
        const data = [];
        datas.forEach(e => {
            data.push(e['hour_amount'].toFixed(2));
        })
        state.datasource.screenSevenSale = data;
    },
    setScreenSalespread(state, datas) {
        const option = [
            [],
            [],
            []
        ];
        datas.forEach(e => {
            option[0].push(e['day_amount']);
            option[1].push(e['day_target'].toFixed(2))
                // option[1].push(1)
            option[2].push(e['store_outlet_name'])
        })
        state.datasource.screenSaleSpread = option;
    },
    setScreenNewtarget(state, datas) {
        let data = null;
        datas.forEach(e => {
            e['day_target_value'] ? data = e['day_target_value'].toFixed(2) : data = 0;
        })
        state.datasource.screenNewtarget = data;
    },
    setScreenMemberconsum(state, datas) {
        const data = [];
        datas.forEach((e, index) => {
            switch (e['age_group']) {
                case '1':
                    data.push(['孕早期', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '2':
                    data.push(['孕中期', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '3':
                    data.push(['孕晚期', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '4':
                    data.push(['0-3个月', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '5':
                    data.push(['3-6个月', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '6':
                    data.push(['6-9个月', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '7':
                    data.push(['9-12个月', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '8':
                    data.push(['1岁-1岁半', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '9':
                    data.push(['1岁半-2岁', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '10':
                    data.push(['2岁-2岁半', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '11':
                    data.push(['2岁半-3岁', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '12':
                    data.push(['3岁-4岁', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '13':
                    data.push(['4岁-5岁', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '14':
                    data.push(['5岁-6岁', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
                case '15':
                    data.push(['6岁以上', e['amount'].toFixed(2), e['ord_num'], e['mem_num']])
                    break;
            }
        })
        state.datasource.screenMemberconsum = data;
    }
}

export const actions = {
    jump({ commit }, storecode) {
        // console.log(storecode);
        commit('SET_STORE_CODE', storecode);
        // commit('SET_USER', user);
    },
    getCurrentTotalAmount({ commit }, { storecode }) {
        return axios.get(`/api/report/sales/total/amount?storecode=${storecode}`)
            .then((resp) => {
                commit('setCurrentTotalAmount', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getCurrLastMonthSaleAmount({ commit }, { storecode }) {
        return axios.get(`/api/report/sales/months/amounts?storecode=${storecode}`)
            .then((resp) => {
                commit('setCurrentAndLastMonthSaleAmount', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getCurrLastYearSaleAmount({ commit }, { storecode }) {
        return axios.get(`/api/report/sales/year/amounts?storecode=${storecode}`)
            .then((resp) => {
                commit('setCurrentAndLastYearSaleAmount', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getTOP20BrandSale({ commit }, { storecode }) {
        return axios.get(`/api/report/sales/brand/top20?storecode=${storecode}`)
            .then((resp) => {
                commit('setTop20BrandsSales', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getTOP20OutletSale({ commit }, { storecode }) {
        return axios.get(`/api/report/sales/outlet/top20?storecode=${storecode}`)
            .then((resp) => {
                commit('setTop20OutletsSales', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getOldAndNewMembersCounts({ commit }, { storecode }) {
        return axios.get(`/api/report/members/month/counts/newandold?storecode=${storecode}`)
            .then((resp) => {
                commit('setOldAndNewMemberCounts', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getNewMembersCounts({ commit }, { storecode }) {
        return axios.get(`/api/report/members/month/counts/new?storecode=${storecode}`)
            .then((resp) => {
                commit('setCurrentAndLastYearMemberCounts', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getCurrentMonthMemberLevel({ commit }, { storecode }) {
        return axios.get(`/api/report/members/month/level/pencent?storecode=${storecode}`)
            .then((resp) => {
                commit('setCurrentMonthMemberLevel', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getCurrentAndLastYearSaleAmountByOutlet({ commit }, { storecode, outlet }) {
        return axios.get(`/api/report/sales/year/amounts/outlet?storecode=${storecode}&outlet=${outlet}`)
            .then((resp) => {
                commit('setCurrentAndLastYearSaleAmountByOutlet', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getCurrentAndLastMonthSaleAmountByOutlet({ commit }, { storecode, outlet }) {
        return axios.get(`/api/report/sales/month/amounts/outlet?storecode=${storecode}&outlet=${outlet}`)
            .then((resp) => {
                commit('setCurrentAndLastMonthSaleAmountByOutlet', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getTOP20BrandSaleByOutlet({ commit }, { storecode, outlet }) {
        return axios.get(`/api/report/sales/brand/top20/outlet?storecode=${storecode}&outlet=${outlet}`)
            .then((resp) => {
                commit('setTop20BrandsSalesByOutlet', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getNewMembersCountsByOutlet({ commit }, { storecode, outlet }) {
        return axios.get(`/api/report/members/month/counts/new/outlet?storecode=${storecode}&outlet=${outlet}`)
            .then((resp) => {
                commit('setNewMembersByYearAndOutlet', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getCurrentMonthMemberLevelByOutlet({ commit }, { storecode, outlet }) {
        return axios.get(`/api/report/members/month/level/pencent/outlet?storecode=${storecode}&outlet=${outlet}`)
            .then((resp) => {
                commit('setCurrentMonthMemberLevelByOutlet', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getOldAndNewMembersCountsByOutlet({ commit }, { storecode, outlet }) {
        return axios.get(`/api/report/members/month/counts/newandold/outlet?storecode=${storecode}&outlet=${outlet}`)
            .then((resp) => {
                commit('setOldAndNewMemberCountsByOutlet', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getCurrentAndLastMonthSaleAmountByEmp({ commit }, { storecode, outlet, empname }) {
        return axios.get(`/api/report/sales/months/amounts/employee?storecode=${storecode}&outlet=${outlet}&empname=${empname}`)
            .then((resp) => {
                commit('setCurrentAndLastMonthSaleAmountByEmp', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getNewMembersCountsByEmp({ commit }, { storecode, outlet, empname }) {
        return axios.get(`/api/report/members/month/counts/new/employee?storecode=${storecode}&outlet=${outlet}&empname=${empname}`)
            .then((resp) => {
                commit('setNewMembersByYearAndEmp', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getCurrentAndLastMonthSaleTaskProcessByEmp({ commit }, { storecode, outlet, empname }) {
        return axios.get(`/api/report/sales/month/pencent/employee?storecode=${storecode}&outlet=${outlet}&empname=${empname}`)
            .then((resp) => {
                commit('setCurrentAndLastMonthSaleTaskProcessByEmp', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getOldAndNewMemberCountsByEmp({ commit }, { storecode, outlet, empname }) {
        return axios.get(`/api/report/members/month/counts/newandold/employee?storecode=${storecode}&outlet=${outlet}&empname=${empname}`)
            .then((resp) => {
                commit('setOldAndNewMemberCountsByEmp', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getCurrentMonthMemberLevelByEmp({ commit }, { storecode, outlet, empname }) {
        return axios.get(`/api/report/members/month/level/pencent/employee?storecode=${storecode}&outlet=${outlet}&empname=${empname}`)
            .then((resp) => {
                commit('setCurrentMonthMemberLevelByEmp', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getTOP20BrandSaleByEmp({ commit }, { storecode, outlet, empname }) {
        return axios.get(`/api/report/sales/brand/top20/employee?storecode=${storecode}&outlet=${outlet}&empname=${empname}`)
            .then((resp) => {
                commit('setTop20BrandsSalesByEmp', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getTOP20GoodsSaleByEmp({ commit }, { storecode, outlet, empname }) {
        return axios.get(`/api/report/sales/goods/top20/employee?storecode=${storecode}&outlet=${outlet}&empname=${empname}`)
            .then((resp) => {
                commit('setTop20GoodsSalesByEmp', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },

    // 会员特征全量数据
    getFeatureByAll({ commit }, { storecode }) {
        return axios.get(`/api/report/members/feature/all?storecode=${storecode}`)
            .then((resp) => {
                commit('getMemberFeatureAll', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    // getFeatureBySex({ commit }, { storecode, type }) {
    //     return axios.get(`/api/report/members/sex?storecode=${storecode}&type=${type}`)
    //         .then((resp) => {
    //             commit('getMemberFeatureBySex', resp.data.rows)
    //         })
    //         .catch((error) => {
    //             if (error.response.status === 500) {
    //                 throw new Error('服务器错误')
    //             }
    //         })
    // },

    //会员复购数据
    getMemberReBuy({ commit }, { storecode }) {
        return axios.get(`/api/report/members/rebuy?storecode=${storecode}`)
            .then((resp) => {
                commit('getMemberRebuy', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    // 复购商品
    getRebuyGoods({ commit }, { storecode }) {
        return axios.get(`/api/report/members/rebuy/goods?storecode=${storecode}`)
            .then((resp) => {
                commit('setRebuyGoods', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    // 复购品类
    getRebuyType({ commit }, { storecode }) {
        return axios.get(`/api/report/members/rebuy/type?storecode=${storecode}`)
            .then((resp) => {
                commit('setRebuyType', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    // 复购品牌
    getRebuyBrand({ commit }, { storecode }) {
        return axios.get(`/api/report/members/rebuy/brand?storecode=${storecode}`)
            .then((resp) => {
                commit('setRebuyBrand', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getDetail({ commit }, { storecode, type, number }) {
        return axios.get(`/api/report/members/detail?storecode=${storecode}&type=${type}&number=${number}`)
            .then((resp) => {
                commit('getsexDetail', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getCount({ commit }, { storecode, type }) {
        return axios.get(`/api/report/members/total?storecode=${storecode}&type=${type}`)
            .then((resp) => {
                commit('getTotal', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },

    getTodayNew({ commit }, { storecode }) {
        return axios.get(`/api/report/newmember/today?storecode=${storecode}`)
            .then((resp) => {
                commit('setTodayNewMember', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    // getTodayDetail({ commit }, { storecode, outlet }) {
    //     return axios.get(`/api/report/today/detail?storecode=${storecode}&outlet=${outlet}`)
    //         .then((resp) => {
    //             commit('setGuideDetail', resp.data.rows)
    //         })
    //         .catch((error) => {
    //             if (error.response.status === 500) {
    //                 throw new Error('服务器错误')
    //             }
    //         })
    // },
    getMonthNewMember({ commit }, { storecode }) {
        return axios.get(`/api/report/newmember/month?storecode=${storecode}`)
            .then((resp) => {
                commit('setMonthNewMember', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },

    getGuideByStore({ commit }, { storecode, outlet }) {
        return axios.get(`/api/report/newmember/guide?storecode=${storecode}&outlet=${outlet}`)
            .then((resp) => {
                commit('setNewMemberGuide', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    // getGuideDetail({ commit }, { storecode, outlet, userid }) {
    //     return axios.get(`/api/report/guide/detail?storecode=${storecode}&outlet=${outlet}&userid=${userid}`)
    //         .then((resp) => {
    //             commit('setGuideDetail', resp.data.rows)
    //         })
    //         .catch((error) => {
    //             if (error.response.status === 500) {
    //                 throw new Error('服务器错误')
    //             }
    //         })
    // },
    getAxis({ commit }, { storecode }) {
        return axios.get(`/api/report/axis?storecode=${storecode}`)
            .then((resp) => {
                commit('setAxis', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },

    getSingleMoneyAll({ commit }, { storecode }) {
        return axios.get(`/api/report/singleMoneyAll?storecode=${storecode}`)
            .then((resp) => {
                commit('setSingle', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getSingleMoney({ commit }, { storecode, age, type }) {
        // console.log(storecode, type, age);
        return axios.get(`/api/report/singleMoney?storecode=${storecode}&age=${age}&type=${type}`)
            .then((resp) => {
                commit('setSingle', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    // getSingleDetail({ commit }, { storecode, age, tot_price }) {
    //     return axios.get(`/api/report/singleDetail?storecode=${storecode}&age=${age}&tot_price=${tot_price}`)
    //         .then((resp) => {
    //             commit('setGuideDetail', resp.data.rows)
    //         })
    //         .catch((error) => {
    //             if (error.response.status === 500) {
    //                 throw new Error('服务器错误')
    //             }
    //         })
    // },
    getExTimeAll({ commit }, { storecode }) {
        return axios.get(`/api/report/exTimeAll?storecode=${storecode}`)
            .then((resp) => {
                commit('setTime', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getExTime({ commit }, { storecode, age, type }) {
        // console.log(storecode, type, age);
        return axios.get(`/api/report/exTime?storecode=${storecode}&age=${age}&type=${type}`)
            .then((resp) => {
                commit('setTime', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    // getTimeDetail({ commit }, { storecode, age, com_no }) {
    //     return axios.get(`/api/report/timeDetail?storecode=${storecode}&age=${age}&com_no=${com_no}`)
    //         .then((resp) => {
    //             commit('setGuideDetail', resp.data.rows)
    //         })
    //         .catch((error) => {
    //             if (error.response.status === 500) {
    //                 throw new Error('服务器错误')
    //             }
    //         })
    // },
    getTransfrom({ commit }, { storecode }) {
        return axios.get(`/api/report/transform?storecode=${storecode}`)
            .then((resp) => {
                commit('setTransform', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    // getTransDetail({ commit }, { storecode, days }) {
    //     return axios.get(`/api/report/transDetail?storecode=${storecode}&days=${days}`)
    //         .then((resp) => {
    //             commit('setGuideDetail', resp.data.rows)
    //         })
    //         .catch((error) => {
    //             if (error.response.status === 500) {
    //                 throw new Error('服务器错误')
    //             }
    //         })
    // },
    // getCurrentMonthSale({ commit }, { storecode }) {
    //     return axios.get(`/api/report/home/total?storecode=${storecode}`)
    //         .then((resp) => {
    //             commit('setCurrentMonth', resp.data.rows)
    //         }).catch((error) => {
    //             if (error.response.status === 500) {
    //                 throw new Error('服务器错误')
    //             }
    //         })
    // },
    getMonthSale({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/home/saleDetail?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setMonthChart', resp.data.rows)
            }).catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getMonthNewmember({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/home/newDetail?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setMonthNewDetail', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getGuideNew({ commit }, { storecode, outletId, startDate, endDate }) {
        return axios.get(`/api/report/home/getGuide?storecode=${storecode}&outletId=${outletId}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setGuideSeries', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getGuideSale({ commit }, { storecode, outletId, startDate, endDate }) {
        return axios.get(`/api/report/home/getSaleGuide?storecode=${storecode}&outletId=${outletId}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setSaleGuideSeries', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //总销售数据分析
    getSaleTotal({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/sale/total?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setSaleTotal', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getSaleToalStore({ commit }, { storecode, startDate, endDate, outletId }) {
        return axios.get(`/api/report/saleTotal/store?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}&outletId=${outletId}`)
            .then((resp) => {
                commit('setSaleTotalStore', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //总销售对比数据
    getSaleTotalDim({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/sale/totalDim?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setSaleTotalDim', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //多维度销售数据
    getSaleDimension({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/sale/dimension?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setSaleDimension', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //多维度销售对比数据
    getSaleDimCompare({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/sale/dimension?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setSaleDimCompare', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //多维度销售数据-门店
    getSaleDimStore({ commit }, { storecode, outletId }) {
        return axios.get(`/api/report/sale/dim/store?storecode=${storecode}&outletId=${outletId}`)
            .then((resp) => {
                commit('setSaleDimStore', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //多维度销售数据-导购
    getSaleDimGuide({ commit }, { storecode, outletId, userId }) {
        return axios.get(`/api/report/sale/dim/guide?storecode=${storecode}&outletId=${outletId}&userId=${userId}`)
            .then((resp) => {
                commit('setSaleDimGuide', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //客户订单分析-门店平均客单价
    getSaleOrder({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/sale/order?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setSaleOrder', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getSaleOrderAvgamount({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/sale/orderAmount?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setOrderAvgamount', resp.data.rows)
            }).catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },

    //客户订单分析-门店平均客单价-导购
    getSaleOrderGuide({ commit }, { storecode, startDate, endDate, outletId }) {
        return axios.get(`/api/report/saleOrderSingle?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}&outletId=${outletId}`)
            .then((resp) => {
                commit('setSaleOrderGuide', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getSaleOrderDim({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/sale/orderDim?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setSaleOrderDim', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getSaleOrderTimes({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/sale/times?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setSaleTimes', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getSaleTimeDim({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/sale/timeDim?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setSaleTimeDim', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getOperaMain({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/opera/scanRegBind?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setOperaMain', resp.data.rows);
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getOperaGuide({ commit }, { storecode, outlet, startDate, endDate }) {
        return axios.get(`/api/report/operaGuide?storecode=${storecode}&outlet=${outlet}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setOperaGuide', resp.data.rows);
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getOperaGuideDetail({ commit }, { storecode, outlet, userid, startDate, endDate }) {
        return axios.get(`/api/report/opera/guideDetail?storecode=${storecode}&outlet=${outlet}&userid=${userid}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setGuideDetail', resp.data.rows);
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //客户维护交易人数
    getOperaDealNum({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/opera/dealnum?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setOperaDealNum', resp.data.rows);
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //维护客户购买次数
    getOperaDealTimes({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/opera/dealtimes?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setOperaDealTimes', resp.data.rows);
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //客户维护交易单价
    getOperaDealPrice({ commit }, { storecode, startDate, endDate }) {
        return axios.get(`/api/report/opera/dealprice?storecode=${storecode}&startDate=${startDate}&endDate=${endDate}`)
            .then((resp) => {
                commit('setOperaDealPrice', resp.data.rows);
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //会员地理分布
    getMemberGeo({ commit }, { storecode }) {
        return axios.get(`/api/report/member/geo?storecode=${storecode}`)
            .then((resp) => {
                commit('setMemberGeo', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //生理轴分布
    getMemberAxis({ commit }, { storecode }) {
        return axios.get(`/api/report/member/axis`)
            .then((resp) => {
                commit('setMemberAxis', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getStoreList({ commit }, { storecode }) {
        return axios.get(`/api/report/sale/sotreList?storecode=${storecode}`)
            .then((resp) => {
                commit('setStoreList', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    getGuideList({ commit }, { storecode, outletId }) {
        return axios.get(`/api/report/sale/guideList?storecode=${storecode}&outletId=${outletId}`)
            .then((resp) => {
                commit('setGuideList', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    login() {
        let token = localStorage.getItem('token');
        fetch('http://192.168.188.128:9080/user/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: 'zhangjh',
                    password: 123
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                token = res.token;
                localStorage.setItem('token', token);
            })
            .catch(err => console.log(err));
        fetch('http://192.168.188.128:9080/user/userid', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            })
            .then(res => res)
            .catch(err => console.log(err));
    },
    // 大屏数据中心
    getScreenSaleRoom({ commit }, { storecode }) {
        return axios.get(`/api/screen/saleroom?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenSaleRoom', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //客单价
    getScreenSaleSingle({ commit }, { storecode }) {
        return axios.get(`/api/screen/saleSingle?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenSaleSingle', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //连带率
    getScreenRelated({ commit }, { storecode }) {
        return axios.get(`/api/screen/related?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenRelated', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //品类销售排行
    getScreenBrand({ commit }, { storecode }) {
        return axios.get(`/api/screen/brand?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenBrand', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //品牌top10
    getTopTen({ commit }, { storecode }) {
        return axios.get(`/api/screen/topten?storecode=${storecode}`)
            .then((resp) => {
                commit('setTopTen', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //top10-销量
    getTenBynumber({ commit }, { storecode }) {
        return axios.get(`/api/screen/tenbynumber?storecode=${storecode}`)
            .then((resp) => {
                commit('setTopTen', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //top10-会员交易数
    getTenBymember({ commit }, { storecode }) {
        return axios.get(`/api/screen/tenbymember?storecode=${storecode}`)
            .then((resp) => {
                commit('setTopTen', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //今日销售额
    getScreenTodaySale({ commit }, { storecode }) {
        return axios.get(`/api/screen/todaysale?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenTodaysale', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //今日销目标
    getScreenTodayTarget({ commit }, { storecode }) {
        return axios.get(`/api/screen/todaytarget?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenTodaytarget', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //小时销售
    getScreenHourSale({ commit }, { storecode }) {
        return axios.get(`/api/screen/hoursale?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenHourSale', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //最近七天销售
    getScreenSevenSale({ commit }, { storecode }) {
        return axios.get(`/api/screen/sevensale?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenSevensale', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //门店销售分布
    getScreenSaleSpread({ commit }, { storecode }) {
        return axios.get(`/api/screen/salespread?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenSalespread', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //今日新客目标
    getScreenNewtarget({ commit }, { storecode }) {
        return axios.get(`/api/screen/newTarget?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenNewtarget', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    },
    //会员消费贡献分布
    getScreenMemberconsum({ commit }, { storecode }) {
        return axios.get(`/api/screen/memberconsum?storecode=${storecode}`)
            .then((resp) => {
                commit('setScreenMemberconsum', resp.data.rows)
            })
            .catch((error) => {
                if (error.response.status === 500) {
                    throw new Error('服务器错误')
                }
            })
    }
}