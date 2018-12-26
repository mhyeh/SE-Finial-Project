import { MongoDB } from './Connection'
import * as mongo from 'mongodb'

export default class Model {
    constructor(table) {
        this.connection = MongoDB
        this.table      = table
        this.projStr    = {}
        this.whereStr   = {}
        this.compareOP  = {
            ">":  "$gt",
            ">=": "$gte",
            "<":  "lt",
            "<=": "lte"
        }
    }

    select() {
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] === '*') {
                continue
            } else {
                this.projStr[arguments[i]] = 1
            }
        }
        return this
    }

    where() {
        this.whereArg(...arguments)
        return this
    }

    andWhere() {
        this.whereArg(...arguments)
        return this
    }

    orWhere() {
    }

    whereArg() {
        if (arguments[0] === "id") {
            arguments[0] = "_id"
            arguments[arguments.length - 1] = new mongo.ObjectID(arguments[arguments.length - 1])
        }
        if (arguments.length === 2) {
            this.whereStr[arguments[0]] = arguments[1]
        } else {
            if (arguments[1] === 'like') {
                this.whereStr[arguments[0]] = `/${arguments[2]}/`
            } else {
                if (!this.whereStr[arguments[0]]) {
                    this.whereStr[arguments[0]] = {}
                }
                this.whereStr[arguments[0]][this.compareOP[arguments[1]]] = arguments[2]
            }
        }
    }

    query() {
        return new Promise((resolve, reject) => {
            this.connection.then(db => {
                return db.db().collection(this.table).find(this.whereStr, this.projStr).toArray()
            }).then(res => {
                this.flush()
                for (const element of res) {
                    element['id'] = String(element['_id'])
                }
                resolve(res)
            }).catch(err => {
                this.flush()
                reject(err)
            })
        })
    }

    insert(data) {
        return new Promise((resolve, reject) => {
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
                return db.db().collection(this.table).updateMany(this.whereStr, newVal)
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
                return db.db().collection(this.table).deleteMany(this.whereStr)
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
        this.whereStr = {}
        this.projStr  = {}
    }
}