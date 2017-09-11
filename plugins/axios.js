import axios from 'axios'

const options = {}
    // The server-side needs a full url to works
if (process.SERVER_BUILD) {
    options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
}
if (process.BROWSER_BUILD) {
    // console.log('build')
    // require('../plugins/highstock.js')
    // require('../plugins/drilldown.js')
}
export default axios.create(options)