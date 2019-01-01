import GroupRepo from '../repositories/Group'

import utils from '../Utils'

export default class Group {
    constructor() {
        this.GroupRepo = new GroupRepo()
    }

    async Create(accountID, data) {
        if (data.name === undefined || data.name === '') {
            throw 'no input name'
        }
        if (data.type === undefined) {
            throw 'no input type'
        }
        if (data.type !== 'Family' && data.type !== 'Board') {
            throw 'illegal input type'
        }
        utils.checkAllow(data, ['name', 'type'])
        
        data.leader = accountID
        
        await this.GroupRepo.create(data)
    }

    async Edit(accountID, id, data) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined) {
            throw 'group not found'
        }
        if (group.leader !== accountID) {
            throw 'you are not group leader'
        }
        if (data.name === undefined || data.name === '') {
            throw 'no input name'
        }
        utils.checkAllow(data, ['name'])
        
        await this.GroupRepo.edit(id, data)
    }

    async Join(accountID, id) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined) {
            throw 'group not found'
        }
        if (group.type !== 'Family') {
            throw 'not family'
        }
        if (await this.GroupRepo.isInGroup(accountID, group.id)) {
            throw 'already in group'
        }
        
        await this.GroupRepo.join(id, accountID)
    }

    async ChangeLeader(id, accountID, newLeader) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined) {
            throw 'group not found'
        }
        if (group.type !== 'Family') {
            throw 'not family'
        }
        if (group.leader !== accountID) {
            throw 'you are not group leader'
        }
        if (!(await this.GroupRepo.isInGroup(newLeader, group.id))) {
            throw 'illegal new leader'
        }

        await this.GroupRepo.edit(id, { leader: newLeader })
    }

    async Leave(accountID, id) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined) {
            throw 'group not found'
        }
        if (group.type !== 'Family') {
            throw 'not family'
        }
        if (!(await this.GroupRepo.isInGroup(accountID, group.id))) {
            throw 'not in group'
        }
        
        await this.GroupRepo.leave(id, accountID)

        if (group.leader === accountID) {
            const groupMembers = await this.GroupRepo.getGroupMembers(group.id)
            if (groupMembers.length === 0) {
                await this.GroupRepo.delete(group.id)
            } else {
                const r = ~~(Math.random() * groupMembers.length)
                await this.GroupRepo.edit(group.id, { leader: groupMembers[r].account })
            }
        }
    }

    async Delete(accountID, id) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (group === undefined) {
            throw 'group not found'
        }
        if (group.leader !== accountID) {
            throw 'you are not group leader'
        }
        
        await this.GroupRepo.delete(id)
    }
}