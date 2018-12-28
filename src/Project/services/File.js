import * as formidable from 'formidable'

import utils from '../Utils'

export default class File {
    constructor() {
        
    }

    ProcFormData(req, imgNum=-1) {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm()
            form.encoding       = 'utf-8'
            form.keepExtensions = true
            form.multiples      = true
            form.uploadDir      = utils.getPath('./uploadedFiles')
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject(err)
                    return
                }
                let flag = true
                for (const idx in files) {
                    if (files[idx] instanceof Array) {
                        for (const file of files[idx]) {
                            if (!this.checkFileExt(file, ['jpg', 'png'])) {
                                utils.removeFile(file)
                                flag = false
                            }
                        }
                    } else {
                        if (!this.checkFileExt(files[idx], ['jpg', 'png'])) {
                            utils.removeFile(files[idx])
                            flag = false
                        }
                    }
                }
                if (!flag) {
                    reject('file ext err')
                    return
                }

                resolve({ fields: fields, files: files })
            })
        })
    }

    checkFileExt(file, accepts) {
        const ext = utils.getBaseName(file.path)

        for (const accept of accepts) {
            if (ext === accept) {
                return true
            }
        }
        return false
    }
}