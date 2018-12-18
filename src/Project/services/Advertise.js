import AccountRepo   from '../repositories/Account'
import AdvertiseRepo from '../repositories/Advertise'
import RedisService  from './Redis'

export default class Advertise {
    constructor() {
        this.AdvertiseRepo = new AdvertiseRepo()
        this.AccountRepo   = new AccountRepo()
        this.RedisService  = new RedisService()
    }

    async Create(token, pos, data) {
        const ID     = await this.RedisService.Verify(token)
        const ad_pos = await this.AdvertiseRepo.getAdvertisePos(pos)
        if (ID === -1 || ad_pos.ad !== -1 || data.context === undefined) {
            throw 'create error'
        }
        const account = await this.AccountRepo.getAccountByID(ID)
        if (account.NTUST_coin < ad_pos.ice) {
            throw 'create error'
        }

        data.author = ID
        await this.AdvertiseRepo.create(pos, data)
    }

    async Edit(token, id, data) {
        const ID        = await this.RedisService.Verify(token)
        const advertise = await this.AdvertiseRepo.getAdvertiseByID(id)
        if (ID === -1 || advertise.author !== ID || data.context === undefined) {
            throw 'create error'
        }
        
        advertise.context = data.context
        await this.AdvertiseRepo.edit(id, advertise)
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