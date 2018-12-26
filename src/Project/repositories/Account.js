import Model from '../models/MongoDB'

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
        return await this.AccountModel.select('*').where('name', 'like', name).query()
    }

    async create(data) {
        const acceptList = ['account', 'password', 'name']
        for (const col in data) {
            if (!(col in acceptList)) {
                throw 'not accept'
            }
        }
        await this.AccountModel.insert(data)
    }

    async edit(id, data) {
        const acceptList = ['account', 'password', 'name', 'department', 'class', 'birthday', 'sex', 'ID_card', 
            'address', 'photo', 'passport', 'credit_card', 'cvc', 'expire_date', 'NTUST_coin', 'interst'] 
        for (const col in data) {
            if (!(col in acceptList)) {
                throw 'not accept'
            }
        }
        this.AccountModel.where('id', id).update(data)
    }

    async Delete(id) {
        await this.AccountModel.where('id', id).del()
    }
}