import Model from '../models/MySQL'

export default class Article {
    constructor() {
        this.ArticleModel = new Model('article')
    }

    async getAllArticles() {
        return await this.ArticleModel.select('*').query()
    }

    async getArticleByID(id) {
        return (await this.ArticleModel.select('*').where('id', id).query())[0]
    }

    async getArticleByAuthor(author) {
        return (await this.ArticleModel.select('*').where('author', author).query())[0]
    }

    async getArticleByTitle(title) {
        return (await this.ArticleModel.select('*').where('title', title).query())[0]
    }

    async getArticleByContext(context) {
        return (await this.ArticleModel.select('*').where('context', context).query())[0]
    }
    
    async getArticleByGroup(group) {
        return (await this.ArticleModel.select('*').where('group', group).query())[0]
    }

    async getArticleByGroupAndAuthor(group, author) {
        return (await this.ArticleModel.select('*').andWhere('author', author, 'group', group).query())[0]
    }

    async getArticleByGroupAndTitle(group, title) {
        return (await this.ArticleModel.select('*').where('title', title).andWhere('group', group).query())[0]
    }

    async getArticleByGroupAndContext(group, context) {
        return (await this.ArticleModel.select('*').where('context', context).andWhere('group', group).query())[0]        
    }

    async create(data) {
        await this.ArticleModel.insert(data)
    }

    async edit(id, data) {
        await this.ArticleModel.where('id', id).update(data)
    }

    async Delete(id) {
        await this.ArticleModel.where('id', id).update(id)
    }
}