import * as crypto from 'crypto'
import * as fs     from 'fs'
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

const getPath = () => {
    return path.join(path.dirname(require.main.filename), ...arguments)
}

const allow = (data, accept) => {
    for (const col in data) {
        if (!accept.includes(col)) {
            return false
        }
    }
    return true
} 

const removeFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, err => {
            if (err) {
                reject(err)
                return
            }
            resolve()
        })
    });
}
export default {
    hash,
    getDate,
    getTime,
    getDateTime,
    getBaseName,
    getPath,
    allow,
    removeFile
}