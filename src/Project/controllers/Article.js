import ArticleRepo    from '../repositories/Article'
import ArticleService from '../services/Article'

export default class Article {
    constructor() {
        this.ArticleRepo    = new ArticleRepo()
        this.ArticleService = new ArticleService()

        this.GetAllArticles               = this.getAllArticles.bind(this)
        this.GetArticleByID               = this.getArticleByID.bind(this)
        this.GetArticlesByAuthor          = this.getArticlesByAuthor.bind(this)
        this.GetArticlesByTitle           = this.getArticlesByTitle.bind(this)
        this.GetArticlesByContext         = this.getArticlesByContext.bind(this)
        this.GetArticlesByGroup           = this.getArticlesByGroup.bind(this)
        this.GetArticlesByGroupAndAuthor  = this.getArticlesByGroupAndAuthor.bind(this)
        this.GetArticlesByGroupAndTitle   = this.getArticlesByGroupAndTitle.bind(this)
        this.GetArticlesByGroupAndContext = this.getArticlesByGroupAndContext.bind(this)
        this.Post                         = this.post.bind(this)
        this.PostInGroup                  = this.postInGroup.bind(this)
        this.Edit                         = this.edit.bind(this)
        this.Delete                       = this.delete.bind(this)
    }
    
    async getAllArticles(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getAllArticles() })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async getArticleByID(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByID(req.params.id) })
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
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroup(req.params.group) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getArticlesByGroupAndAuthor(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndAuthor(req.params.group, req.params.author) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getArticlesByGroupAndTitle(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndTitle(req.params.group, req.params.title) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async getArticlesByGroupAndContext(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndContext(req.params.group, req.params.context) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async post(req, res) {
        try {
            await this.ArticleService.Post(req.header.authorization, req.req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async postInGroup(req, res) {
        try {
            await this.ArticleService.PostInGroup(req.header.authorization, req.params.id, req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async edit(req, res) {
        try {
            await this.ArticleService.Edit(req.header.authorization, req.params.id, req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async delete(req, res) {
        try {
            await this.ArticleService.Delete(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}