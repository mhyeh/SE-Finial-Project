# SE-Finial-Project

software engineering finial project

## Environment

```
node v9.7.1

npm v6.5.0

mariaDB v10.3.11

MongoDB v4.0.5

redis-server v3.2.1
```

## Set up

```
git clone https://github.com/BlackKite0206233/SE-Finial-Project.git
cd SE-Finial-Project
npm install
```

## TODO

## API List

### More info at [API Doc](./APIdoc.md)

| Method | URL | Description |
| --- | --- | --- |
| **Account** |
| GET | /account | get account by token |
| GET | /account/all | get all accounts |
| GET | /account/name/:name | get accounts by name |
| GET | /account/:id | get account by ID |
| POST | /account | register |
| POST | /account/login | login |
| PUT | /account/:id | edit account |
| DELETE | /account/:id | delete account |
| **Advertise** |
| GET | /advertise | get all advertises |
| GET | /advertise/pos/:pos | get advertise by position |
| GET | /advertise/:id | get advertise by ID |
| POST | /advertise/:pos | buy a advertise |
| PUT | /advertise/:id | edit advertise |
| DELETE | /advertise/:id | cancel advertise |
| **Article** |
| GET | /article | get all articles |
| GET | /article/group/:group/author/:author | get articles by group and author |
| GET | /article/group/:group/title/:title | get articles by group and title |
| GET | /article/group/:group/context/:context | get articles by group and context |
| GET | /article/author/:author | get articles by author |
| GET | /article/title/:title | get articles by title |
| GET | /article/context/:context | get articles by context |
| GET | /article/group/:group | get articles by group |
| GET | /article/:id | get article by ID |
| POST | /article | post a new article |
| POST | /article/group/:id | post a new article in group |
| PUT | /article/:id | edit article |
| DELETE | /article/:id | delete article |
| **Comment** |
| GET | /comment/:id | get all comments by article ID |
| POST | /comment/:id | post a new comment under article |
| PUT | /comment/:id | edit comment |
| DELETE | /comment/:id | delete comment |
| **File** |
| GET | /file/:filePath | get file by filePath |
| **Group** |
| GET | /group | get all groups |
| GET | /group/join/:id | join a group |
| GET | /group/leave/:id | leave a group |
| GET | /group/name/:name | get groups by group name |
| GET | /group/account/:account | get groups by account ID |
| GET | /group/:id/member | get group members |
| GET | /group/:id | get group by ID |
| POST | /group | create a new group |
| PUT | /group/:id | edit group |
| DELETE | /group/:id | delete group |
| **Friend** |
| GET | /friend | get all friends |
| GET | /friend/unconfirmed | get list of unconfirmed ivitation from others |
| GET | /friend/invitation | get invitation list |
| GET | /friend/:id | get status with specific ID |
| POST | /friend/:id | send invitation to another user|
| PUT | /friend/:id | confirm the invitation from another |
| DELETE | /friend/:id | delete a friend |