const Nuxt = require('nuxt')
const app = require('express')()
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const responseTime = require('response-time')
const redis = require('./redis.config.js')
const db = require('./api/db')
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
global.redisUtils = redis(6379, '115.28.187.224', { password: '1d280478' })
const client = global.redisUtils.client

app.use(bodyParser.json())
app.use(responseTime())
app.use(session({
    store: new RedisStore({ client }),
    secret: 'hemiao-datavision'
}))
app.set('port', port)
app.use('/api', require('./api/auth'))
app.use('/api', require('./api/report.global'))

// Import and Set Nuxt.js options
const config = require('./nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)
app.use(nuxt.render)

// Build only in dev mode
if (config.dev) {
    nuxt.build().catch((error) => {
        console.error(error) // eslint-disable-line no-console
        process.exit(1)
    })
}

// Listen the server
db.connect(function(err) {
    if (err) {
        console.error('Unable to connect to MySQL.')
        process.exit(1)
    } else {
        app.listen(port, host)
        console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
    }
})