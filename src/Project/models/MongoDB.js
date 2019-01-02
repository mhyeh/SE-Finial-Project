import * as uuid from 'uuid'

import { MongoDB } from './Connection'

import utils from '../Utils'

export default class Model {
    constructor(table='') {
        this.db         = 'mongo'
        this.connection = MongoDB
        this.table      = table
        this.lastWhere  = ''
        this.skip       = -1
        this.pageSize   = -1
        this.queryObj   = {}
        this.whereObj   = {}
        this.orderBy    = {}
        this.compareOP  = {
            ">":  "$gt",
            ">=": "$gte",
            "<":  "$lt",
            "<=": "$lte",
            "<>": "$ne"
        }
    }

    select() {
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] === '*') {
                continue
            } else {
                this.queryObj[arguments[i]] = 1
            }
        }
        return this
    }

    where() {
        this.whereObj = this.whereArg(...arguments)
        return this
    }

    whereIn(col, vals) {
        this.whereObj[col] = this.in(vals)
        return this
    }

    in(vals){
        const obj = { $in: [] }
        for (const val of vals) {
            obj['$in'].push(val)
        }
        return obj
    }

    andWhere() {
        const next = this.whereArg(...arguments)
        if (!(this.whereObj['$or'] && next['$or'])) {
            this.whereObj = utils.deepMerge(this.whereObj, next)
        } else {
            this.and(next)
        }
        return this
    }
    
    andWhereIn(col, vals) {
        const next = {}
        next[col] = this.in(vals)
        if (!this.whereObj['$or']) {
            this.whereObj = utils.deepMerge(this.whereObj, next)
        } else {
            this.and(next)
        }
        return this
    }

    and(next) {
        if (this.lastWhere === 'and') {
            this.whereObj['$and'].push(next)
        } else {
            this.whereObj = {
                $and: [this.whereObj, next]
            }
        }
        this.lastWhere = 'and'
    }

    orWhere() {
        if (this.lastWhere === 'or') {
            this.whereObj['$or'].push(this.whereArg(...arguments))
        } else {
            this.whereObj = {
                $or: [this.whereObj, this.whereArg(...arguments)]
            }
        }
        this.lastWhere = 'or'
        return this
    }

    orWhereIn(cal, vals) {
        const next = {}
        next[cal] = this.in(vals)
        if (this.lastWhere === 'or') {
            this.whereObj['$or'].push(next)
        } else {
            this.whereObj = {
                $or: [this.whereObj, next]
            }
        }
        this.lastWhere = 'or'
        return this
    }

    whereArg(...args) {
        let whereObj = {}
        if (args.length === 1) {
            return args[0]
        } else if (args.length === 2) {
            if (!whereObj[args[0]]) {
                whereObj[args[0]] = { $in: [args[1]] }
            } else {
                whereObj[args[0]]['$in'].push(args[1])
            }
        } else {
            if (args[1] === 'like') {
                whereObj[args[0]] = new RegExp(args[2])
            } else {
                if (!whereObj[args[0]]) {
                    whereObj[args[0]] = {}
                }
                whereObj[args[0]][this.compareOP[args[1]]] = args[2]
            }
        }
        return whereObj
    }

    page(pageNum, pageSize) {
        if (pageNum)  {
            this.skip = pageNum * pageSize
        }
        this.pageSize = pageSize
        return this
    }

    raw(obj) {
        return new Promise((resolve, reject) => {
            this.connection.then(db => {
                return db.db().collection(this.table).aggregate(obj).toArray()
            }).then(res => {
                this.flush()
                resolve(res)
            }).catch(() => {
                this.flush()
                reject(this.table + ' raw error')
            })
        })
    }

    sortBy(col, direct) {
        this.orderBy[col] = direct
        return this
    }

    query() {
        return new Promise((resolve, reject) => {
            this.connection.then(db => {
                const query = db.db().collection(this.table).find(this.whereObj, this.queryObj)
                if (Object.keys(this.orderBy).length) {
                    query.sort(this.orderBy)
                }
                if (this.skip >= 0) {
                    query.skip(this.skip)
                }
                if (this.pageSize >= 0) {
                    query.limit(this.pageSize)
                }
                return query.toArray()
            }).then(res => {
                this.flush()
                resolve(res)
            }).catch(() => {
                this.flush()
                reject(this.table + ' get error')
            })
        })
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            data.id = uuid.v4()
            this.connection.then(db => {
                return db.db().collection(this.table).insertOne(data)
            }).then(() => {
                this.flush()
                resolve(data.id)
            }).catch(() => {
                this.flush()
                reject(this.table + ' insert error')
            })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            this.connection.then(db => {
                const newVal = {
                    $set: data
                }
                return db.db().collection(this.table).updateMany(this.whereObj, newVal)
            }).then(() => {
                this.flush()
                resolve()
            }).catch(() => {
                this.flush()
                reject(this.table + ' update error')
            })
        })
    }

    del() {
        return new Promise((resolve, reject) => {
            this.connection.then(db => {
                return db.db().collection(this.table).deleteMany(this.whereObj)
            }).then(() => {
                this.flush()
                resolve()
            }).catch(() => {
                this.flush()
                reject(this.table + ' delete error')
            })
        })
    }

    flush() {
        this.whereObj  = {}
        this.queryObj  = {}
        this.orderBy   = {}
        this.lastWhere = ''
        this.skip      = -1
        this.pageSize  = -1
    }
}