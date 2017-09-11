const redis = require('redis')
// const debug = require('debug')('redis')

let client

module.exports = (port = 6379, host = '127.0.0.1', options = {}) => {
  client = redis.createClient(port, host, options)
  client.on('error', (err) => { console.log('[REDIS]: Redis connection error.' + err) })
  client.on('ready', () => { console.log('[REDIS]: Redis connection ready.') })

  const f = {}

  // Expose the client in the return object.
  f.client = client

  f.connect = (success) => {
    if (client && client.connected) {
      client.once('end', () => {
        client = redis.createClient(port, host, options)
      })
      client.quit()
    } else {
      client = redis.createClient(port, host, options)
    }
    client.on('ready', () => { success.call(this, client) })
  }

  f.disconnect = () => {
    if (client) {
      client.once('end', () => {
        client = null
      })
      client.quit()
    }
  }

  // default expire time: 5 mins.
  f.setex = (key, value) => {
    value = JSON.stringify(value)
    if (client && client.connected) {
      client.setex(key, 5 * 60, value)
      console.log(`[REDIS]: Set Key:${key}---Value:${value}.`)
    } else {
      console.error(`[REDIS]: no connection to redis server: ${host} is alive./n`)
      console.warn(`[REDIS]: try reconnect to : ${host}./n`)
      f.connect(() => {
        console.log(`[REDIS]: connection successfull.`)
        client.setex(key, 5 * 60, value)
        console.log(`[REDIS]: Set Key:${key}---Value:${value}.`)
      })
    }
  }

  f.get = (key, callback) => {
    if (client && client.connected) {
      client.get(key, (err, result) => {
        if (err) console.error(`[REDIS]: error when get key${key}:${err}/n`)
        else {
          callback.call(client, JSON.parse(result))
        }
      })
    } else {
      console.error(`[REDIS]: no connection to redis server: ${host} is alive./n`)
      console.warn(`[REDIS]: try reconnect to : ${host}./n`)
      f.connect(() => {
        console.log(`[REDIS]: connection successfull.`)
        client.get(key, (err, result) => {
          if (err) console.error(`[REDIS]: error when get key${key}:${err}/n`)
          else {
            callback.call(client, JSON.parse(result))
          }
        })
      })
    }
  }

  return f
}
