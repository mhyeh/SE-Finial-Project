import Router from '../router'

import AdvertiseController from '../Project/controllers/Advertise'

class Advertise extends Router {
    constructor() {
        super()
        this.controller = new AdvertiseController()
        this.init()
    }

    init() {
        this.get('/',         this.controller.GetAllAdvertises)
        this.get('/pos/:pos', this.controller.GetAdvertiseByPos)
        this.get('/:id',      this.controller.GetAdvertiseByID)
        this.post('/:pos',    this.controller.Buy)
        this.put('/:id',      this.controller.Edit)
        this.delete('/:id',   this.controller.Cancel)
    }
}

const AdvertiseRouter = new Advertise()
export default AdvertiseRouter.Match.bind(AdvertiseRouter)