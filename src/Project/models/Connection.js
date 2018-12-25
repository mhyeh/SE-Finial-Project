import * as mysql from 'mysql'
import * as mongodb from 'mongodb'

export const MySQL = mysql.createConnection(require('../../../configs/mysql.config.json'))
export const MongoDBClient = mongodb.MongoClient
