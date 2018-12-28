import AccountRepo  from '../repositories/Account'
import ArticleRepo  from '../repositories/Article'
import GroupRepo    from '../repositories/Group'
import FileService  from './File'
import RedisService from './Redis'

import utils from '../Utils'

export default class Article {
    constructor() {
        this.AccountRepo  = new AccountRepo()
        this.ArticleRepo  = new ArticleRepo()
        this.GroupRepo    = new GroupRepo()
        this.FileService  = new FileService()
        this.RedisService = new RedisService()
    }

    async Post(token, req) {
        const ID = await this.RedisService.Verify(token)
        
        const data    = this.procPost(req)
        data.author   = ID
        data.board_id = ''
        
        await this.ArticleRepo.create(data)

        
        await this.giveCoin(data)
    }

    async PostInGroup(token, groupID, req) {
        const ID    = await this.RedisService.Verify(token)
        const group = await this.GroupRepo.getGroupByID(groupID)
        if (group.type === 'Family' && !(await this.GroupRepo.isInGroup(groupID, ID))) {
            throw 'post error'
        }

        const data    = this.procPost(req)
        data.author   = ID
        data.board_id = groupID

        await this.ArticleRepo.create(data)

        await this.giveCoin(data)
    }

    async giveCoin(data) {
        let score
        if (data.context && data.imgs.length !== 0) {
            score = data.context.length + data.imgs.length * 10
        } else if (data.context) {
            score = data.context.length
        } else {
            score = data.imgs.length * 10
        }

        const account = await this.AccountRepo.getAccountByID(data.author)
        await this.AccountRepo.edit(data.author, {NTUST_coin: account.NTUST_Coin + score})
    }

    async Edit(token, id, req) {
        const ID      = await this.RedisService.Verify(token)
        const article = await this.ArticleRepo.getArticleByID(id)
        if (article === undefined || article.author !== ID) {
            throw 'edit error'
        }

        const data = this.procPost(req)

        await this.ArticleRepo.edit(id, data)
    }

    async procArticle(req) {
        const formdata = await this.FileService.ProcFormData(req.req, {imgs: -1})
        const data     = formdata.fields
        const images   = formdata.files.imgs

        if (data.title === undefined || (data.context === undefined && (images === undefined || images === []))) {
            throw 'post error'
        }

        if (images !== undefined && images !== []) {
            data.image = []
            if (images instanceof Array) {
                for (const image of images) {
                    data.image.push(utils.getBaseName(image.path))
                }
            } else {
                data.image.push(utils.getBaseName(images.path))
            }
        }
        data.image    = JSON.stringify(data.image)
        data.time     = utils.getDateTime()
        data.ip       = req.ip

        return data
    }

    async Delete(token, id) {
        const ID      = await this.RedisService.Verify(token)
        const article = await this.ArticleRepo.getArticleByID(id)
        if (article === undefined || article.author !== ID) {
            throw 'delete error'
        }

        await this.ArticleRepo.delete(id)
    }
}