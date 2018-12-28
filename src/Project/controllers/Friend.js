import FriendRepo    from '../repositories/Friend'
import FriendService from '../services/Friend'

export default class Friend {
    constructor() {
        this.FriendRepo    = new FriendRepo()
        this.FriendService = new FriendService()   
        
        this.GetFriends            = this.getFriends.bind(this)
        this.GetUnconfirmedFriends = this.getUnconfirmedFriends.bind(this)
        this.GetInvitationList     = this.getInvitationList.bind(this)
        this.CheckState            = this.checkState.bind(this)
        this.SendInvitation        = this.sendInvitation.bind(this)
        this.Confirm               = this.confirm.bind(this)
        this.Delete                = this.delete.bind(this)
    }
    
    async getFriends(req, res) {
        try {
            res.status(200).json({ friends: await this.FriendRepo.getAllFriends(req.header.authorization) })
        } catch (e) {
            res.status(400).json({ error: 'get friends error' })
        }
    }
    
    async getUnconfirmedFriends(req, res) {
        try {
            res.status(200).json({ unconfrimed: await this.FriendRepo.getUnconfirmedFriends(req.header.authorization) })
        } catch (e) {
            res.status(400).json({ error: 'get friends error' })
        }
    }

    async getInvitationList(req, res) {
        try {
            res.status(200).json({ invitation: await this.FriendRepo.getInvitationList(req.header.authorization) })
        } catch (e) {
            res.status(400).json({ error: 'get friends error' })
        }
    }

    async checkState(req, res) {
        try {
            res.status(200).json({ state: await this.FriendService.CheckState(req.header.authorization, req.params.id) })
        } catch (e) {
            res.status(400).json({ error: 'get friends error' })
        }
    }

    async sendInvitation(req, res) {
        try {
            await this.FriendService.send(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: 'send invitation error' })
        }
    }

    async confirm(req, res) {
        try {
            await this.FriendService.confirm(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: 'confirm invitation error' })
        }
    }

    async delete(req, res) {
        try {
            await this.FriendService.delete(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: 'delete friend error' })
        }
    }
}