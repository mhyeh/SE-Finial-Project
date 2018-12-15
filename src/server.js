import * as http from 'http'

import Router   from './router'
import Request  from './request'
import Response from './response'

import AccountRouter from './routes/Account'

const router = new Router()

router.use('/account', (req, res) => AccountRouter.router.Match(req, res))

const server = http.createServer((req, res) => {
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