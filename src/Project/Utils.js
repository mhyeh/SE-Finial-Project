import * as crypto from 'crypto'
import * as path   from 'path'

const hash = (msg) => {
    return crypto.createHash('sha256').update(msg).digest('hex')
}

const getDate = (input=undefined) => {
    let date
    if (input === undefined) {
        date = new Date()
    } else {
        date = new Date(input)
    }
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

const getTime = (input=undefined) => {
    let date
    if (input === undefined) {
        date = new Date()
    } else {
        date = new Date(input)
    }
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

const getDateTime = (input=undefined) => {
    return getDate(input) + ' ' + getTime(input)
}

const getBaseName = (filePath) => {
    return path.basename(filePath)
}

const getPath = (args) => {
    return path.join(path.dirname(require.main.filename), ...args)
}

const allow = (data, accept) => {
    for (const col in data) {
        if (!accept.includes(col)) {
            return false
        }
    }
    return true
} 

export default {
    hash,
    getDate,
    getTime,
    getDateTime,
    getBaseName,
    getPath,
    allow
}