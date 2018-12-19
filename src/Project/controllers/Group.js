import GroupRepo    from '../repositories/Group'
import GroupService from '../services/Group'

export default class Group {
    constructor() {
        this.GroupRepo    = new GroupRepo()
        this.GroupService = new GroupService()

        this.GetAllGroups    = this.getAllGroups.bind(this)
        this.GetGroupByID    = this.getGroupByID.bind(this)
        this.GetGroupsByName = this.getGroupsByName.bind(this)
        this.GetGroupMembers = this.getGroupMembers.bind(this)
        this.Create          = this.create.bind(this)
        this.Join            = this.join.bind(this)
        this.Leave           = this.leave.bind(this)
        this.Edit            = this.edit.bind(this)
        this.Delete          = this.delete.bind(this)
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
            res.status(200).json({ groups: await this.GroupRepo.getGroupByID(req.params.id) })
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

    async getGroupMembers(req, res) {
        try {
            res.status(200).json({ members: await this.GroupRepo.getGroupMembers(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async create(req, res) {
        try {
            await this.GroupService.Create(req.header.authorization, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async edit(req, res) {
        try {
            await this.GroupService.Edit(req.header.authorization, req.params.id, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async join(req, res) {
        try {
            await this.GroupService.Join(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async leave(req, res) {
        try {
            await this.GroupService.Leave(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async delete(req, res) {
        try {
            await this.GroupService.Delete(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}