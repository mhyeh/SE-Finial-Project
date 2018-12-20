import * as mysql from 'mysql'

export default Connection = mysql.createConnection(require('../../../configs/mysql.config.json'))