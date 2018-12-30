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

    async getAdvertisePos(pos) {
        return (await this.AdposModel.select('*').where('position', pos).query())[0]
    }

    async getAdvertisePosList() {
        return await this.AdposModel.select('*').query()
    }

    async getAdvertiseByID(id) {
        return (await this.AdModel.select('*').where('id', id).query())[0]
    }

    async getAdvertisesByAccount(accountID) {
        return await this.AdModel.select('*').where('author', accountID).query()
    }

    async getAdvertiseByPos(pos) {
        const pos = (await this.AdposModel.select('*').where('position', pos).query())[0]
        return await this.getAdvertiseByID(pos.ad)
    }

    async create(pos, data) {
        if (!utils.allow(data, ['context', 'author', 'image'])) {
            throw 'not accept'
        }
        const insertID = await this.AdModel.insert(data)
        await this.AdposModel.where('position', pos).update({ ad: insertID })
    }

    async edit(id, data) {
        if (!utils.allow(data, ['context', 'image'])) {
            throw 'not accept'
        }
        await this.AdModel.where('id', id).update(data)
    }
    
    async delete(id) {
        await this.AdModel.where('id', id).del()
        await this.AdposModel.where('ad', id).update({ ad: ''})
    }
}