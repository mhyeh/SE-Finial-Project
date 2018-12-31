import * as uuid from 'uuid'

import { MySQL } from './Connection'

export default class Model {
    constructor(table='') {
        this.db         = 'maria'
        this.connection = MySQL
        this.table      = table
        this.queryStr   = ''
        this.whereStr   = ''
        this.lastWhere  = ''
        this.whereParam = []
        this.compareOP  = {
            '$gt':  '>',
            '$gte': '>=',
            '$lt':  '<',
            '$lte': '<=',
            '$ne':  '<>'
        }
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
        this.whereStr += `${this.whereArg(undefined, this.whereParam, ...arguments)}`
        return this
    }

    whereIn(col, vals) {
        this.queryStr += ' where '
        this.whereStr += this.in(col, vals)
        return this
    }

    in(col, vals) {
        let str = `\`${col}\` in (`
        for (const val of vals) {
            str += '?,'
            this.whereParam.push(val)
        }
        return str.slice(0, -1) + ')'
    }

    andWhere() {
        if (this.lastWhere === 'and') {
            this.whereStr = `${this.whereStr} and ${this.whereArg(undefined, this.whereParam, ...arguments)}`
        } else {
            this.whereStr = `(${this.whereStr}) and ${this.whereArg(undefined, this.whereParam, ...arguments)}`
        }
        this.lastWhere = 'and'
        return this
    }

    andWhereIn(col, vals) {
        if (this.lastWhere === 'and') {
            this.whereStr = `${this.whereStr} and ${this.in(col, vals)}`
        } else {
            this.whereStr = `(${this.whereStr}) and ${this.in(col, vals)}`
        }
        this.lastWhere = 'and'
    }

    orWhere() {
        this.whereStr  = `${this.whereStr} or ${this.whereArg(undefined, this.whereParam, ...arguments)}`
        this.lastWhere = 'or'
        return this
    }

    orWhereIn(col, vals) {
        this.whereStr  = `${this.whereStr} or ${this.in(col, vals)}`
        this.lastWhere = 'or'
        return this
    }

    whereArg(type, whereParam, ...args) {
        if (args.length === 1) {
            args = args[0]
            let whereStr = ''
            if (type === '$or') {
                for (const arg of args) {
                    whereStr += ` or ${this.whereArg(undefined, whereParam, arg)}`
                }
                return `(${whereStr.slice(4)})`
            } else if (type === '$and') {
                for (const arg of args) {
                    whereStr += ` and ${this.whereArg(undefined, whereParam, arg)}`
                }
                return `${whereStr.slice(5)}`
            } else {
                for (const arg in args) {
                    if (arg === '$or' || arg === '$and') {
                        whereStr += ` and ${this.whereArg(arg, whereParam, args[arg])}`
                    } else if (typeof args[arg] === "object") {
                        for (const op in args[arg]) {
                            whereStr += ` and ${this.whereArg(undefined, whereParam, arg, op, args[arg][op])}`
                        }
                    } else {
                        whereStr += ` and ${this.whereArg(undefined, whereParam, arg, args[arg])}`
                    }
                }
                return `${whereStr.slice(5)}`
            }
        } else if (args.length === 2) {
            whereParam.push(args[1])
            return `\`${args[0]}\` = ?`
        } else if (args[1] === 'like') {
            whereParam.push('%' + args[2] + '%')
            return `\`${args[0]}\` like ?`
        } else {
            if (args[1] in this.compareOP) {
                args[1] = this.compareOP[args[1]]
            }
            whereParam.push(args[2])
            return `\`${args[0]}\` ${args[1]} ?`
        }
    }

    async raw(str) {
        this.queryStr = str
        return await this.query()
    }

    query() {
        return new Promise((resolve, reject) => {
            this.connection.query(this.queryStr + this.whereStr, this.whereParam, (err, results) => {
                this.flush()
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
            data.id     = uuid.v4()
            const param = []

            this.queryStr = `insert into \`${this.table}\` (`
            for (const prop in data) {
                this.queryStr += `\`${prop}\`,`
            }
            this.queryStr = this.queryStr.slice(0, -1) + ') values ('
            for (const prop in data) {
                this.queryStr += `?,`
                param.push(data[prop])
            }
            this.queryStr = this.queryStr.slice(0, -1) + ')'
            this.connection.query(this.queryStr, param, (err) => {
                this.flush()
                if (err) {
                    reject(err)
                    return
                }
                resolve(data.id)
            })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            const param = []
            let   str   = `update \`${this.table}\` set`
            for (const prop in data) {
                str += `\`${prop}\` = ?,`
                param.push(data[prop])
            }
            this.queryStr = str.slice(0, -1) + this.queryStr + this.whereStr
            this.connection.query(this.queryStr, param, (err, results) => {
                this.flush()
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
            this.queryStr = `delete from \`${this.table}\`` + this.queryStr + this.whereStr
            this.connection.query(this.queryStr, (err, results) => {
                this.flush()
                if (err) {
                    reject(err)
                    return
                }
                resolve(results)
            })
        })
    }

    flush() {
        this.queryStr   = ''
        this.whereStr   = ''
        this.lastWhere  = ''
        this.whereParam = []
    }
}