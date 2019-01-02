const noInput = (col='') => {
    return `no input ${col}`
}

const dataNotFound = (dataName) => {
    return `data ${dataName} not found`
}

const inputNotAccept = () => {
    return 'input not accept'
}

const redisError = () => {
    return 'redis error'
}

const notYourData = (dataName) => {
    return `not your ${dataName}`
}

const parseJsonError = () => {
    return 'parse json error'
}

const notInGroup = () => {
    return 'not in group'
}

const notGroupLeader = () => {
    return 'you are not group leader'
}

export default {
    noInput,
    dataNotFound,
    inputNotAccept,
    redisError,
    notYourData,
    parseJsonError,
    notInGroup,
    notGroupLeader
}