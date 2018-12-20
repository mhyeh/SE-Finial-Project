export default class DateTime {
    constructor() {
        
    }

    getDate(input=undefined) {
        let date
        if (input === undefined) {
            date = new Date()
        } else {
            date = new Date(input)
        }
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }

    getTime(input=undefined) {
        let date
        if (input === undefined) {
            date = new Date()
        } else {
            date = new Date(input)
        }
        return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    getDateTime(input=undefined) {
        return this.getDate(input) + ' ' + this.getTime(input)
    }
}