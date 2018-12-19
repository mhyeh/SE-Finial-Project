import Router from '../router'

import CommentController from '../Project/controllers/Comment'

class Comment extends Router {
    constructor() {
        super()
        this.controller = new CommentController()
        this.init()
    }

    init() {
        this.get('/:id',    this.controller.GetAllComments.bind(this.controller))
        this.post('/:id',   this.controller.Post.bind(this.controller))
        this.put('/:id',    this.controller.Edit.bind(this.controller))
        this.delete('/:id', this.controller.Delete.bind(this.controller))
    }
}

const CommentRouter = new Comment()
export default CommentRouter.Match.bind(CommentRouter)