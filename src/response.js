export default class Response {
    constructor(res) {
        this.res = res
    }

    status(statusCode) {
        this.res.statusCode = statusCode
        return this
    }

    send(data) {
        
    }

    json(obj) {
        this.res.setHeader('Content-Type', 'application/json')
        return this.send(JSON.stringify(obj))
    }

    sendFile(path, options, callback) {

    }
}