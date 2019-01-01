import FriendRepo   from '../repositories/Friend'

import RedisService from '../services/Redis'

import utils from '../Utils'

export default class Friend {
    constructor() {
        this.FriendRepo   = new FriendRepo()
        this.RedisService = new RedisService()
        
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
            res.status(200).json({ friends: await this.FriendRepo.getAllFriends(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get friend list error') })
        }
    }
    
    async getUnconfirmedFriends(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ unconfrimed: await this.FriendRepo.getUnconfirmedFriends(ID) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get unconfirmed list error') })
        }
    }

    async getInvitationList(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ invitation: await this.FriendRepo.getInvitationList(ID) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get invitation list error') })
        }
    }

    async checkState(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ state: await this.FriendRepo.checkState(ID, req.params.id) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'check state error') })
        }
    }

    async sendInvitation(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.FriendRepo.send(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'send invitation error') })
        }
    }

    async confirm(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.FriendRepo.confirm(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'confirm invitation error') })
        }
    }

    async delete(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.FriendRepo.delete(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'delete friend error') })
        }
    }
}