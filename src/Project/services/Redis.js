import * as redis  from 'redis'
import * as crypto from 'crypto'

export default class Redis {
    constructor() {
        this.client = redis.createClient()
        this.hash   = crypto.createHash('sha256')
    }

    GenerateToken() {
        const rand = Math.random()
        return this.hash.update(rand.toString()).digest('hex')
    }

    async Store(token, id) {
        try {
            const token = await this.get(id)
            await this.client.del(token)
        } catch (e) {

        }
        await this.client.set(token, id)
        await this.client.set(id, token)
    }

    async Verify(token) {
        try {
            return await this.get(token)
        } catch (e) {
            return -1
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
}