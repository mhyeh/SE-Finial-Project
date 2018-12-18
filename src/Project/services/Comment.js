import ArticleRepo  from '../repositories/Article'
import CommentRepo  from '../repositories/Comment'
import RedisService from './Redis'

export default class Comment {
    constructor() {
        this.ArticleRepo  = new ArticleRepo()
        this.CommentRepo  = new CommentRepo()
        this.RedisService = new RedisService()
    }

    async Post(token, id, data) {
        const ID      = await this.RedisService.Verify(token)
        const article = await this.ArticleRepo.getArticleByID(id)
        if (ID === -1 || article === undefined || data.type === undefined || data.comment === undefined) {
            throw 'post error'
        }
        data.author     = ID
        data.article_id = id
        await this.CommentRepo.post(data)
    }

    async Edit(token, id, data) {
        const ID      = await this.RedisService.Verify(token)
        const comment = await this.CommentRepo.getCommentByID(id)
        if (ID === -1 || comment === undefined || comment.author !== ID || data.comment === undefined) {
            throw 'edit error'
        }
        comment.comment = data.comment
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