export default function bodyParser(req) {
    return new Promise((resolve, reject) => {
        if ((req.method === 'POST' || req.method === 'PUT') && req.header['content-type'] === 'application/json') {
            let jsonStr = ''
            req.req.on('data', (data) => {
                jsonStr += data
            })
            req.req.on('end', () => {
                req.body = JSON.parse(jsonStr)
                resolve()
            })
        } else {
            resolve()
        }
    })
}