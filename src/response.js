import * as mime from 'mime'
import * as fs   from 'fs'

export default class Response {
    constructor(res) {
        this.res = res
    }

    status(statusCode) {
        this.res.statusCode = statusCode
        return this
    }

    send(data) {
        let encoding = ''

        switch (typeof data) {
            case 'string':
                if (!this.res.hasHeader('Content-Type')) {
                    this.type('html')
                }
                break
            case 'boolean':
            case 'number':
            case 'object':
                if (data === null) {
                    data = ''
                } else if (Buffer.isBuffer(data)) {
                    if (!this.res.hasHeader('Content-Type')) {
                        this.type('bin')
                    }
                } else {
                    return this.json(data)
                }
                break
        }

        if (typeof data === 'string') {
            encoding = 'utf8'
        }

        let len = 0
        if (data !== undefined) {
            if (Buffer.isBuffer(data)) {
                len = data.length
            } else if (data.length < 1000) {
                len = Buffer.byteLength(data, encoding)
            } else {
                data = Buffer.from(data, encoding)
                encoding = undefined
                len = data.length
            }
            this.res.setHeader('Content-Length', len)
        }

        if (this.res.statusCode === 204 || this.res.statusCode === 304) {
            data = ''
        }

        this.res.end(data, encoding)
    }

    json(obj) {
        this.type('json')
        return this.send(JSON.stringify(obj))
    }

    sendFile(path) {
        const stat = fs.statSync(path)
        this.type(path)
        this.res.setHeader('Content-Length', stat.size)
        fs.createReadStream(path).pipe(this.res)
    }

    type(type) {
        this.res.setHeader('Content-Type', mime.getType(type))
    }
}