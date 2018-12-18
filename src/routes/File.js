import Router from '../router'

import FileController from '../Project/controllers/File'

class File extends Router {
    constructor() {
        super()
        this.controller = new FileController()
        this.init()
    }

    init() {
        this.get('/:filePath', (req, res) => this.controller.GetFile(req, res))
    }
}

const FileRouter = new File()
export default FileRouter