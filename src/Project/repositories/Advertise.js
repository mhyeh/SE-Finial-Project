import Model from '../models/Model'

import errorLog from '../ErrorLog'
import utils    from '../Utils'

export default class Advertise {
    constructor() {
        this.AdModel    = new Model('ad')
        this.AdposModel = new Model('ad_pos')
    }

    async getAllAdvertises() {
        if (this.AdModel.db === 'mongo') {
            return await (new Model('ad')).raw([
                { $lookup: {from: 'ad_pos', localField: 'id', foreignField: 'ad', as: 'pos'} },
                { $unwind: '$pos' },
                { $project: {'id': 1, 'context': 1, 'author': 1, 'image': 1, 'price': '$pos.price', 'position': '$pos.position'} }
            ])
        } else {
            return await (new Model('ad')).raw('select `ad`.*, `ad_pos`.`price` from `ad` join `ad_pos` on `ad`.`id` = `ad_pos`.`ad`')
        }
    }

    async getAdvertisePos(pos) {
        if (!utils.hasValue(pos, 'number')) {
            throw errorLog.inputNotAccept()
        }
        pos = parseInt(pos)
        return (await (new Model('ad_pos')).select('*').where('position', pos).query())[0]
    }

    async getAdvertisePosList() {
        return await (new Model('ad_pos')).select('*').query()
    }

    async getAdvertiseByID(id) {
        return (await (new Model('ad')).select('*').where('id', id).query())[0]
    }

    async getAdvertisesByAccount(accountID) {
        let posList = await this.getAdvertisePosList()
        if (utils.hasValue(posList, 'array')) {
            return []
        }
        posList = posList.map(pos => pos.ad)
        return await (new Model('ad')).select('*').whereIn('id', posList).andWhere('author', accountID).query()
    }

    async getAdvertiseByPos(pos) {
        if (!utils.hasValue(pos, 'number')) {
            throw errorLog.inputNotAccept()
        }
        pos = parseInt(pos)
        const ad_pos = (await (new Model('ad_pos')).select('*').where('position', pos).query())[0]
        if (!utils.hasValue(ad_pos, 'object')) {
            throw errorLog.dataNotFound('ad_pos')
        }
        return await this.getAdvertiseByID(ad_pos.ad)
    }

    async create(pos, data, price) {
        const insertID = await (new Model('ad')).insert(data)
        await (new Model('ad_pos')).where('position', pos).update({ ad: insertID, price: price })
    }

    async edit(id, data) {
        const promise = []
        const ad      = await this.getAdvertiseByID(id)
        if (data.image && ad.image) {
            promise.push(utils.removeFile(utils.getPath('uploadedFiles', ad.image)))
        }
        promise.push((new Model('ad')).where('id', id).update(data))
        await Promise.all(promise)
    }
    
    async delete(id) {
        const promise = []
        const ad      = await this.getAdvertiseByID(id)
        if (ad.image) {
            promise.push(utils.removeFile(utils.getPath('uploadedFiles', ad.image)))
        }
        await Promise.all(promise.concat([(new Model('ad')).where('id', id).del(), (new Model('ad_pos')).where('ad', id).update({ ad: '' })]))
    }
}