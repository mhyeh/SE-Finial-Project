import Model from '../models/MongoDB'

import GroupRepo from './Group'

import utils from '../Utils'

export default class Account {
    constructor() {
        this.AccountModel = new Model('account')
        this.GroupRepo    = new GroupRepo()
    }

    async getAllAccounts() {
        return await this.AccountModel.select('*').query()
    }

    async getAccountByID(id) {
        return (await this.AccountModel.select('*').where('id', id).query())[0]
    }

    async getAccountByAccount(account) {
        return (await this.AccountModel.select('*').where('account', account).query())[0]
    }

    async getAccountsByName(name) {
        return await this.AccountModel.select('*').where('name', 'like', name).query()
    }

    async create(data) {
        if(!utils.allow(data, ['account', 'password', 'name'])) {
            throw 'not accept'
        }
        await this.AccountModel.insert(data)
    }

    async edit(id, data) {
        if(!utils.allow(data, ['password', 'name', 'department', 'class', 'birthday', 'sex', 'ID_card', 'address', 'photo', 'passport', 'credit_card', 'cvc', 'expire_date', 'NTUST_coin', 'interst'])) {
            throw 'not accept'
        }
        this.AccountModel.where('id', id).update(data)
    }

    async delete(id) {
        const account = await this.getAccountByID(id)
        if (account.photo) {
            utils.removeFile(utils.getPath('./uploadedFiles', account.photo))
        }
        const promise = []
        const groups  = this.GroupRepo.getGroupByAccount(id)

        promise.push(this.AccountModel.where('id', id).del())
        for (const group of groups) {
            promise.push(this.GroupRepo.leave(group.id, id))
        }
        await Promise.all(promise)
    }
}