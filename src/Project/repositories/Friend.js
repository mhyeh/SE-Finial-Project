import Model from '../models/MongoDB'

export default class Friend {
    constructor() {
        this.FriendModel = new Model('friends')
    }

    async getAllFriends(ID) {
        const friends = []
        try {
            friends.push(await this.FriendModel.select('account1').where('account1', ID).andWhere('isConfirm', 1).query())
            friends.push(await this.FriendModel.select('account2').where('account1', ID).andWhere('isConfirm', 1).query())
            return friends[0].map(friend => friend.account1).concat(friends[1].map(friend => friend.account2))
        } catch (e) {
            throw 'get friend list error'
        }
    }

    async getUnconfirmedFriends(ID) {
        try {
            const list = await this.FriendModel.select('account1').where('account2', ID).andWhere('isConfirm', 0).query()
            return list.map(element => element.account1)
        } catch (e) {
            throw 'get unconfirmed list error'
        }
    }

    async getInvitationList(ID) {
        try {
            const list = await this.FriendModel.select('account2').where('account1', ID).andWhere('isConfirm', 0).query()
            return list.map(element => element.account2)
        } catch (e) {
            throw 'get unconfirmed list error'
        }
    }

    async getFriend(id1, id2) {
        const friend = []
        try {
            friend.push(await this.FriendModel.select('*').where('account1', id1).andWhere('account2', id2).query())
            friend.push(await this.FriendModel.select('*').where('account1', id2).andWhere('account2', id1).query())
            if (friend[0][0]) {
                return friend[0][0]
            }
            return friend[1][0]
        } catch (e) {
            throw 'get unconfirmed list error'
        }
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
            try {
                await this.FriendModel.insert({ account1: id1, account2: id2, isConfirm: 0 })
            } catch (e) {
                throw 'insert friend error'
            }
        } else {
            throw 'already send invitation'
        }
    }

    async confirm(id1, id2) {
        const friend = await this.getFriend(id1, id2)
        if (friend === undefined || friend.isConfirm === 1) {
            throw 'no this invitation'
        } else {
            try {
                await this.FriendModel.where('id', friend.id).update({ isConfirm: 1 })
            } catch (e) {
                throw 'update friend error'
            }
        }
    }

    async delete(id1, id2) {
        const friend = await this.getFriend(id1, id2)
        if (friend === undefined) {
            throw 'no this friend'
        } else {
            try {
                await this.FriendModel.where('id', friend.id).del()
            } catch (e) {
                throw 'delete friend error'
            }
        }
    }
}