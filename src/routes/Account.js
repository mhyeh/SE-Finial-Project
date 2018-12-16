import Router from '../router'

import AccountController from '../Project/controllers/Account'

class Account extends Router {
    constructor() {
        super()
        this.controller = new AccountController()
        this.init()
    }

    init() {
        this.get('/',           (req, res) => this.controller.GetAllAccounts(req, res))
        this.get('/name/:name', (req, res) => this.controller.GetAccountsByName(req, res))
        this.get('/:id',        (req, res) => this.controller.GetAccountByID(req, res))
        this.post('/',          (req, res) => this.controller.Register(req, res))
        this.post('/login',     (req, res) => this.controller.Login(req, res))
        this.put('/:id',        (req, res) => this.controller.Edit(req, res))
        this.delete('/:id',     (req, res) => this.controller.Delete(req, res))
    }
}

const AccountRouter = new Account()
export default AccountRouter