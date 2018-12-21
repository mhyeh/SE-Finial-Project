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
        if (ID === -1 || ad_pos.ad !== -1) {
            throw 'create error'
        }
        const account = await this.AccountRepo.getAccountByID(ID)
        if (account.NTUST_coin < ad_pos.ice) {
            throw 'create error'
        }

        const formdata = this.FileService.ProcFormData(req)
        const data     = formdata.fields
        const files    = formdata.files

        if (data.context === undefined && files.img === undefined) {
            throw 'create error'
        }

        data.author = ID
        if (files.img !== undefined) {
            data.image = utils.getBaseName(files.img)
        }
        await this.AdvertiseRepo.create(pos, data)
    }

    async Edit(token, id, req) {
        const ID        = await this.RedisService.Verify(token)
        const advertise = await this.AdvertiseRepo.getAdvertiseByID(id)
        if (ID === -1 || advertise.author !== ID) {
            throw 'create error'
        }

        const formdata = await this.FileService.ProcFormData(req)
        const data     = formdata.fields
        const files    = formdata.files

        if (data.context === undefined && files.img === undefined) {
            throw 'create error'
        }

        if (files.img !== undefined) {
            data.image = utils.getBaseName(files.img)
        }
        await this.AdvertiseRepo.edit(id, data)
    }

    async Delete(token, id) {
        const ID        = await this.RedisService.Verify(token)
        const advertise = await this.AdvertiseRepo.getAdvertiseByID(id)
        if (ID === -1 || advertise.author !== ID) {
            throw 'create error'
        }
        
        await this.AdvertiseRepo.Delete(id)
    }
}