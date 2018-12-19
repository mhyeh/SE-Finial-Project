import AccountRepo    from '../repositories/Account'
import AccountService from '../services/Account'

export default class Account {
    constructor() {
        this.AccountRepo    = new AccountRepo()
        this.AccountService = new AccountService()

        this.GetAllAccounts    = this.getAllAccounts.bind(this)
        this.Login             = this.login.bind(this)
        this.Register          = this.register.bind(this)
        this.GetAccountsByName = this.getAccountsByName.bind(this)
        this.GetAccountByID    = this.getAccountByID.bind(this)
    }
    
    async getAllAccounts(req, res) {
        try {
            res.status(200).json({ accounts: await this.AccountRepo.getAllAccounts() })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async login(req, res) {
        try {
            res.status(200).json({ token: await this.AccountService.Login(req.body) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async register(req, res) {
        try {
            res.status(200).json({ token: await this.AccountService.Register(req.body) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getAccountByID(req, res) {
        try {
            res.status(200).json({ account: await this.AccountRepo.getAccountByID(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getAccountsByName(req, res) {
        try {
            res.status(200).json({ accounts: await this.AccountRepo.getAccountsByName(req.params.name) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async edit(req, res) {
        try {
            await this.AccountService.Edit(req.header.authorization, req.params.id, req.req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async delete(req, res) {
        try {
            await this.AccountService.Delete(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}