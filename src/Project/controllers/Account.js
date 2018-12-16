import AccountRepo    from '../repositories/Account'
import AccountService from '../services/Account'

export default class Account {
    constructor() {
        this.AccountRepo    = new AccountRepo()
        this.AccountService = new AccountService()
    }
    
    async GetAllAccounts(req, res) {
        try {
            res.status(200).json({ accounts: await this.AccountRepo.getAllAccounts() })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async Login(req, res) {
        try {
            res.status(200).json({ token: await this.AccountService.login(req.body) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Register(req, res) {
        try {
            res.status(200).json({ token: await this.AccountService.register(req.body) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetAccountByID(req, res) {
        try {
            res.status(200).json({ account: await this.AccountRepo.getAccountByID(req.prams.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetAccountsByName(req, res) {
        try {
            res.status(200).json({ accounts: await this.AccountRepo.getAccountsByName(req.prams.name) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Edit(req, res) {
        try {
            await this.AccountService.Edit(req.header.authorization, req.prams.id, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Delete(req, res) {
        try {
            await this.AccountService.Delete(req.header.authorization, req.prams.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}