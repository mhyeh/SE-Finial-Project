import Model from '../models/Model'

export default class Comment {
    constructor() {
        this.CommentModel = new Model('comment')
    }

    async getAllComments(article) {
        return await (new Model('comment')).select('*').where('article_id', article).sortBy('time', 1).query()
    }

    async getCommentByID(id) {
        return (await (new Model('comment')).select('*').where('id', id).query())[0]
    }

    async post(data) {
        await (new Model('comment')).insert(data)
    }

    async edit(id, data) {
        await (new Model('comment')).where('id', id).update(data)
    }

    async delete(id) {
        await (new Model('comment')).where('id', id).del()
    }
}