import GroupRepo    from '../repositories/Group'

export default class Group {
    constructor() {
        this.GroupRepo    = new GroupRepo()
    }

    async Create(accountID, data) {
        if (data.name === undefined || (data.type !== 'Family' && data.type !== 'Board')) {
            throw 'create error'
        }
        const group = await this.GroupRepo.getGroupByName(data.name)
        if (group !== undefined) {
            throw 'create error'
        }
        data.leader = accountID
        
        await this.GroupRepo.create(data)
    }

    async Edit(accountID, id, data) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined || group.leader !== accountID || data.name === undefined) {
            throw 'edit error'
        }
        const newGroup = await this.GroupRepo.getGroupByName(data.name)
        if (newGroup !== undefined) {
            throw 'edit error'
        }
        
        await this.GroupRepo.edit(id, data)
    }

    async Join(accountID, id) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined || group.type !== 'Family' || await this.GroupRepo.isInGroup(accountID, group.id)) {
            throw 'join error'
        }
        
        await this.GroupRepo.Join(id, accountID)
    }

    async Leave(accountID, id) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined || group.type !== 'Family' || !(await this.GroupRepo.isInGroup(accountID, group.id))) {
            throw 'leave error'
        }
        
        await this.GroupRepo.leave(id, accountID)
    }

    async Delete(accountID, id) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined || group.leader !== accountID) {
            throw 'delete error'
        }
        
        await this.GroupRepo.Delete(id)
    }
}