import AccountRepo  from '../repositories/Account'
import ArticleRepo  from '../repositories/Article'
import CommentRepo  from '../repositories/Comment'

import utils from '../Utils'

export default class Comment {
    constructor() {
        this.AccountRepo  = new AccountRepo()
        this.ArticleRepo  = new ArticleRepo()
        this.CommentRepo  = new CommentRepo()
    }

    async Post(accountID, id, req) {
        const article = await this.ArticleRepo.getArticleByID(id)
        const data    = req.body
        if (article === undefined || data.types === undefined || (data.types !== 0 && data.types !== 1 && data.types !== 2) || data.context === undefined) {
            throw 'post error'
        }
        data.time       = utils.getDateTime()
        data.author     = accountID
        data.article_id = id
        data.ip         = req.ip
        
        await this.CommentRepo.post(data)
    }

    async Edit(accountID, id, req) {
        const comment = await this.CommentRepo.getCommentByID(id)
        const data    = req.body
        if (comment === undefined || comment.author !== accountID || data.context === undefined) {
            throw 'edit error'
        }
        data.time = utils.getDateTime()
        data.ip   = req.ip
        
        await this.CommentRepo.edit(id, data)
    }

    async Delete(accountID, id) {
        const comment = await this.CommentRepo.getCommentByID(id)
        if (comment === undefined || comment.author !== accountID) {
            throw 'delete error'
        }
        
        await this.CommentRepo.Delete(id)
    }
}