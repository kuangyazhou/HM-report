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
        todayNewMember: []
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

    //每日新增会员
    setTodayNewMember(state, datas) {
        state.datasource.todayNewMember = datas
    },
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
    }
}

export const actions = {
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

    getTodayNewMember({ commit }, { storecode, type }) {
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
    }
}