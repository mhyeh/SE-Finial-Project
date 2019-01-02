import GroupRepo from '../repositories/Group'

import errorLog from '../ErrorLog'
import utils    from '../Utils'

export default class Group {
    constructor() {
        this.GroupRepo = new GroupRepo()
    }

    async getGroupMembers(accountID, id) {
        if ((await this.CheckState(accountID, id)) === -1) {
            throw errorLog.notInGroup()
        }
        return await this.GroupRepo.getGroupMembers(id, 1)
    }

    async getUnconfirmMembers(accountID, id) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (group.leader !== accountID) {
            throw errorLog.notGroupLeader()
        }

        return await this.GroupRepo.getGroupMembers(id, 0)
    }

    async Create(accountID, data) {
        utils.trimData(data)
        if (!utils.hasValue(data.name, 'string')) {
            throw errorLog.noInput('name')
        }
        if (!utils.hasValue(data.type, 'string')) {
            throw errorLog.noInput('type')
        }
        if (data.type !== 'Family' && data.type !== 'Board') {
            throw 'illegal input type'
        }
        if (!utils.checkAllow(data, ['name', 'type', 'description'])) {
            throw errorLog.inputNotAccept()
        }
        
        data.leader = accountID
        
        await this.GroupRepo.create(data)
    }

    async Edit(accountID, id, data) {
        utils.trimData(data)
        const group = await this.GroupRepo.getGroupByID(id)
        if (!utils.hasValue(group, 'object')) {
            throw errorLog.dataNotFound('group')
        }
        if (group.leader !== accountID) {
            throw errorLog.notGroupLeader()
        }
        if (!utils.hasValue(data.name, 'string') && !utils.hasValue(data.description, 'string')) {
            throw errorLog.noInput()
        }
        
        utils.filterData(data)
        
        if (!utils.checkAllow(data, ['name', 'description'])) {
            throw errorLog.inputNotAccept()
        }
        
        await this.GroupRepo.edit(id, data)
    }

    async CheckState(accountID, groupID) {
        const group = await this.GroupRepo.getGroupByID(groupID)
        if (!utils.hasValue(group, 'object')) {
            throw errorLog.dataNotFound('group')
        }
        if (group.type !== 'Family') {
            throw 'not family'
        }
        return this.GroupRepo.checkState(accountID, groupID)
    }

    async Join(accountID, id) {
        if ((await this.CheckState(accountID, id)) !== -1) {
            throw 'already send join request'
        }
        
        await this.GroupRepo.join(id, accountID)
    }

    async Accept(accountID, id, newMember) {
        const state = await this.CheckState(newMember, id)
        if (state === -1) {
            throw errorLog.dataNotFound('newMember')
        }
        if (state === 1) {
            throw 'already a member'
        }

        const group = await this.GroupRepo.getGroupByID(id)
        if (group.leader !== accountID) {
            throw errorLog.notGroupLeader()
        }

        await this.GroupRepo.accept(id, newMember)
    }

    async ChangeLeader(id, accountID, newLeader) {
        if ((await this.CheckState(newLeader, id)) !== 1) {
            throw 'illegal new leader'
        }

        const group = await this.GroupRepo.getGroupByID(id)
        if (group.leader !== accountID) {
            throw errorLog.notGroupLeader()
        }

        await this.GroupRepo.edit(id, { leader: newLeader })
    }

    async Leave(accountID, id) {
        if ((await this.CheckState(accountID, id)) === -1) {
            throw errorLog.notInGroup()
        }

        
        await this.GroupRepo.leave(id, accountID)
        
        const group = await this.GroupRepo.getGroupByID(id)
        if (group.leader === accountID) {
            const groupMembers = await this.GroupRepo.getGroupMembers(id, 1)
            if (groupMembers.length === 0) {
                await this.GroupRepo.delete(id)
            } else {
                const r = ~~(Math.random() * groupMembers.length)
                await this.GroupRepo.edit(id, { leader: groupMembers[r].account })
            }
        }
    }

    async Delete(accountID, id) {
        const group = await this.GroupRepo.getGroupByID(id)
        if (!utils.hasValue(group, 'object')) {
            throw errorLog.dataNotFound('group')
        }
        if (group.leader !== accountID) {
            throw errorLog.notGroupLeader()
        }
        
        await this.GroupRepo.delete(id)
    }
}