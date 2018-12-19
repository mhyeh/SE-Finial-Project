import FileService from '../services/File'

export default class File {
    constructor() {
        this.FileService = new FileService()

        this.GetFile = this.getFile.bind(this)
    }

    async getFile(req, res) {
        try {
            res.status(200).sendFile(this.FileService.GetPath(req.params.filePath))
        } catch (e) {
            res.status(400).json({error: e})
        }
    }
}