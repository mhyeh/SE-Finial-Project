import Model from '../models/MongoDB'

import utils from '../Utils'

export default class Advertise {
    constructor() {
        this.AdModel    = new Model('ad')
        this.AdposModel = new Model('ad_pos')
    }

    async getAllAdvertises() {
        return await this.AdModel.select('*').query()
    }

    async getAdvertiseByPos(pos) {
        return (await this.AdposModel.select('*').where('position', pos).query())[0]
    }

    async getAdvertiseByID(id) {
        return (await this.AdModel.select('*').where('id', id).query())[0]
    }

    async getAdvertisesByAccount(accountID) {
        return await this.AdModel.select('*').where('author', accountID).query()
    }

    async create(pos, data) {
        if (!utils.allow(data, ['context', 'author', 'image'])) {
            throw 'not accept'
        }
        await this.AdModel.insert(data)
        const AdData    = (await this.AdModel.select('*').where('author', data.author).andWhere('context', data.context).andWhere('image', data.image).query())[0]
        const AdposData = { ad: AdData.id }
        await this.AdposModel.where('pos', pos).update(AdposData)
    }

    async edit(id, data) {
        if (!utils.allow(data, ['context', 'image'])) {
            throw 'not accept'
        }
        await this.AdModel.where('id', id).update(data)
    }
    
    async delete(id) {
        await this.AdModel.where('id', id).del()
    }
}