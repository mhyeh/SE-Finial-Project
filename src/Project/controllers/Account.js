import AccountRepo    from '../repositories/Account'

import AccountService from '../services/Account'
import RedisService   from '../services/Redis'

export default class Account {
    constructor() {
        this.AccountRepo    = new AccountRepo()
        this.AccountService = new AccountService()
        this.RedisService   = new RedisService()

        this.GetAllAccounts    = this.getAllAccounts.bind(this)
        this.GetAccountByToken = this.getAccountByToken.bind(this)
        this.Match             = this.match.bind(this)
        this.Login             = this.login.bind(this)
        this.Register          = this.register.bind(this)
        this.GetAccountsByName = this.getAccountsByName.bind(this)
        this.GetAccountByID    = this.getAccountByID.bind(this)
        this.Edit              = this.edit.bind(this)
        this.Delete            = this.delete.bind(this)
    }
    
    async getAllAccounts(req, res) {
        try {
            res.status(200).json({ accounts: await this.AccountRepo.getAllAccounts() })
        } catch (e) {
            res.status(400).json({ error: 'get account error' })
        }
    }

    async getAccountByToken(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ account: await this.AccountRepo.getAccountByID(ID) })
        } catch (e) {
            res.status(400).json({ error: 'get account error' })
        }
    }

    async match(req, res) {
        try {
            res.status(200).json({ account: await this.AccountService.Match(req.header.authorization) })
        } catch (e) {
            res.status(400).json({ error: 'get account error' })
        }
    }
    
    async login(req, res) {
        try {
            res.status(200).json({ token: await this.AccountService.Login(req.body) })
        } catch (e) {
            res.status(400).json({ error: 'login error' })
        }
    }

    async register(req, res) {
        try {
            res.status(200).json({ token: await this.AccountService.Register(req.body) })
        } catch (e) {
            res.status(400).json({ error: 'register error' })
        }
    }

    async getAccountByID(req, res) {
        try {
            res.status(200).json({ account: await this.AccountRepo.getAccountByID(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: 'get account error' })
        }
    }

    async getAccountsByName(req, res) {
        try {
            res.status(200).json({ accounts: await this.AccountRepo.getAccountsByName(req.params.name) })
        } catch (e) {
            res.status(400).json({ error: 'get account error' })
        }
    }

    async edit(req, res) {
        try {
            await this.AccountService.Edit(req.header.authorization, req.params.id, req.req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: 'edit account error' })
        }
    }

    async delete(req, res) {
        try {
            await this.AccountService.Delete(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: 'delete account error' })
        }
    }
}