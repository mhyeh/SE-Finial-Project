import Model from "../models/MySQL";

export default class Comment {
    constructor() {
        this.CommentModel = new Model('comment')
    }

    async getAllComments(article) {
        this.CommentModel.select('*').query()
    }

    async getCommentByID(id) {
        return (await this.CommentModel.select('*').where('id', id).query())[0]
    }

    async post(data) {
        await this.CommentModel.insert(data)
    }

    async edit(id, data) {
        await this.CommentModel.where('id', id).update(data)
    }

    async delete(id) {
        await this.CommentModel.where('id', id).del()
    }
}