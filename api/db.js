import mysql from 'mysql'
import fs from 'fs'
import lang from 'lodash/lang'
import redis from '../redis.config.js'

const parseString = require('xml2js').parseString

const state = {
    pool: null,
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'dev',
    'dboptions': {
        'username': 'hemiaoserverbak',
        'password': 'Hemiao188bak',
        'host': process.env.NODE_ENV === 'production' ? 'rdstkqsa4x4fa684rkmw.mysql.rds.aliyuncs.com' : 'rdstkqsa4x4fa684rkmwo.mysql.rds.aliyuncs.com'
    }
}

exports.connect = function(done) {
    state.pool = mysql.createPool({
        connectionLimit: 10,
        host: state.dboptions.host,
        user: state.dboptions.username,
        password: state.dboptions.password,
        multipleStatements: true,
        debug: true
    })
    done()
}

const query = exports.query = function({
    sql,
    timeout = 40000,
    values = [],
    done,
    cacheKey
}) {
    const pool = state.pool
    if (!pool) {
        return done(new Error('Missing database connection.'))
    }
    pool.getConnection((err, connection) => {
        if (err) {
            done(err)
            return console.log(err)
        } else {
            // Added to have :params :like :these.
            connection.config.queryFormat = function(query, values) {
                if (!values) return query
                return query.replace(/\:(\w+)/g, function(txt, key) {
                    if (values.hasOwnProperty(key)) {
                        return this.escape(values[key])
                    }
                    return txt
                }.bind(this))
            }
            if (lang.isArray(sql)) { sql = sql.join(';') }
            connection.query({
                sql,
                timeout,
                values
            }, (error, results, fields) => {
                connection.release()
                if (error) return done(error)
                global.redisUtils.setex(cacheKey, results)
                done(results)
            })
        }
    })
}

exports.queryFile = function({
    file,
    values = [],
    done,
    cacheKey
}) {
    redis.get(cacheKey, (result) => {
        if (!result) {
            query({
                sql: fs.readFileSync(file).toString(),
                values,
                done,
                cacheKey
            })
        } else {
            done(result)
        }
    })
}

exports.queryMultipleStatementsByXml = function({
    file,
    keys,
    cacheKey,
    values = [],
    done
}) {
    if (keys.length > 1) {
        const sqlStatements = []
        global.redisUtils.get(cacheKey, (result) => {
            if (!result) {
                for (var kindex = 0; kindex < keys.length; kindex++) {
                    parseString(fs.readFileSync(file).toString(), (err, results) => {
                        if (err) done(err)
                        const sqlReqs = results['root']['sql-requests']
                        for (let index = 0; index < sqlReqs.length; index++) {
                            const sqlReq = sqlReqs[index]['sql-request']
                            for (let aindex = 0; aindex < sqlReq.length; aindex++) {
                                if (sqlReq[aindex].$.id === keys[kindex]) {
                                    sqlStatements.push(sqlReq[aindex]['_'])
                                }
                            }
                        }
                    })
                }
                query({
                    sql: sqlStatements,
                    values,
                    done,
                    cacheKey
                })
            } else {
                console.log(`[REDIS]: Get result from cache for ${sqlStatements.join(' and ')}.`)
                done(result)
            }
        })
    }
}

exports.queryXml = function({
    file,
    key,
    values = [],
    done,
    cacheKey
}) {
    global.redisUtils.get(cacheKey, (result) => {
        if (!result) {
            __readXMLFile(file, cacheKey, key, (sql) => {
                query({
                    sql,
                    values,
                    done,
                    cacheKey
                })
            })
        } else {
            console.log(`[REDIS]: Get result from cache for ${key}.`)
            done(result)
        }
    })
}

function __readXMLFile(file, cacheKey, key, done) {
    parseString(fs.readFileSync(file).toString(), (err, results) => {
        const sqlReqs = results['root']['sql-requests']
        if (err) return ''
        for (let index = 0; index < sqlReqs.length; index++) {
            const sqlReq = sqlReqs[index]['sql-request']
            for (let aindex = 0; aindex < sqlReq.length; aindex++) {
                if (sqlReq[aindex].$.id === key) {
                    done.call(this, sqlReq[aindex]['_'])
                }
            }
        }
    })
}