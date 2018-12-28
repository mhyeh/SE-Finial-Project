import AccountRepo  from '../repositories/Account'
import FileService  from './File'
import RedisService from './Redis'

import utils from '../Utils'

export default class Account {
    constructor() {
        this.AccountRepo  = new AccountRepo()
        this.FileService  = new FileService()
        this.RedisService = new RedisService()
    }

    async Login(data) {
        if (data.account === undefined || data.password === undefined) {
            throw 'login error'
        }
        const account = await this.AccountRepo.getAccountByAccount(data.account)
        if (account === undefined) {
            throw 'login error'
        }
        const hashPwd = utils.hash(data.password)
        if (hashPwd !== account.password) {
            throw 'login error'
        }
        const token = this.RedisService.GenerateToken()
        this.RedisService.Store(token, account.id)
        return token
    }

    async Register(data) {
        if (data.account === undefined || data.password === undefined || data.name === undefined) {
            throw 'register error'
        }
        let account = await this.AccountRepo.getAccountByAccount(data.account)
        if (account !== undefined) {
            throw 'register error'
        }
        data.password = utils.hash(data.password)
        await this.AccountRepo.create(data)
        account = await this.AccountRepo.getAccountByAccount(data.account) 

        const token = this.RedisService.GenerateToken()
        this.RedisService.Store(token, account.id)
        return token
    }

    async Edit(token, id, req) {
        const ID = await this.RedisService.Verify(token)
        if (ID !== id) {
            throw 'edit error'
        }
        const formdata = await this.FileService.ProcFormData(req, 1)
        const data     = formdata.fields
        const files    = formdata.files
        if (data.password !== undefined) {
            data.password = utils.hash(data.password)
        }

        if (data.birthday !== undefined) {
            data.birthday = utils.getDate(data.birthday)
        }

        if (data.expire_date !== undefined) {
            data.expire_date = utils.getDate(data.expire_date)
        }

        if (files.photo !== undefined) {
            data.photo = utils.getBaseName(files.photo.path)
        }
        await this.AccountRepo.edit(id, data)
    }

    async Delete(token, id) {
        const ID = await this.RedisService.Verify(token)
        if (ID === -1 || ID !== id) {
            throw 'delete error'
        }

        await this.AccountRepo.Delete(id)
    }
}