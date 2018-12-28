import GroupRepo    from '../repositories/Group'
import RedisService from './Redis'

export default class Group {
    constructor() {
        this.GroupRepo    = new GroupRepo()
        this.RedisService = new RedisService()
    }

    async Create(token, data) {
        const ID = await this.RedisService.Verify(token)
        if (data.name === undefined || (data.type !== 'Family' && data.type !== 'Board')) {
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
        if (group === undefined || group.leader !== ID || data.name === undefined) {
            throw 'edit error'
        }
        const newGroup = await this.GroupRepo.getGroupByName(data.name)
        if (newGroup !== undefined) {
            throw 'edit error'
        }
        
        await this.GroupRepo.edit(id, data)
    }

    async Join(token, id) {
        const ID    = await this.RedisService.Verify(token)
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined || group.type !== 'Family' || await this.GroupRepo.isInGroup(ID, group.id)) {
            throw 'join error'
        }
        
        await this.GroupRepo.Join(id, ID)
    }

    async Leave(token, id) {
        const ID    = await this.RedisService.Verify(token)
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined || group.type !== 'Family' || !(await this.GroupRepo.isInGroup(ID, group.id))) {
            throw 'leave error'
        }
        
        await this.GroupRepo.leave(id, ID)
    }

    async Delete(token, id) {
        const ID    = await this.RedisService.Verify(token)
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined || group.leader !== ID) {
            throw 'delete error'
        }
        
        await this.GroupRepo.Delete(id)
    }
}