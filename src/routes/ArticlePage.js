import Router from '../router'

import ArticlePageController from '../Project/controllers/ArticlePage'

class ArticlePage extends Router {
    constructor() {
        super()
        this.controller = new ArticlePageController()
        this.init()
    }

    init() {
        this.get('/',                              this.controller.GetDefaultArticles)
        this.get('/group/:group/author/:author',   this.controller.GetArticlesByGroupAndAuthor)
        this.get('/group/:group/title/:title',     this.controller.GetArticlesByGroupAndTitle)
        this.get('/group/:group/context/:context', this.controller.GetArticlesByGroupAndContext)
        this.get('/group/:group',                  this.controller.GetArticlesByGroup)
        this.get('/author/:author',                this.controller.GetArticlesByAuthor)
        this.get('/title/:title',                  this.controller.GetArticlesByTitle)
        this.get('/context/:context',              this.controller.GetArticlesByContext)
    }
}

const ArticlePageRouter = new ArticlePage()
export default ArticlePageRouter.Match.bind(ArticlePageRouter)