import * as http from 'http'

import { Request, bodyParser } from './request'
import { Response, cors }      from './response'
import Router                  from './router'

import AccountRouter   from './routes/Account'
import AdvertiseRouter from './routes/Advertise'
import ArticleRouter   from './routes/Article'
import CommentRouter   from './routes/Comment'
import FileRouter      from './routes/File'
import GroupRouter     from './routes/Group'

const router = new Router()

router.use(bodyParser)
router.use(cors)

router.use('/account',   AccountRouter)
router.use('/advertise', AdvertiseRouter)
router.use('/article',   ArticleRouter)
router.use('/comment',   CommentRouter)
router.use('/file',      FileRouter)
router.use('/group',     GroupRouter)

const server = http.createServer(async (req, res) => {
    const request  = new Request(req)
    const response = new Response(res)
    if (!(await router.Match(request, response))) {
        res.writeHead(400)
        res.end()
    }
})

server.listen(3000)
server.on('listening', () => {
    console.log('Node.js web server at localhost:3000 is running...')
})