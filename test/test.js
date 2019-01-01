const fetch = require('node-fetch')
const FormData = require('form-data')


// test account

const getAccount = async (_token) => {
    const res = await fetch('http://140.118.127.169:3000/account/', {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    return (await res.json()).account
}

const getAccountByName = async (_name) => {
    const res = await fetch('http://140.118.127.169:3000/account/name/' + _name, {
        method: 'GET'
    })
    return (await res.json()).accounts
}

const getAccountByID = async (_ID) => {
    const res = await fetch('http://140.118.127.169:3000/account/' + _ID, {
        method: 'GET'
    })
    return (await res.json()).account
}

const login = async (_account, _password) => {
    const response = await fetch('http://140.118.127.169:3000/account/login', {
        method: 'POST',
        body: JSON.stringify({account: _account, password: _password}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const res = await response.json()
    if (res.error) {
        throw 'error'
    }
    return res.token
}

const register = async (_account, _password, _name) => {
    const response = await fetch('http://140.118.127.169:3000/account/', {
        method: 'POST',
        body: JSON.stringify({account: _account, password: _password, name: _name}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const res = await response.json()
    if (res.error) {
        throw 'error'
    }
    return res.token
}

const editAccount = async (_token, _id, _data) => {
    const form = new FormData()
    for (const col in _data) {
        form.append(col, _data[col])
    }
    const response = await fetch('http://140.118.127.169:3000/account/' + _id, {
        method: 'PUT',
        body: form,
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const deleteAccount = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/account/' + _id, {
        method: 'DELETE',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const match = async (_token) => {
    const res = await fetch('http://140.118.127.169:3000/account/match', {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    return (await res.json()).account
}

let token
const testAccount = async (_account, _password, _name) => {
    // login / register
    console.log('\n', '=========== account ===========', '\n')
    try {
        token = await login(_account, _password)
    } catch (e) {
        token = await register(_account, _password, _name)
    }
    console.log('token', token, '\n')

    // console.log('match', await match(token), '\n')
    
    // // get account
    // console.log('get by name a', await getAccountByName('a'), '\n')
    // console.log('get by name c', await getAccountByName('c'), '\n')
    // console.log('get by id', await getAccountByID(account.id), '\n')

    // let account = await getAccount(token)
    // console.log('account', account, '\n')

    // // edit account
    // console.log('edit', await editAccount(token, account.id, {department: 'CSIE'}))
    // console.log('account', await getAccount(token), '\n')

    // // delete account
    // console.log('delete', await deleteAccount(token, account.id))
    // console.log('account', await getAccount(token), '\n')
}


// test ad

const getAllAd = async () => {
    const res = await fetch('http://140.118.127.169:3000/advertise/', {
        method: 'GET'
    })
    return (await res.json()).advertises
}

const getPosList = async () => {
    const res = await fetch('http://140.118.127.169:3000/advertise/position', {
        method: 'GET'
    })
    return (await res.json()).pos
}

const getAdByToken = async (_token) => {
    const res = await fetch('http://140.118.127.169:3000/advertise/account', {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    return (await res.json()).advertises
}

const getAdByPos = async (_pos) => {
    const res = await fetch('http://140.118.127.169:3000/advertise/pos/' + _pos, {
        method: 'GET'
    })
    return (await res.json()).advertise
}

const getAdByID = async (_ID) => {
    const res = await fetch('http://140.118.127.169:3000/advertise/' + _ID, {
        method: 'GET'
    })
    return (await res.json()).advertise
}


const buyAd = async (_token, _pos, _data) => {
    const form = new FormData()
    for (const col in _data) {
        form.append(col, _data[col])
    }
    const response = await fetch('http://140.118.127.169:3000/advertise/' + _pos, {
        method: 'POST',
        body: form,
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const editAd = async (_token, _id, _data) => {
    const form = new FormData()
    for (const col in _data) {
        form.append(col, _data[col])
    }
    const response = await fetch('http://140.118.127.169:3000/advertise/' + _id, {
        method: 'PUT',
        body: form,
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const cancelAd = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/advertise/' + _id, {
        method: 'DELETE',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}



const testAd = async (_token, _pos, _data) => {
    console.log('\n', '=========== ad ===========', '\n')
    
    // get pos list
    console.log('get pos list', await getPosList())
    console.log('account', await getAccount(_token), '\n')

    // but ad
    console.log('buy', await buyAd(_token, _pos, _data))
    console.log('account', await getAccount(_token), '\n')
    
    // get ad
    const ad = await getAdByPos(_pos)
    console.log('get by pos', ad, '\n')
    console.log('get by id', await getAdByID(ad.id), '\n')
    console.log('get by token', await getAdByToken(_token), '\n')
    console.log('get all',  await getAllAd(), '\n')

    // edit ad
    console.log('edit', await editAd(_token, ad.id, {context: 123}))
    console.log('ad', await getAdByPos(_pos), '\n')

    // cancel ad
    console.log('cancel', await cancelAd(_token, ad.id))
    console.log('ad', await getAdByPos(_pos), '\n')
}



// test article

const getAllArticle = async (_token) => {
    const response = await fetch('http://140.118.127.169:3000/article/', {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    return (await response.json()).articles
}

const getArticleByGroupAndTitle = async (_token, _group, _title) => {
    const response = await fetch('http://140.118.127.169:3000/article/group/' + _group + '/title/' + _title, {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    return (await response.json()).articles
}

const getArticleByGroupAndContext = async (_token, _group, _context) => {
    const response = await fetch('http://140.118.127.169:3000/article/group/' + _group + '/context/' + _context, {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    return (await response.json()).articles
}

const getArticleByGroupAndAuthor = async (_token, _group, _author) => {
    const response = await fetch('http://140.118.127.169:3000/article/group/' + _group + '/author/' + _author, {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    return (await response.json()).articles
}

const getArticleByGroup = async (_token, _group) => {
    const response = await fetch('http://140.118.127.169:3000/article/group/' + _group, {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    return (await response.json()).articles
}

const getArticleByAuthor = async ( _author) => {
    const response = await fetch('http://140.118.127.169:3000/article/author/' + _author, {
        method: 'GET'
    })
    return (await response.json()).articles
}

const getArticleByTitle = async ( _title) => {
    const response = await fetch('http://140.118.127.169:3000/article/title/' + _title, {
        method: 'GET'
    })
    return (await response.json()).articles
}

const getArticleByContext = async (_context) => {
    const response = await fetch('http://140.118.127.169:3000/article/context/' + _context, {
        method: 'GET'
    })
    return (await response.json()).articles
}

const getArticleByID = async (_id) => {
    const response = await fetch('http://140.118.127.169:3000/article/' + _id, {
        method: 'GET'
    })
    return (await response.json()).article
}

const postArticle = async (_token, _title, _context) => {
    const form = new FormData()
    form.append('title', _title)
    form.append('context', _context)

    const response = await fetch('http://140.118.127.169:3000/article/', {
        method: 'POST',
        body: form,
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const postArticleInGroup = async (_token, _group, _title, _context) => {
    const form = new FormData()
    form.append('title', _title)
    form.append('context', _context)

    const response = await fetch('http://140.118.127.169:3000/article/group/' + _group, {
        method: 'POST',
        body: form,
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const editArticle = async (_token, _id, _context) => {
    const form = new FormData()
    form.append('context', _context)
    const response = await fetch('http://140.118.127.169:3000/article/' + _id, {
        method: 'PUT',
        body: form,
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const deleteArticle = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/article/' + _id, {
        method: 'DELETE',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

let articleID

const testArticle1 = async (_token, _title, _context) => {
    console.log('\n', '=========== article ===========', '\n')
    const account = await getAccount(_token)
    
    // post article
    console.log('post', await postArticle(_token, _title, _context))
    console.log('account', await getAccount(_token), '\n')
    const articles = await getArticleByAuthor(account.id)

    articleID = articles[0].id

    // get article
    console.log('get by author', articles, '\n')
    console.log('get by title', await getArticleByTitle(_title), '\n')
    console.log('get by context', await getArticleByContext(_context), '\n')
    console.log('get by id', await getArticleByID(articles[0].id), '\n')
    console.log('get default', await getAllArticle(_token), '\n')

    // edit article
    console.log('edit', await editArticle(_token, articles[0].id, '123456'))
    console.log('article', await getArticleByID(articles[0].id), '\n')

    // delete article
    // console.log('delete', await deleteArticle(_token, articles[0].id))
    // console.log('article', await getArticleByID(articles[0].id), '\n')
}

const testArticle2 = async (_token, _group, _title, _context) => {
    console.log('\n', '=========== article ===========', '\n')

    const account = await getAccount(_token)
    console.log('post in group', await postArticleInGroup(_token, _group, _title, _context))

    console.log('get by group', await getArticleByGroup(_token, _group), '\n')
    console.log('get by group and author', await getArticleByGroupAndAuthor(_token, _group, account.id), '\n')
    console.log('get by group and title', await getArticleByGroupAndTitle(_token, _group, _title), '\n')
    console.log('get by group and context', await getArticleByGroupAndContext(_token, _group, _context), '\n')
}


// test comment

const getComment = async (_id) => {
    const response = await fetch('http://140.118.127.169:3000/comment/' + _id, {
        method: 'GET',
    })
    return (await response.json()).comments
}

const postComment = async (_token, _id, _context, _types) => {
    const response = await fetch('http://140.118.127.169:3000/comment/' + _id, {
        method: 'POST',
        body: JSON.stringify({context: _context, types: _types}),
        headers: {
            'authorization': _token,
            'Content-Type': 'application/json'
        }
    })
    const res = await response.json()
    return res.message
}

const editComment = async (_token, _id, _context) => {
    const response = await fetch('http://140.118.127.169:3000/comment/' + _id, {
        method: 'PUT',
        body: JSON.stringify({context: _context}),
        headers: {
            'authorization': _token,
            'Content-Type': 'application/json'
        }
    })
    const res = await response.json()
    return res.message
}

const deleteComment = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/comment/' + _id, {
        method: 'DELETE',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}



const testComment = async (_token, _articleID, _context, _types) => {
    console.log('\n', '=========== comment ===========', '\n')

    // post comment
    console.log('post', await postComment(_token, _articleID, _context, _types), '\n')

    // get all comment
    const comments = await getComment( _articleID)
    console.log('get all comment', comments, '\n')

    // edit comment
    console.log('edit', await editComment(_token, comments[0].id, '12334524432'))
    console.log('get all comment', await getComment( _articleID), '\n')

    // delete comment
    console.log('delete', await deleteComment(_token, comments[0].id), '\n')
    console.log('get all comment', await getComment( _articleID), '\n')
}


// test friend

const getFriend = async (_token) => {
    const response = await fetch('http://140.118.127.169:3000/friend/', {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.friends
}

const getUnconfrim = async (_token) => {
    const response = await fetch('http://140.118.127.169:3000/friend/unconfirmed', {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.unconfrimed
}

const getInvitation = async (_token) => {
    const response = await fetch('http://140.118.127.169:3000/friend/invitation', {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.invitation
}

const checkState = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/friend/' + _id, {
        method: 'GET',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.state
}

const send = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/friend/' + _id, {
        method: 'POST',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const confirm = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/friend/' + _id, {
        method: 'PUT',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const deleteFriend = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/friend/' + _id, {
        method: 'DELETE',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}


const testFriend1 = async (_token, _id) => {
    console.log('\n', '=========== friend ===========', '\n')

    console.log('state', await checkState(_token, _id), '\n')
    console.log('send', await send(_token, _id), '\n')
    console.log('invitation', await getInvitation(_token), '\n')
}

const testFriend2 = async (_token, _id) => {
    console.log('\n', '=========== friend ===========', '\n')

    // console.log('state', await checkState(_token, _id), '\n')
    // console.log('send', await send(_token, _id), '\n')
    console.log('unconfirm', await getUnconfrim(_token), '\n')
    console.log('accept', await confirm(_token, _id))
    console.log('friend', await getFriend(_token), '\n')
}

const testFriend3 = async (_token, _id) => {
    console.log('\n', '=========== friend ===========', '\n')

    console.log('friend', await getFriend(_token), '\n')
    console.log('delete', await deleteFriend(_token, _id))
}



// test group

const getAllGroup = async () => {
    const response = await fetch('http://140.118.127.169:3000/group/', {
        method: 'GET'
    })
    const res = await response.json()
    return res.groups
}

const getGroupByName = async (_name) => {
    const response = await fetch('http://140.118.127.169:3000/group/name/' + _name, {
        method: 'GET'
    })
    const res = await response.json()
    return res.groups
}

const getGroupByAccount = async (_account) => {
    const response = await fetch('http://140.118.127.169:3000/group/account/' + _account, {
        method: 'GET'
    })
    const res = await response.json()
    return res.groups
}

const getGroupByID = async (_id) => {
    const response = await fetch('http://140.118.127.169:3000/group/' + _id, {
        method: 'GET'
    })
    const res = await response.json()
    return res.group
}

const getGroupMember = async (_id) => {
    const response = await fetch('http://140.118.127.169:3000/group/' + _id + '/account', {
        method: 'GET'
    })
    const res = await response.json()
    return res.members
}

const createGroup = async (_token, _name, _type) => {
    const response = await fetch('http://140.118.127.169:3000/group/', {
        method: 'POST',
        body: JSON.stringify({name: _name, type: _type}),
        headers: {
            'authorization': _token,
            'Content-Type': 'application/json'
        }
    })
    const res = await response.json()
    return res.message
}

const joinGroup = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/group/' + _id, {
        method: 'POST',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const editGroup = async (_token, _id, _name) => {
    const response = await fetch('http://140.118.127.169:3000/group/' + _id, {
        method: 'PUT',
        body: JSON.stringify({name: _name}),
        headers: {
            'Content-Type': 'application/json',
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const changeLeader = async (_token, _id, newLeader) => {
    const response = await fetch('http://140.118.127.169:3000/group/' + _id + '/leader/' + newLeader, {
        method: 'PUT',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const deleteGroup = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/group/' + _id, {
        method: 'DELETE',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

const leaveGroup = async (_token, _id) => {
    const response = await fetch('http://140.118.127.169:3000/group/leave/' + _id, {
        method: 'DELETE',
        headers: {
            'authorization': _token
        }
    })
    const res = await response.json()
    return res.message
}

let groupID
const testGroup1 = async (_token, _name, _type) => {
    console.log('\n', '=========== group ===========', '\n')

    console.log('create', await createGroup(_token, _name, _type), '\n')

    const account = await getAccount(_token)

    const groups = await getAllGroup()
    groupID = groups[groups.length - 1].id

    console.log(account.id, await getGroupMember(groupID))
    // console.log('all group', groups)
    // console.log('get by account', await getGroupByAccount(account.id))
    // console.log('get by name', await getGroupByName(_name))
    // console.log('group', await getGroupByID(groupID), '\n')

    // console.log('get member', await getGroupMember(groupID), '\n')

    // console.log('edit', await editGroup(_token, groupID, 'test'))
    // console.log('group', await getGroupByID(groupID), '\n')
    // console.log('delete', await deleteGroup(_token, groupID))
    // console.log('group', await getGroupByID(groupID), '\n')
}

const testGroup2 = async (_token, _id) => {
    console.log('\n', '=========== group ===========', '\n')

    console.log('join', await joinGroup(_token, _id))
    console.log('get member', await getGroupMember(_id), '\n')

    // console.log('leave', await leaveGroup(_token, _id))
    // console.log('get member', await getGroupMember(_id), '\n')
}

const testGroup3 = async (_token, _id, _newLeader) => {
    console.log('\n', '=========== group ===========', '\n')

    console.log('changeLeader', await changeLeader(_token, _id, _newLeader))
    console.log('group', await getGroupByID(_id), '\n')

    console.log('changeLeader', await changeLeader(_token, _id, _newLeader))
    console.log('group', await getGroupByID(_id), '\n')
}

const testGroup4 = async (_token, _id) => {
    console.log('\n', '=========== group ===========', '\n')

    console.log('group', await getGroupByID(_id), '\n')

    console.log('leave', await leaveGroup(_token, _id))
    console.log('group', await getGroupByID(_id), '\n')
}

const test = async () => {
    await testAccount('eee', '123', 'ccc')
    await testArticle1(token, 'testaaa', 'testaaa')
    // await testAd(token, 0, {context: 'aaa'})
    // await testComment(token, articleID, 'asd', 3)
    // await testFriend1(token, "acf18f37-9e3f-4205-868f-b39b9409b634")
    // await testAccount('bbb', 'bbb', 'ccc')
    // await testFriend2(token, "e71716e9-1311-4070-855a-fe2f0fbd6633")
    // await testAccount('eee', '123', 'ccc')
    // await testFriend3(token, "acf18f37-9e3f-4205-868f-b39b9409b634")
    // await testGroup1(token, 'aaa', 'Board')
    // await testGroup1(token, 'aaa', 'Family')
    // await testGroup1(token, 'bbb', 'Family')
    // await testGroup1(token, 'ccc', '123')
    await testGroup1(token, 'aaa', 'Board')
    // await testAccount('bbb', 'bbb', 'ccc')
    // await testGroup2(token, groupID)
    // await testGroup2(token, groupID)
    // await testAccount('eee', '123', 'ccc')
    // const account = await getAccount(token)
    // await testAccount('eee', '123', 'ccc')
    // await testGroup3(token, groupID, account.id)
    // await testGroup4(token, groupID)
    await testAccount('123456', '123', 'ccc')
    await testArticle2(token, groupID, 'asdfaf', 'jiafifoaif')
}
test()