import MongoDB from './MongoDB'
import Mysql   from './MySQL'

export default process.env.DB === 'mongo' ? MongoDB : Mysql