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

## Article

## Comment

## File

## Group