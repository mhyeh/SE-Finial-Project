let defaults = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
}

let options = {}

function isString(s) {
    return typeof s === 'string' || s instanceof String;
}

function isOriginAllowed(origin, allowedOrigin) {
    if (Array.isArray(allowedOrigin)) {
        for (var i = 0; i < allowedOrigin.length; i++) {
            if (isOriginAllowed(origin, allowedOrigin[i])) {
                return true;
            }
        }
        return false;
    } else if (isString(allowedOrigin)) {
        return origin === allowedOrigin;
    } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
    } else {
        return !!allowedOrigin;
    }
}

let configureOrigin = function(options, req) {
    const requestOrigin = req.header.origin
    const origin        = options.origin
    const headers       = []

    if (!origin || origin === '*') {
        headers.push({ key: 'Access-Control-Allow-Origin', value: '*' })
    } else if (isString(origin)) {
        headers.push({ key: 'Access-Control-Allow-Origin', value: options.origin })
        headers.push({ key: 'vary', value: 'Origin'})
    } else {
        const isAllowed = isOriginAllowed(requestOrigin, origin)
        headers.push({ key: 'Access-Control-Allow-Origin', value: isAllowed ? requestOrigin : false })
        headers.push({ key: 'vary', value: 'Origin'})
    }
    return headers
}

let configureCredentials = function(options) {
    if (options.credentials === true) {
        return { key: 'Access-Control-Allow-Credentials', value: 'true' }
    }
    return null
}

let configureMethods = function(options) {
    let methods = options.methods
    if (methods instanceof Array) {
        methods = methods.join(',')
    }
    return { key: 'Access-Control-Allow-Methods', value: methods }
}

let configureAllowedHeaders = function(options, req) {
    let   allowedHeaders = options.allowedHeaders || options.headers
    const headers        = []
    if (!allowedHeaders) {
        allowedHeaders = req.header['access-control-request-headers']
        headers.push({ key: 'vary', value: 'Access-Control-Request-Headers' })
    } else if (allowedHeaders instanceof Array) {
        allowedHeaders = allowedHeaders.join(',')
    }
    if (allowedHeaders && allowedHeaders.length) {
        headers.push({ key: 'Access-Control-Allow-Headers', value: allowedHeaders })
    }
    return headers
}

let configureMaxAge = function(options) {
    let maxAge = (typeof options.maxAge === 'number' || options.maxAge) && options.maxAge.toString()
    if (maxAge && maxAge.length) {
        return { key: 'Access-Control-Max-Age', value: maxAge }
    }
    return null;
}

let configureExposedHeaders = function(options) {
    let headers = options.exposedHeaders
    if (!headers) {
        return null;
    } else if (headers instanceof Array) {
        headers = headers.join(',')
    }

    if (headers && headers.length) {
        return { key: 'Access-Control-Expose-Headers', value: headers }
    }
    return null;
}

let applyHeaders = function(headers, res) {
    for (const header of headers) {
        if (header) {
            if (header instanceof Array) {
                applyHeaders(header, res)
            } else if (header.key === 'vary') {
                let val = res.hasHeader('Vary') ? res.getHeader('Vary') + `,${header.value}` : header.value
                res.setHeader('Vary', val)
            } else {
                res.setHeader(header.key, header.value)
            }
        }
    }
}

let corsSetting = async function(req, res) {
    let headers  = []
    const method = req.method
    console.log(options)
    if (method === 'OPTION') {
        headers.push(configureOrigin(options, req))
        headers.push(configureCredentials(options))
        headers.push(configureMethods(options))
        headers.push(configureAllowedHeaders(options, req))
        headers.push(configureMaxAge(options))
        headers.push(configureExposedHeaders(options))

        applyHeaders(headers, res.res)
    } else {
        headers.push(configureOrigin(options, req));
        headers.push(configureCredentials(options));
        headers.push(configureExposedHeaders(options));

        applyHeaders(headers, res.res);
    }
}


export default function cors(config=undefined) {
    options = defaults
    if (config) {
        for (const option in config) {
            options[option] = config[option]
        }
    }
    return corsSetting
}