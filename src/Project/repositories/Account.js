import AccountModel from '../models/Account'

export default class Account {
    constructor() {
        this.AccountModel = new AccountModel()
    }

    async getAllAccounts() {
        return await this.AccountModel.select({})
    }

    async getAccountByID(id) {
        return await this.AccountModel.select({ where: { col: 'id', val: id } })[0]
    }

    async getAccountByAccount(account) {
        return await this.AccountModel.select({ where: {col: 'account', val: account } })[0]
    }

    async getAccountsByName(name) {
        return await this.AccountModel.select({ where: { col: 'name', val: name, op: 'like' } })
    }

    async create(data) {
        await this.AccountModel.insert(data)
    }

    async edit(id, data) {
        await this.AccountModel.update({ where: { col: 'id', val: id }, data: data })
    }

    async Delete(id) {
        return await this.AccountModel.Delete({ where: { col: 'id', val: id } })
    }
}