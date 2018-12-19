import Router from '../router'

import CommentController from '../Project/controllers/Comment'

class Comment extends Router {
    constructor() {
        super()
        this.controller = new CommentController()
        this.init()
    }

    init() {
        this.get('/:id',    this.controller.GetAllComments)
        this.post('/:id',   this.controller.Post)
        this.put('/:id',    this.controller.Edit)
        this.delete('/:id', this.controller.Delete)
    }
}

const CommentRouter = new Comment()
export default CommentRouter.Match.bind(CommentRouter)