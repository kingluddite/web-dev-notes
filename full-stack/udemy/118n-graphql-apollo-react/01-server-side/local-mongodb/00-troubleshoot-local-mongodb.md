# Troubleshoot local MongoDB

* **note** But sometimes you might get **SSH errors** to connect to `mLab` (if you are working in a public library or a secure environment so to get around follow the instructions in `local-mongodb`)

## Another potential error
* Check if mongo is > 4 `$ mongo --version`
* If you need to upgrade (I'm using brew).... `$ brew update mongo`

## I want to connect to a local instance of mongodb
* View `07-create-connect-mongodb-local.md`

### local mongodb shell instructions

```
$ mongo
$ show dbs
$ use they_came_before_me
$ show collections
$ db.users.find()
```

* You will see user is added

![one user added](https://i.imgur.com/ZLSrWR0.png)

### Delete all users inside a collection
* `$ mongo` in another terminal tab
* `$ use they_came_before_me`
* `$ db.users.deleteMany({})`
* This will delete all users

## This not is if you are using Local MongoDB install 
### Houston we may have a problem (Occasional error when using local mongodb)
* If you get the graphql error "Topology was destroyed"
* Find `node` process, kill it and rerun
* Rerun mongo and dev server

## MongoDB tips!
* You may have to shut down both servers mongo and app
* Kill `node` and `mongod`
* Restart them both
* After logging in you should see current user with info we specified in query
