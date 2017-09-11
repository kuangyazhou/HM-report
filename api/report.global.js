import db from './db'

const router = require('express').Router()
const path = require('path')

const SALES_XML_PATH = path.join(__dirname, './sql', 'sales.xml')
const MEMBERS_XML_PATH = path.join(__dirname, './sql', 'members.xml');
const NEW_XML_PATH = path.join(__dirname, './sql', 'newmembers.xml');

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
router.get('/report/newmember/today', function(req, res, next) {
    const storecode = req.query.storecode;
    db.queryXml({
        file: NEW_XML_PATH,
        key: 'QUERY_NEWMEMBER_TODAY',
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
module.exports = router