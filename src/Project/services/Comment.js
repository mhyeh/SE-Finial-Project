import AccountRepo  from '../repositories/Account'
import ArticleRepo  from '../repositories/Article'
import CommentRepo  from '../repositories/Comment'
import RedisService from './Redis'

import utils from '../Utils'

export default class Comment {
    constructor() {
        this.AccountRepo  = new AccountRepo()
        this.ArticleRepo  = new ArticleRepo()
        this.CommentRepo  = new CommentRepo()
        this.RedisService = new RedisService()
    }

    async Post(token, id, req) {
        const ID      = await this.RedisService.Verify(token)
        const article = await this.ArticleRepo.getArticleByID(id)
        const data    = req.body
        if (article === undefined || data.types === undefined || (data.types !== 0 && data.types !== 1 && data.types !== 2) || data.comment === undefined) {
            throw 'post error'
        }
        data.time       = utils.getDateTime()
        data.author     = ID
        data.article_id = id
        data.ip         = req.ip
        
        await this.CommentRepo.post(data)
    }

    async Edit(token, id, req) {
        const ID      = await this.RedisService.Verify(token)
        const comment = await this.CommentRepo.getCommentByID(id)
        const data    = req.body
        if (comment === undefined || comment.author !== ID || data.comment === undefined) {
            throw 'edit error'
        }
        data.time = utils.getDateTime()
        data.ip   = req.ip
        
        await this.CommentRepo.edit(id, data)
    }

    async Delete(token, id) {
        const ID      = await this.RedisService.Verify(token)
        const comment = await this.CommentRepo.getCommentByID(id)
        if (comment === undefined || comment.author !== ID) {
            throw 'delete error'
        }
        
        await this.CommentRepo.Delete(id)
    }
}