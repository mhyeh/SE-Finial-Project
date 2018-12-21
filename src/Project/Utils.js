import * as crypto from 'crypto'
import * as path   from 'path'

const hash = function hash(msg) {
    return crypto.createHash('sha256').update(msg).digest('hex')
}

const getDate = function getDate(input=undefined) {
    let date
    if (input === undefined) {
        date = new Date()
    } else {
        date = new Date(input)
    }
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

const getTime =  function getTime(input=undefined) {
    let date
    if (input === undefined) {
        date = new Date()
    } else {
        date = new Date(input)
    }
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const getDateTime = function getDateTime(input=undefined) {
    return getDate(input) + ' ' + getTime(input)
}

const getBaseName = function getBaseName(filePath) {
    return path.basename(filePath)
}

const getPath = function getPath(args) {
    return path.join(path.dirname(require.main.filename), ...args)
}

export default {
    hash,
    getDate,
    getTime,
    getDateTime,
    getBaseName,
    getPath
}