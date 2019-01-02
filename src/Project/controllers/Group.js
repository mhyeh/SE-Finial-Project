import GroupRepo    from '../repositories/Group'

import GroupService from '../services/Group'
import RedisService from '../services/Redis'

import utils from '../Utils'

export default class Group {
    constructor() {
        this.GroupRepo    = new GroupRepo()
        this.GroupService = new GroupService()
        this.RedisService = new RedisService()

        this.GetAllGroups        = this.getAllGroups.bind(this)
        this.GetAllBoards        = this.getAllBoards.bind(this)
        this.GetFamilyStatus     = this.getFamilyStatus.bind(this)
        this.GetGroupByID        = this.getGroupByID.bind(this)
        this.GetGroupsByName     = this.getGroupsByName.bind(this)
        this.GetGroupByAccount   = this.getGroupByAccount.bind(this)
        this.GetGroupMembers     = this.getGroupMembers.bind(this)
        this.GetUnconfirmMembers = this.getUnconfirmMembers.bind(this)
        this.Create              = this.create.bind(this)
        this.Join                = this.join.bind(this)
        this.Leave               = this.leave.bind(this)
        this.Edit                = this.edit.bind(this)
        this.Accept              = this.accpet.bind(this)
        this.ChangeLeader        = this.changeLeader.bind(this)
        this.Delete              = this.delete.bind(this)
    }
    
    async getAllGroups(req, res) {
        try {
            res.status(200).json({ groups: await this.GroupRepo.getAllGroups() })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get group error') })
        }
    }

    async getAllBoards(req, res) {
        try {
            res.status(200).json({ boards: await this.GroupRepo.getAllBoards() })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get board error') })
        }
    }

    async getFamilyStatus(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ state: await this.GroupService.CheckState(ID, req.params.id) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get status error') })
        }
    }

    async getGroupByID(req, res) {
        try {
            res.status(200).json({ group: await this.GroupRepo.getGroupByID(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get group error') })
        }
    }

    async getGroupsByName(req, res) {
        try {
            res.status(200).json({ groups: await this.GroupRepo.getGroupByName(req.params.name) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get group error') })
        }
    }

    async getGroupByAccount(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ groups: await this.GroupRepo.getGroupByAccount(ID) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get group error') })
        }
    }

    async getGroupMembers(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ members: await this.GroupService.getGroupMembers(ID, req.params.id) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get group member error') })
        }
    }

    async getUnconfirmMembers(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ unconfirmMembers: await this.GroupService.getUnconfirmMembers(ID, req.params.id) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get unconfirm member error') })
        }
    }
    
    async create(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Create(ID, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'create group error') })
        }
    }

    async edit(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Edit(ID, req.params.id, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'edit group error') })
        }
    }

    async join(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Join(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'join group error') })
        }
    }

    async accpet(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Accept(ID, req.params.id, req.params.account)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'accpet member error') })
        }
    }

    async changeLeader(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.ChangeLeader(req.params.id, ID, req.params.leader)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'chenge group leader error') })
        }
    }

    async leave(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Leave(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'leave group error') })
        }
    }


    async delete(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Delete(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'delete group error') })
        }
    }
}