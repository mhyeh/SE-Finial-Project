import Model from '../models/MongoDB'
import Comment from './Comment'

export default class Article {
    constructor() {
        this.ArticleModel = new Model('article')
        this.CommentRepo  = new Comment()
    }

    async getAllArticles() {
        return await this.ArticleModel.select('*').query()
    }

    async getArticleByID(id) {
        return (await this.ArticleModel.select('*').where('id', id).query())[0]
    }

    async getArticleByAuthor(author) {
        return await this.ArticleModel.select('*').where('author', author).query()
    }

    async getArticleByTitle(title) {
        return await this.ArticleModel.select('*').where('title', 'like', title).query()
    }

    async getArticleByContext(context) {
        return await this.ArticleModel.select('*').where('context', 'like', context).query()
    }
    
    async getArticleByGroup(group) {
        return await this.ArticleModel.select('*').where('group', group).query()
    }

    async getArticleByGroupAndAuthor(group, author) {
        return await this.ArticleModel.select('*').where('author', author).andWhere('group', group).query()
    }

    async getArticleByGroupAndTitle(group, title) {
        return await this.ArticleModel.select('*').where('title', 'like', title).andWhere('group', group).query()
    }

    async getArticleByGroupAndContext(group, context) {
        return await this.ArticleModel.select('*').where('context', 'like', context).andWhere('group', group).query()   
    }

    async create(data) {
        await this.ArticleModel.insert(data)
    }

    async edit(id, data) {
        await this.ArticleModel.where('id', id).update(data)
    }

    async deletebyGroup(group_id) {
        const articles = await this.ArticleModel.select('id').where('group', group_id).query()
        const promise = []
        promise.push(this.ArticleModel.where('board_id', group_id).del())
        for (const article of articles) {
            promise.push(this.CommentRepo.deletebyArticle(article.id))
        }
        await Promise.all(promise)
    }

    async Delete(id) {
        await Promise.all([this.ArticleModel.where('id', id).del(), this.CommentRepo.deletebyArticle(id)])
    }
    
}