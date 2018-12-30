import Model from '../models/MongoDB'

import utils from '../Utils'

export default class Advertise {
    constructor() {
        this.AdModel    = new Model('ad')
        this.AdposModel = new Model('ad_pos')
    }

    async getAllAdvertises() {
        const posList = await this.getAdvertisePosList()
        if (posList.length === 0) {
            return []
        }
        return await this.AdModel.select('*').whereIn('id', posList).query()
    }

    async getAdvertisePos(pos) {
        return (await this.AdposModel.select('*').where('position', parseInt(pos)).query())[0]
    }

    async getAdvertisePosList() {
        return await this.AdposModel.select('*').query()
    }

    async getAdvertiseByID(id) {
        return (await this.AdModel.select('*').where('id', id).query())[0]
    }

    async getAdvertisesByAccount(accountID) {
        let posList = await this.getAdvertisePosList()
        if (posList.length === 0) {
            return []
        }
        posList = posList.map(pos => pos.ad)
        return await this.AdModel.select('*').whereIn('id', posList).andWhere('author', accountID).query()
    }

    async getAdvertiseByPos(pos) {
        const ad_pos = (await this.AdposModel.select('*').where('position', parseInt(pos)).query())[0]
        return await this.getAdvertiseByID(ad_pos.ad)
    }

    async create(pos, data) {
        if (!utils.allow(data, ['context', 'author', 'image'])) {
            throw 'not accept'
        }
        const insertID = await this.AdModel.insert(data)
        await this.AdposModel.where('position', parseInt(pos)).update({ ad: insertID })
    }

    async edit(id, data) {
        if (!utils.allow(data, ['context', 'image'])) {
            throw 'not accept'
        }
        await this.AdModel.where('id', id).update(data)
    }
    
    async delete(id) {
        const ad = await this.getAdvertiseByID(id)
        if (ad.image) {
            utils.removeFile(utils.getPath('uploadedFiles', ad.image))
        }
        await this.AdModel.where('id', id).del()
        await this.AdposModel.where('ad', id).update({ ad: ''})
    }
}