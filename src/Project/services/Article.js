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
        await this.auth(accountID, groupID)

        const data    = await this.procArticle(req)
        data.author   = accountID
        data.board_id = groupID

        await this.ArticleRepo.create(data)

        await this.giveCoin(data)
    }

    async giveCoin(data) {
        let score
        let img
        try {
            img = JSON.parse(data.image || '[]')
        } catch (e) {
            throw 'parse json error'
        }

        if (data.context && img.length !== 0) {
            score = data.context.length + img.length * 10
        } else if (data.context) {
            score = data.context.length
        } else {
            score = img.length * 10
        }

        const account = await this.AccountRepo.getAccountByID(data.author)
        if (account.NTUST_coin !== undefined) {
            score += account.NTUST_coin
        }
        await this.AccountRepo.edit(data.author, {NTUST_coin: score})
    }

    async Edit(accountID, id, req) {
        const article = await this.ArticleRepo.getArticleByID(id)
        if (article === undefined) {
            throw 'article not found'
        }
        if (article.author !== accountID) {
            throw 'not your article'
        }

        const data = await this.procArticle(req, true)

        await this.ArticleRepo.edit(id, data)
    }

    async procArticle(req, isEdit=false) {
        const formdata = await this.FileService.ProcFormData(req.req, { imgs: -1 })
        const data     = formdata.fields
        const images   = formdata.files.imgs

        if (isEdit) {
            if ((data.title === undefined || data.title === '') && (data.context === undefined || data.context === '') && (images === undefined || images === [])) {
                throw 'no input'
            }
        } else {
            if (data.title === undefined || data.title === '') {
                throw 'no input title'
            }
            if ((data.context === undefined || data.context === '') && (images === undefined || images === [])) {
                throw 'no input context / images'
            }
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
        utils.checkAllow(data, ['title', 'context', 'image'])

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
        if (article === undefined) {
            throw 'article not found'
        }
        if (article.author !== accountID && accountID !== group.leader) {
            throw 'you are not author or group leader'
        }

        await this.ArticleRepo.delete(id)
    }

    async auth(accountID, group) {
        const groupType = (await this.GroupRepo.getGroupByID(group)).type
        if (groupType === 'Family' && !(await this.GroupRepo.isInGroup(accountID, group))) {
            throw 'not in group'
        }
    }
}