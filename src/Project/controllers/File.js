import utils from '../Utils'

export default class File {
    constructor() {
        this.GetFile = this.getFile.bind(this)
    }

    async getFile(req, res) {
        try {
            res.status(200).sendFile(utils.getPath('./uploadedFiles', req.params.filePath))
        } catch (e) {
            res.status(400).json({ error: 'get file error' })
        }
    }
}