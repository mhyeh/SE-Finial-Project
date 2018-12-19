import Router from '../router'

import GroupController from '../Project/controllers/Group'

class Group extends Router {
    constructor() {
        super()
        this.controller = new GroupController()
        this.init()
    }

    init() {
        this.get('/',              this.controller.GetAllGroups.bind(this.controller))
        this.get('/name/:name',    this.controller.GetGroupsByName.bind(this.controller))
        this.get('/:id/account/',  this.controller.GetGroupMembers.bind(this.controller))
        this.get('/:id',           this.controller.GetGroupByID.bind(this.controller))
        this.post('/',             this.controller.Create.bind(this.controller))
        this.put('/join/:id',      this.controller.Join.bind(this.controller))
        this.put('/leave/:id',     this.controller.Leave.bind(this.controller))
        this.put('/:id',           this.controller.Edit.bind(this.controller))
        this.delete('/:id',        this.controller.Delete.bind(this.controller))
    }
}

const GroupRouter = new Group()
export default GroupRouter.Match.bind(GroupRouter)