export default class Response {
    constructor(res) {
        this.res = res
        this.statusCode = 200
    }

    status(statusCode) {
        this.statusCode = statusCode
        return this
    }

    send(data) {

    }

    json(obj) {

    }

    sendFile(path, options, callback) {
        
    }
}