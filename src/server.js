import * as http from 'http'

import Request  from './request'
import Response from './response'
import Router   from './router'

import AccountRouter   from './routes/Account'
import AdvertiseRouter from './routes/Advertise'
import ArticleRouter   from './routes/Article'
import CommentRouter   from './routes/Comment'
import FileRouter      from './routes/File'
import GroupRouter     from './routes/Group'

const router = new Router()

router.use('*', (req, res) => req.ParseBody())
router.use('*', (req, res) => res.cors())

router.use('/account',   (req, res) => AccountRouter.Match(req, res))
router.use('/advertise', (req, res) => AdvertiseRouter.Match(req, res))
router.use('/article',   (req, res) => ArticleRouter.Match(req, res))
router.use('/comment',   (req, res) => CommentRouter.Match(req, res))
router.use('/file',      (req, res) => FileRouter.Match(req, res))
router.use('/group',     (req, res) => GroupRouter.Match(req, res))

const server = http.createServer(async (req, res) => {
    const request  = new Request(req)
    const response = new Response(res)
    if (!router.Match(request, response)) {
        res.writeHead(400)
        res.end()
    }
})

server.listen(3000)
server.on('listening', () => {
    console.log('Node.js web server at localhost:3000 is running...')
})