import * as url from 'url'

export class Request {
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
    }
}

export function bodyParser(req) {
    return new Promise((resolve, reject) => {
        if (req.method === 'POST' || req.method === 'PUT') {
            if (req.header['content-type'] === 'application/json') {
                let jsonStr = ''
                req.req.on('data', (data) => {
                    jsonStr += data
                })
                req.req.on('end', () => {
                    req.body = JSON.parse(jsonStr)
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