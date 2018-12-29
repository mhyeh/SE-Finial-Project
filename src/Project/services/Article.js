import AccountRepo  from '../repositories/Account'
import ArticleRepo  from '../repositories/Article'
import GroupRepo    from '../repositories/Group'
import FileService  from './File'

import utils from '../Utils'

export default class Article {
    constructor() {
        this.AccountRepo  = new AccountRepo()
        this.ArticleRepo  = new ArticleRepo()
        this.GroupRepo    = new GroupRepo()
        this.FileService  = new FileService()
    }

    async Post(accountID, req) {
        const data    = await this.procArticle(req)
        data.author   = accountID
        data.board_id = ''
        
        await this.ArticleRepo.create(data)

        
        await this.giveCoin(data)
    }

    async PostInGroup(accountID, groupID, req) {
        const group = await this.GroupRepo.getGroupByID(groupID)
        if (group.type === 'Family' && !(await this.GroupRepo.isInGroup(groupID, accountID))) {
            throw 'post error'
        }

        const data    = await this.procArticle(req)
        data.author   = accountID
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

    async Edit(accountID, id, req) {
        const article = await this.ArticleRepo.getArticleByID(id)
        if (article === undefined || article.author !== accountID) {
            throw 'edit error'
        }

        const data = await this.procArticle(req)

        await this.ArticleRepo.edit(id, data)
    }

    async procArticle(req) {
        const formdata = await this.FileService.ProcFormData(req.req, { imgs: -1 })
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
        data.image = JSON.stringify(data.image)
        data.time  = utils.getDateTime()
        data.ip    = req.ip

        return data
    }

    async Delete(accountID, id) {
        const article = await this.ArticleRepo.getArticleByID(id)
        let   group
        if (article.board_id !== '') {
            group = await this.GroupRepo.getGroupByID(article.board_id)
        }
        if (article === undefined || article.author !== accountID && accountID !== group.leader) {
            throw 'delete error'
        }

        await this.ArticleRepo.delete(id)
    }
}