import * as uuid from 'uuid'

import { MongoDB } from './Connection'

import utils from '../Utils'

export default class Model {
    constructor(table) {
        this.connection = MongoDB
        this.table      = table
        this.lastWhere  = ''
        this.queryObj   = {}
        this.whereObj   = {}
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

    andWhere() {
        const next = this.whereArg(...arguments)
        if (!(this.whereObj['$or'] && next['$or'])) {
            this.whereObj = utils.deepMerge(this.whereObj, next)
        } else {
            if (this.lastWhere === 'and') {
                this.whereObj['$and'].push(this.whereArg(...arguments))
            } else {
                this.whereObj = {
                    $and: [this.whereObj, this.whereArg(...arguments)]
                }
            }
            this.lastWhere = 'and'
        }
        return this
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

    query() {
        return new Promise((resolve, reject) => {
            this.connection.then(db => {
                return db.db().collection(this.table).find(this.whereObj, this.queryObj).toArray()
            }).then(res => {
                this.flush()
                resolve(res)
            }).catch(err => {
                this.flush()
                reject(err)
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
                resolve()
            }).catch(err => {
                console.log(err)
                this.flush()
                reject(err)
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
            }).catch(err => {
                this.flush()
                reject(err)
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
            }).catch(err => {
                this.flush()
                reject(err)
            })
        })
    }

    flush() {
        this.whereObj  = {}
        this.queryObj  = {}
        this.lastWhere = ''
    }
}