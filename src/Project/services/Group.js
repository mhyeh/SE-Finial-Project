import GroupRepo from '../repositories/Group'

import errorLog from '../ErrorLog'
import utils    from '../Utils'

export default class Group {
    constructor() {
        this.GroupRepo = new GroupRepo()
    }

    async Create(accountID, data) {
        if (!utils.hasValue(data.name, 'string')) {
            throw errorLog.noInput('name')
        }
        if (!utils.hasValue(data.type, 'string')) {
            throw errorLog.noInput('type')
        }
        if (data.type !== 'Family' && data.type !== 'Board') {
            throw 'illegal input type'
        }
        if (!utils.checkAllow(data, ['name', 'type'])) {
            throw errorLog.inputNotAccept()
        }
        
        data.leader = accountID
        
        await this.GroupRepo.create(data)
    }

    async Edit(accountID, id, data) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (!utils.hasValue(group, 'object')) {
            throw errorLog.dataNotFound('group')
        }
        if (group.leader !== accountID) {
            throw 'you are not group leader'
        }
        if (!utils.hasValue(data.name, 'string')) {
            throw errorLog.noInput('name')
        }
        if (!utils.checkAllow(data, ['name'])) {
            throw errorLog.inputNotAccept()
        }
        
        await this.GroupRepo.edit(id, data)
    }

    async Join(accountID, id) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (!utils.hasValue(group, 'object')) {
            throw errorLog.dataNotFound('group')
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
        if (!utils.hasValue(group, 'object')) {
            throw errorLog.dataNotFound('group')
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
        if (!utils.hasValue(group, 'object')) {
            throw errorLog.dataNotFound('group')
        }
        if (group.type !== 'Family') {
            throw 'not family'
        }
        if (!(await this.GroupRepo.isInGroup(accountID, group.id))) {
            throw errorLog.notInGroup()
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
        if (!utils.hasValue(group, 'object')) {
            throw errorLog.dataNotFound('group')
        }
        if (group.leader !== accountID) {
            throw 'you are not group leader'
        }
        
        await this.GroupRepo.delete(id)
    }
}