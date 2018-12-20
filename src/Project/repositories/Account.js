import Model from '../models/MySQL'

export default class Account {
    constructor() {
        this.AccountModel = new Model('account')
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
        return await this.AccountModel.select('*').where('name', 'like', '%' + name + '%').query()
    }

    async create(data) {
        await this.AccountModel.insert(data)
    }

    async edit(id, data) {
        this.AccountModel.where('id', id).update(data)
    }

    async Delete(id) {
        await this.AccountModel.where('id', id).del()
    }
}