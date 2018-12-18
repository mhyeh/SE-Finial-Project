import * as fs   from 'fs'
import * as path from 'path'

export default class File {
    constructor() {
        
    }

    async Upload() {

    }

    GetPath(filePath) {
        return path.join(path.dirname(require.main.filename), '../uploadedFiles/',  filePath)
    }
}