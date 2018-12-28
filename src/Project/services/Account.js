import AccountRepo from '../repositories/Account'
import FriendRepo  from '../repositories/Friend'

import FileService  from './File'
import RedisService from './Redis'

import utils from '../Utils'

export default class Account {
    constructor() {
        this.AccountRepo  = new AccountRepo()
        this.FileService  = new FileService()
        this.FriendRepo   = new FriendRepo()
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
        const formdata = await this.FileService.ProcFormData(req, { photo: 1 })
        const data     = formdata.fields
        const photo    = formdata.files.photo
        if (data.password !== undefined) {
            data.password = utils.hash(data.password)
        }

        if (data.birthday !== undefined) {
            data.birthday = utils.getDate(data.birthday)
        }

        if (data.expire_date !== undefined) {
            data.expire_date = utils.getDate(data.expire_date)
        }

        if (photo !== undefined) {
            data.photo = utils.getBaseName(photo.path)
        }
        await this.AccountRepo.edit(id, data)
    }

    async Delete(token, id) {
        const ID = await this.RedisService.Verify(token)
        if (ID !== id) {
            throw 'delete error'
        }

        await this.AccountRepo.Delete(id)
    }

    async Match(token) {
        const ID          = await this.RedisService.Verify(token)
        const accountList = await this.AccountRepo.getAllAccounts()
        if (accountList.length === 1) {
            throw 'no other user'
        }
        let r, count = 0;
        while (1) {
            r = ~~(Math.random() * accountList.length)
            if (accountList[r].id === ID || accountList[r].isFriend == 1) {
                continue
            }
            if (await this.FriendRepo.getFriend(ID, accountList[r])) {
                accountList[r].isFriend = 1
                count++
            }
            if (count === accountList.length - 1) {
                throw '人生勝利組'
            }
        }
        return accountList[r]
    }
}