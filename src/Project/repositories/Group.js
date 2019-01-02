import Model from '../models/Model'

import ArticleRepo from './Article'

export default class Group {
    constructor() {
        this.GroupModel    = new Model('groups')
        this.GPMemberModel = new Model('gp_member')
        this.ArticleRepo   = new ArticleRepo()
    }

    async getAllGroups() {
        return await (new Model('groups')).select('*').query()
    }

    async getAllBoards() {
        return await (new Model('groups')).select('*').where('type', 'Board').query()
    }

    async getGroupByID(id) {
        return (await (new Model('groups')).select('*').where('id', id).query())[0]
    }

    async getGroupByName(name) {
        return await (new Model('groups')).select('*').where('name', 'like', name).query()
    }

    async getGroupByAccount(account) {
        let groups = await (new Model('gp_member')).select('*').where('account', account).query()
        groups     = groups.map(group => group.group_id)
        return await (new Model('groups')).select('*').whereIn('id', groups).query()
    }

    async getGroupMembers(id, state) {
        return await (new Model('gp_member')).select('*').where('group_id', id).andWhere('isConfirm', state).query()
    }

    async checkState(account, group) {
        const groupMember = (await (new Model('gp_member')).select('*').where('account', account).andWhere('group_id', group).query())[0]
        if (groupMember === undefined) {
            return -1
        }
        return groupMember.isConfirm
    }

    async create(data) {
        const groupID = await (new Model('groups')).insert(data)
        if (data.type === 'Family') {
            await (new Model('gp_member')).insert({account: data.leader, group_id: groupID, isConfirm: 1})
        }
    }

    async edit(id, data) {
        await (new Model('groups')).where('id', id).update(data)
    }

    async join(id, account) {
        await (new Model('gp_member')).insert({ group_id: id, account: account, isConfirm: 0 })
    }

    async accept(id, account) {
        await (new Model('gp_member')).where('group_id', id).andWhere('account', account).update({ isConfirm: 1 })
    }

    async leave(id, account) {
        await (new Model('gp_member')).where('group_id', id).andWhere('account', account).del()
    }

    async delete(id) {
        await Promise.all([(new Model('groups')).where('id', id).del(), (new Model('gp_member')).where('group_id', id).del(), this.ArticleRepo.deletebyGroup(id)])
    }
}