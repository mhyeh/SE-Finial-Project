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
        this.ip     = this.getIP()
        this.index  = 0
    }

    getIP() {
        let str = this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress
        str     = str.split(',')[0]
        str     = str.split(':').slice(-1)[0]
        return str
    }
}