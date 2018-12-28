import Router from '../router'

import FriendController from '../Project/controllers/Friend'

class Friend extends Router {
    constructor() {
        super()
        this.controller = new FriendController()
        this.init()
    }

    init() {
        this.get('/',            this.controller.GetFriends)
        this.get('/unconfirmed', this.controller.GetUnconfirmedFriends)
        this.get('/invitation',  this.controller.GetInvitationList)
        this.get('/:id',         this.controller.CheckState)
        this.post('/:id',        this.controller.SendInvitation)
        this.put('/:id',         this.controller.Confirm)
        this.delete('/:id',      this.controller.Delete)
    }
}

const FriendRouter = new Friend()
export default FriendRouter.Match.bind(FriendRouter)