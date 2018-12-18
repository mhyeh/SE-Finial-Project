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
    }

    ParseBody() {
        return new Promise((resolve, reject) => {
            if (this.method === 'POST' || this.method === 'PUT') {
                if (this.header['content-type'] === 'application/json') {
                    let jsonStr = ''
                    this.req.on('data', (data) => {
                        jsonStr += data
                    })
                    this.req.on('end', () => {
                        this.body = JSON.parse(jsonStr)
                        resolve()
                    })
                } else {
                    resolve()
                }
            } else {
                resolve()
            }
        })
    }
}