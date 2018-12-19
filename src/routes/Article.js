import Router from '../router'

import ArticleController from '../Project/controllers/Article'

class Article extends Router {
    constructor() {
        super()
        this.controller = new ArticleController()
        this.init()
    }

    init() {
        this.get('/',                              this.controller.GetAllArticles.bind(this.controller))
        this.get('/group/:group/author/:author',   this.controller.GetArticlesByGroupAndAuthor.bind(this.controller))
        this.get('/group/:group/title/:title',     this.controller.GetArticlesByGroupAndTitle.bind(this.controller))
        this.get('/group/:group/context/:context', this.controller.GetArticlesByGroupAndContext.bind(this.controller))
        this.get('/author/:author',                this.controller.GetArticlesByAuthor.bind(this.controller))
        this.get('/title/:title',                  this.controller.GetArticlesByTitle.bind(this.controller))
        this.get('/context/:context',              this.controller.GetArticlesByContext.bind(this.controller))
        this.get('/group/:group',                  this.controller.GetArticlesByGroup.bind(this.controller))
        this.get('/:id',                           this.controller.GetArticleByID.bind(this.controller))
        this.post('/',                             this.controller.Post.bind(this.controller))
        this.post('/group/:id',                    this.controller.PostInGroup.bind(this.controller))
        this.put('/:id',                           this.controller.Edit.bind(this.controller))
        this.delete('/:id',                        this.controller.Delete.bind(this.controller))
    }
}

const ArticleRouter = new Article()
export default ArticleRouter.Match.bind(ArticleRouter)