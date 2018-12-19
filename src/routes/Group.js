import Router from '../router'

import GroupController from '../Project/controllers/Group'

class Group extends Router {
    constructor() {
        super()
        this.controller = new GroupController()
        this.init()
    }

    init() {
        this.get('/',              this.controller.GetAllGroups)
        this.get('/name/:name',    this.controller.GetGroupsByName)
        this.get('/:id/account/',  this.controller.GetGroupMembers)
        this.get('/:id',           this.controller.GetGroupByID)
        this.post('/',             this.controller.Create)
        this.put('/join/:id',      this.controller.Join)
        this.put('/leave/:id',     this.controller.Leave)
        this.put('/:id',           this.controller.Edit)
        this.delete('/:id',        this.controller.Delete)
    }
}

const GroupRouter = new Group()
export default GroupRouter.Match.bind(GroupRouter)