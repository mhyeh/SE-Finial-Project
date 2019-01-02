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

const checkAllow = (data, accept) => {
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
                reject('remove file error')
                return
            }
            resolve()
        })
    });
}

const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item)
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
            } else if (target[key] instanceof Array && source[key] instanceof Array) {
                target[key] = target[key].concat(source[key])
            } else {
                Object.assign(target, { [key]: source[key] })
            }
        }
    }
  
    return deepMerge(target, ...sources)
}

const errorHandle = (e, defaultThrow) => {
    switch (typeof e) {
        case 'string':
            return e
        default:
            return defaultThrow
    }
}

const hasValue = (v, dataType) => {
    if (v === undefined) {
        return false
    }
    let flag = false
    switch (dataType) {
        case 'string':
            flag = typeof v === 'string' && v !== ''
            break
        case 'number':
            flag = !isNaN(parseInt(v))
            break
        case 'object':
            flag = isObject(v) && Object.keys(v).length !== 0
            break
        case 'array':
            flag = v instanceof Array && v[0] !== undefined
            break
    }
    return flag
}

const trimData = (data) => {
    for (col in data) {
        if (typeof data[col] === 'string') {
            data[col] = data[col].tirm()
        }
    }
}

const filterData = (data) => {
    for (const col in data) {
        if (!hasValue(data[col], 'string')) {
            delete data[col]
        }
    }
}

export default {
    hash,
    getDate,
    getTime,
    getDateTime,
    getBaseName,
    getPath,
    checkAllow,
    removeFile,
    deepMerge,
    errorHandle,
    hasValue,
    trimData,
    filterData
}