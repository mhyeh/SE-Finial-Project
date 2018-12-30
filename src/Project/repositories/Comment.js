import Model from "../models/MongoDB";

import utils from '../Utils'

export default class Comment {
    constructor() {
        this.CommentModel = new Model('comment')
    }

    async getAllComments(article) {
        return await this.CommentModel.select('*').where('article_id', article).query()
    }

    async getCommentByID(id) {
        return (await this.CommentModel.select('*').where('id', id).query())[0]
    }

    async post(data) {
        if (!utils.allow(data, ['article_id', 'author', 'context', 'time', 'ip', 'types'])) {
            throw 'not accept'
        }
        await this.CommentModel.insert(data)
    }

    async edit(id, data) {
        if (!utils.allow(data, ['author', 'context', 'time', 'ip'])) {
            throw 'not accept'
        }
        await this.CommentModel.where('id', id).update(data)
    }

    async Delete(id) {
        await this.CommentModel.where('id', id).del()
    }
    
    async deletebyArticle(article_id) {
        await this.CommentModel.where('article_id', article_id).del()
    }
}