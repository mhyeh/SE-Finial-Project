import Router from '../router'

import AccountController from '../Project/controllers/Account'

class Account extends Router {
    constructor() {
        super()
        this.controller = new AccountController()
        this.init()
    }

    init() {
        this.get('/',           this.controller.GetAllAccounts.bind(this.controller))
        this.get('/name/:name', this.controller.GetAccountsByName.bind(this.controller))
        this.get('/:id',        this.controller.GetAccountByID.bind(this.controller))
        this.post('/',          this.controller.Register.bind(this.controller))
        this.post('/login',     this.controller.Login.bind(this.controller))
        this.put('/:id',        this.controller.Edit.bind(this.controller))
        this.delete('/:id',     this.controller.Delete.bind(this.controller))
    }
}

const AccountRouter = new Account()
export default AccountRouter.Match.bind(AccountRouter)