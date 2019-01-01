import Model from '../models/MongoDB'

import GroupRepo from './Group'

import utils from '../Utils'

export default class Account {
    constructor() {
        this.AccountModel = new Model('account')
        this.GroupRepo    = new GroupRepo()
    }

    async getAllAccounts() {
        try {
            return await this.AccountModel.select('*').query()
        } catch (e) {
            throw 'get account error'
        }
    }

    async getAccountByID(id) {
        try {
            return (await this.AccountModel.select('*').where('id', id).query())[0]
        } catch (e) {
            throw 'get account error'
        }
    }

    async getAccountByAccount(account) {
        try {        
            return (await this.AccountModel.select('*').where('account', account).query())[0]
        } catch (e) {
            throw 'get account error'
        }
    }

    async getAccountsByName(name) {
        try {
            return await this.AccountModel.select('*').where('name', 'like', name).query()
        } catch (e) {
            throw 'get account error'
        }
    }

    async create(data) {
        utils.allow(data, ['account', 'password', 'name'])
        try {
            await this.AccountModel.insert(data)
        } catch (e) {
            throw 'insert account error'
        }
    }

    async edit(id, data) {
        utils.checkAllow(data, ['password', 'name', 'department', 'class', 'birthday', 'sex', 'ID_card', 'address', 'photo', 'passport', 'credit_card', 'cvc', 'expire_date', 'NTUST_coin', 'interst'])
        try {
            await this.AccountModel.where('id', id).update(data)
        } catch (e) {
            throw 'update account error'
        }
    }

    async delete(id) {
        const account = await this.getAccountByID(id)
        if (account.photo) {
            utils.removeFile(utils.getPath('./uploadedFiles', account.photo))
        }
        try {
            await this.AccountModel.where('id', id).del()
        } catch (e) {
            throw 'delete account error'
        }
        const promise = []
        const groups  = this.GroupRepo.getGroupByAccount(id)
        for (const group of groups) {
            promise.push(this.GroupRepo.leave(group.id, id))
        }
        await Promise.all(promise)
    }
}