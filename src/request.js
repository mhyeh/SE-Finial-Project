import * as url from 'url'

export default class Request {
    constructor(req) {
        const URL = url.parse(req.url, true)

        this.path   = URL.pathname.split('/')
        this.path.splice(0, 1)
        this.body   = {}
        this.prams  = {}
        this.query  = URL.query
        this.method = req.method
        this.index  = 0

        if (this.method === 'POST' || this.method === 'PUT') {
            let jsonStr = ''
            req.on('data', (data) => {
                jsonStr += data
            })
            req.on('end', () => {
                this.body = JSON.parse(jsonStr)
            })
        }
    }
}