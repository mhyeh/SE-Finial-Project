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

    // get ad
    console.log('get all',  await getAllAd(), '\n')

    // but ad
    console.log('buy', await buyAd(_token, _pos, _data))

    const ad = await getAdByPos(_pos)
    console.log('get by pos', ad, '\n')
    console.log('get by id', await getAdByID(ad.id), '\n')
    console.log('get by token', await getAdByToken(_token), '\n')

    // edit ad
    console.log('edit', await editAd(_token, ad.id, {context: 123}))
    console.log('ad', await getAdByPos(_pos), '\n')

    // cancel ad
    console.log('cancel', await cancelAd(_token, ad.id))
    console.log('ad', await getAdByPos(_pos), '\n')
}



// test article




testAccount('eee', '123', 'ccc')
testAd(token, 0, {context: 'aaa'})
