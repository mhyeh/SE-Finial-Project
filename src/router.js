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

    use() {
        if (arguments.length === 1) {
            this.routeMap['ANY'].push(this.setRoute('*', arguments[0]))
        } else {
            this.routeMap['ANY'].push(this.setRoute(arguments[0], arguments[1]))
        }
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
        if (route === '*') {
            return {
                path: '*',
                fn:   fn
            }
        }
        const r = {
           path:   String(route).split('/'),
           fn:     fn,
           params: []
        }
        r.path.splice(0, 1)
        for (let i = 0; i < r.path.length; i++) {
            if (r.path[i][0] === ':') {
                r.params.push({index: i, name: r.path[i].slice(1)})
                r.path[i] = undefined
            }
        }
        return r
    }

    async Match(req, res) {
        const index = req.index
        if (await this.find('ANY', req, res)) {
            return true
        }
        req.index = index
        return await this.find(req.method, req, res)
    }

    async find(method, req, res) {
        for (const route of this.routeMap[method]) {
            if (route.path === '*') {
                await route.fn(req, res)
                continue
            }
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
                for (const param of route.params) {
                    Object.defineProperty(req.params, String(param.name), {
                        value: req.path[req.index + param.index]
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