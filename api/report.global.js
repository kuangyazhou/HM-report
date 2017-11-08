import db from './db'
import './../utils/format'
const router = require('express').Router()
const path = require('path')

const SALES_XML_PATH = path.join(__dirname, './sql', 'sales.xml')
const MEMBERS_XML_PATH = path.join(__dirname, './sql', 'members.xml');
const currentMonth = (new Date()).Format('yyyyMM');
const _currentMonth = (new Date()).Format('yyyy-MM');
// const NEW_XML_PATH = path.join(__dirname, './sql', 'newmembers.xml');
// const HOME_XML_PATH = path.join(__dirname, './sql', 'homes.xml')

router.get('/report/sales/months/amounts', function(req, res, next) {
    const storecode = req.query.storecode
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_SALE_AMOUNT_LAST_CURRENT_MONTH',
        values: { storecode },
        cacheKey: `DVKEY-QUERY_SALE_AMOUNT_LAST_CURRENT_MONTH-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/outlet/top20', function(req, res, next) {
    const storecode = req.query.storecode
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_TOP_20_OUTLET_CURRENT_MONTH',
        values: { storecode },
        cacheKey: `QUERY_TOP_20_OUTLET_CURRENT_MONTH-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/brand/top20', function(req, res, next) {
    const storecode = req.query.storecode
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_TOP_20_BRAND_CURRENT_MONTH',
        values: { storecode },
        cacheKey: `QUERY_TOP_20_BRAND_CURRENT_MONTH-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/year/amounts', function(req, res, next) {
    const storecode = req.query.storecode
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_SALES_CURRENT_AND_LAST_YEAR',
        values: { storecode },
        cacheKey: `QUERY_SALES_CURRENT_AND_LAST_YEAR-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/members/month/counts/newandold', function(req, res, next) {
    const storecode = req.query.storecode
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_NEW_OLD_MEMBER_COUNT_CURRENT_MONTH',
        values: { storecode },
        cacheKey: `QUERY_NEW_OLD_MEMBER_COUNT_CURRENT_MONTH-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/members/month/counts/new', function(req, res, next) {
    const storecode = req.query.storecode
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_NEW_MEMBER_COUNT_CURRENT_AND_LAST_YEAR_BY_MONTH',
        values: { storecode },
        cacheKey: `QUERY_NEW_MEMBER_COUNT_CURRENT_AND_LAST_YEAR_BY_MONTH-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/members/month/level/pencent', function(req, res, next) {
    const storecode = req.query.storecode
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_MEMBER_LEVEL_PENCENT_CURRENT_MONTH',
        values: { storecode },
        cacheKey: `QUERY_MEMBER_LEVEL_PENCENT_CURRENT_MONTH-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/year/amounts/outlet', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_SALES_CURRENT_AND_LAST_YEAR_BY_OUTLET',
        values: { storecode, outlet },
        cacheKey: `QUERY_MEMBER_LEVEL_PENCENT_CURRENT_MONTH-${storecode}-${outlet}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/month/amounts/outlet', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_SALES_CURRENT_AND_LAST_MONTH_BY_OUTLET',
        values: { storecode, outlet },
        cacheKey: `DVKEY-QUERY_SALES_CURRENT_AND_LAST_MONTH_BY_OUTLET-${storecode}-${outlet}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/brand/top20/outlet', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_TOP_20_OUTLET_CURRENT_MONTH_BY_OUTLET',
        values: { storecode, outlet },
        cacheKey: `QUERY_TOP_20_BRAND_CURRENT_MONTH-${storecode}-${outlet}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/members/month/counts/new/outlet', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_NEW_MEMBER_COUNT_CURRENT_AND_LAST_YEAR_BY_MONTH_AND_OUTLET',
        values: { storecode, outlet },
        cacheKey: `QUERY_NEW_MEMBER_COUNT_CURRENT_AND_LAST_YEAR_BY_MONTH_AND_OUTLET-${storecode}-${outlet}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/members/month/level/pencent/outlet', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_MEMBER_LEVEL_PENCENT_CURRENT_MONTH_BY_OUTLET',
        values: { storecode, outlet },
        cacheKey: `QUERY_MEMBER_LEVEL_PENCENT_CURRENT_MONTH_BY_OUTLET-${storecode}-${outlet}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/members/month/counts/newandold/outlet', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_NEW_OLD_MEMBER_COUNT_CURRENT_MONTH_BY_OUTLET',
        values: { storecode, outlet },
        cacheKey: `QUERY_NEW_OLD_MEMBER_COUNT_CURRENT_MONTH_BY_OUTLET-${storecode}-${outlet}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/months/amounts/employee', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    const empname = req.query.empname
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_SALE_AMOUNT_LAST_CURRENT_MONTH_BY_OUTLET_EMPNAME',
        values: { storecode, outlet, empname },
        cacheKey: `QUERY_SALE_AMOUNT_LAST_CURRENT_MONTH_BY_OUTLET_EMPNAME-${storecode}-${outlet}-${empname}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/members/month/counts/new/employee', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    const empname = req.query.empname
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_NEW_MEMBER_COUNT_CURRENT_AND_LAST_YEAR_BY_MONTH_AND_OUTLET_AND_EMPNAME',
        values: { storecode, outlet, empname },
        cacheKey: `QUERY_NEW_MEMBER_COUNT_CURRENT_AND_LAST_YEAR_BY_MONTH_AND_OUTLET_AND_EMPNAME-${storecode}-${outlet}-${empname}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/month/pencent/employee', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    const empname = req.query.empname
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_SALE_PENCENT_CURRENT_AND_LAST_YEAR_BY_MONTH_AND_OUTLET_AND_EMPNAME',
        values: { storecode, outlet, empname },
        cacheKey: `QUERY_SALE_PENCENT_CURRENT_AND_LAST_YEAR_BY_MONTH_AND_OUTLET_AND_EMPNAME-${storecode}-${outlet}-${empname}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/members/month/counts/newandold/employee', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    const empname = req.query.empname
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_NEW_OLD_MEMBER_COUNT_CURRENT_MONTH_BY_OUTLE_AND_EMPNAME',
        values: { storecode, outlet, empname },
        cacheKey: `QUERY_NEW_OLD_MEMBER_COUNT_CURRENT_MONTH_BY_OUTLE_AND_EMPNAME-${storecode}-${outlet}-${empname}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/members/month/level/pencent/employee', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    const empname = req.query.empname
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_MEMBER_LEVEL_PENCENT_CURRENT_MONTH_BY_EMP',
        values: { storecode, outlet, empname },
        cacheKey: `QUERY_MEMBER_LEVEL_PENCENT_CURRENT_MONTH_BY_EMP-${storecode}-${outlet}-${empname}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/brand/top20/employee', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    const empname = req.query.empname
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_TOP_20_OUTLET_CURRENT_MONTH_BY_EMP',
        values: { storecode, outlet, empname },
        cacheKey: `QUERY_TOP_20_OUTLET_CURRENT_MONTH_BY_EMP-${storecode}-${outlet}-${empname}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/goods/top20/employee', function(req, res, next) {
    const storecode = req.query.storecode
    const outlet = req.query.outlet
    const empname = req.query.empname
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_TOP_20_GOODS_CURRENT_MONTH_BY_EMP',
        values: { storecode, outlet, empname },
        cacheKey: `QUERY_TOP_20_GOODS_CURRENT_MONTH_BY_EMP-${storecode}-${outlet}-${empname}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/sales/total/amount', function(req, res, next) {
    const storecode = req.query.storecode
    db.queryXml({
        file: SALES_XML_PATH,
        key: 'QUERY_CURRENT_TOTAL_SALE_AMOUNT',
        values: { storecode },
        cacheKey: `DVKEY-QUERY_CURRENT_TOTAL_SALE_AMOUNT-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//会员特征数据
router.get('/report/members/feature/all', function(req, res, next) {
        const storecode = req.query.storecode
        db.queryXml({
            file: MEMBERS_XML_PATH,
            key: 'QUERY_MEMBER_ALL',
            values: { storecode },
            cacheKey: `DVKEY-QUERY_MEMBER_FEATURE_ALL-${storecode}`,
            done: (rows) => {
                if (rows.length > 0) {
                    res.status(200).json({ rows })
                } else {
                    res.status(200).json({ rows: [] })
                }
            }
        })
    })
    //会员信息详情
router.get('/report/members/detail', function(req, res, next) {
    const storecode = req.query.storecode;
    const type = req.query.type;
    const number = req.query.number;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_MEMBER_DETAIL',
        values: { storecode, type, number },
        cacheKey: `DVKEY-QUERY_MEMBER_FEATURE_TIME-${storecode}-${type}-${number}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/members/total', function(req, res, next) {
    const storecode = req.query.storecode;
    const type = req.query.type;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_MEMBER_TOTAL',
        values: { storecode, type },
        cacheKey: `DVKEY-QUERY_MEMBER_FEATURE_TIME-${storecode}-${type}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//会员复购数据
router.get('/report/members/rebuy', function(req, res, next) {
        const storecode = req.query.storecode;
        db.queryXml({
            file: MEMBERS_XML_PATH,
            key: 'QUERY_MEMBER_REBUY',
            values: { storecode },
            cacheKey: `DVKEY-QUERY_MEMBER_REBUY-${storecode}`,
            done: (rows) => {
                if (rows.length > 0) {
                    res.status(200).json({ rows })
                } else {
                    res.status(200).json({ rows: [] })
                }
            }
        })
    })
    //复购商品
router.get('/report/members/rebuy/goods', function(req, res, next) {
        const storecode = req.query.storecode;
        db.queryXml({
            file: MEMBERS_XML_PATH,
            key: 'QUERY_REBUY_GOODS',
            values: { storecode },
            cacheKey: `DVKEY-QUERY_REBUY_GOODS-${storecode}`,
            done: (rows) => {
                if (rows.length > 0) {
                    res.status(200).json({ rows })
                } else {
                    res.status(200).json({ rows: [] })
                }
            }
        })
    })
    // 复购品类
router.get('/report/members/rebuy/type', function(req, res, next) {
        const storecode = req.query.storecode;
        db.queryXml({
            file: MEMBERS_XML_PATH,
            key: 'QUERY_REBUY_TYPE',
            values: { storecode },
            cacheKey: `DVKEY-QUERY_REBUY_TYPE-${storecode}`,
            done: (rows) => {
                if (rows.length > 0) {
                    res.status(200).json({ rows })
                } else {
                    res.status(200).json({ rows: [] })
                }
            }
        })
    })
    // 复购品牌
router.get('/report/members/rebuy/brand', function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_REBUY_BRAND',
        values: { storecode },
        cacheKey: `DVKEY-QUERY_REBUY_BRAND-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})
router.get('/report/newmember/month', function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_NEWMEMBER_MONTH',
        values: { storecode },
        cacheKey: `DVKEY-QUERY_NEW_MEMBER-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/newmember/today', function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_NEWMEMBER_TODAY',
        values: { storecode },
        cacheKey: `DVKEY-QUERY_NEW_TODAY-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/newmember/guide', function(req, res, next) {
    const storecode = req.query.storecode;
    const outlet = req.query.outlet;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_NEWMEMBER_GUIDE',
        values: { storecode, outlet },
        cacheKey: `DVKEY-QUERY_NEW_GUIDE-${outlet}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})
router.get('/report/guide/detail', function(req, res, next) {
    const storecode = req.query.storecode;
    const outlet = req.query.outlet;
    const userid = req.query.userid;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_GUIDE_DETAIL',
        values: { storecode, outlet, userid },
        cacheKey: `DVKEY-QUERY_GUIE_DETAIL-${outlet}-${userid}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/today/detail', function(req, res, next) {
    const storecode = req.query.storecode;
    const outlet = req.query.outlet;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_TODAY_DETAIL',
        // key: 'QUERY_NEWMEMBER_GUIDE',
        values: { storecode, outlet },
        cacheKey: `DVKEY-QUERY_GUIE_DETAIL-${storecode}-${outlet}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})
router.get('/report/axis', function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_AXIS',
        values: { storecode },
        cacheKey: `DVKEY-QUERY-AXIS-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/singleMoneyAll', function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_SINGLE_ALL',
        values: { storecode },
        cacheKey: `DVKEY-QUERY-SINGLEMONEY-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/singleMoney', function(req, res, next) {
    const storecode = req.query.storecode;
    const age = req.query.age;
    const type = req.query.type;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_SINGLE_MONEY',
        values: { storecode, type, age },
        cacheKey: `DVKEY-QUERY-SINGLEMONEY-${storecode}-${age}-${type}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get(`/report/singleDetail`, function(req, res, next) {
    const storecode = req.query.storecode;
    const age = req.query.age;
    const tot_price = req.query.tot_price;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_SINGLE_DETAIL',
        values: { storecode, age, tot_price },
        cacheKey: `DVKEY-QUERY-SINGLEDETAIL-${storecode}-${age}-${tot_price}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/exTimeAll', function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_TIME_ALL',
        values: { storecode },
        cacheKey: `DVKEY-QUERY-TIMES-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get('/report/exTime', function(req, res, next) {
    const storecode = req.query.storecode;
    const age = req.query.age;
    const type = req.query.type;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_EX_TIME',
        values: { storecode, type, age },
        cacheKey: `DVKEY-QUERY-TIMES-${storecode}-${age}-${type}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

router.get(`/report/timeDetail`, function(req, res, next) {
    const storecode = req.query.storecode;
    const age = req.query.age;
    const com_no = req.query.com_no;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_TIME_DETAIL',
        values: { storecode, age, com_no },
        cacheKey: `DVKEY-QUERY-TIMEDETAIL-${storecode}-${age}-${com_no}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

// 客户维护关系转换
router.get(`/report/transform`, function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_TRANSFORM',
        values: { storecode },
        cacheKey: `DVKEY-QUERY-TRANSFORM-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
});

router.get(`/report/transDetail`, function(req, res, next) {
    const storecode = req.query.storecode;
    const days = req.query.days;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_TRANS_DETAIL',
        values: { storecode, days },
        cacheKey: `DVKEY-QUERY-TRANSDETAIL-${storecode}-${days}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
});

//首页销售目标及完成率
// router.get(`/report/home/total`, function(req, res, next) {
//     const storecode = req.query.storecode;
//     db.queryXml({
//         file: MEMBERS_XML_PATH,
//         key: 'QUERY_HOME_TOTAL',
//         values: { storecode, currentMonth },
//         cacheKey: `DVKEY-QUERY-HOME-MONEY-${storecode}`,
//         done: (rows) => {
//             if (rows.length > 0) {
//                 res.status(200).json({ rows })
//             } else {
//                 res.status(200).json({ rows: [] })
//             }
//         }
//     })
// })

//首页销售明细
router.get(`/report/home/saleDetail`, function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_HOME_SALE_CHART',
        values: { storecode, currentMonth, _currentMonth },
        cacheKey: `DVKEY-QUERY-HOME-MONEY-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//首页销售导购明细
router.get(`/report/home/getSaleGuide`, function(req, res, next) {
    const storecode = req.query.storecode;
    const outletId = req.query.outletId;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_SALE_GUIDE',
        values: { storecode, outletId, currentMonth, _currentMonth },
        cacheKey: `DVKEY-QUERY-HOME-SALE-${outletId}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//首页新客明细
router.get(`/report/home/newDetail`, function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY_NEWMEMBER_COM',
        values: { storecode, currentMonth, _currentMonth },
        cacheKey: `DVKEY-QUERY-NEW-CHART-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//首页新客导购明细
router.get(`/report/home/getGuide`, function(req, res, next) {
    const storecode = req.query.storecode;
    const outletId = req.query.outletId;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-NEW-GUIDE',
        values: { storecode, outletId, currentMonth, _currentMonth },
        cacheKey: `DVKEY-QUERY-HOME-STORE-${outletId}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    });
})

//销售 总销售数据分析
router.get(`/report/sale/total`, function(req, res, next) {
    const storecode = req.query.storecode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    // console.log(startDate, endDate);
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-SALE-TOTAL',
        values: { storecode, startDate, endDate },
        cacheKey: `DVKEY-QUERY-SALE-TOTAL-${startDate}-${endDate}-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//销售 总销售数据对比
router.get(`/report/sale/totalDim`, function(req, res, next) {
    const storecode = req.query.storecode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    // console.log(startDate, endDate);
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-SALE-TOTAL',
        values: { storecode, startDate, endDate },
        cacheKey: `DVKEY-QUERY-SALE-TOTALDIM-${startDate}-${endDate}-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//多维度销售数据
router.get(`/report/sale/dimension`, function(req, res, next) {
    const storecode = req.query.storecode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    // console.log(startDate, endDate);
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-SALE-DIMENSION',
        values: { storecode, startDate, endDate },
        cacheKey: `DVKEY-QUERY-SALE-DIMENSION-${storecode}-${startDate}-${endDate}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//多维护销售数据-门店
router.get(`/report/sale/dim/store`, function(req, res, next) {
    const storecode = req.query.storecode;
    const outletId = req.query.outletId;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-SALEDIM-STORE',
        values: { storecode, outletId, currentMonth },
        cacheKey: `DVKEY-QUERY-SALEDIM-STORE-${storecode}-${outletId}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//多维度销售数据-导购
router.get(`/report/sale/dim/guide`, function(req, res, next) {
    const storecode = req.query.storecode;
    const outletId = req.query.outletId;
    const userId = req.query.userId;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-SALEDIM-GUIDE',
        values: { storecode, outletId, userId, currentMonth },
        cacheKey: `DVKEY-QUERY-SALEDIM-GUIDE-${storecode}-${outletId}-${userId}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//多维度，返回门店列表
router.get(`/report/sale/sotreList`, function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-STORE-LIST',
        values: { storecode },
        cacheKey: `DVKEY-QUERY-STORE-LIST-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//返回导购列表
router.get(`/report/sale/guideList`, function(req, res, next) {
    const storecode = req.query.storecode;
    const outletId = req.query.outletId;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'COMMON_QUERY_GUIDELIST',
        values: { storecode, outletId },
        cacheKey: `DVKEY-COMMON-GUIDELIST-${storecode}-${outletId}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//销售 客单价
router.get(`/report/sale/order`, function(req, res, next) {
    const storecode = req.query.storecode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-SALE-ORDER',
        values: { storecode, startDate, endDate },
        cacheKey: `DVKEY-QUERY-SALE-ORDER-${startDate}-${endDate}${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//销售 客单价对比数据
router.get(`/report/sale/orderDim`, function(req, res, next) {
    const storecode = req.query.storecode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-SALE-ORDER',
        values: { storecode, startDate, endDate },
        cacheKey: `DVKEY-QUERY-SAL-ORDER-DIM-${startDate}-${endDate}-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//销售次数分析
router.get(`/report/sale/times`, function(req, res, next) {
    const storecode = req.query.storecode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-SALE-TIMES',
        values: { storecode, startDate, endDate },
        cacheKey: `DVKEY-QUERY-SALE-TIMES-${startDate}-${endDate}-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//销售次数对比数据
router.get(`/report/sale/timeDim`, function(req, res, next) {
    const storecode = req.query.storecode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-SALE-TIMES',
        values: { storecode, startDate, endDate },
        cacheKey: `DVKEY-QUERY-SALE-TIMES-DIM-${startDate}-${endDate}-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//运营扫码注册绑定信息
router.get(`/report/opera/scanRegBind`, function(req, res, next) {
    const storecode = req.query.storecode;
    // const outletId = req.query.outletId;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-OPERA-NEW',
        values: { storecode, startDate, endDate },
        // , outletId, currentMonth, _currentMonth
        cacheKey: `DVKEY-QUERY-OPERA-STORE-${storecode}-${startDate}-${endDate}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    });
})

//运营导购扫码注册绑定详情
router.get(`/report/operaGuide`, function(req, res, next) {
    const storecode = req.query.storecode;
    const outletId = req.query.outlet;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-OPERA-GUIDE',
        values: { storecode, outletId, startDate, endDate },
        // , outletId, currentMonth, _currentMonth
        cacheKey: `DVKEY-QUERY-OPERA-OUTLET-${storecode}-${outletId}-${startDate}-${endDate}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    });
})

//运营导购当月详情
router.get(`/report/opera/guideDetail`, function(req, res, next) {
    const storecode = req.query.storecode;
    const outletId = req.query.outlet;
    const userId = req.query.userid;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'OPERA-GUIDE-CURRENTMONTH',
        values: { storecode, outletId, userId, startDate, endDate },
        // , outletId, currentMonth, _currentMonth
        cacheKey: `DVKEY-QUERY-OPERAGUIDE-CURRENTMONTH-${storecode}-${userId}-${startDate}-${endDate}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    });
})

//维护客户交易人数
router.get(`/report/opera/dealnum`, function(req, res, next) {
    const storecode = req.query.storecode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-OPERA-DEALNUM',
        values: { storecode, startDate, endDate, currentMonth },
        cacheKey: `DVKEY-QUERY-OPERA-DEALNUM-${storecode}-${startDate}-${endDate}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//维护客户交易次数
router.get(`/report/opera/dealtimes`, function(req, res, next) {
    const storecode = req.query.storecode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const random = Math.ceil(Math.random() * 1000);
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-OPERA-DEALTIMES',
        values: { storecode, startDate, endDate },
        cacheKey: `DVKEY-QUERY-OPERA-DEALTIMES-${storecode}-${startDate}-${endDate}-${random}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//维护客户交易单价
router.get(`/report/opera/dealprice`, function(req, res, next) {
    const storecode = req.query.storecode;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-OPERA-DEALPRICE',
        values: { storecode, currentMonth, startDate, endDate },
        cacheKey: `QUERY-OPERA-DEALPRICE-${storecode}-${startDate}-${endDate}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})

//会员地理分析图
router.get(`/report/member/geo`, function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: MEMBERS_XML_PATH,
        key: 'QUERY-MEMBER-GEO',
        values: { storecode },
        cacheKey: `QUERY-MEMBER-GEO-${storecode}`,
        done: (rows) => {
            if (rows.length > 0) {
                res.status(200).json({ rows })
            } else {
                res.status(200).json({ rows: [] })
            }
        }
    })
})
module.exports = router