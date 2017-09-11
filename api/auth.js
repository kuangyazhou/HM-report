import db from './db'
// import axios from 'axios'

const router = require('express').Router()
const path = require('path')
const AUTH_XML_PATH = path.join(__dirname, '/sql', 'auths.xml')

// const request = require('request');

router.get('/nologin', function(req, res) {
    const next = req.query.n || ''
    const account = req.query.u || ''

    db.query({
        sql: 'select `store_code` from hemiao.sys_store_user where `account`=:account',
        values: { account },
        cacheKey: 'LOGINED_USER',
        done: (results) => {
            if (results.length === 0) res.status(401).json({ error: 'Bad credentials' })
            else if (results[0] && results[0]['store_code']) {
                req.session.authUser = account
                req.session.storeCode = results[0].store_code
                if (next !== '' && account !== '') {
                    if (next === '/') res.redirect(`..`)
                    else res.redirect(`../${next}`)
                } else {
                    res.status(500).json({ error: '错误的登陆请求, 提供的参数错误或不完整.' })
                }
            } else {
                res.status(500).json({ error: results })
            }
        }
    })
})

router.post('/login', function(req, res) {
    const next = req.query.next || ''
    const account = req.body.username
    const password = req.body.password;
    db.query({
        sql: 'select `store_code` from hemiao.sys_store_user where `account`=:account',
        values: { account, password },
        cacheKey: 'LOGINED_USER',
        done: (results) => {
            if (results.length === 0) res.status(401).json({ error: 'Bad credentials' })
            else if (results[0] && results[0]['store_code']) {
                req.session.authUser = account
                req.session.storeCode = results[0].store_code
                if (next !== '') {
                    res.redirect(next)
                } else {
                    res.json({ username: account, storecode: results.store_code })
                }
            } else {
                res.status(500).json({ error: results })
            }
        }
    })
})

router.post('/comLogin', function(req, res) {
    axios.post('http://192.168.188.128:8090/hemiao-crm-backservice/data/login.htm', {
            account,
            password
        })
        .then((res) => {
            data = res;
            console.log(res);
        })
        .catch(err => { throw new Error(err) })
})

router.post('/logout', function(req, res) {
    delete req.session.authUser
    delete req.session.storeCode
    res.json({ ok: true })
})

// 获得查询条件: 门店和员工
router.get('/words/storePemployee', function(req, res) {
    const account = req.query.account
    db.queryMultipleStatementsByXml({
        file: AUTH_XML_PATH,
        keys: ['QUERY_LOGINED_STORES', 'QUERY_LOGINED_MEMBERS'],
        values: { account },
        cacheKey: `QUERY_LOGINED_STORES_MEMBERS-${account}`,
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