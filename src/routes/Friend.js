import Router from '../router'

import FriendController from '../Project/controllers/Friend'

class Friend extends Router {
    constructor() {
        super()
        this.controller = new FriendController()
        this.init()
    }

    init() {
        this.get('/unconfirmed', this.controller.GetUnconfirmedFriends)
        this.get('/invitation',  this.controller.GetInvitationList)
        this.get('/:id/state',   this.controller.CheckState)
        this.get('/:id',         this.controller.GetFriends)
        this.post('/:id',        this.controller.SendInvitation)
        this.put('/:id',         this.controller.Confirm)
        this.delete('/:id',      this.controller.Delete)
    }
}

const FriendRouter = new Friend()
export default FriendRouter.Match.bind(FriendRouter)