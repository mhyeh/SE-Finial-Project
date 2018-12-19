import AdvertiseRepo    from '../repositories/Advertise'
import AdvertiseService from '../services/Advertise'

export default class Advertise {
    constructor() {
        this.AdvertiseRepo    = new AdvertiseRepo()
        this.AdvertiseService = new AdvertiseService()
    }

    async GetAllAdvertises(req, res) {
        try {
            res.status(200).json({ advertises: await this.AdvertiseRepo.getAllAdvertises() })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetAdvertiseByPos(req, res) {
        try {
            res.status(200).json({ advertise: await this.AdvertiseRepo.getAdvertiseByPos(req.params.pos) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetAdvertiseByID(req, res) {
        try {
            res.status(200).json({ advertise: await this.AdvertiseRepo.getAdvertiseByID(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async Buy(req, res) {
        try {
            await this.AdvertiseRepo.Create(req.header.authorization, req.params.pos, req.req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Edit(req, res) {
        try {
            await this.AdvertiseRepo.Edit(req.header.authorization, req.params.id, req.req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async Cancel(req, res) {
        try {
            await this.AdvertiseRepo.Delete(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}