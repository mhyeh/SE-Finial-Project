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

const getPath = (...arg) => {
    return path.join(path.dirname(require.main.filename), ...arg)
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

const isObject = (item) => {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
  
const deepMerge = (target, ...sources) => {
    if (!sources.length) {
        return target
    }
    const source = sources.shift()
  
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} }) 
                }
                deepMerge(target[key], source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }
  
    return deepMerge(target, ...sources);
}

export default {
    hash,
    getDate,
    getTime,
    getDateTime,
    getBaseName,
    getPath,
    allow,
    removeFile,
    deepMerge
}