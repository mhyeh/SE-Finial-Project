import * as formidable from 'formidable'

import utils from '../Utils'

export default class File {
    constructor() {
        
    }

    ProcFormData(req) {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm()
            form.encoding       = 'utf-8'
            form.keepExtensions = true
            form.multiples      = true
            form.uploadDir      = utils.getPath(['./uploadedFiles'])
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve({ fields: fields, files: files })
            })
        })
    }
}