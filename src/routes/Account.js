import Router from '../router'

import AccountController from '../Project/controllers/Account'

class Account {
    constructor() {
        this.router     = new Router()
        this.controller = new AccountController()
        this.init()
    }

    init() {
        this.router.get('/',       (req, res) => this.controller.GetAllAccounts(req, res))
        this.router.get('/:id',    (req, res) => this.controller.GetAccount(req, res))
        this.router.post('/',      (req, res) => this.controller.Register(req, res))
        this.router.post('/login', (req, res) => this.controller.Login(req, res))
        this.router.put('/:id',    (req, res) => this.controller.Edit(req, res))
        this.router.delete('/:id', (req, res) => this.controller.Delete(req, res))
    }
}

const AccountRouter = new Account()
export default AccountRouter