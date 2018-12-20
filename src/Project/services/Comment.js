import ArticleRepo     from '../repositories/Article'
import CommentRepo     from '../repositories/Comment'
import DateTimeService from './DateTime'
import RedisService    from './Redis'

export default class Comment {
    constructor() {
        this.ArticleRepo     = new ArticleRepo()
        this.CommentRepo     = new CommentRepo()
        this.DateTimeService = new DateTimeService()
        this.RedisService    = new RedisService()
    }

    async Post(token, id, req) {
        const ID      = await this.RedisService.Verify(token)
        const article = await this.ArticleRepo.getArticleByID(id)
        const data    = req.body
        if (ID === -1 || article === undefined || data.types === undefined || (data.types !== 0 && data.types !== 1 && data.types !== 2) || data.comment === undefined) {
            throw 'post error'
        }
        data.time       = this.DateTimeService.getDateTime()
        data.author     = ID
        data.article_id = id
        data.ip         = req.ip
        await this.CommentRepo.post(data)
    }

    async Edit(token, id, req) {
        const ID      = await this.RedisService.Verify(token)
        const comment = await this.CommentRepo.getCommentByID(id)
        const data    = req.body
        if (ID === -1 || comment === undefined || comment.author !== ID || data.comment === undefined) {
            throw 'edit error'
        }
        data.time = this.DateTimeService.getDateTime()
        data.ip   = req.ip
        await this.CommentRepo.edit(id, data)
    }

    async Delete(token, id) {
        const ID      = await this.RedisService.Verify(token)
        const comment = await this.CommentRepo.getCommentByID(id)
        if (ID === -1 || comment === undefined || comment.author !== ID) {
            throw 'delete error'
        }
        await this.CommentRepo.Delete(id)
    }
}