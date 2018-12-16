import Router from '../router'

import GroupController from '../Project/controllers/Group'

class Group extends Router {
    constructor() {
        super()
        this.controller = new GroupController()
        this.init()
    }

    init() {
        this.get('/',              (req, res) => this.controller.GetAllGroups(req, res))
        this.get('/name/:name',    (req, res) => this.controller.GetGroupsByName(req, res))
        this.get('/:id/account/',  (req, res) => this.controller.GetGroupMembers(req, res) )
        this.get('/:id',           (req, res) => this.controller.GetGroupByID(req, res))
        this.post('/',             (req, res) => this.controller.Create(req, res))
        this.put('/Join/:id',      (req, res) => this.controller.Join(req, res))
        this.put('/Leave/:id',     (req, res) => this.controller.Leave(req, res))
        this.put('/:id',           (req, res) => this.controller.Edit(req, res))
        this.delete('/:id',        (req, res) => this.controller.Delete(req, res))
    }
}

const GroupRouter = new Group()
export default GroupRouter