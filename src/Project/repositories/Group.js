import Model from "../models/MySQL";

export default class Group {
    constructor() {
        this.GroupModel = new Model('groups')
        this.GPMemberModel = new Model('gp_member')
    }

    async getAllGroups() {
        return await this.GroupModel.select('*').query()
    }

    async getGroupByID(id) {
        return (await this.GroupModel.select('*').where('id', id).query())[0]
    }

    async getGroupByName(name) {
        return (await this.GroupModel.select('*').where('name', name).query())[0]
    }

    async getGroupMembers(id) {
        return await this.GPMemberModel.select('*').where('group_id', id).query()
    }

    async create(data) {
        await this.GroupModel.insert(data)
    }

    async edit(id, data) {
        await this.GroupModel.where('id', id).update(data)
    }

    async Join(id, account) {
        const data = {group_id: id, account:account}
        await this.GPMemberModel.insert(data)
    }

    async leave(id, account) {
        await this.GPMemberModel.where('group_id', id).andWhere('account', account).del()
    }

    async Delete(id) {
        await this.GroupModel.where('id', id).del()
    }
}