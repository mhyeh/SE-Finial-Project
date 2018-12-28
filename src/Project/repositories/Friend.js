import Model from '../models/MongoDB'

import AccountRepo from './Account'

export default class Friend {
    constructor() {
        this.FriendModel = new Model('friends')
        this.AccountRepo = new AccountRepo()
    }

    async getAllFriends(token) {
        const id = await this.AccountRepo.getAccountByToken(token)
        return await this.FriendModel.select('*').where('account1', id).orWhere('account2', id).andWhere('isConfirm', 1).query()
    }

    async getUnconfirmedFriends(token) {
        const id = await this.AccountRepo.getAccountByToken(token)
        return await this.FriendModel.select('*').where('account2', id).andWhere('isConfirm', 0).query()
    }

    async getInvitationList(token) {
        const id = await this.AccountRepo.getAccountByToken(token)
        return await this.FriendModel.select('*').where('account1', id).andWhere('isConfirm', 0).query()
    }

    async getFriend(id1, id2) {
        const promise = []
        promise.push(this.FriendModel.select('*').where('account1', id1).andWhere('account2', id2).query())
        promise.push(this.FriendModel.select('*').where('account1', id2).andWhere('account2', id1).query())
        const friend = await Promise.all(promise)
        if (friend[0][0]) {
            return friend[0][0]
        }
        return friend[1][0]
    }

    async checkState(token, id2) {
        const id1    = await this.AccountRepo.getAccountByToken(token)
        const friend = await this.getFriend(id1, id2)
        if (friend === undefined) {
            return -1
        } else {
            return friend.isConfirm
        }
    }

    async send(token, id2) {
        const id1    = await this.AccountRepo.getAccountByToken(token)
        const friend = await this.getFriend(id1, id2)
        if (friend === undefined) {
            await this.FriendModel.insert({ account1: id1, account2: id2, isConfirm: 0 })
        } else {
            throw 'send error'
        }
    }

    async confirm(token, id2) {
        const id1    = await this.AccountRepo.getAccountByToken(token)
        const friend = await this.getFriend(id1, id2)
        if (friend === undefined || friend.isConfirm === 1) {
            throw 'no this invitation'
        } else {
            await this.FriendModel.where('id', friend.id).update({ isConfirm: 1 })
        }
    }

    async delete(token, id2) {
        const id1    = await this.AccountRepo.getAccountByToken(token)
        const friend = await this.getFriend(id1, id2)
        if (friend === undefined) {
            throw 'no this friend'
        } else {
            await this.FriendModel.where('id', friend.id).del()
        }
    }
}