# API doc

[Account](#Account)  
[Advertise](#Advertise)  
[Article](#Article)  
[Comment](#Comment)  
[File](#File)  
[Group](#Group)  

## Account

### getAccountByToken

```
Method: GET
URL: /account

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { 
    "account": {
        "id":          <user id>,
        "account":     <user account>,
        "password":    <hashed password>,
        "name":        <user name>,
        "department":  <user department>,
        "class":       <user class>,
        "birthday":    <user birthday>,
        "sex":         <user sex>,
        "ID_card":     <user ID_card>,
        "address":     <user address>,
        "photo":       <user photo>,
        "passport":    <user passport>,
        "credit_card": <user credit_card>,
        "cvc":         <user cvc>,    
        "expire_date": <user expire_date>,
        "NTUST_coin":  <user NTUST_coin>,
        "interst":     <user interst>
    }
}
```

### getAllAccounts

```
Method: GET
URL: /account/all

Response:

Status Code: 200
Data: { 
    "accounts": [
        同 getAccountByToken 的 Data
    ]
}
```

### getAccountsByName

```
Method: GET
URL: /account/name/:name

Response:

Status Code: 200
Data: 同 getAllAccounts 的 Data
```

### getAccountByID

```
Method: GET
URL: /account/:id

Response:

Status Code: 200
Data: 同 getAccountByToken 的 Data
```

### register

```
Method: POST
URL: /account/

Body: {
    "account":  <user account>,
    "password": <user password>,
    "name":     <user name>
}

Response:

Status Code: 200
Data: { "token": <token> }
```

### register

```
Method: POST
URL: /account/login

Body: {
    "account":  <user account>,
    "password": <user password>
}

Response:

Status Code: 200
Data: { "token": <token> }
```

### editAccount

```
Method: PUT
URL: /account/:id

Header: { "authorization": <token> }

FormData: {
    ["account":     <user account>],
    ["password":    <user password>],
    ["name":        <user name>],
    ["department":  <user department>],
    ["class":       <user class>],
    ["birthday":    <user birthday>],
    ["sex":         <user sex>],
    ["ID_card":     <user ID_card>],
    ["address":     <user address>],
    ["photo":       <user photo>],
    ["passport":    <user passport>],
    ["credit_card": <user credit_card>],
    ["cvc":         <user cvc>],    
    ["expire_date": <user expire_date>],
    ["interst":     <user interst>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### deleteAccount

```
Method: DELETE
URL: /account/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

## Advertise

### getAllAdervertise

```
Method: GET
URL: /advertise

Response:

Status Code: 200
Data: { 
    "advertises": [
        同 getAdvertiseByPosition 的 Data
    ]
}
```

### getAdvertiseByPosition

```
Method: GET
URL: /advertise/pos/:pos

Response:

Status Code: 200
Data: { 
    "advertise": {
        "id":      <ad id>,
        "context": <ad context>,
        "author":  <ad author account id>,
        "image":   <ad image path>
    }
}
```

### getAdvertiseByID

```
Method: GET
URL: /advertise/:id

Response:

Status Code: 200
Data: 同 getAdvertiseByPosition 的 Data
```

### buyAdvertise

```
Method: POST
URL: /advertise/:pos

FormData: {
    ["context": <ad context>],
    ["img":     <ad image>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### editAd

```
Method: PUT
URL: /advertise/:id

Header: { "authorization": <token> }

FormData: {
    ["context": <ad context>],
    ["img":     <ad image>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### deleteAd

```
Method: DELETE
URL: /advertise/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

## Article

### getAllArticlesNotInGroup

```
Method: GET
URL: /article

Response:

Status Code: 200
Data: { 
    "articles": [
        {
            "id":       <article id>,
            "title":    <article title>,
            "context":  <article context>,
            "author":   <article author>,
            "time":     <article post time>,
            "ip":       <article post ip>,
            "board_id": <article board id>,
            "visible":  <article visible status>,
            "image":    <article image path>,
        }
    ]
}
```

### getArticlesByGroupAndAuthor

```
Method: GET
URL: /article/group/:group/author/:author

Response:

Status Code: 200
Data: 同 getAllArticles 的 Data
```

### getArticlesByGroupAndTitle

```
Method: GET
URL: /article/group/:group/title/:title

Response:

Status Code: 200
Data: 同 getAllArticles 的 Data
```

### getArticlesByGroupAndContext

```
Method: GET
URL: /article/group/:group/context/:context

Response:

Status Code: 200
Data: 同 getAllArticles 的 Data
```

### getArticlesByAuthor

```
Method: GET
URL: /article/author/:author

Response:

Status Code: 200
Data: 同 getAllArticles 的 Data
```

### getArticlesByTitle

```
Method: GET
URL: /article/title/:title

Response:

Status Code: 200
Data: 同 getAllArticles 的 Data
```

### getArticlesByContext

```
Method: GET
URL: /article/context/:context

Response:

Status Code: 200
Data: 同 getAllArticles 的 Data
```

### getArticlesByGroup

```
Method: GET
URL: /article/group/:group

Response:

Status Code: 200
Data: 同 getAllArticles 的 Data
```

### getArticleByID

```
Method: GET
URL: /article/:id

Response:

Status Code: 200
Data: {
    "articles": {
        "id":       <article id>,
        "title":    <article title>,
        "context":  <article context>,
        "author":   <article author account id>,
        "time":     <article post time>,
        "ip":       <article post ip>,
        "board_id": <article board id>,
        "visible":  <article visible status>,
        "image":    <article image path>,
    }
}
```

### postArticle

```
Method: POST
URL: /article

Header: { "authorization": <token> }

Body: {
    "title":   <article title>,
    "context": <article context>,
    ["imgs":   <article image array>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### postArticleInGroup

```
Method: POST
URL: /article/group/:id

Header: { "authorization": <token> }

Body: {
    "title":   <article title>,
    "context": <article context>,
    ["imgs":   <article image array>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### editArticle

```
Method: PUT
URL: /article/:id

Header: { "authorization": <token> }

FormData: {
    ["title":   <article title>],
    ["context": <article context>],
    ["imgs":    <article image array>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### deleteArticle

```
Method: DELETE
URL: /article/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

## Comment

### getAllCommentByArticleID
```
Method: GET
URL: /comment/:id

Response:

Status Code: 200
Data: { 
    "comments": [
        {
            "id":         <comment id>,
            "article_id": <comment article id>,
            "author":     <comment author account id>,
            "context":    <comment context>,
            "time":       <comment time>,
            "ip":         <comment ip>,
            "types":      <comment types>
        }
    ]
}
```

### postComment
```
Method: POST
URL: /comment/:id

Header: { "authorization": <token> }

Body: {
    "context": <comment context>,
    "types":   <comment types>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### editComment

```
Method: PUT
URL: /comment/:id

Header: { "authorization": <token> }

Body: {
    "context": <comment context>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### deleteComment

```
Method: DELETE
URL: /comment/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

## File

### getFileByFilePath
```
Method: GET
URL: /file/:filePath

Response:

Status Code: 200
Data: file
```
## Group

### getAllGroups

```
Method: GET
URL: /group

Response:

Status Code: 200
Data: {
    "groups": [
        {
            id:     <group id>,
            name    <group name>,
            leader: <group leader account id>,
            type:   <group type>
        }
    ]
}
```

### joinGroup
```
Method: GET
URL: /group/join/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

### leaveGroup
```
Method: GET
URL: /group/leave/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

### getGroupsByName

```
Method: GET
URL: /group/name/:name

Response:

Status Code: 200
Data: 同 getAllGroups 的 Data
```

### getGroupsByAccount

```
Method: GET
URL: /group/account/:account

Response:

Status Code: 200
Data: 同 getAllGroups 的 Data
```

### getGroupMembers

```
Method: GET
URL: /group/:id/account

Response:

Status Code: 200
Data: {
    "members": [
        {
            "id":       <group_member id>,
            "account":  <member account id>
            "group_id": <group id>
        }
    ]
}
```

### getGroupByID

```
Method: GET
URL: /group/:id

Response:

Status Code: 200
Data: { "group": 
    {
        id:     <group id>,
        name    <group name>,
        leader: <group leader account id>,
        type:   <group type>
    }
}
```

### createGroup

```
Method: POST
URL: /group

Header: { "authorization": <token> }

Body: {
    name    <group name>,
    leader: <group leader account id>,
    type:   <group type>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### editGroup
```
Method: PUT
URL: /group/:id

Header: { "authorization": <token> }

Body: {
    [name:   <group name>],
    [leader: <leader account ID>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### deleteGroup

```
Method: DELETE
URL: /group/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

### getAllFriends

```
Method: GET
URL: /friend

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { 
    "friends": [
        id:         <friend id>
        account1:   <account id>
        account2    <account id>
        isConfirm   <friend status>
    ]
}
```

### getUnconfirmedFriends

```
Method: GET
URL: /friend/unconfirmed

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { 
    "unconfrimed": [
        id:         <friend id>
        account1:   <account id>
        account2    <account id>
        isConfirm   <friend status>
    ]
}
```

### getInvitation

```
Method: GET
URL: /friend/unconfirmed

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { 
    "invitation": [
        id:         <friend id>
        account1:   <account id>
        account2    <account id>
        isConfirm   <friend status>
    ]
}
```

### getStatusWithFriend

```
Method: GET
URL: /friend/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { 
    "state": [
        isConfirm   <friend status>
    ]
}
```

### sendInvitation

```
Method: POST
URL: /friend/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

### confirmInvitation

```
Method: PUT
URL: /friend/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

### deleteFriend

```
Method: DELETE
URL: /friend/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```