export default class Router {
    constructor() {
        this.routeMap = {
            ANY:    [],
            GET:    [],
            POST:   [],
            PUT:    [],
            DELETE: []
        }
    }

    use(route, fn) {
        this.routeMap['ANY'].push(this.setRoute(route, fn))
    }
    get(route, fn) {
        this.routeMap['GET'].push(this.setRoute(route, fn))
    }
    post(route, fn) {
        this.routeMap['POST'].push(this.setRoute(route, fn))
    }
    put(route, fn) {
        this.routeMap['PUT'].push(this.setRoute(route, fn))
    }
    delete(route, fn) {
        this.routeMap['DELETE'].push(this.setRoute(route, fn))
    }

    setRoute(route, fn) {
        const r = {
           path:  String(route).split('/'),
           fn:    fn,
           prams: []
        }
        r.path.splice(0, 1)
        for (let i = 0; i < r.path.length; i++) {
            if (r.path[i][0] === ':') {
                r.prams.push({index: i, name: r.path[i].slice(1)})
                r.path[i] = undefined
            }
        }
        return r
    }

    Match(req, res) {
        const index = req.index
        if (this.find('ANY', req, res)) {
            return true
        }
        req.index = index
        return this.find(req.method, req, res)
    }

    find(method, req, res) {
        for (const route of this.routeMap[method]) {
            let index = req.index
            let flag  = true
            for (const path of route.path) {
                if (path !== undefined && path !== req.path[index]) {
                    flag = false
                    break
                }
                index++
            }
            if (flag) {
                for (const pram of route.prams) {
                    Object.defineProperty(req.prams, String(pram.name), {
                        value: req.path[req.index + pram.index]
                    })
                }
                req.index = index
                route.fn(req, res)
                return true
            }
        }
        return false
    }
}