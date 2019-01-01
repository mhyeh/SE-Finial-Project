import ArticleRepo    from '../repositories/Article'

import ArticleService from '../services/Article'
import RedisService   from '../services/Redis'

export default class Article {
    constructor() {
        this.ArticleRepo    = new ArticleRepo()
        this.ArticleService = new ArticleService()
        this.RedisService   = new RedisService()

        this.GetDefaultArticles           = this.getDefaultArticles.bind(this)
        this.GetArticleByID               = this.getArticleByID.bind(this)
        this.GetArticlesByAuthor          = this.getArticlesByAuthor.bind(this)
        this.GetArticlesByTitle           = this.getArticlesByTitle.bind(this)
        this.GetArticlesByContext         = this.getArticlesByContext.bind(this)
        this.GetArticlesByGroup           = this.getArticlesByGroup.bind(this)
        this.GetArticlesByGroupAndAuthor  = this.getArticlesByGroupAndAuthor.bind(this)
        this.GetArticlesByGroupAndTitle   = this.getArticlesByGroupAndTitle.bind(this)
        this.GetArticlesByGroupAndContext = this.getArticlesByGroupAndContext.bind(this)
        this.GetRecommandArticles         = this.getRecommandArticles.bind(this)
        this.Post                         = this.post.bind(this)
        this.PostInGroup                  = this.postInGroup.bind(this)
        this.Edit                         = this.edit.bind(this)
        this.Delete                       = this.delete.bind(this)
    }
    
    async getDefaultArticles(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            res.status(200).json({ articles: await this.ArticleRepo.getDefaultArticles(ID) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getRecommandArticles(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getRecommandArticles() })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async getArticleByID(req, res) {
        try {
            res.status(200).json({ article: await this.ArticleRepo.getArticleByID(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getArticlesByAuthor(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByAuthor(req.params.author) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getArticlesByTitle(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByTitle(req.params.title) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getArticlesByContext(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByContext(req.params.context) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getArticlesByGroup(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.auth(ID, req.params.group)
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroup(req.params.group) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getArticlesByGroupAndAuthor(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.auth(ID, req.params.group)
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndAuthor(req.params.group, req.params.author) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getArticlesByGroupAndTitle(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.auth(ID, req.params.group)
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndTitle(req.params.group, req.params.title) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getArticlesByGroupAndContext(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.auth(ID, req.params.group)
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndContext(req.params.group, req.params.context) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async post(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.Post(ID, req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async postInGroup(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.PostInGroup(ID, req.params.id, req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async edit(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.Edit(ID, req.params.id, req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async delete(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.ArticleService.Delete(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}