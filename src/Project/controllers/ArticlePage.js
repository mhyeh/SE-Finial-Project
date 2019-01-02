import ArticleRepo    from '../repositories/Article'

import RedisService   from '../services/Redis'

import utils from '../Utils'

export default class ArticlePage {
    constructor() {
        this.ArticleRepo    = new ArticleRepo()
        this.RedisService   = new RedisService()

        this.GetDefaultArticles           = this.getDefaultArticles.bind(this)
        this.GetArticlesByAuthor          = this.getArticlesByAuthor.bind(this)
        this.GetArticlesByTitle           = this.getArticlesByTitle.bind(this)
        this.GetArticlesByContext         = this.getArticlesByContext.bind(this)
        this.GetArticlesByGroup           = this.getArticlesByGroup.bind(this)
        this.GetArticlesByGroupAndAuthor  = this.getArticlesByGroupAndAuthor.bind(this)
        this.GetArticlesByGroupAndTitle   = this.getArticlesByGroupAndTitle.bind(this)
        this.GetArticlesByGroupAndContext = this.getArticlesByGroupAndContext.bind(this)
    }
    
    async getDefaultArticles(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ articles: await this.ArticleRepo.getDefaultArticles(ID, req.params.page, req.params.size) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get article error') })
        }
    }

    async getRecommandArticles(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getRecommandArticles() })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get article error') })
        }
    }

    async getArticlesByAuthor(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByAuthor(req.params.author, req.params.page, req.params.size) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get article error') })
        }
    }

    async getArticlesByTitle(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByTitle(req.params.title, req.params.page, req.params.size) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get article error') })
        }
    }

    async getArticlesByContext(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByContext(req.params.context, req.params.page, req.params.size) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get article error') })
        }
    }

    async getArticlesByGroup(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.auth(ID, req.params.group)
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroup(req.params.group, req.params.page, req.params.size) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get article error') })
        }
    }

    async getArticlesByGroupAndAuthor(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.auth(ID, req.params.group)
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndAuthor(req.params.group, req.params.author, req.params.page, req.params.size) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get article error') })
        }
    }

    async getArticlesByGroupAndTitle(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.auth(ID, req.params.group)
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndTitle(req.params.group, req.params.title, req.params.page, req.params.size) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get article error') })
        }
    }

    async getArticlesByGroupAndContext(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.auth(ID, req.params.group)
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndContext(req.params.group, req.params.context, req.params.page, req.params.size) })
        } catch (e) {
            res.status(400).json({ error: utils.errorHandle(e, 'get article error') })
        }
    }
}