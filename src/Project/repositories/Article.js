import Model from '../models/MongoDB'

import FriendRepo  from './Friend'
import GroupRepo   from './Group'

import utils from '../Utils'

export default class Article {
    constructor() {
        this.ArticleModel = new Model('article')
        this.CommentModel = new Model('comment')
        this.FriendRepo   = new FriendRepo()
        this.GroupRepo    = new GroupRepo()
    }

    async getAllArticles() {
        return await this.ArticleModel.select('*').query()
    }

    async getDefaultArticles(accountID) {
        const friendList = await this.FriendRepo.getAllFriends(accountID)
        const author = friendList.map(friend => friend.id)
        author.push(accountID)
        return await this.ArticleModel.select('*').whereIn('author', author).andWhere('board_id', '').query()
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
    
    async getArticleByGroup(accountID, group) {
        await this.auth(accountID, group)
        return await this.ArticleModel.select('*').where('board_id', group).query()
    }

    async getArticleByGroupAndAuthor(accountID, group, author) {
        await this.auth(accountID, group)
        return await this.ArticleModel.select('*').where('author', author).andWhere('board_id', group).query()
    }

    async getArticleByGroupAndTitle(accountID, group, title) {
        await this.auth(accountID, group)
        return await this.ArticleModel.select('*').where('title', 'like', title).andWhere('board_id', group).query()
    }

    async getArticleByGroupAndContext(accountID, group, context) {
        await this.auth(accountID, group)
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
        const promise  = []
        let articles   = await this.ArticleModel.select('id').where('group', group_id).query()
        for (const article of articles) {
            if (article.image) {
                const images = JSON.parse(article.image)
                for (const image of images) {
                    promise.push(utils.removeFile(utils.getPath('uploadedFiles', image)))
                }
            }
        }
        articles = articles.map(article => article.id)
        promise.push(this.ArticleModel.where('board_id', group_id).del())
        promise.push(this.CommentModel.whereIn('article_id', articles).del())
        await Promise.all(promise)
    }

    async delete(id) {
        const promise = []
        const article = await this.getArticleByID(id)
        if (article.image) {
            const images = JSON.parse(article.image)
            for (const image of images) {
                promise.push(utils.removeFile(utils.getPath('uploadedFiles', image)))
            }
        }
        promise.push(this.ArticleModel.where('id', id).del())
        promise.push(this.CommentModel.where('article_id', id).del())
        await Promise.all(promise)
    }
    
    async auth(accountID, group) {
        const groupType = (await this.GroupRepo.getGroupByID(group)).type
        if (groupType === 'Family' && !(await this.GroupRepo.isInGroup(accountID, group))) {
            throw 'not in group'
        }
    }
}