import * as url from 'url'

export default class Request {
    constructor(req) {
        const URL = url.parse(req.url, true)

        this.req    = req
        this.path   = URL.pathname.split('/')
        this.path.splice(0, 1)
        this.body   = {}
        this.params = {}
        this.query  = URL.query
        this.method = req.method
        this.header = req.headers
        this.index  = 0
        this.ip     = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        this.ip     = this.ip.split(',')[0]
        this.ip     = this.ip.split(':').slice(-1)[0]
    }
}