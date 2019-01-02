import Model from '../models/Model'

import FriendRepo  from './Friend'

import utils from '../Utils'

export default class Article {
    constructor() {
        this.ArticleModel = new Model('article')
        this.CommentModel = new Model('comment')
        this.GroupModel   = new Model('group')
        this.FriendRepo   = new FriendRepo()
    }

    async getAllArticles(page=-1, pageSize=-1) {
        let query = this.ArticleModel.select('*').sortBy('time', -1)
        if (page >= 0 && pageSize >= 0) {
            query = query.page(~~page, ~~pageSize)
        }
        return await query.query()
    }

    async getDefaultArticles(accountID, page=-1, pageSize=-1) {
        const author = await this.FriendRepo.getAllFriends(accountID)
        author.push(accountID)
        let query = this.ArticleModel.select('*').whereIn('author', author).andWhere('board_id', '').sortBy('time', -1)
        if (page >= 0 && pageSize >= 0) {
            query = query.page(~~page, ~~pageSize)
        }
        return await query.query()
    }

    async getRecommandArticles() {
        if (this.ArticleModel.db === 'mongo') {
            let groups   = await this.GroupModel.select('id').where('type', 'Board').query()
            groups       = groups.map(group => group.id)
            let articles = await this.ArticleModel.raw([
                { $lookup: { from: 'comment', localField: 'id', foreignField: 'article_id', as: 'comment' } },
                { $unwind: { path: '$comment', preserveNullAndEmptyArrays: true } },
                { $project: {'id': 1, 'board_id': 1, 'types': '$comment.types' } },
                { $match: { $or: [ 
                            { 
                                $or: [{ types: { $in: [0, 1] } }, { types: { $exists: false } }],
                                board_id: ''
                            },
                            { board_id: { $in: groups } }, 
                        ]
                    }
                },
                { $group: { _id: '$id', id: { $first: '$id' }, count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ])
            articles = articles.map(article => article.id)
            return await this.ArticleModel.whereIn('id', articles).query()
        } else {
            return await this.ArticleModel.raw('select `article`.* from `article`                                      \
                                                left join `comment` on                                                 \
                                                    `article`.`id` = `comment`.`article_id` and                        \
                                                    `comment`.`types` in (0, 1) and (                                  \
                                                        `article`.`board_id` = \'\' or `article`.`board_id` in (       \
                                                            select `id` from `groups` where `type` = \'Board\'         \
                                                        )                                                              \
                                                    )                                                                  \
                                                group by `article`.`id`                                                \
                                                order by count(`comment`.`types`) desc                                 \
                                                limit 10')
        }
    }

    async getArticleByID(id) {
        return (await this.ArticleModel.select('*').where('id', id).query())[0]
    }

    async getArticleByAuthor(author, page=-1, pageSize=-1) {
        let query = this.ArticleModel.select('*').where('author', author).andWhere('board_id', '').sortBy('time', -1)
        if (page >= 0 && pageSize >= 0) {
            query = query.page(~~page, ~~pageSize)
        }
        return await query.query()
    }

    async getArticleByTitle(title, page=-1, pageSize=-1) {
        let query = this.ArticleModel.select('*').where('title', 'like', title).andWhere('board_id', '').sortBy('time', -1)
        if (page >= 0 && pageSize >= 0) {
            query = query.page(~~page, ~~pageSize)
        }
        return await query.query()
    }

    async getArticleByContext(context, page=-1, pageSize=-1) {
        let query = this.ArticleModel.select('*').where('context', 'like', context).andWhere('board_id', '').sortBy('time', -1)
        if (page >= 0 && pageSize >= 0) {
            query = query.page(~~page, ~~pageSize)
        }
        return await query.query()
    }
    
    async getArticleByGroup(group, page=-1, pageSize=-1) {
        let query = this.ArticleModel.select('*').where('board_id', group).sortBy('time', -1)
        if (page >= 0 && pageSize >= 0) {
            query.page(~~page, ~~pageSize)
        }
        return await query.query()
    }

    async getArticleByGroupAndAuthor(group, author, page=-1, pageSize=-1) {
        let query = this.ArticleModel.select('*').where('author', author).andWhere('board_id', group).sortBy('time', -1)
        if (page >= 0 && pageSize >= 0) {
            query = query.page(~~page, ~~pageSize)
        }
        return await query.query()
    }

    async getArticleByGroupAndTitle(group, title, page=-1, pageSize=-1) {
        let query = this.ArticleModel.select('*').where('title', 'like', title).andWhere('board_id', group).sortBy('time', -1)
        if (page >= 0 && pageSize >= 0) {
            query = query.page(~~page, ~~pageSize)
        }
        return await query.query()
    }

    async getArticleByGroupAndContext(group, context, page=-1, pageSize=-1) {
        let query = this.ArticleModel.select('*').where('context', 'like', context).andWhere('board_id', group).sortBy('time', -1)
        if (page >= 0 && pageSize >= 0) {
            query = query.page(~~page, ~~pageSize)
        }
        return await query.query()
    }

    async create(data) {
        await this.ArticleModel.insert(data)
    }

    async edit(id, data) {
        const promise = []
        if (utils.hasValue(data.image, 'array')) {
            data.image = JSON.stringify(data.image)
            const article = await this.getArticleByID(id)
            if (utils.hasValue(article.image, 'string')) {
                const images = JSON.parse(article.image)
                for (const image of images) {
                    promise.push(utils.removeFile(utils.getPath('uploadedFiles', image)))
                }
            }
        }
        promise.push(this.ArticleModel.where('id', id).update(data))
        await Promise.all(promise)
    }

    async deletebyGroup(group_id) {
        const promise  = []
        let   articles = await this.ArticleModel.select('id').where('group', group_id).query()
        
        for (const article of articles) {
            if (utils.hasValue(article.image, 'string')) {
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
        if (utils.hasValue(article.image, 'string')) {
            const images = JSON.parse(article.image)
            for (const image of images) {
                promise.push(utils.removeFile(utils.getPath('uploadedFiles', image)))
            }
        }
        promise.push(this.ArticleModel.where('id', id).del())
        promise.push(this.CommentModel.where('article_id', id).del())
        await Promise.all(promise)
    }
}