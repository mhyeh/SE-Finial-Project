import AccountRepo   from '../repositories/Account'
import AdvertiseRepo from '../repositories/Advertise'
import FileService   from './File'
import RedisService  from './Redis'

import utils from '../Utils'

export default class Advertise {
    constructor() {
        this.AdvertiseRepo = new AdvertiseRepo()
        this.AccountRepo   = new AccountRepo()
        this.FileService   = new FileService()
        this.RedisService  = new RedisService()
    }

    async Create(token, pos, req) {
        const ID     = await this.RedisService.Verify(token)
        const ad_pos = await this.AdvertiseRepo.getAdvertisePos(pos)
        if (ad_pos.ad !== -1) {
            throw 'create error'
        }
        const account = await this.AccountRepo.getAccountByID(ID)
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

    async Edit(token, id, req) {
        const ID        = await this.RedisService.Verify(token)
        const advertise = await this.AdvertiseRepo.getAdvertiseByID(id)
        if (advertise.author !== ID) {
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

    async Delete(token, id) {
        const ID        = await this.RedisService.Verify(token)
        const advertise = await this.AdvertiseRepo.getAdvertiseByID(id)
        if (advertise.author !== ID) {
            throw 'create error'
        }
        
        await this.AdvertiseRepo.Delete(id)
    }
}