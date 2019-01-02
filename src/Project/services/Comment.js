import AccountRepo  from '../repositories/Account'
import ArticleRepo  from '../repositories/Article'
import CommentRepo  from '../repositories/Comment'

import errorLog from '../ErrorLog'
import utils    from '../Utils'

export default class Comment {
    constructor() {
        this.AccountRepo  = new AccountRepo()
        this.ArticleRepo  = new ArticleRepo()
        this.CommentRepo  = new CommentRepo()
    }

    async Post(accountID, id, req) {
        const article = await this.ArticleRepo.getArticleByID(id)
        const data    = req.body

        utils.trimData(data)
        if (!utils.hasValue(article, 'object')) {
            throw errorLog.dataNotFound('article')
        }
        if (!utils.hasValue(data.types, 'number')) {
            throw errorLog.noInput('types')
        }
        data.types = parseInt(data.types)
        if (data.types !== 0 && data.types !== 1 && data.types !== 2) {
            throw 'illegal input types'
        }
        if (!utils.hasValue(data.context, 'string')) {
            throw errorLog.noInput('context')
        }
        if (!utils.checkAllow(data, ['context', 'types'])) {
            throw errorLog.inputNotAccept()
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

        utils.trimData(data)
        if (!utils.hasValue(comment, 'object')) {
            throw errorLog.dataNotFound('comment')
        }
        if (comment.author !== accountID) {
            throw errorLog.notYourData('comment')
        }
        if (!utils.hasValue(data.context, 'string')) {
            throw errorLog.noInput('context')
        }
        if (!utils.checkAllow(data, ['context'])) {
            throw errorLog.inputNotAccept()
        }

        utils.filterData(data)

        data.time = utils.getDateTime()
        data.ip   = req.ip
        
        await this.CommentRepo.edit(id, data)
    }

    async Delete(accountID, id) {
        const comment = await this.CommentRepo.getCommentByID(id)
        if (!utils.hasValue(comment, 'object')) {
            throw errorLog.dataNotFound('comment')
        }
        if (comment.author !== accountID) {
            throw errorLog.notYourData('comment')
        }
        
        await this.CommentRepo.delete(id)
    }
}