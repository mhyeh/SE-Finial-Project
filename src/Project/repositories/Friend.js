import Model from '../models/MongoDB'

export default class Friend {
    constructor() {
        this.FriendModel = new Model('friends')
    }

    async getAllFriends(ID) {
        const friends = []
        friends.push(await this.FriendModel.select('account1').where('account1', ID).andWhere('isConfirm', 1).query())
        friends.push(await this.FriendModel.select('account2').where('account1', ID).andWhere('isConfirm', 1).query())
        return friends[0].map(friend => friend.account1).concat(friends[1].map(friend => friend.account2))
    }

    async getUnconfirmedFriends(ID) {
        const list = await this.FriendModel.select('account1').where('account2', ID).andWhere('isConfirm', 0).query()
        return list.map(element => element.account1)
    }

    async getInvitationList(ID) {
        const list = await this.FriendModel.select('account2').where('account1', ID).andWhere('isConfirm', 0).query()
        return list.map(element => element.account2)
    }

    async getFriend(id1, id2) {
        const friend = []
        friend.push(await this.FriendModel.select('*').where('account1', id1).andWhere('account2', id2).query())
        friend.push(await this.FriendModel.select('*').where('account1', id2).andWhere('account2', id1).query())
        if (friend[0][0]) {
            return friend[0][0]
        }
        return friend[1][0]
    }

    async checkState(id1, id2) {
        const friend = await this.getFriend(id1, id2)
        if (friend === undefined) {
            return -1
        } else {
            return friend.isConfirm
        }
    }

    async send(id1, id2) {
        const friend = await this.getFriend(id1, id2)
        if (friend === undefined) {
            await this.FriendModel.insert({ account1: id1, account2: id2, isConfirm: 0 })
        } else {
            throw 'send error'
        }
    }

    async confirm(id1, id2) {
        const friend = await this.getFriend(id1, id2)
        if (friend === undefined || friend.isConfirm === 1) {
            throw 'no this invitation'
        } else {
            await this.FriendModel.where('id', friend.id).update({ isConfirm: 1 })
        }
    }

    async delete(id1, id2) {
        const friend = await this.getFriend(id1, id2)
        if (friend === undefined) {
            throw 'no this friend'
        } else {
            await this.FriendModel.where('id', friend.id).del()
        }
    }
}