import * as mysql from 'mysql'

export const MySQL = mysql.createConnection(require('../../../configs/mysql.config.json'))
// export const H2Connection = mysql.createConnection(require('../../../configs/H2.config.json'))
