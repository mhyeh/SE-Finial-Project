import Model from '../models/MongoDB'

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

    async create(pos, data) {
        await this.AdModel.insert(data)
        const AdData    = (await this.AdModel.select('*').where('author', data.author).query())[0]
        const AdposData = { ad: AdData.id }
        await this.AdposModel.where('pos', pos).update(AdposData)
    }

    async edit(id, data) {
        await this.AdModel.where('id', id).update(data)
    }
    
    async Delete(id) {
        await this.AdModel.where('id', id).del()
    }
}