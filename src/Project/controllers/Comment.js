import CommentRepo    from '../repositories/Comment'
import CommentService from '../services/Comment'

export default class Comment {
    constructor() {
        this.CommentRepo    = new CommentRepo()
        this.CommentService = new CommentService()   
        
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
            await this.CommentService.Post(req.header.authorization, req.params.id ,req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async edit(req, res) {
        try {
            await this.CommentService.Edit(req.header.authorization, req.params.id, req)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async delete(req, res) {
        try {
            await this.CommentService.Delete(req.header.authorization, req.params.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}