import CommentRepo    from '../repositories/Comment'

import CommentService from '../services/Comment'
import RedisService   from '../services/Redis'

export default class Comment {
    constructor() {
        this.CommentRepo    = new CommentRepo()
        this.CommentService = new CommentService()   
        this.RedisService   = new RedisService()
        
        this.GetAllComments = this.getAllComments.bind(this)
        this.Post           = this.post.bind(this)
        this.Edit           = this.edit.bind(this)
        this.Delete         = this.delete.bind(this)
    }
    
    async getAllComments(req, res) {
        try {
            res.status(200).json({ comments: await this.CommentRepo.getAllComments(req.params.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async post(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.CommentService.Post(ID, req.params.id ,req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async edit(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.CommentService.Edit(ID, req.params.id, req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async delete(req, res) {
        try {
            const ID = await this.RedisService.Verify(req.header.authorization)
            await this.CommentService.Delete(ID, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}