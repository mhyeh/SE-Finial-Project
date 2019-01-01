import GroupRepo    from '../repositories/Group'

import GroupService from '../services/Group'
import RedisService from '../services/Redis'

export default class Group {
    constructor() {
        this.GroupRepo    = new GroupRepo()
        this.GroupService = new GroupService()
        this.RedisService = new RedisService()

        this.GetAllGroups      = this.getAllGroups.bind(this)
        this.GetGroupByID      = this.getGroupByID.bind(this)
        this.GetGroupsByName   = this.getGroupsByName.bind(this)
        this.GetGroupByAccount = this.getGroupByAccount.bind(this)
        this.GetGroupMembers   = this.getGroupMembers.bind(this)
        this.Create            = this.create.bind(this)
        this.Join              = this.join.bind(this)
        this.Leave             = this.leave.bind(this)
        this.Edit              = this.edit.bind(this)
        this.ChangeLeader      = this.changeLeader.bind(this)
        this.Delete            = this.delete.bind(this)
    }
    
    async getAllGroups(req, res) {
        try {
            res.status(200).json({ groups: await this.GroupRepo.getAllGroups() })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getGroupByID(req, res) {
        try {
            res.status(200).json({ group: await this.GroupRepo.getGroupByID(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getGroupsByName(req, res) {
        try {
            res.status(200).json({ groups: await this.GroupRepo.getGroupByName(req.params.name) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getGroupByAccount(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ groups: await this.GroupRepo.getGroupByAccount(ID) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getGroupMembers(req, res) {
        try {
            res.status(200).json({ members: await this.GroupRepo.getGroupMembers(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async create(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Create(ID, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async edit(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Edit(ID, req.params.id, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async join(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Join(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async changeLeader(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.ChangeLeader(req.params.id, ID, req.params.leader)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async leave(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Leave(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }


    async delete(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.GroupService.Delete(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}