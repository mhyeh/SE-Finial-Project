import Router from '../router'

import GroupController from '../Project/controllers/Group'

class Group extends Router {
    constructor() {
        super()
        this.controller = new GroupController()
        this.init()
    }

    init() {
        this.get('/',                    this.controller.GetAllGroups)
        this.get('/board',               this.controller.GetAllBoards)
        this.get('/name/:name',          this.controller.GetGroupsByName)
        this.get('/account/:account',    this.controller.GetGroupByAccount)
        this.get('/:id/state',           this.controller.GetFamilyStatus)
        this.get('/:id/member',          this.controller.GetGroupMembers)
        this.get('/:id/unconfirm',       this.controller.GetUnconfirmMembers)
        this.get('/:id',                 this.controller.GetGroupByID)
        this.post('/',                   this.controller.Create)
        this.post('/:id',                this.controller.Join)
        this.put('/:id/leader/:leader',  this.controller.ChangeLeader)
        this.put('/:id/accept/:account', this.controller.Accept)
        this.put('/:id',                 this.controller.Edit)
        this.delete('/leave/:id',        this.controller.Leave)
        this.delete('/:id',              this.controller.Delete)
    }
}

const GroupRouter = new Group()
export default GroupRouter.Match.bind(GroupRouter)