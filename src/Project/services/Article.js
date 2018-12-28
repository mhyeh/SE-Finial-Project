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
        const ID       = await this.RedisService.Verify(token)
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
        data.author   = ID
        data.ip       = req.ip
        data.board_id = ''
        
        await this.ArticleRepo.create(data)
    }

    async PostInGroup(token, groupID, req) {
        const ID    = await this.RedisService.Verify(token)
        const group = await this.GroupRepo.getGroupByID(groupID)
        if (group.type === 'Family' && !(await this.GroupRepo.IsInGroup(groupID, ID))) {
            throw 'post error'
        }

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
        data.author   = ID
        data.board_id = groupID
        data.ip       = req.ip

        await this.ArticleRepo.create(data)
    }

    async Edit(token, id, req) {
        const ID      = await this.RedisService.Verify(token)
        const article = await this.ArticleRepo.getArticleByID(id)
        if (article === undefined || article.author !== ID) {
            throw 'edit error'
        }

        const formdata = await this.FileService.ProcFormData(req.req, {imgs: -1})
        const data     = formdata.fields
        const images   = formdata.files.imgs

        if (images !==  undefined && images !== []) {
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

        await this.ArticleRepo.edit(id, data)
    }

    async Delete(token, id) {
        const ID      = await this.RedisService.Verify(token)
        const article = await this.ArticleRepo.getArticleByID(id)
        if (article === undefined || article.author !== ID) {
            throw 'delete error'
        }

        await this.ArticleRepo.Delete(id)
    }
}