import Router from '../router'

import ArticleController from '../Project/controllers/Article'

class Article extends Router {
    constructor() {
        super()
        this.controller = new ArticleController()
        this.init()
    }

    init() {
        this.get('/',                              this.controller.GetDefaultArticles)
        this.get('/group/:group/author/:author',   this.controller.GetArticlesByGroupAndAuthor)
        this.get('/group/:group/title/:title',     this.controller.GetArticlesByGroupAndTitle)
        this.get('/group/:group/context/:context', this.controller.GetArticlesByGroupAndContext)
        this.get('/author/:author',                this.controller.GetArticlesByAuthor)
        this.get('/title/:title',                  this.controller.GetArticlesByTitle)
        this.get('/context/:context',              this.controller.GetArticlesByContext)
        this.get('/group/:group',                  this.controller.GetArticlesByGroup)
        this.get('/:id',                           this.controller.GetArticleByID)
        this.post('/',                             this.controller.Post)
        this.post('/group/:id',                    this.controller.PostInGroup)
        this.put('/:id',                           this.controller.Edit)
        this.delete('/:id',                        this.controller.Delete)
    }
}

const ArticleRouter = new Article()
export default ArticleRouter.Match.bind(ArticleRouter)