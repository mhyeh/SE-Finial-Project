import Model from "../models/MongoDB";

import utils from '../Utils'

export default class Comment {
    constructor() {
        this.CommentModel = new Model('comment')
    }

    async getAllComments(article) {
        try {
            return await this.CommentModel.select('*').where('article_id', article).query()
        } catch (e) {
            throw 'get comment error'
        }
    }

    async getCommentByID(id) {
        try {
            return (await this.CommentModel.select('*').where('id', id).query())[0]
        } catch (e) {
            throw 'get comment error'
        }
    }

    async post(data) {
        utils.checkAllow(data, ['article_id', 'author', 'context', 'time', 'ip', 'types'])
        try {
            await this.CommentModel.insert(data)
        } catch (e) {
            throw 'insert comment error'
        }
    }

    async edit(id, data) {
        utils.checkAllow(data, ['author', 'context', 'time', 'ip'])
        try {
            await this.CommentModel.where('id', id).update(data)
        } catch (e) {
            throw 'update comment error'
        }
    }

    async delete(id) {
        try {
            await this.CommentModel.where('id', id).del()
        } catch (e) {
            throw 'delete comment error'
        }
    }
}