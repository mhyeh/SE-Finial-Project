import CommentRepo    from '../repositories/Comment'
import CommentService from '../services/Comment'

export default class Comment {
    constructor() {
        this.CommentRepo    = new CommentRepo()
        this.CommentService = new CommentService()       
    }
    
    async GetAllComments(req, res) {
        try {
            res.status(200).json({ comments: await this.CommentRepo.getAllComments(req.prams.id) })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
    
    async Post(req, res) {
        try {
            await this.CommentService.Post(req.header.authorization, req.prams.id ,req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Edit(req, res) {
        try {
            await this.CommentService.Edit(req.header.authorization, req.prams.id, req.body)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }

    async Delete(req, res) {
        try {
            await this.CommentService.Delete(req.header.authorization, req.prams.id)
            res.status(200).json({ message: 'success' })
        } catch (e) {
            res.status(400).json({ error: e })
        }
    }
}