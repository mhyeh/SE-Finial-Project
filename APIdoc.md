# API doc

[Account](#Account)  
[Advertise](#Advertise)  
[Article](#Article)  
[Comment](#Comment)  
[File](#File)  
[Group](#Group)  

## Account

### get account by token

```
Method: GET
URL: /account/

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

### match account

```
Method: GET
URL: /account/match

Response:

Status Code: 200
Data: 同 get account by token 的 Data
```

### get accounts by name

```
Method: GET
URL: /account/name/:name

Response:

Status Code: 200
Data: {
    "accounts": [
        同 get account by token 的 Data
    ]
}
```

### get account by ID

```
Method: GET
URL: /account/:id

Response:

Status Code: 200
Data: 同 get account by token 的 Data
```

### register

```
Method: POST
URL: /account/

Header: { "Content-Type": "application/json" }

Body: {
    "account":  <user account>,
    "password": <user password>,
    "name":     <user name>
}

Response:

Status Code: 200
Data: { "token": <token> }
```

### login

```
Method: POST
URL: /account/login

Header: { "Content-Type": "application/json" }

Body: {
    "account":  <user account>,
    "password": <user password>
}

Response:

Status Code: 200
Data: { "token": <token> }
```

### edit account

```
Method: PUT
URL: /account/:id

Header: { "authorization": <token> }

FormData: {
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

### delete account

```
Method: DELETE
URL: /account/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

## Advertise

### get all adervertise

```
Method: GET
URL: /advertise/

Response:

Status Code: 200
Data: { 
    "advertises": [
        {
            "id":       <advertise id>,
            "author":   <advertise author account id>,
            ["context": <advertise context>],
            ["image":   <advertise image path>],
            "price":    <advertise price>,
            "position": <advertise position>,
        }
    ]
}
```

### get advertise by account

```
Method: GET
URL: /advertise/account

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: 同 get all adervertise 的 Data
```

### get advertise position list

```
Method: GET
URL: /advertise/position

Response:

Status Code: 200
Data: {
    pos: [
        {
            "id":       <ad_pos id>,
            "position": <advertise position>,
            "ad":       <advertise id>,
            "price":    <ad_pos price>
        }
    ]
}
```

### get advertise by position

```
Method: GET
URL: /advertise/pos/:pos

Response:

Status Code: 200
Data: { 
    "advertise": {
        "id":      <advertise id>,
        "context": <advertise context>,
        "author":  <advertise author account id>,
        "image":   <advertise image path>
    }
}
```

### get advertise by ID

```
Method: GET
URL: /advertise/:id

Response:

Status Code: 200
Data: 同 get advertise by position 的 Data
```

### buy advertise

```
Method: POST
URL: /advertise/:pos

Header: { "authorization": <token> }

FormData: {
    ["context": <ad context>],
    ["img":     <ad image>],
    price:      <ad price>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### edit advertise

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

### delete advertise

```
Method: DELETE
URL: /advertise/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

## Article

### get friend and self articles

```
Method: GET
URL: /article/

Response:

Status Code: 200
Data: { 
    "articles": [
        {
            "id":        <article id>,
            "title":     <article title>,
            ["context":  <article context>],
            "author":    <article author>,
            "time":      <article post time>,
            "ip":        <article post ip>,
            "board_id":  <article board id>,
            "visible":   <article visible status>,
            ["image":    <article image path>]
        }
    ]
}
```

### get articles by group and author

```
Method: GET
URL: /article/group/:group/author/:author

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: 同 get friend and self article 的 Data
```

### get articles by group and title

```
Method: GET
URL: /article/group/:group/title/:title

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: 同 get friend and self article 的 Data
```

### get articles by group and context

```
Method: GET
URL: /article/group/:group/context/:context

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: 同 get friend and self article 的 Data
```

### get articles by group

```
Method: GET
URL: /article/group/:group

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: 同 get friend and self article 的 Data
```

### get articles by author

```
Method: GET
URL: /article/author/:author

Response:

Status Code: 200
Data: 同 get friend and self article 的 Data
```

### get articles by title

```
Method: GET
URL: /article/title/:title

Response:

Status Code: 200
Data: 同 get friend and self article 的 Data
```

### get articles by context

```
Method: GET
URL: /article/context/:context

Response:

Status Code: 200
Data: 同 get friend and self article 的 Data
```

### get recommand articles

```
Method: GET
URL: /article/recommand

Response:

Status Code: 200
Data: 同 get friend and self articles 的 Data
```

### get article by ID

```
Method: GET
URL: /article/:id

Response:

Status Code: 200
Data: {
    "article": {
        "id":        <article id>,
        "title":     <article title>,
        ["context":  <article context>],
        "author":    <article author account id>,
        "time":      <article post time>,
        "ip":        <article post ip>,
        "board_id":  <article board id>,
        "visible":   <article visible status>,
        ["image":    <article image path>]
    }
}
```

### post article

```
Method: POST
URL: /article

Header: { "authorization": <token> }

FormData: {
    "title":    <article title>,
    ["context": <article context>],
    ["imgs":    <article image array>]
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### post article in group

```
Method: POST
URL: /article/group/:id

Header: { "authorization": <token> }

FormData: 同 post article 的 FormData

Response:

Status Code: 200
Data: { "message": "success" }
```

### edit article

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

### delete article

```
Method: DELETE
URL: /article/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

## Comment

### get all comment by article ID
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

### post comment
```
Method: POST
URL: /comment/:id

Header: { 
    "authorization": <token>,
    "Content-Type": "application/json"
}

Body: {
    "context": <comment context>,
    "types":   <comment types>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### edit comment

```
Method: PUT
URL: /comment/:id

Header: { 
    "authorization": <token>,
    "Content-Type": "application/json"
}

Body: {
    "context": <comment context>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### delete comment

```
Method: DELETE
URL: /comment/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

## File

### get file by file path
```
Method: GET
URL: /file/:filePath

Response:

Status Code: 200
Data: file
```

## Friend

### get all friends

```
Method: GET
URL: /friend/:id


Response:

Status Code: 200
Data: { 
    "friends": <account id>[]
}
```

### get unconfirmed friends

```
Method: GET
URL: /friend/unconfirmed

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { 
    "unconfrimed": <account id>[]
}
```

### get invitation

```
Method: GET
URL: /friend/invitation

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { 
    "invitation": <account id>[]
}
```

### get status with friend

```
Method: GET
URL: /friend/:id/state

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "state": <friend state> }
```

### send invitation

```
Method: POST
URL: /friend/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

### confirm invitation

```
Method: PUT
URL: /friend/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

### delete friend

```
Method: DELETE
URL: /friend/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```


## Group

### get all groups

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

### get all boards

```
Method: GET
URL: /group/board

Response:

Status Code: 200
Data: 同 get all groups 的 Data
```

### get groups by name

```
Method: GET
URL: /group/name/:name

Response:

Status Code: 200
Data: 同 get all groups 的 Data
```

### get groups by account

```
Method: GET
URL: /group/account

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: 同 get all groups 的 Data
```

### get family state (in family or not)

```
Method: GET
URL: /group/:id/state

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { state: true / false }
```

### get group members

```
Method: GET
URL: /group/:id/member

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

### get group by ID

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

### create group

```
Method: POST
URL: /group

Header: { 
    "authorization": <token>,
    "Content-Type": "application/json"
}

Body: {
    name    <group name>,
    type:   <group type>
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### join group
```
Method: POST
URL: /group/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

### change group leader
```
Method: PUT
URL: /group/:id/leader/:leader

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

### edit group
```
Method: PUT
URL: /group/:id

Header: { 
    "authorization": <token>,
    "Content-Type": "application/json"
}

Body: {
    name: <group name>,
}

Response:

Status Code: 200
Data: { "message": "success" }
```

### leave group
```
Method: DELETE
URL: /group/leave/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```

### delete group

```
Method: DELETE
URL: /group/:id

Header: { "authorization": <token> }

Response:

Status Code: 200
Data: { "message": "success" }
```
