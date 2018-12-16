import Router from '../router'

import ArticleController from '../Project/controllers/Article'

class Article extends Router {
    constructor() {
        super()
        this.controller = new ArticleController()
        this.init()
    }

    init() {
        this.get('/',                              (req, res) => this.controller.GetAllArticles(req, res))
        this.get('/group/:group/author/:author',   (req, res) => this.controller.GetArticlesByGroupAndAuthor(req, res))
        this.get('/group/:group/title/:title',     (req, res) => this.controller.GetArticlesByGroupAndTitle(req, res))
        this.get('/group/:group/context/:context', (req, res) => this.controller.GetArticlesByGroupAndContext(req, res))
        this.get('/author/:author',                (req, res) => this.controller.GetArticlesByAuthor(req, res))
        this.get('/title/:title',                  (req, res) => this.controller.GetArticlesByTitle(req, res))
        this.get('/context/:context',              (req, res) => this.controller.GetArticlesByContext(req, res))
        this.get('/group/:group',                  (req, res) => this.controller.GetArticlesByGroup(req, res))
        this.get('/:id',                           (req, res) => this.controller.GetArticleByID(req, res))
        this.post('/',                             (req, res) => this.controller.Post(req, res))
        this.post('/group/:id',                    (req, res) => this.controller.PostInGroup(req, res))
        this.put('/:id',                           (req, res) => this.controller.Edit(req, res))
        this.delete('/:id',                        (req, res) => this.controller.Delete(req, res))
    }
}

const ArticleRouter = new Article()
export default ArticleRouter