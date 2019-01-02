import AccountRepo  from '../repositories/Account'
import ArticleRepo  from '../repositories/Article'
import GroupRepo    from '../repositories/Group'
import FileService  from './File'

import errorLog from '../ErrorLog'
import utils    from '../Utils'

export default class Article {
    constructor() {
        this.AccountRepo  = new AccountRepo()
        this.ArticleRepo  = new ArticleRepo()
        this.GroupRepo    = new GroupRepo()
        this.FileService  = new FileService()
    }

    async Post(accountID, req, groupID='') {
        if (groupID !== '') {
            await this.auth(accountID, groupID)
        }
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
            throw errorLog.parseJsonError()
        }

        if (data.context && img.length !== 0) {
            score = data.context.length + img.length * 10
        } else if (data.context) {
            score = data.context.length
        } else {
            score = img.length * 10
        }

        const articles = await this.ArticleRepo.getArticleByAuthor(data.author)
        const length   = articles.length
        if (length >= 2) {
            const date1 = new Date(articles[length - 2].time);
            const date2 = new Date(articles[length - 1].time);
            score = Math.round(score * (date2.getTime() - date1.getTime()) / 1000 / 60 / 30)
        }
        score = Math.max(500, score)

        const account = await this.AccountRepo.getAccountByID(data.author)
        if (utils.hasValue(account.NTUST_coin, 'number')) {
            score += parseInt(account.NTUST_coin)
        }
        await this.AccountRepo.edit(data.author, {NTUST_coin: score})
    }

    async Edit(accountID, req, id) {
        const article = await this.ArticleRepo.getArticleByID(id)
        if (!utils.hasValue(article, 'object')) {
            throw errorLog.dataNotFound('article')
        }
        if (article.author !== accountID) {
            throw errorLog.notYourData('article')
        }

        const data = await this.procArticle(req, true)

        await this.ArticleRepo.edit(id, data)
    }

    async procArticle(req, isEdit=false) {
        const formdata = await this.FileService.ProcFormData(req.req, { imgs: -1 })
        const data     = formdata.fields
        const images   = formdata.files.imgs

        utils.trimData(data)

        if (isEdit) {
            if (!utils.hasValue(data.title, 'string') && !utils.hasValue(data.context, 'string') && !utils.hasValue(images, 'array')) {
                throw errorLog.noInput()
            }
        } else {
            if (!utils.hasValue(data.title, 'string')) {
                if (utils.hasValue(images, 'array')) {
                    for (const image of images) {
                        utils.removeFile(image.path)
                    }
                }
                throw errorLog.noInput('title')
            }
            if (!utils.hasValue(data.context, 'string') && !utils.hasValue(images, 'array')) {
                throw errorLog.noInput('context / image')
            }
        }

        if (utils.hasValue(images, 'array')) {
            data.image = []
            for (const image of images) {
                data.image.push(utils.getBaseName(image.path))
            }
            data.image = JSON.stringify(data.image)
        }

        utils.filterData(data)


        if (!utils.checkAllow(data, ['title', 'context', 'image'])) {
            if (utils.hasValue(images, 'array')) {
                for (const image of images) {
                    utils.removeFile(image.path)
                }
            }
            throw errorLog.inputNotAccept()
        }

        data.time = utils.getDateTime()
        data.ip   = req.ip

        return data
    }

    async Delete(accountID, id) {
        const article = await this.ArticleRepo.getArticleByID(id)
        let   group
        if (!utils.hasValue(article, 'object')) {
            throw errorLog.dataNotFound('article')
        }
        if (utils.hasValue(article.board_id, 'string')) {
            group = await this.GroupRepo.getGroupByID(article.board_id)
        }
        if (article.author !== accountID && accountID !== group.leader) {
            throw 'you are not author or group leader'
        }

        await this.ArticleRepo.delete(id)
    }

    async auth(accountID, groupID) {
        const group = await this.GroupRepo.getGroupByID(groupID)
        if (!utils.hasValue(group, 'object')) {
            throw errorLog.dataNotFound('group')
        }
        const groupType = group.type
        if (groupType === 'Family' && (await this.GroupRepo.checkState(accountID, groupID)) !== 1) {
            throw errorLog.notInGroup()
        }
    }
}