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
        if (article === undefined) {
            throw 'article not found'
        }
        if (data.types === undefined) {
            throw 'no input types'
        }
        if (data.types !== 0 && data.types !== 1 && data.types !== 2) {
            throw 'illegal input types'
        }
        if (data.context === undefined || data.context === '') {
            throw 'no input context'
        }
        utils.checkAllow(data, ['context', 'types'])

        data.time       = utils.getDateTime()
        data.author     = accountID
        data.article_id = id
        data.ip         = req.ip
        
        await this.CommentRepo.post(data)
    }

    async Edit(accountID, id, req) {
        const comment = await this.CommentRepo.getCommentByID(id)
        const data    = req.body
        if (comment === undefined) {
            throw 'comment not found'
        }
        if (comment.author !== accountID) {
            throw 'not your comment'
        }
        if (data.context === undefined || data.context === '') {
            throw 'no input context'
        }
        utils.checkAllow(data, ['context'])
        
        data.time = utils.getDateTime()
        data.ip   = req.ip
        
        await this.CommentRepo.edit(id, data)
    }

    async Delete(accountID, id) {
        const comment = await this.CommentRepo.getCommentByID(id)
        if (comment === undefined) {
            throw 'comment not found'
        }
        if (comment.author !== accountID) {
            throw 'not your comment'
        }
        
        await this.CommentRepo.delete(id)
    }
}