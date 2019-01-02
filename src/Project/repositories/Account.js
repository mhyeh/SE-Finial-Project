import Model from '../models/Model'

import GroupRepo from './Group'

import utils from '../Utils'

export default class Account {
    constructor() {
        this.AccountModel = new Model('account')
        this.GroupRepo    = new GroupRepo()
    }

    async getAllAccounts() {
        return await (new Model('account')).select('*').query()
    }

    async getAccountByID(id) {
        return (await (new Model('account')).select('*').where('id', id).query())[0]
    }

    async getAccountByAccount(account) {
        return (await (new Model('account')).select('*').where('account', account).query())[0]
    }

    async getAccountsByName(name) {
        return await (new Model('account')).select('*').where('name', 'like', name).query()
    }

    async create(data) {
        await (new Model('account')).insert(data)
    }

    async edit(id, data) {
        const promise = []
        const account = await this.getAccountByID(id)
        if (utils.hasValue(data.photo, 'string') && utils.hasValue(account.photo, 'string')) {
            promise.push(utils.removeFile(utils.getPath('./uploadedFiles', account.photo)))
        }
        promise.push((new Model('account')).where('id', id).update(data))
        await Promise.all(promise)
    }

    async delete(id) {
        const promise = []
        const [account, groups] = await Promise.all([this.getAccountByID(id), this.GroupRepo.getGroupByAccount(id)])
        
        if (utils.hasValue(account.photo, 'string')) {
            promise.push(utils.removeFile(utils.getPath('./uploadedFiles', account.photo)))
        }
        promise.push((new Model('account')).where('id', id).del())
        for (const group of groups) {
            promise.push(this.GroupRepo.leave(group.id, id))
        }
        await Promise.all(promise)
    }
}