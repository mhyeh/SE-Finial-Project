export default class Account  {
    constructor() {
        
    }
    
    GetAllAccounts(req, res) {

    }
    
    async Login(req, res) {
        await req.ParseBody()
        console.log(req.body)
    }

    Register(req, res) {

    }

    GetAccount(req, res) {

    }

    Edit(req, res) {

    }

    Delete(req, res) {

    }
}