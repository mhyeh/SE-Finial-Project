import AdvertiseRepo    from '../repositories/Advertise'

import AdvertiseService from '../services/Advertise'
import RedisService     from '../services/Redis'

export default class Advertise {
    constructor() {
        this.AdvertiseRepo    = new AdvertiseRepo()
        this.AdvertiseService = new AdvertiseService()
        this.RedisService     = new RedisService()

        this.GetAllAdvertises     = this.getAllAdvertises.bind(this)
        this.GetAdvertisePosList  = this.getAdvertisePosList.bind(this)
        this.GetAdvertisesByToken = this.getAdvertisesByToken.bind(this)
        this.GetAdvertiseByPos    = this.getAdvertiseByPos.bind(this)
        this.GetAdvertiseByID     = this.getAdvertiseByID.bind(this)
        this.Buy                  = this.buy.bind(this)
        this.Edit                 = this.edit.bind(this)
        this.Cancel               = this.cancel.bind(this)
    }

    async getAllAdvertises(req, res) {
        try {
            res.status(200).json({ advertises: await this.AdvertiseRepo.getAllAdvertises() })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getAdvertisePosList(req, res) {
        try {
            res.status(200).json({ pos: await this.AdvertiseRepo.getAdvertisePosList() })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getAdvertisesByToken(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ advertises: await this.AdvertiseRepo.getAdvertisesByAccount(ID) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async getAdvertiseByPos(req, res) {
        try {
            res.status(200).json({ advertise: await this.AdvertiseRepo.getAdvertiseByPos(req.params.pos) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getAdvertiseByID(req, res) {
        try {
            res.status(200).json({ advertise: await this.AdvertiseRepo.getAdvertiseByID(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async buy(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.AdvertiseService.Create(ID, req.params.pos, req.req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async edit(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.AdvertiseService.Edit(ID, req.params.id, req.req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async cancel(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.AdvertiseService.Delete(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}