import * as formidable from 'formidable'
import * as fs         from 'fs'
import * as path       from 'path'

export default class File {
    constructor() {
        
    }

    ProcFormData(req) {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm()
            form.encoding       = 'utf-8'
            form.keepExtensions = true
            form.multiples      = true
            form.uploadDir      = path.join(path.dirname(require.main.filename), './uploadedFiles/')
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve({ fields: fields, files: files })
            })
        })
    }

    async Upload() {

    }

    GetBaseName(filePath) {
        return path.basename(filePath)
    }

    GetPath(filePath) {
        return path.join(path.dirname(require.main.filename), './uploadedFiles/',  filePath)
    }
}