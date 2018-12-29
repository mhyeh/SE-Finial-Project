import Router from '../router'

import GroupController from '../Project/controllers/Group'

class Group extends Router {
    constructor() {
        super()
        this.controller = new GroupController()
        this.init()
    }

    init() {
        this.get('/',                   this.controller.GetAllGroups)
        this.get('/name/:name',         this.controller.GetGroupsByName)
        this.get('/account/:account',   this.controller.getGroupByAccount)
        this.get('/:id/account',        this.controller.GetGroupMembers)
        this.get('/:id',                this.controller.GetGroupByID)
        this.post('/',                  this.controller.Create)
        this.post('/:id',               this.controller.Join)
        this.put('/:id',                this.controller.Edit)
        this.put('/:id/leader/:leader', this.controller.ChangeLeader)
        this.delete('/:id',             this.controller.Delete)
        this.delete('/leave/:id',       this.controller.Leave)
    }
}

const GroupRouter = new Group()
export default GroupRouter.Match.bind(GroupRouter)