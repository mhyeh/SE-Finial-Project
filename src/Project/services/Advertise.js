import AccountRepo   from '../repositories/Account'
import AdvertiseRepo from '../repositories/Advertise'
import FileService   from './File'

import utils from '../Utils'

export default class Advertise {
    constructor() {
        this.AdvertiseRepo = new AdvertiseRepo()
        this.AccountRepo   = new AccountRepo()
        this.FileService   = new FileService()
    }

    async Create(accountID, pos, req) {
        const promise = []
        promise.push(this.AdvertiseRepo.getAdvertisePos(pos))
        promise.push(this.AccountRepo.getAccountByID(accountID))
        promise.push(this.FileService.ProcFormData(req, { img: 1 }))

        const [ad_pos, account, formdata] = await Promise.all(promise) 
        
        const data  = formdata.fields
        const image = formdata.files.img

        if ((data.context === undefined || data.context === '') && image === undefined) {
            throw 'no input'
        }
        try {
            data.price = parseInt(data.price)
        } catch (e) {
            throw 'price should be int'
        }
        if (data.price === undefined || typeof data.price !== 'number') {
            if (image) {
                await utils.removeFile(image.path)
            }
            throw 'no price'
        }
        if (ad_pos.ad !== undefined && ad_pos.ad !== '' && ad_pos.price >= data.price) {
            if (image) {
                await utils.removeFile(image.path)
            }
            throw 'can not buy this'
        }
        if (account.NTUST_coin < data.price) {
            if (image) {
                await utils.removeFile(image.path)
            }
            throw 'no enough ntust coin'
        }

        const price = data.price
        delete data.price

        if (image !== undefined) {
            data.image = utils.getBaseName(image.path)
        }

        utils.checkAllow(data, ['context', 'image'])
        
        data.author = accountID
        
        account.NTUST_coin -= data.price
        await Promise.all([this.AdvertiseRepo.create(pos, data, price), this.AccountRepo.edit(account.id, { NTUST_coin: account.NTUST_coin })])
    }

    async Edit(accountID, id, req) {
        const [advertise, formdata] = await Promise.all(this.AdvertiseRepo.getAdvertiseByID(id), this.FileService.ProcFormData(req, { img: 1 }))
        const data  = formdata.fields
        const image = formdata.files.img

        if ((data.context === undefined || data.context === '') && image === undefined) {
            throw 'no input'
        }
        if (advertise === undefined) {
            if (image) {
                await utils.removeFile(image.path)
            }
            throw 'advertise not found'
        }
        if (advertise.author !== accountID) {
            if (image) {
                await utils.removeFile(image.path)
            }
            throw 'not your advertise'
        }

        if (image !== undefined) {
            data.image = utils.getBaseName(image.path)
        }
        utils.checkAllow(data, ['context', 'image'])

        await this.AdvertiseRepo.edit(id, data)
    }

    async Delete(accountID, id) {
        const advertise = await this.AdvertiseRepo.getAdvertiseByID(id)
        if (advertise === undefined) {
            throw 'advertise not found'
        }
        if (advertise.author !== accountID) {
            throw 'not your advertise'
        }
        
        await this.AdvertiseRepo.delete(id)
    }
}