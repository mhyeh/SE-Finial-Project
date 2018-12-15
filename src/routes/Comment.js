import Router from '../router'

import CommentController from '../Project/controllers/Comment'

class Comment extends Router {
    constructor() {
        super()
        this.controller = new CommentController()
        this.init()
    }

    init() {
        this.get('/:id',    (req, res) => this.controller.GetAllComments(req, res))
        this.post('/:id',   (req, res) => this.controller.Post(req, res))
        this.put('/:id',    (req, res) => this.controller.Edit(req, res))
        this.delete('/:id', (req, res) => this.controller.Delete(req, res))
    }
}

const CommentRouter = new Comment()
export default CommentRouter