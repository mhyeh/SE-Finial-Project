import Model from '../models/Model'

import ArticleRepo from './Article'

export default class Group {
    constructor() {
        this.GroupModel    = new Model('groups')
        this.GPMemberModel = new Model('gp_member')
        this.ArticleRepo   = new ArticleRepo()
    }

    async getAllGroups() {
        return await this.GroupModel.select('*').query()
    }

    async getGroupByID(id) {
        return (await this.GroupModel.select('*').where('id', id).query())[0]
    }

    async getGroupByName(name) {
        return await this.GroupModel.select('*').where('name', 'like', name).query()
    }

    async getGroupByAccount(account) {
        let groups = await this.GPMemberModel.select('*').where('account', account).query()
        groups     = groups.map(group => group.group_id)
        return await this.GroupModel.select('*').whereIn('id', groups).query()
    }

    async getGroupMembers(id) {
        return await this.GPMemberModel.select('*').where('group_id', id).query()
    }

    async isInGroup(account, group) {
        return (await this.GPMemberModel.select('*').where('account', account).andWhere('group_id', group).query())[0] !== undefined
    }

    async create(data) {
        const groupID = await this.GroupModel.insert(data)
        if (data.type === 'Family') {
            await this.GPMemberModel.insert({account: data.leader, group_id: groupID})
        }
    }

    async edit(id, data) {
        await this.GroupModel.where('id', id).update(data)
    }

    async join(id, account) {
        await this.GPMemberModel.insert({ group_id: id, account: account })
    }

    async leave(id, account) {
        await this.GPMemberModel.where('group_id', id).andWhere('account', account).del()
    }

    async delete(id) {
        await Promise.all([this.GroupModel.where('id', id).del(), this.GPMemberModel.where('group_id', id).del(), this.ArticleRepo.deletebyGroup(id)])
    }
}