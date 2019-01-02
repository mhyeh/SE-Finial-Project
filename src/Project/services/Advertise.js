import AccountRepo   from '../repositories/Account'
import AdvertiseRepo from '../repositories/Advertise'
import FileService   from './File'

import errorLog from '../ErrorLog'
import utils    from '../Utils'

export default class Advertise {
    constructor() {
        this.AdvertiseRepo = new AdvertiseRepo()
        this.AccountRepo   = new AccountRepo()
        this.FileService   = new FileService()
    }

    async Create(accountID, pos, req) {
        if (!utils.hasValue(pos, 'number')) {
            throw 'illegal pos'
        }
        pos = parseInt(pos)

        const promise = []
        promise.push(this.AdvertiseRepo.getAdvertisePos(pos))
        promise.push(this.AccountRepo.getAccountByID(accountID))
        promise.push(this.FileService.ProcFormData(req, { img: 1 }))

        const [ad_pos, account, formdata] = await Promise.all(promise) 
        
        const data  = formdata.fields
        const image = formdata.files.img

        utils.trimData(data)

        if (!utils.hasValue(data.context, 'string') && !utils.hasValue(image, 'object')) {
            throw errorLog.noInput()
        }

        if (!utils.hasValue(data.price, 'number')) {
            await this.removeImg(image)
            throw errorLog.noInput('price')
        }
        data.price = parseInt(data.price)

        if (!utils.hasValue(ad_pos, 'object')) {
            await this.removeImg(image)
            throw errorLog.dataNotFound('ad_pos')
        }
        if (utils.hasValue(ad_pos.ad, 'string') && ad_pos.price >= data.price) {
            await this.removeImg(image)
            throw 'can not buy this'
        }
        if (account.NTUST_coin < data.price) {
            await this.removeImg(image)
            throw 'no enough ntust coin'
        }

        const price = data.price
        delete data.price

        if (utils.hasValue(image, 'object')) {
            data.image = utils.getBaseName(image.path)
        }

        if (!utils.checkAllow(data, ['context', 'image'])) {
            throw errorLog.inputNotAccept()
        }
        
        data.author = accountID
        
        account.NTUST_coin -= price
        await Promise.all([this.AdvertiseRepo.create(pos, data, price), this.AccountRepo.edit(account.id, { NTUST_coin: account.NTUST_coin })])
    }

    async Edit(accountID, id, req) {
        const [advertise, formdata] = await Promise.all(this.AdvertiseRepo.getAdvertiseByID(id), this.FileService.ProcFormData(req, { img: 1 }))
        const data  = formdata.fields
        const image = formdata.files.img

        utils.trimData(data)

        if (!utils.hasValue(data.context, 'string') && !utils.hasValue(image, 'object')) {
            throw errorLog.noInput()
        }
        if (!utils.hasValue(advertise, 'object')) {
            await this.removeImg(image)
            throw errorLog.dataNotFound('advertise')
        }
        if (advertise.author !== accountID) {
            await this.removeImg(image)
            throw errorLog.notYourData('advertise')
        }

        if (utils.hasValue(image, 'object')) {
            data.image = utils.getBaseName(image.path)
        }

        utils.filterData(data)


        if (!utils.checkAllow(data, ['context', 'image'])) {
            throw errorLog.inputNotAccept()
        }

        await this.AdvertiseRepo.edit(id, data)
    }

    async removeImg(image) {
        if (utils.hasValue(image, 'object')) {
            await utils.removeFile(image.path)
        }
    }

    async Delete(accountID, id) {
        const advertise = await this.AdvertiseRepo.getAdvertiseByID(id)
        if (!utils.hasValue(advertise, 'object')) {
            throw errorLog.dataNotFound('advertise')
        }
        if (advertise.author !== accountID) {
            throw errorLog.notYourData('advertise')
        }
        
        await this.AdvertiseRepo.delete(id)
    }
}