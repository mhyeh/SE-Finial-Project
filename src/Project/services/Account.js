import AccountRepo from '../repositories/Account'
import FriendRepo  from '../repositories/Friend'

import FileService  from './File'
import RedisService from './Redis'

import errorLog from '../ErrorLog'
import utils    from '../Utils'

export default class Account {
    constructor() {
        this.AccountRepo  = new AccountRepo()
        this.FileService  = new FileService()
        this.FriendRepo   = new FriendRepo()
        this.RedisService = new RedisService()
    }

    async Login(data) {
        utils.trimData(data)
        if (!utils.hasValue(data.account, 'string')) {
            throw errorLog.noInput('account')
        }
        if (!utils.hasValue(data.password, 'string')) {
            throw errorLog.noInput('password')
        }
        const account = await this.AccountRepo.getAccountByAccount(data.account)
        if (!utils.hasValue(account, 'object')) {
            throw errorLog.dataNotFound('account')
        }
        const hashPwd = utils.hash(data.password)
        if (hashPwd !== account.password) {
            throw 'false password'
        }
        try {
            const token = this.RedisService.GenerateToken()
            this.RedisService.Store(token, account.id)
            return token
        } catch (e) {
            throw errorLog.redisError()
        }
    }

    async Register(data) {
        utils.trimData(data)
        if (!utils.hasValue(data.account, 'string')) {
            throw errorLog.noInput('account')
        }
        if (!utils.hasValue(data.password, 'string')) {
            throw errorLog.noInput('password')
        }
        if (!utils.hasValue(data.name, 'string')) {
            throw errorLog.noInput('name')
        }
        if (!utils.checkAllow(data, ['account', 'password', 'name'])) {
            throw errorLog.inputNotAccept()
        }

        let account = await this.AccountRepo.getAccountByAccount(data.account)
        if (utils.hasValue(account, 'object')) {
            throw 'account already exist'
        }

        data.password = utils.hash(data.password)
        await this.AccountRepo.create(data)
        account = await this.AccountRepo.getAccountByAccount(data.account) 

        try {
            const token = this.RedisService.GenerateToken()
            this.RedisService.Store(token, account.id)
            return token
        } catch (e) {
            throw errorLog.redisError()
        }
    }

    async Edit(token, id, req) {
        const [ID, formdata] = await Promise.all([this.RedisService.Verify(token), this.FileService.ProcFormData(req, { photo: 1 })])
        const data  = formdata.fields
        const photo = formdata.files.photo
        
        if (ID !== id) {
            if (photo) {
                await utils.removeFile(photo.path)
            }
            throw errorLog.notYourData('account')
        }

        utils.trimData(data)

        if (utils.hasValue(data.password, 'string')) {
            data.password = utils.hash(data.password)
        }

        if (utils.hasValue(data.birthday, 'string')) {
            data.birthday = utils.getDate(data.birthday)
        }

        if (utils.hasValue(data.expire_date, 'string')) {
            data.expire_date = utils.getDate(data.expire_date)
        }

        if (utils.hasValue(photo, 'object')) {
            data.photo = utils.getBaseName(photo.path)
        }

        utils.filterData(data)

        if (!utils.checkAllow(data, ['password', 'name', 'department', 'class', 'birthday', 'sex', 'ID_card', 'address', 'photo', 'passport', 'credit_card', 'cvc', 'expire_date', 'interst'])) {
            if (photo) {
                await utils.removeFile(photo.path)
            }
            throw errorLog.inputNotAccept()
        }

        await this.AccountRepo.edit(id, data)
    }

    async Delete(token, id) {
        const ID = await this.RedisService.Verify(token)
        if (ID !== id) {
            throw errorLog.notYourData('account')
        }

        await this.AccountRepo.delete(id)
    }

    async Match(token) {
        const [ID, accountList] = await Promise.all([this.RedisService.Verify(token), this.AccountRepo.getAllAccounts()])
        if (accountList.length === 1) {
            throw 'no other user'
        }
        let r, count = 0;
        while (1) {
            r = ~~(Math.random() * accountList.length)
            if (accountList[r].id === ID || accountList[r].isFriend == 1) {
                continue
            }
            if ((await this.FriendRepo.checkState(ID, accountList[r].id)) !==  -1) {
                accountList[r].isFriend = 1
                count++
                if (count === accountList.length - 1) {
                    throw '人生勝利組'
                }
                continue
            }
            break
        }
        return accountList[r]
    }
}