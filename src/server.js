import * as http from 'http'

import Router   from './router'
import Request  from './request'
import Response from './response'

import AccountRouter from './routes/Account'
import ArticleRouter from './routes/Article'
import CommentRouter from './routes/Comment'
import GroupRouter   from './routes/Group'

const router = new Router()

router.use('*',        (req)      => req.ParseBody())
router.use('/account', (req, res) => AccountRouter.Match(req, res))
router.use('/article', (req, res) => ArticleRouter.Match(req, res))
router.use('/comment', (req, res) => CommentRouter.Match(req, res))
router.use('/group',   (req, res) => GroupRouter.Match(req, res))

const server = http.createServer(async (req, res) => {
    const request  = new Request(req)
    const response = new Response(res)
    await request.ParseBody()
    if (!router.Match(request, response)) {
        res.writeHead(400)
        res.end()
    }
})

server.listen(3000)
server.on('listening', () => {
    console.log('Node.js web server at localhost:3000 is running...')
})