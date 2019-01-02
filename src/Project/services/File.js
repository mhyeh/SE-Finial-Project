import * as formidable from 'formidable'
import * as mime       from 'mime'

import utils from '../Utils'

export default class File {
    constructor() {
        
    }

    ProcFormData(req, imgConfig) {
        return new Promise((resolve, reject) => {
            const form = new formidable.IncomingForm()
            form.encoding       = 'utf-8'
            form.keepExtensions = true
            form.multiples      = true
            form.uploadDir      = utils.getPath('./uploadedFiles')
            form.parse(req, (err, fields, files) => {
                if (err) {
                    reject('parse form data error')
                    return
                }

                let flag = true
                for (const idx in files) {
                    if (!(idx in imgConfig)) {
                        try {
                            if (files[idx] instanceof Array) {
                                for (const file of files[idx]) {
                                    utils.removeFile(file.path)
                                }
                            } else {
                                utils.removeFile(files[idx].path)
                            }
                            delete files[idx]
                        } catch (e) {
                            if (typeof e === 'string') {
                                reject(e)
                            } else {
                                reject('remove file error')
                            }
                            return
                        }
                    } else {
                        try {
                            if (!utils.hasValue(files[idx], 'object') && !utils.hasValue(files[idx], 'array')) {
                                delete files[idx]
                                continue
                            }
                            if (files[idx] instanceof Array) {
                                for (const file of files[idx]) {
                                    if (!this.checkFileExt(file, ['jpg', 'png'])) {
                                        utils.removeFile(file.path)
                                        flag = false
                                    }
                                }
                                if (flag && imgConfig[idx] > 0) {
                                    for (let i = imgConfig[idx]; i < files[idx].length; ) {
                                        utils.removeFile(files[idx][i].path)
                                        files[idx].splice(i, 1)
                                    }
                                    if (imgConfig[idx] === 1) {
                                        files[idx] = files[idx][0]
                                    }
                                }
                            } else {
                                if (!this.checkFileExt(files[idx], ['jpg', 'png'])) {
                                    utils.removeFile(files[idx].path)
                                    flag = false
                                }
                                if (imgConfig[idx] !== 1) {
                                    imgConfig[idx] = [files[idx]]
                                }
                            }
                        } catch (e) {
                            if (typeof e === 'string') {
                                reject(e)
                            } else {
                                reject('remove file error')
                            }
                            return
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
        for (const accept of accepts) {
            if (file.type === mime.getType(accept)) {
                return true
            }
        }
        return false
    }
}