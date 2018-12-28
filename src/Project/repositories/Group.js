import Model from '../models/MongoDB';

import ArticleRepo from './Article'

import utils from '../Utils'

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
        const groups  = await this.GPMemberModel.select('*').where('account', account).query()
        const promise = []
        for (const group of groups) {
            promise.push(this.getGroupByID(group.id))
        }
        return await Promise.all(promise)
    }

    async getGroupMembers(id) {
        return await this.GPMemberModel.select('*').where('group_id', id).query()
    }

    async isInGroup(account, group) {
        return (await this.GPMemberModel.select('*').where('account', account).andWhere('group_id', group).query()) !== []
    }

    async create(data) {
        if (!utils.allow(data, ['name', 'leader', 'type'])) {
            throw 'not accept'
        }
        await this.GroupModel.insert(data)
    }

    async edit(id, data) {
        if (!utils.allow(data, ['name', 'leader'])) {
            throw 'not accept'
        }
        await this.GroupModel.where('id', id).update(data)
    }

    async Join(id, account) {
        const data = { group_id: id, account: account }
        await this.GPMemberModel.insert(data)
    }

    async leave(id, account) {
        await this.GPMemberModel.where('group_id', id).andWhere('account', account).del()
    }

    async Delete(id) {
        await Promise.all([this.GroupModel.where('id', id).del(), this.GPMemberModel.where('group_id', id).del(), this.ArticleRepo.deletebyGroup(id)])
    }
}