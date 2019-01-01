import Model from '../models/Model'

import ArticleRepo from './Article'

export default class Group {
    constructor() {
        this.GroupModel    = new Model('groups')
        this.GPMemberModel = new Model('gp_member')
        this.ArticleRepo   = new ArticleRepo()
    }

    async getAllGroups() {
        try {
            return await this.GroupModel.select('*').query()
        } catch (e) {
            throw 'get group error'
        }
    }

    async getGroupByID(id) {
        try {
            return (await this.GroupModel.select('*').where('id', id).query())[0]
        } catch (e) {
            throw 'get group error'
        }
    }

    async getGroupByName(name) {
        try {
            return await this.GroupModel.select('*').where('name', 'like', name).query()
        } catch (e) {
            throw 'get group error'
        }
    }

    async getGroupByAccount(account) {
        try {
            let groups = await this.GPMemberModel.select('*').where('account', account).query()
            groups     = groups.map(group => group.group_id)
            return await this.GroupModel.select('*').whereIn('id', groups).query()
        } catch (e) {
            throw 'get group error'
        }
    }

    async getGroupMembers(id) {
        try {
            return await this.GPMemberModel.select('*').where('group_id', id).query()
        } catch (e) {
            throw 'get group member error'
        }
    }

    async isInGroup(account, group) {
        try {
            return (await this.GPMemberModel.select('*').where('account', account).andWhere('group_id', group).query())[0] !== undefined
        } catch (e) {
            throw 'check in group error'
        }
    }

    async create(data) {
        let groupID
        try {
            groupID = await this.GroupModel.insert(data)
        } catch (e) {
            throw 'insert group error'
        }
        if (data.type === 'Family') {
            await this.GPMemberModel.insert({account: data.leader, group_id: groupID})
        }
    }

    async edit(id, data) {
        try {
            await this.GroupModel.where('id', id).update(data)
        } catch (e) {
            throw 'update group error'
        }
    }

    async join(id, account) {
        try {
            await this.GPMemberModel.insert({ group_id: id, account: account })
        } catch (e) {
            throw 'insert group member error'
        }
    }

    async leave(id, account) {
        try {
            await this.GPMemberModel.where('group_id', id).andWhere('account', account).del()
        } catch (e) {
            throw 'delete group member error'
        }
    }

    async delete(id) {
        try {
            await Promise.all([this.GroupModel.where('id', id).del(), this.GPMemberModel.where('group_id', id).del()])
        } catch (e) {
            throw 'delete group error'
        }
        await this.ArticleRepo.deletebyGroup(id)
    }
}