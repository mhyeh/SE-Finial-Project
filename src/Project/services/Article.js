import AccountRepo  from '../repositories/Account'
import ArticleRepo  from '../repositories/Article'
import GroupRepo    from '../repositories/Group'
import FileService  from './File'
import RedisService from './Redis'

export default class Article {
    constructor() {
        this.AccountRepo  = new AccountRepo()
        this.ArticleRepo  = new ArticleRepo()
        this.GroupRepo    = new GroupRepo()
        this.FileService  = new FileService()
        this.RedisService = new RedisService()
    }

    async Post(token, data) {
        const ID = await this.RedisService.Verify(token)
        if (ID === -1 || data.title === undefined || data.context === undefined) {
            throw 'post error'
        }
        data.time   = new Date()
        data.author = ID
        await this.ArticleRepo.create(data)
    }

    async PostInGroup(token, groupID, data) {
        const ID = await this.RedisService.Verify(token)
        if (ID === -1 || data.title === undefined || data.context === undefined) {
            throw 'post error'
        }
        const group = await this.GroupRepo.getGroupByID(groupID)
        if (group.type === 'Family' && !(await this.GroupRepo.IsInGroup(groupID, ID))) {
            throw 'post error'
        }
        data.time    = new Date()
        data.author  = ID
        data.GroupID = groupID
        await this.ArticleRepo.create(data)
    }

    async Edit(token, id, data) {
        const ID      = await this.RedisService.Verify(token)
        const article = await this.ArticleRepo.getArticleByID(id)
        if (ID === -1 || article === undefined || article.author !== ID) {
            throw 'edit error'
        }

        if (data.title !== undefined) {
            article.title = data.title
        }
        if (data.context !== undefined) {
            article.context = data.context
        }
        await this.ArticleRepo.edit(id, article)
    }

    async Delete(token, id) {
        const ID      = await this.RedisService.Verify(token)
        const article = await this.ArticleRepo.getArticleByID(id)
        if (ID === -1 || article === undefined || article.author !== ID) {
            throw 'delete error'
        }

        await this.ArticleRepo.Delete(id)
    }
}