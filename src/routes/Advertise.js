import Router from '../router'

import AdvertiseController from '../Project/controllers/Advertise'

class Advertise extends Router {
    constructor() {
        super()
        this.controller = new AdvertiseController()
        this.init()
    }

    init() {
        this.get('/',         this.controller.GetAllAdvertises.bind(this.controller))
        this.get('/pos/:pos', this.controller.GetAdvertiseByPos.bind(this.controller))
        this.get('/:id',      this.controller.GetAdvertiseByID.bind(this.controller))
        this.post('/:pos',    this.controller.Buy.bind(this.controller))
        this.put('/:id',      this.controller.Edit.bind(this.controller))
        this.delete('/:id',   this.controller.Cancel.bind(this.controller))
    }
}

const AdvertiseRouter = new Advertise()
export default AdvertiseRouter.Match.bind(AdvertiseRouter)