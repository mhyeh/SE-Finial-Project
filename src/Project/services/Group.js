import GroupRepo    from '../repositories/Group'
import RedisService from './Redis'
export default class Group {
    constructor() {
        this.GroupRepo    = new GroupRepo()
        this.RedisService = new RedisService()
    }

    async Create(token, data) {
        const ID    = await this.RedisService.Verify(token)
        if (ID === -1 || data.name === undefined) {
            throw 'create error'
        }
        const group = await this.GroupRepo.getGroupByName(data.name)
        if (group !== undefined) {
            throw 'create error'
        }
        data.leader = ID
        await this.GroupRepo.create(data)
    }

    async Edit(token, id, data) {
        const ID    = await this.RedisService.Verify(token)
        const group = await this.GroupRepo.getGroupByID(id)
        if (ID === -1 || group === undefined || group.leader !== ID || data.name === undefined) {
            throw 'edit error'
        }
        const newGroup = await this.GroupRepo.getGroupByName(data.name)
        if (newGroup !== undefined) {
            throw 'edit error'
        }
        group.name = data.name
        await this.GroupRepo.edit(id, group)
    }

    async Join(token, id) {
        const ID    = await this.RedisService.Verify(token)
        const group = await this.GroupRepo.getGroupByID(id)
        if (ID === -1 || group === undefined || group.type !== 'Family') {
            throw 'join error'
        }
        const members = await this.GroupRepo.getGroupMembers(id)
        for (const member of members) {
            if (member === id) {
                throw 'join error'
            }
        }
        await this.GroupRepo.Join(id, ID)
    }

    async Leave(token, id) {
        const ID    = await this.RedisService.Verify(token)
        const group = await this.GroupRepo.getGroupByID(id)
        if (ID === -1 || group === undefined || group.type !== 'Family') {
            throw 'leave error'
        }
        const members = await this.GroupRepo.getGroupMembers(id)
        let flag = false
        for (const member of members) {
            if (member === id) {
                flag = true
                break
            }
        }
        if (!flag) {
            throw 'leave error'
        }
        await this.GroupRepo.leave(id, ID)
    }

    async Delete(token, id) {
        const ID    = await this.RedisService.Verify(token)
        const group = await this.GroupRepo.getGroupByID(id)
        if (ID === -1 || group === undefined || group.leader !== ID) {
            throw 'delete error'
        }
        await this.GroupRepo.Delete(id)
    }
}