import { MySQL } from './Connection'

export default class Model {
    constructor(table) {
        this.connection = MySQL
        this.table      = table
        this.queryStr   = ''
    }

    select() {
        this.queryStr = 'select '
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] === '*') {
                this.queryStr += `${arguments[i]}`
            } else {
                this.queryStr += `'${arguments[i]}'`
            }
            if (i !== arguments.length - 1) {
                this.queryStr += ','
            }
        }
        this.queryStr += ` from \`${this.table}\``
        return this
    }

    where() {
        this.queryStr += ' where '
        this.whereArg(arguments)
        return this
    }

    andWhere() {
        this.queryStr += ' and '
        this.whereArg(arguments)
        return this
    }

    orWhere() {
        this.queryStr += ' or '
        this.whereArg(arguments)
        return this
    }

    whereArg() {
        if (arguments.length === 2) {
            this.queryStr += `\`${arguments[0]}\` = '${arguments[1]}'`
        } else {
            this.queryStr += `\`${arguments[0]}\` ${arguments[1]} ${'%' + arguments[2] + '%'}`
        }
    }

    query() {
        return new Promise((resolve, reject) => {
            this.connection.query(this.queryStr, (err, results) => {
                this.queryStr = ''
                if (err) {
                    reject(err)
                    return
                }
                resolve(results)
            })
        })
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            this.queryStr = `insert into \`${this.table}\` (`
            for (const prop in data) {
                this.queryStr += `\`${prop}\`,`
            }
            this.queryStr = this.queryStr.slice(0, -1) + ') values ('
            for (const prop in data) {
                this.queryStr += `'${data[prop]}',`
            }
            this.queryStr = this.queryStr.slice(0, -1) + ')'
            this.connection.query(this.queryStr, (err) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve()
            })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            let str = `update \`${this.table}\` set`
            for (const prop in data) {
                str += `\`${prop}\` = '${data[prop]}',`
            }
            this.queryStr = str.slice(0, -1) + this.queryStr
            this.connection.query(this.queryStr, (err, results) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(results)
            })
        })
    }

    del() {
        return new Promise((resolve, reject) => {
            this.queryStr = `delete from \`${this.table}\`` + this.queryStr
            this.connection.query(this.queryStr, (err, results) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(results)
            })
        })
    }
}