import ArticleRepo    from '../repositories/Article'
import ArticleService from '../services/Article'

export default class Article {
    constructor() {
        this.ArticleRepo    = new ArticleRepo()
        this.ArticleService = new ArticleService()
    }
    
    async GetAllArticles(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getAllArticles() })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async GetArticleByID(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByID(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByAuthor(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByAuthor(req.params.author) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByTitle(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByTitle(req.params.title) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByContext(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByContext(req.params.context) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByGroup(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroup(req.params.group) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByGroupAndAuthor(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndAuthor(req.params.group, req.params.author) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByGroupAndTitle(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndTitle(req.params.group, req.params.title) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByGroupAndContext(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndContext(req.params.group, req.params.context) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Post(req, res) {
        try {
            await this.ArticleService.Post(req.header.authorization, req.req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async PostInGroup(req, res) {
        try {
            await this.ArticleService.PostInGroup(req.header.authorization, req.params.id, req.req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Edit(req, res) {
        try {
            await this.ArticleService.Edit(req.header.authorization, req.params.id, req.req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Delete(req, res) {
        try {
            await this.ArticleService.Delete(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}