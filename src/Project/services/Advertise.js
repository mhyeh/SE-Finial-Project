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
        if (ad_pos.ad !== -1) {
            throw 'create error'
        }
        const account = await this.AccountRepo.getAccountByID(accountID)
        if (account.NTUST_coin < ad_pos.ice) {
            throw 'create error'
        }

        const formdata = await this.FileService.ProcFormData(req, {img: 1})
        const data     = formdata.fields
        const image    = formdata.files.img

        if (data.context === undefined && image === undefined) {
            throw 'create error'
        }

        data.author = ID
        if (image !== undefined) {
            data.image = utils.getBaseName(image.path)
        }
        await this.AdvertiseRepo.create(pos, data)
    }

    async Edit(accountID, id, req) {
        const advertise = await this.AdvertiseRepo.getAdvertiseByID(id)
        if (advertise.author !== accountID) {
            throw 'create error'
        }

        const formdata = await this.FileService.ProcFormData(req, {img: 1})
        const data     = formdata.fields
        const image    = formdata.files.img

        if (data.context === undefined && image === undefined) {
            throw 'create error'
        }

        if (image !== undefined) {
            data.image = utils.getBaseName(image.path)
        }
        await this.AdvertiseRepo.edit(id, data)
    }

    async Delete(accountID, id) {
        const advertise = await this.AdvertiseRepo.getAdvertiseByID(id)
        if (advertise.author !== accountID) {
            throw 'create error'
        }
        
        await this.AdvertiseRepo.Delete(id)
    }
}