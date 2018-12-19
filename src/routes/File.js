import Router from '../router'

import FileController from '../Project/controllers/File'

class File extends Router {
    constructor() {
        super()
        this.controller = new FileController()
        this.init()
    }

    init() {
        this.get('/:filePath', this.controller.GetFile.bind(this.controller))
    }
}

const FileRouter = new File()
export default FileRouter.Match.bind(FileRouter)