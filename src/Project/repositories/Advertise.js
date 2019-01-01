import Model from '../models/Model'

import utils from '../Utils'

export default class Advertise {
    constructor() {
        this.AdModel    = new Model('ad')
        this.AdposModel = new Model('ad_pos')
    }

    async getAllAdvertises() {
        let posList = await this.getAdvertisePosList()
        if (posList.length === 0) {
            return []
        }
        posList = posList.map(pos => pos.ad)
        try {
            return await this.AdModel.select('*').whereIn('id', posList).query()
        } catch (e) {
            throw 'get advertise error'
        }
    }

    async getAdvertisePos(pos) {
        try {
            return (await this.AdposModel.select('*').where('position', parseInt(pos)).query())[0]
        } catch (e) {
            throw 'get advertise error'
        }
    }

    async getAdvertisePosList() {
        try {
            return await this.AdposModel.select('*').query()
        } catch (e) {
            throw 'get advertise pos list error'
        }
    }

    async getAdvertiseByID(id) {
        try {
            return (await this.AdModel.select('*').where('id', id).query())[0]
        } catch (e) {
            throw 'get advertise error'
        }
    }

    async getAdvertisesByAccount(accountID) {
        let posList = await this.getAdvertisePosList()
        if (posList.length === 0) {
            return []
        }
        try {
            posList = posList.map(pos => pos.ad)
            return await this.AdModel.select('*').whereIn('id', posList).andWhere('author', accountID).query()
        } catch (e) {
            throw 'get advertise error'
        }
    }

    async getAdvertiseByPos(pos) {
        try {
            const ad_pos = (await this.AdposModel.select('*').where('position', parseInt(pos)).query())[0]
            return await this.getAdvertiseByID(ad_pos.ad)
        } catch (e) {
            throw 'get advertise error'
        }
    }

    async create(pos, data) {
        try {
            const insertID = await this.AdModel.insert(data)
            await this.AdposModel.where('position', parseInt(pos)).update({ ad: insertID })
        } catch (e) {
            throw 'insert advertise error'
        }
    }

    async edit(id, data) {
        try {
            await this.AdModel.where('id', id).update(data)
        } catch (e) {
            throw 'update advertise error'
        }
    }
    
    async delete(id) {
        const ad = await this.getAdvertiseByID(id)
        if (ad.image) {
            utils.removeFile(utils.getPath('uploadedFiles', ad.image))
        }
        try {
            await this.AdModel.where('id', id).del()
            await this.AdposModel.where('ad', id).update({ ad: ''})
        } catch (e) {
            throw 'delete advertise error'
        }
    }
}