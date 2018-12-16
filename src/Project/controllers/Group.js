import GroupRepo    from '../repositories/Group'
import GroupService from '../services/Group'

export default class Group {
    constructor() {
        this.GroupRepo    = new GroupRepo()
        this.GroupService = new GroupService()
    }
    
    async GetAllGroups(req, res) {
        try {
            res.status(200).json({ groups: await this.GroupRepo.getAllGroups() })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetGroupByID(req, res) {
        try {
            res.status(200).json({ groups: await this.GroupRepo.getGroupByID(req.prams.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetGroupsByName(req, res) {
        try {
            res.status(200).json({ groups: await this.GroupRepo.getGroupByName(req.prams.name) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetFroupMembers(req, res) {
        try {
            res.status(200).json({ members: await this.GroupRepo.getGroupMembers(req.prams.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async Create(req, res) {
        try {
            await this.GroupService.Create(req.header.authorization, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Edit(req, res) {
        try {
            await this.GroupService.Edit(req.header.authorization, req.prams.id, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Join(req, res) {
        try {
            await this.GroupService.Join(req.header.authorization, req.prams.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Leave(req, res) {
        try {
            await this.GroupService.Leave(req.header.authorization, req.prams.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Delete(req, res) {
        try {
            await this.GroupService.Delete(req.header.authorization, req.prams.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}