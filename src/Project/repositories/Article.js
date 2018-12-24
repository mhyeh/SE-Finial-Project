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
        return await this.ArticleModel.select('*').where('author', author).query()
    }

    async getArticleByTitle(title) {
        return await this.ArticleModel.select('*').where('title', 'like', `% ${title} %`).query()
    }

    async getArticleByContext(context) {
        return await this.ArticleModel.select('*').where('context', 'like', `% ${context} %`).query()
    }
    
    async getArticleByGroup(group) {
        return await this.ArticleModel.select('*').where('group', group).query()
    }

    async getArticleByGroupAndAuthor(group, author) {
        return await this.ArticleModel.select('*').where('author', author).andWhere('group', group).query()
    }

    async getArticleByGroupAndTitle(group, title) {
        return await this.ArticleModel.select('*').where('title', 'like', `% ${title} %`).andWhere('group', group).query()
    }

    async getArticleByGroupAndContext(group, context) {
        return await this.ArticleModel.select('*').where('context', 'like', `% ${context} %`).andWhere('group', group).query()   
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