import { MongoDB } from './Connection'

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
        this.whereArg(arguments)
        return this
    }

    andWhere() {
        this.whereArg(arguments)
        return this
    }

    orWhere() {
    }

    whereArg() {
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
            this.connection.collection(this.table).find(this.whereStr, this.projStr).then(res => {
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
            this.connection.collection(this.table).insertOne(data).then(res => {
                this.flush()
                resolve(res)
            }).catch(err => {
                this.flush()
                reject(err)
            })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            this.connection.collection(this.table).updateOne(this.whereStr, data).then(res => {
                this.flush()
                resolve(res)
            }).catch(err => {
                this.flush()
                reject(err)
            })
        })
    }

    del() {
        return new Promise((resolve, reject) => {
            this.connection.collection(this.table).deleteMany(this.whereStr).then(res => {
                this.flush()
                resolve(res)
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