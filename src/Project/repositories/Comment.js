import Model from "../models/MongoDB";

export default class Comment {
    constructor() {
        this.CommentModel = new Model('comment')
    }

    async getAllComments(article) {
        this.CommentModel.select('*').where('article_id', article).query()
    }

    async getCommentByID(id) {
        return (await this.CommentModel.select('*').where('id', id).query())[0]
    }

    async post(data) {
        const acceptList = ['article_id', 'author', 'context', 'time', 'ip', 'types'] 
        for (const col in data) {
            if (!(col in acceptList)) {
                throw 'not accept'
            }
        }
        await this.CommentModel.insert(data)
    }

    async edit(id, data) {
        const acceptList = ['author', 'context', 'time', 'ip'] 
        for (const col in data) {
            if (!(col in acceptList)) {
                throw 'not accept'
            }
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