import { MongoDB } from './Connection'

export default class Model {
    constructor(table) {
        this.connection = MongoDB
        this.table      = table
        this.url        = 'mongodb://localhost:27017/sefin'
        this.projStr   = { '_id': 0 }
        this.whereStr   = {}
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
            this.whereStr[arguments[0]] = `\\${arguments[2]}\\`
        }
    }

    query() {
        return new Promise((resolve, reject) => {
            this.MongoDB.connect(this.url, (err, db) => {
                if (err) {
                    throw err
                }
                db.collection(this.table).find(whereStr, projStr, (err, res) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(res)
                })
                db.close()
            })
        })
    }

    insert(data) {
        return new Promise((resolve, reject) => {
            this.MongoDB.connect(this.url, (err, db) => {
                if (err) {
                    throw err
                }
                db.collection(this.table).insertOne(data, (err, res) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(res)
                })
                db.close()
            })
        })
    }

    update(data) {
        return new Promise((resolve, reject) => {
            this.MongoDB.connect(this.url, (err, db) => {
                if (err) {
                    throw err
                }
                db.collection(this.table).updateOne(this.whereStr, data, (err, res) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(res)
                })
                db.close()
            })
        })
    }

    del() {
        return new Promise((resolve, reject) => {
            this.MongoDB.connect(this.url, (err, db) => {
                if (err) {
                    throw err
                }
                db.collection(this.table).deleteMany(this.whereStr, (err, res) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    resolve(res)
                })
                db.close()
            })
        })
    }
}