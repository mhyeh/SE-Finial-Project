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
        const ad_pos = await this.AdvertiseRepo.getAdvertisePos(pos)
        if (ad_pos.ad !== undefined && ad_pos.ad !== '') {
            throw 'can not buy this'
        }
        const account = await this.AccountRepo.getAccountByID(accountID)
        if (account.NTUST_coin < ad_pos.price) {
            throw 'no enough ntust coin'
        }

        const formdata = await this.FileService.ProcFormData(req, { img: 1 })
        const data     = formdata.fields
        const image    = formdata.files.img

        if ((data.context === undefined || data.context === '') && image === undefined) {
            throw 'no input'
        }

        if (image !== undefined) {
            data.image = utils.getBaseName(image.path)
        }
        utils.checkAllow(data, ['context', 'image'])
        
        data.author = accountID

        await this.AdvertiseRepo.create(pos, data)

        account.NTUST_coin -= ad_pos.price
        await this.AccountRepo.edit(account.id, { NTUST_coin: account.NTUST_coin })
    }

    async Edit(accountID, id, req) {
        const advertise = await this.AdvertiseRepo.getAdvertiseByID(id)
        if (advertise === undefined) {
            throw 'advertise not found'
        }
        if (advertise.author !== accountID) {
            throw 'not your advertise'
        }

        const formdata = await this.FileService.ProcFormData(req, { img: 1 })
        const data     = formdata.fields
        const image    = formdata.files.img

        if ((data.context === undefined || data.context === '') && image === undefined) {
            throw 'no input'
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