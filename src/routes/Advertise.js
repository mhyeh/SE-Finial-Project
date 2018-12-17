import Router from '../router'

import AdvertiseController from '../Project/controllers/Advertise'

class Advertise extends Router {
    constructor() {
        super()
        this.controller = new AdvertiseController()
        this.init()
    }

    init() {
        this.get('/',         (req, res) => this.controller.GetAllAdvertises(req, res))
        this.get('/pos/:pos', (req, res) => this.controller.GetAdvertiseByPos(req, res))
        this.get('/:id',      (req, res) => this.controller.GetAdvertiseByID(req, res))
        this.post('/:pos',    (req, res) => this.controller.Buy(req, res))
        this.put('/:id',      (req, res) => this.controller.Edit(req, res))
        this.delete('/:id',   (req, res) => this.controller.Cancel(req, res))
    }
}

const AdvertiseRouter = new Advertise()
export default AdvertiseRouter