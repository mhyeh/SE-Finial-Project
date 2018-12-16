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
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByID(req.prams.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByAuthor(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByAuthor(req.prams.author) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByTitle(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByTitle(req.prams.title) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByContext(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByContext(req.prams.context) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByGroup(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroup(req.prams.group) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByGroupAndAuthor(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndAuthor(req.prams.group, req.prams.author) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByGroupAndTitle(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndTitle(req.prams.group, req.prams.title) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async GetArticlesByGroupAndContext(req, res) {
        try {
            res.status(200).json({ articles: await this.ArticleRepo.getArticleByGroupAndContext(req.prams.group, req.prams.context) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Post(req, res) {
        try {
            await this.ArticleService.Post(req.header.authorization, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async PostInGroup(req, res) {
        try {
            await this.ArticleService.PostInGroup(req.header.authorization, req.prams.id, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Edit(req, res) {
        try {
            await this.ArticleService.Edit(req.header.authorization, req.prams.id, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Delete(req, res) {
        try {
            await this.ArticleService.Delete(req.header.authorization, req.prams.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}