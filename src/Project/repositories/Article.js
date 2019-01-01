import Model from '../models/MongoDB'

import FriendRepo  from './Friend'

import utils from '../Utils'

export default class Article {
    constructor() {
        this.ArticleModel = new Model('article')
        this.CommentModel = new Model('comment')
        this.GroupModel   = new Model('group')
        this.FriendRepo   = new FriendRepo()
    }

    async getAllArticles() {
        try {
            return await this.ArticleModel.select('*').query()
        } catch (e) {
            throw 'get article error'
        }
    }

    async getDefaultArticles(accountID) {
        const friendList = await this.FriendRepo.getAllFriends(accountID)
        try {
            const author = friendList.map(friend => friend.id)
            author.push(accountID)
            return await this.ArticleModel.select('*').whereIn('author', author).andWhere('board_id', '').query()
        } catch (e) {
            throw 'get article error'
        }
    }

    async getRecommandArticles() {
        try {
            if (this.ArticleModel.db === 'mongo') {
                let groups   = await this.GroupModel.select('id').where('type', 'Board').query()
                groups       = groups.map(group => group.id)
                let articles = await this.ArticleModel.raw([
                    { $lookup: { from: 'comment', localField: 'id', foreignField: 'article_id', as: 'comment' } },
                    { $unwind: { path: '$comment', preserveNullAndEmptyArrays: true } },
                    { $project: {'id': '$id', 'title': '$title', 'context': '$context', 'author': '$author', 'time': '$time', 'ip': '$ip', 'board_id': '$board_id', 'visible': '$visible', 'image': '$image', 'types': '$comment.types'}},
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
        } catch (e) {
            throw 'get article error'
        }
    }

    async getArticleByID(id) {
        try {
            return (await this.ArticleModel.select('*').where('id', id).query())[0]
        } catch (e) {
            throw 'get article error'
        }
    }

    async getArticleByAuthor(author) {
        try {
            return await this.ArticleModel.select('*').where('author', author).andWhere('board_id', '').query()
        } catch (e) {
            throw 'get article error'
        }
    }

    async getArticleByTitle(title) {
        try {
            return await this.ArticleModel.select('*').where('title', 'like', title).andWhere('board_id', '').query()
        } catch (e) {
            throw 'get article error'
        }
    }

    async getArticleByContext(context) {
        try {
            return await this.ArticleModel.select('*').where('context', 'like', context).andWhere('board_id', '').query()
        } catch (e) {
            throw 'get article error'
        }
    }
    
    async getArticleByGroup(group) {
        try {
            return await this.ArticleModel.select('*').where('board_id', group).query()
        } catch (e) {
            throw 'get article error'
        }
    }

    async getArticleByGroupAndAuthor(group, author) {
        try {
            return await this.ArticleModel.select('*').where('author', author).andWhere('board_id', group).query()
        } catch (e) {
            throw 'get article error'
        }
    }

    async getArticleByGroupAndTitle(group, title) {
        try {
            return await this.ArticleModel.select('*').where('title', 'like', title).andWhere('board_id', group).query()
        } catch (e) {
            throw 'get article error'
        }
    }

    async getArticleByGroupAndContext(group, context) {
        try {
            return await this.ArticleModel.select('*').where('context', 'like', context).andWhere('board_id', group).query()   
        } catch (e) {
            throw 'get article error'
        }
    }

    async create(data) {
        utils.checkAllow(data, ['title', 'context', 'author', 'time', 'ip', 'board_id', 'visible', 'image'])
        try {
            await this.ArticleModel.insert(data)
        } catch (e) {
            throw 'insert article error'
        }
    }

    async edit(id, data) {
        utils.checkAllow(data, ['title', 'context', 'time', 'ip', 'visible', 'image'])
        try {
            await this.ArticleModel.where('id', id).update(data)
        } catch (e) {
            throw 'update article error'
        }
    }

    async deletebyGroup(group_id) {
        const promise = []
        let articles
        try {
            articles = await this.ArticleModel.select('id').where('group', group_id).query()
        } catch (e) {
            throw 'get article error'
        }
        for (const article of articles) {
            if (article.image) {
                let images
                try {
                    images = JSON.parse(article.image)
                } catch (e) {
                    throw 'parse json error'
                }
                for (const image of images) {
                    promise.push(utils.removeFile(utils.getPath('uploadedFiles', image)))
                }
            }
        }
        try {
            articles = articles.map(article => article.id)
            promise.push(this.ArticleModel.where('board_id', group_id).del())
            promise.push(this.CommentModel.whereIn('article_id', articles).del())
            await Promise.all(promise)
        } catch (e) {
            throw 'delete article error'
        }
    }

    async delete(id) {
        const promise = []
        const article = await this.getArticleByID(id)
        if (article.image) {
            let images
            try {
                images = JSON.parse(article.image)
            } catch (e) {
                throw 'parse json error'
            }
            for (const image of images) {
                promise.push(utils.removeFile(utils.getPath('uploadedFiles', image)))
            }
        }
        try {
            promise.push(this.ArticleModel.where('id', id).del())
            promise.push(this.CommentModel.where('article_id', id).del())
            await Promise.all(promise)
        } catch (e) {
            throw 'delete article error'
        }
    }
}