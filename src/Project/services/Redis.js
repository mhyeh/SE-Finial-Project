import * as redis from 'redis'

import utils from '../Utils'

export default class Redis {
    constructor() {
        this.client = redis.createClient()
    }

    GenerateToken() {
        const rand = Math.random()
        return utils.hash(String(rand))
    }

    async Store(token, id) {
        try {
            const token = await this.get(id)
            await this.del(token)
        } catch (e) {

        }
        await this.set(token, id)
        await this.set(id, token)
    }

    async Verify(token) {
        try {
            return await this.get(token)
        } catch (e) {
            throw 'token verify error'
        }
    }

    get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, val) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(val)
            })
        })
    }

    set(key, val) {
        return new Promise((resolve, reject) => {
            this.client.set(key, val, (err, res) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve()
            })
        })
    }

    del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, res) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve()
            })
        })
    }
}