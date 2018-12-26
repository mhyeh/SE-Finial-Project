# API doc

[Account](#Account)  
[Advertise](#Advertise)  
[Article](#Article)  
[Comment](#Comment)  
[File](#File)  
[Group](#Group)  

## Account

### getAllAccounts

```
Method: GET
URL: /account

Response:

Status Code: 200
Data: [
    {
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
]
```

### getAccountsByName

```
Method: GET
URL: /account/name/:name

Response:

Status Code: 200
Data: 同 getAllAccounts
```

### getAccountByID

```
Method: GET
URL: /account/:id

Response:

Status Code: 200
Data: 同 getAllAccounts
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

Header: { authorization: <token> }

FormData: {
    ["account":     <user account>],
    ["password":    <hashed password>],
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

Header: { authorization: <token> }

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
Data: [
    {
        "id":       <Ad id>,
        "context":  <Ad context>,
        "author":   <Ad author>,
        "image":    <Ad image's PATH>
    }
]
```

### getAdvertiseByPosition

```
Method: GET
URL: /advertise/pos/:pos

Response:

Status Code: 200
Data: [
    {
        "id":       <Adposition ID>,
        "position": <AdPosition Slot>,
        "ad":       <AdPosition Ad's ID>,
        "price":    <Price of Position>
    }
]
```

### getAdvertiseByID

```
Method: GET
URL: /advertise/:id

Response:

Status Code: 200
Data: 同 getAllAdvertise
```

### buyAdvertise

```
Method: POST
URL: /advertise/:pos

Body: {
    "context":  <Ad context>,
    "author":   <Ad author>,
    "image":    <Ad image>,
    "pos":      <Ad position>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### editAd

```
Method: PUT
URL: /advertise/:id

Header: { authorization: <token> }

FormData: {
    ["context":  <Ad context>],
    ["image":    <Ad image>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### deleteAd

```
Method: DELETE
URL: /advertise/:id

Header: { authorization: <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

## Article

### getAllArticle

```
Method: GET
URL: /article

Response:

Status Code: 200
Data: [
    {
        "id":       <Article ID>,
        "title":    <Article title>,
        "context":  <Article context>,
        "author":   <Article author>,
        "time":     <Article post time>,
        "ip":       <Article post ip>,
        "board_id": <Article board id>,
        "visible":  <Article visible status>,
        "image":    <Article image>,
    }
]
```

### getArticleByGroupAndAuthor

```
Method: GET
URL: /article/group/:group/author/:author

Response:

Status Code: 200
Data: 同getAllArticle
```

### getArticleByGroupAndTitle

```
Method: GET
URL: /article/group/:group/title/:title

Response:

Status Code: 200
Data: 同getAllArticle
```

### getArticleByGroupAndContext

```
Method: GET
URL: /article/group/:group/context/:context

Response:

Status Code: 200
Data: 同getAllArticle
```

### getArticleByAuthor

```
Method: GET
URL: /article/author/:author

Response:

Status Code: 200
Data: 同getAllArticle
```

### getArticleByTitle

```
Method: GET
URL: /article/title/:title

Response:

Status Code: 200
Data: 同getAllArticle
```

### getArticleByContext

```
Method: GET
URL: /article/context/:context

Response:

Status Code: 200
Data: 同getAllArticle
```

### getArticleByGroup

```
Method: GET
URL: /article/group/:group

Response:

Status Code: 200
Data: 同getAllArticle
```

### getArticleByID

```
Method: GET
URL: /article/id/:id

Response:

Status Code: 200
Data: 同getAllArticle
```

### postAnArticle

```
Method: POST
URL: /article

Body: {
    "title":    <Article title>,
    "context":  <Article context>,
    "author":   <Article author>,
    "time":     <Article post time>,
    "ip":       <Article post ip>,
    "board_id": <Article board id>,
    "visible":  <Article visible status>,
    "image":    <Article image>
}

Response:

Status Code: 200
Data: { "token": <token> }
```

### postAnArticle

```
Method: POST
URL: /article

Body: {
    "title":    <Article title>,
    "context":  <Article context>,
    "author":   <Article author>,
    "group":    <Article group>,
    "time":     <Article post time>,
    "ip":       <Article post ip>,
    "board_id": <Article board id>,
    "visible":  <Article visible status>,
    "image":    <Article image>
}

Response:

Status Code: 200
Data: { "token": <token> }
```

### editArticle

```
Method: PUT
URL: /article/:id

Header: { authorization: <token> }

FormData: {
    ["title":    <Article title>],
    ["context":  <Article context>],
    ["time":     <Article post time>],
    ["ip":       <Article post ip>],
    ["visible":  <Article visible status>],
    ["image":    <Article image>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### deleteArticle

```
Method: DELETE
URL: /article/:id

Header: { authorization: <token> }

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
Data: [
    {
        "id":           <comment ID>,
        "article_id":   <comment article ID>,
        "author":       <comment author>,
        "context":      <comment context>,
        "time":         <comment time>,
        "ip":           <comment ip>,
        "types":        <comment types>
    }
]
```

### PostCommentWithArticleID
```
Method: POST
URL: /comment/:id

Body: {
    "id":           <comment ID>,
    "article_id":   <comment article ID>,
    "author":       <comment author>,
    "context":      <comment context>,
    "time":         <comment time>,
    "ip":           <comment ip>,
    "types":        <comment types>
}

Response:

Status Code: 200
Data: { "token": <token> }
```

### editComment

```
Method: PUT
URL: /comment/:id

Header: { authorization: <token> }

FormData: {
    ["author":  <comment author>,]
    ["context": <comment context>,]
    ["time":    <comment time>,]
    ["ip":      <comment ip>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### deleteComment

```
Method: DELETE
URL: /comment/:id

Header: { authorization: <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

## File

### GetFileByFilePath
```
Method: GET
URL: /file/:filePath

Response:

Status Code: 200
Data: file
```
## Group

### getAllGroup

```
Method: GET
URL: /group

Response:

Status Code: 200
Data: [
    {
        id:     <group id>,
        name    <group name>,
        leader: <group leader>,
        type:   <group type>
    }
]
```

### getGroupByName

```
Method: GET
URL: /group/name/:name

Response:

Status Code: 200
Data: 同getAllGroup
```

### getGroupByAccount

```
Method: GET
URL: /group/id/:account

Response:

Status Code: 200
Data: 同getAllGroup
```

### getGroupByID

```
Method: GET
URL: /group/:id

Response:

Status Code: 200
Data: 同getAllGroup
```

### CreateGroup

```
Method: POST
URL: /group

Body: {
    [name    <group name>],
    [leader: <group leader>],
    [type:   <group type>]
}

Response:

Status Code: 200
Data: { "token": <token> }
```

### JoinGroup
```
Method: PUT
URL: /group/join/:id

Header: { authorization: <token> }

FormData: {
    group_id: <group ID>,
    account: <account ID>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### LeaveGroup
```
Method: PUT
URL: /group/leave/:id

Header: { authorization: <token> }

FormData: {
    group_id: <group ID>,
    account: <account ID>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### LeaveGroup
```
Method: PUT
URL: /group/:id

Header: { authorization: <token> }

FormData: {
    name:   <group name>,
    leader: <leader account ID>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### deleteGroup

```
Method: DELETE
URL: /group/:id

Header: { authorization: <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```