import Model from '../models/MongoDB'

import Comment from './Comment'
import Friend  from './Friend'

import utils from '../Utils'

export default class Article {
    constructor() {
        this.ArticleModel = new Model('article')
        this.CommentRepo  = new Comment()
        this.FriendRepo   = new Friend()
    }

    async getAllArticles() {
        return await this.ArticleModel.select('*').query()
    }

    async getFriendArticles(token) {
        const friendList = await this.FriendRepo.getAllFriends(token)
        if (friendList.length === 0) {
            return []
        }
        let query = this.ArticleModel.select('*').where('author', friendList[0].id)
        for (let i = 1; i < friendList.length; i++) {
            query.orWhere('author', friendList[i])
        }
        return await query.andWhere('board_id', '').query()
    }

    async getArticleByID(id) {
        return (await this.ArticleModel.select('*').where('id', id).query())[0]
    }

    async getArticleByAuthor(author) {
        return await this.ArticleModel.select('*').where('author', author).andWhere('board_id', '').query()
    }

    async getArticleByTitle(title) {
        return await this.ArticleModel.select('*').where('title', 'like', title).andWhere('board_id', '').query()
    }

    async getArticleByContext(context) {
        return await this.ArticleModel.select('*').where('context', 'like', context).andWhere('board_id', '').query()
    }
    
    async getArticleByGroup(group) {
        return await this.ArticleModel.select('*').where('board_id', group).query()
    }

    async getArticleByGroupAndAuthor(group, author) {
        return await this.ArticleModel.select('*').where('author', author).andWhere('board_id', group).query()
    }

    async getArticleByGroupAndTitle(group, title) {
        return await this.ArticleModel.select('*').where('title', 'like', title).andWhere('board_id', group).query()
    }

    async getArticleByGroupAndContext(group, context) {
        return await this.ArticleModel.select('*').where('context', 'like', context).andWhere('board_id', group).query()   
    }

    async create(data) {
        if (!utils.allow(data, ['title', 'context', 'author', 'time', 'ip', 'board_id', 'visible', 'image'])) {
            throw 'not accept'
        }
        await this.ArticleModel.insert(data)
    }

    async edit(id, data) {
        if (!utils.allow(data, ['title', 'context', 'time', 'ip', 'visible', 'image'])) {
            throw 'not accept'
        }
        await this.ArticleModel.where('id', id).update(data)
    }

    async deletebyGroup(group_id) {
        const articles = await this.ArticleModel.select('id').where('group', group_id).query()
        const promise  = []
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