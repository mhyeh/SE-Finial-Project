import AccountRepo  from '../repositories/Account'
import FileService  from './File'
import RedisService from './Redis'

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
        const hashPwd = this.hash.update(data.password).digest('hex')
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
        const account = await this.AccountRepo.getAccountByAccount(data.account)
        if (account !== undefined) {
            throw 'register error'
        }
        data.password = this.hash.update(data.password).digest(hex)
        await this.AccountRepo.create(data)

        const token = this.RedisService.GenerateToken()
        this.RedisService.Store(token, account.id)
        return token
    }

    async Edit(token, id, req) {
        const ID = await this.RedisService.Verify(token)
        if (ID === -1 || ID !== id) {
            throw 'edit error'
        }
        const account  = await this.AccountRepo.getAccountByID(id)
        const formdata = await this.FileService.ProcFormData(req)
        const data     = formdata.fields
        const files    = formdata.files
        if (data.password !== undefined) {
            account.password = this.hash.update(data.password).digest('hex')
        }
        const cols = ['name', 'department', 'class', 'birthday', 'sex', 'ID_card', 'address', 'passport', 'credit_card', 'cvc', 'expire_data', 'interest']
        for (const col of cols) {
            if (data[col] !== undefined) {
                account[col] = data[col]
            }
        }
        if (files.photo !== undefined) {
            account.photo = this.FileService.GetBaseName(files.photo.path)
        }
        await this.AccountRepo.edit(id, account)
    }

    async Delete(token, id) {
        const ID = await this.RedisService.Verify(token)
        if (ID === -1 || ID !== id) {
            throw 'delete error'
        }

        await this.AccountRepo.Delete(id)
    }
}